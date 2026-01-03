import { API_BASE_URL } from './client';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
}

interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[] | string>;
}

interface ApiResult<T> {
  data: T;
  status: number;
  headers: Headers;
}

const buildUrl = (path: string) => (path.startsWith('http') ? path : `${API_BASE_URL}${path}`);

async function authRequest<T>(path: string, init: RequestInit = {}): Promise<ApiResult<T>> {
  const headers = new Headers(init.headers as HeadersInit);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers,
  });

  let payload: unknown = null;
  if (response.status !== 204) {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      payload = await response.json();
    } else {
      payload = await response.text();
    }
  }

  if (!response.ok) {
    let message = `Żądanie zakończyło się kodem ${response.status}.`;

    if (typeof payload === 'string') {
      message = payload.trim() || message;
    } else if (payload && typeof payload === 'object') {
      const body = payload as ApiErrorBody;
      if (body.message) {
        message = body.message;
      }
      if (body.errors) {
        const flattened = Object.values(body.errors).reduce<string[]>((acc, entry) => {
          if (Array.isArray(entry)) {
            acc.push(...entry);
          } else if (entry) {
            acc.push(String(entry));
          }
          return acc;
        }, []);
        const firstError = flattened.find((value) => Boolean(value));
        if (firstError) {
          message = firstError;
        }
      }
    }

    throw new Error(message);
  }

  return { data: payload as T, status: response.status, headers: response.headers };
}

export interface AuthSuccessResponse {
  token: string;
  token_type?: string;
  data: UserProfile;
}

interface LoginPayload {
  email: string;
  password: string;
  token_name?: string;
  abilities?: string[];
}

interface RegisterPayload extends LoginPayload {
  name: string;
  phone?: string | null;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string | null;
  current_password?: string;
  password?: string;
  password_confirmation?: string;
}

export async function login(payload: LoginPayload): Promise<AuthSuccessResponse> {
  const { data } = await authRequest<AuthSuccessResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return data;
}

export async function register(payload: RegisterPayload): Promise<AuthSuccessResponse> {
  const { data } = await authRequest<AuthSuccessResponse>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return data;
}

export async function fetchProfile(token: string): Promise<UserProfile> {
  const { data } = await authRequest<{ data: UserProfile }>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!data || typeof data !== 'object' || !('data' in data)) {
    throw new Error('Nie udało się pobrać profilu użytkownika.');
  }

  return (data as { data: UserProfile }).data;
}

export async function updateProfile(token: string, payload: UpdateProfilePayload): Promise<UserProfile> {
  const { data } = await authRequest<{ data: UserProfile }>('/auth/me', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!data || typeof data !== 'object' || !('data' in data)) {
    throw new Error('Nie udało się zaktualizować profilu.');
  }

  return (data as { data: UserProfile }).data;
}

export async function changePassword(
  token: string,
  payload: Required<Pick<UpdateProfilePayload, 'current_password' | 'password' | 'password_confirmation'>>,
): Promise<void> {
  await authRequest('/auth/password', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function logout(token: string): Promise<void> {
  await authRequest('/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteAccount(token: string): Promise<void> {
  await authRequest('/auth/me', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
