# AutoTablica Backend API

Dokument obejmuje wszystkie ukończone elementy warstwy API. Koncentruje się na kontraktach HTTP, autoryzacji oraz scenariuszach biznesowych zweryfikowanych w trakcie implementacji. Wszystkie przykłady bazują na faktycznych danych z dumpu `autotablica.sql` (np. ogloszenie ID 3 "Sprzedam Audi A4 2.0 TDI").

## Podstawy
- **Bazowy URL**: `http://localhost:8000/api`
- **Format**: JSON (`Accept: application/json`)
- **Uwierzytelnianie**: Laravel Sanctum (naglowek `Authorization: Bearer <token>`). Endpointy publiczne to logowanie/rejestracja, listing ogloszen i slowniki.
- **CORS**: domyslna konfiguracja Laravela, przy integracji SPA wymagane ustawienie `SANCTUM_STATEFUL_DOMAINS`.

## Limitowanie zapytan
- Globalny limiter grupy `api`: `60` zapytan/minute na uzytkownika lub IP.
- Logowanie (`POST /auth/login`): `10` prob/minute na IP (klucz `auth-login`).
- Wrzut zdjec (`POST /ogloszenia/{id}/zdjecia`): `30` uploadow na 5 minut na uzytkownika/IP (klucz `upload-images`).
- Przy przekroczeniu limitu API zwraca `429 Too Many Requests` wraz z naglowkami `Retry-After`.

## Konwencje odpowiedzi
- Zasoby wykorzystuja `JsonResource`; kolekcje sa paginowane (`links`, `meta`).
- Parametr `per_page` przyjmuje wartosc 1..50 (domyslnie 15).
- Parametr `sort` akceptuje pola `created_at`, `cena`, `przebieg`, `tytul`; `-` przed nazwa oznacza malejaco (np. `-created_at`).
- Filtry listy ogloszen: `q`, `cena_min`, `cena_max`, `marka_id`, `model_id`, `paliwo`, `przebieg_max`, `rok_min`, `rok_max`.
- Walidacja bledow zwracana jest ze struktura Laravela (`422` z polem `errors`).

## Uwierzytelnianie
| Metoda | Endpoint | Wymaga tokenu | Opis |
|--------|----------|---------------|------|
| POST | `/auth/register` | nie | Tworzy konto i natychmiastowy personal access token. |
| POST | `/auth/login` | nie | Zwraca token dla istniejacego uzytkownika. |
| POST | `/auth/logout` | tak | Usuwa biezacy token Sanctum. |
| GET | `/auth/me` | tak | Zwraca profil zalogowanego uzytkownika. |

### Przyklad rejestracji
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Accept: application/json" \
  -d '{
    "name": "Jan Test",
    "email": "jan.test@example.com",
    "password": "Secret123!",
    "token_name": "frontend"
  }'
```

### Przyklad logowania
Uzyj konta utworzonego przez rejestracje (patrz wyzej) lub konta z seedera `DatabaseSeeder`.
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Accept: application/json" \
  -d '{
    "email": "jan.test@example.com",
    "password": "Secret123!",
    "token_name": "frontend"
  }'
```

Przykładowa odpowiedz (`200 OK`) dla konta `jan.test@example.com` utworzonego przed chwila:
```json
{
  "token": "1|pAtw...",
  "token_type": "Bearer",
  "data": {
    "id": 5,
    "name": "Jan Test",
    "email": "jan.test@example.com",
    "created_at": "2025-10-16T19:00:01.000000Z",
    "updated_at": "2025-10-16T19:00:01.000000Z"
  }
}
```

## Ogloszenia (Listings)
| Metoda | Endpoint | Wymaga tokenu | Uwagi |
|--------|----------|---------------|-------|
| GET | `/ogloszenia` | nie | Lista z filtrami, sortowaniem i paginacja. |
| GET | `/ogloszenia/{id}` | nie | Szczegoly ogloszenia wraz z powiazaniami. |
| POST | `/ogloszenia` | tak | Tworzy ogloszenie; walidacja w `StoreOgloszenieRequest`. |
| PATCH | `/ogloszenia/{id}` | tak | Aktualizacja tylko wlasnych danych (`OgloszeniePolicy`). |
| DELETE | `/ogloszenia/{id}` | tak | Usuniecie ogloszenia wlasnego; `204 No Content`. |

