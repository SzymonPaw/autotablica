import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuth } from './AuthContext';
import {
  addListingToFavorites,
  fetchFavoriteListings,
  removeListingFromFavorites,
} from '../api/client';

interface FavoritesContextValue {
  favoriteIds: Set<number>;
  isFavorite: (listingId: number) => boolean;
  addFavorite: (listingId: number) => Promise<void>;
  removeFavorite: (listingId: number) => Promise<void>;
  toggleFavorite: (listingId: number) => Promise<boolean>;
  reloadFavorites: () => Promise<void>;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
  pageSize?: number;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children, pageSize = 100 }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const reloadFavorites = useCallback(async () => {
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }

    setIsLoading(true);
    try {
      const payload = await fetchFavoriteListings({ per_page: pageSize, sort: '-created_at' });
      const items = Array.isArray(payload?.data) ? payload.data : [];
      setFavoriteIds(new Set(items.map((item: any) => item.id)));
    } catch (error) {
      console.error('Nie udało się odświeżyć ulubionych:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize, user]);

  useEffect(() => {
    reloadFavorites();
  }, [reloadFavorites]);

  const addFavorite = useCallback(
    async (listingId: number) => {
      if (!user) {
        throw new Error('Musisz być zalogowany, aby zapisać ogłoszenie w ulubionych.');
      }

      await addListingToFavorites(listingId);
      setFavoriteIds(prev => {
        const next = new Set(prev);
        next.add(listingId);
        return next;
      });
    },
    [user]
  );

  const removeFavorite = useCallback(
    async (listingId: number) => {
      if (!user) {
        throw new Error('Musisz być zalogowany, aby usunąć ogłoszenie z ulubionych.');
      }

      await removeListingFromFavorites(listingId);
      setFavoriteIds(prev => {
        const next = new Set(prev);
        next.delete(listingId);
        return next;
      });
    },
    [user]
  );

  const toggleFavorite = useCallback(
    async (listingId: number) => {
      if (favoriteIds.has(listingId)) {
        await removeFavorite(listingId);
        return false;
      }

      await addFavorite(listingId);
      return true;
    },
    [favoriteIds, addFavorite, removeFavorite]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      isFavorite: (listingId: number) => favoriteIds.has(listingId),
      addFavorite,
      removeFavorite,
      toggleFavorite,
      reloadFavorites,
      isLoading,
    }),
    [favoriteIds, addFavorite, removeFavorite, toggleFavorite, reloadFavorites, isLoading]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