### Lista z parametrami (realny przyklad)
`GET /api/ogloszenia?per_page=5&sort=-cena&rok_min=2020`

Odpowiedz (skrocona):
```json
{
  "data": [
    {
      "id": 22,
      "tytul": "Volkswagen Passat 2.0 TDI Elegance",
      "cena": 124900,
      "przebieg": 79200,
      "status": "aktywny",
      "marka_id": 9,
      "model_id": 902,
      "marka": null,
      "model": null,
      "zdjecia": []
    },
    {
      "id": 21,
      "tytul": "Skoda Superb 2.0 TDI L&K",
      "cena": 132700,
      "przebieg": 58800,
      "status": "aktywny"
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/ogloszenia?page=1",
    "last": "http://localhost:8000/api/ogloszenia?page=2",
    "prev": null,
    "next": "http://localhost:8000/api/ogloszenia?page=2"
  },
  "meta": {
    "current_page": 1,
    "per_page": 5,
    "total": 20
  },
  "filters": {
    "rok_min": 2020
  },
  "sort": ["-cena"]
}
```

### Szczegoly ogloszenia
`GET /api/ogloszenia/3`

Odpowiedz (na podstawie rekordu z dumpu):
```json
{
  "data": {
    "id": 3,
    "uzytkownik_id": 1,
    "tytul": "Sprzedam Audi A4 2.0 TDI",
    "opis": "Rok produkcji 2015, przebieg 120000 km, pelna historia serwisowa.",
    "cena": 55000,
    "marka_id": 1,
    "model_id": 1,
    "vin": "WAUZZZ8K7FFA12345",
    "numer_rejestracyjny": "KR12345",
    "data_pierwszej_rej": "2015-06-15",
    "przebieg": 120000,
    "rodzaj_paliwa": "Diesel",
    "skrzynia_biegow": "Automatyczna",
    "pojemnosc_silnika": 2,
    "status": "aktywne",
    "created_at": "2025-10-09T19:37:30.000000Z",
    "updated_at": "2025-10-09T19:37:30.000000Z",
    "marka": null,
    "model": null,
    "zdjecia": []
  }
}
```
*Uwaga: `marka` oraz `model` beda uzupelnione, gdy slowniki zostana zaladowane danymi.*

### Tworzenie ogloszenia
```bash
curl -X POST http://localhost:8000/api/ogloszenia \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "tytul": "Tesla Model 3 Long Range AWD",
    "opis": "Auto elektryczne z pakietem Full Self Driving.",
    "cena": 182500,
    "marka_id": 4,
    "model_id": 401,
    "vin": "5YJ3E1EB5MF123456",
    "numer_rejestracyjny": "WW1TESLR",
    "data_pierwszej_rej": "2022-02-14",
    "przebieg": 28500,
    "rodzaj_paliwa": "elektryczny",
    "skrzynia_biegow": "automatyczna",
    "pojemnosc_silnika": 0,
    "status": "aktywny"
  }'
```

### Aktualizacja wybranych pol
```bash
curl -X PATCH http://localhost:8000/api/ogloszenia/3 \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "cena": 53900,
    "status": "rezerwacja"
  }'
```

## Zdjecia
| Metoda | Endpoint | Wymaga tokenu | Opis |
|--------|----------|---------------|------|
| POST | `/ogloszenia/{id}/zdjecia` | tak | Upload 1..10 plikow (`photos[]`), typy `jpeg,jpg,png,webp`, max 5 MB. |
| DELETE | `/zdjecia/{id}` | tak | Usuniecie pliku z dysku i rekordu (`ZdjeciePolicy`). |

Przyklad wyslania 2 plikow:
```bash
curl -X POST http://localhost:8000/api/ogloszenia/3/zdjecia \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -F "photos[]=@/path/audi-front.jpg" \
  -F "photos[]=@/path/audi-back.jpg"
```
Odpowiedz `201 Created` zawiera tablice `data` z polami `id`, `sciezka`, `url`.

## Ulubione (Favorites)
| Metoda | Endpoint | Wymaga tokenu | Opis |
|--------|----------|---------------|------|
| GET | `/ulubione` | tak | Lista ulubionych ogloszen aktualnego uzytkownika (paginacja, sort). |
| POST | `/ogloszenia/{id}/ulubione` | tak | Idempotentne dodanie ogloszenia. |
| DELETE | `/ogloszenia/{id}/ulubione` | tak | Usuniecie (204 przy sukcesie). |

### Przyklady
Dodanie ogloszenia ID 3 do ulubionych:
```bash
curl -X POST http://localhost:8000/api/ogloszenia/3/ulubione \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <TOKEN>"
```

Odpowiedz przy pierwszym dodaniu (`201 Created`):
```json
{
  "message": "Dodano ogloszenie do ulubionych."
}
```

Lista ulubionych (`GET /api/ulubione`):
```json
{
  "data": [
    {
      "id": 3,
      "tytul": "Sprzedam Audi A4 2.0 TDI",
      "cena": 55000,
      "status": "aktywne"
    }
  ],
  "filters": {
    "ulubione": true
  },
  "sort": ["-created_at"]
}
```

## Slowniki
| Metoda | Endpoint | Wymaga tokenu | Uwagi |
|--------|----------|---------------|-------|
| GET | `/slowniki/marki` | nie | Cache 600 s (`slowniki_marki`). |
| GET | `/slowniki/modele?marka_id=` | nie | Cache per marca (`slowniki_modele_<id>`). |

Przyklad bez filtra (baza po imporcie dumpu moze zwrocic pusta liste, jesli brak wpisow w tabelach `marki` i `modele`):
```bash
curl http://localhost:8000/api/slowniki/modele
```
Odpowiedz:
```json
{
  "data": []
}
```
*(Dane sa zaleznie od zawartosci tabel `marki` i `modele`; po uzupelnieniu rekordow nalezy wyczyscic cache, np. `php artisan cache:clear`.)*

## Struktury danych
### OgloszenieResource
| Pole | Typ | Opis |
|------|-----|------|
| `id` | int | ID ogloszenia |
| `uzytkownik_id` | int | Wlasciciel |
| `tytul`, `opis` | string | Dane tekstowe |
| `cena` | float | Cena brutto |
| `marka_id`, `model_id` | int | Klucze slownikowe |
| `vin`, `numer_rejestracyjny` | string | Identyfikatory pojazdu |
| `data_pierwszej_rej` | date | Format `Y-m-d` |
| `przebieg` | int | w km |
| `rodzaj_paliwa`, `skrzynia_biegow`, `status` | string | Kategorie |
| `pojemnosc_silnika` | float|null | Litry |
| `marka`, `model` | object|null | Zagniezdzone dane po eager-load |
| `zdjecia` | array | Kolekcja `ZdjecieResource` |

### ZdjecieResource
`id`, `ogloszenie_id`, `sciezka` (np. `ogloszenia/3/uuid.jpg`), `nazwa_pliku`, publiczny `url`, znaczniki czasu ISO8601.

## Srodowisko developerskie
1. `cp .env.example .env` i ustaw polaczenie do bazy oraz `FILESYSTEM_DISK=public`.
2. `composer install`, `php artisan key:generate`.
3. `php artisan migrate --seed` (utworzy uzytkownika `Test User` oraz tabele slownikowe).
4. Uruchom serwer: `php artisan serve` (domyslnie `http://localhost:8000`).
5. Dla plikow statycznych ustaw symlink: `php artisan storage:link`.

## Historia zmian
- Sanctum authentication + polityki (`AuthController`, `OgloszeniePolicy`, `ZdjeciePolicy`).
- Pełne CRUD dla ogloszen z filtrami, paginacja w `OgloszenieController` + `OgloszenieResource`.
- Upload i kasowanie zdjec (`ZdjecieController`, `StoreZdjecieRequest`, `ZdjecieResource`).
- Obsługa ulubionych (`UlubioneController`, migracja z unikalnym indeksem, relacje w `User`).
- Slowniki marek i modeli z cache (`SlownikController`, `MarkaResource`, `ModelPojazduResource`).
- Rate limiting w `AppServiceProvider` dla API, logowania i uploadu zdjec.

---
W razie pytan dotyczacych kontraktow API lub potrzeby rozszerzenia dokumentacji o kolejne przyklady (np. scenariusze walidacyjne) prosze o informacje.
