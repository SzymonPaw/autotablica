Poniżej znajduje się kompletny, praktyczny plan wdrożenia backendu AutoTablica oraz pełna lista wymaganych endpointów i CRUD-ów w stylu REST, gotowa do realizacji przez agenta w Laravelu z uwierzytelnianiem Sanctum, paginacją i dokumentacją OpenAPI/Scribe. Plan respektuje konwencje nazewnicze REST, rozdziela zasoby i działania HTTP oraz przewiduje bezpieczeństwo i wydajność na poziomie frameworka.

### Założenia techniczne
- Uwierzytelnianie tokenowe przy użyciu Laravel Sanctum z uprawnieniami tokenów oraz middleware `auth:sanctum` dla operacji wymagających logowania.
- Serializacja odpowiedzi przez Eloquent API Resources oraz paginacja przez wbudowany paginator, co upraszcza stabilne kontrakty API i kontrolę formatu.
- Upload i serwowanie plików przez Storage/Filesystem (public disk + symlink), aby bezpiecznie zarządzać zdjęciami pojazdów.
- Ograniczanie żądań (rate limiting) przez wbudowany mechanizm Rate Limiting per IP/użytkownik, aby chronić API przed nadużyciami.
- Generowanie dokumentacji API i specyfikacji OpenAPI/Swagger automatycznie przy pomocy Scribe, wraz z HTML i kolekcją Postmana.

### Zasoby domenowe
- users, ogloszenia (listings), zdjecia (images), marki (brands), modele (models), ulubione (favorites), opcjonalnie kategorie, z zachowaniem liczby mnogiej i nazw-rzeczowników w ścieżkach URI.
- Każdy zasób udostępnia standardowy zestaw CRUD (GET kolekcja, GET element, POST, PATCH/PUT, DELETE) zgodny z konwencjami REST.

### Autoryzacja i konto (Sanctum)
- POST /auth/register — rejestracja użytkownika i opcjonalne automatyczne wystawienie tokenu dostępowego Sanctum.
- POST /auth/login — logowanie i wystawienie personal access token z opcjonalnymi abilities, np. listings:write.
- POST /auth/logout — unieważnienie bieżącego tokenu lub wszystkich tokenów użytkownika zgodnie z polityką bezpieczeństwa.
- GET /auth/me — zwraca profil zalogowanego użytkownika, zabezpieczone `auth:sanctum`.

### Ogłoszenia: publiczne i prywatne CRUD
- GET /ogloszenia — lista z parametrami filtrów i paginacją; odpowiedzi przez Resource/ResourceCollection z polami `data`, `links`, `meta`.
- GET /ogloszenia/{id} — szczegóły ogłoszenia wraz z relacjami (np. zdjęcia), w formacie ujednoliconym przez API Resources.
- POST /ogloszenia — utworzenie ogłoszenia (wymaga `auth:sanctum`), payload bezpośrednio mapowany przez walidację i model do rekordów.
- PATCH /ogloszenia/{id} — aktualizacja pól ogłoszenia tylko przez właściciela; spójna semantyka PATCH wg REST.
- DELETE /ogloszenia/{id} — usunięcie ogłoszenia tylko przez właściciela; odpowiedź 204 No Content.

### Filtry i sortowanie dla listy ogłoszeń
- Obsłuż query params: `q`, `cena_min`, `cena_max`, `marka_id`, `model_id`, `paliwo`, `przebieg_max`, `rok_min`, `rok_max`, `sort` (np. `-created_at`), wraz z paginacją `page` i `per_page`.
- Zwracaj paginowaną odpowiedź z `links` i `meta` lub dopasuj strukturę używając `paginationInformation` w Resource Collection, jeśli wymagany jest inny kształt.

### Upload zdjęć
- POST /ogloszenia/{id}/zdjecia — upload jednego lub wielu plików `multipart/form-data`, zapis przez `store()` na dysku `public`, zwrot ścieżek i metadanych.
- DELETE /zdjecia/{id} — usunięcie zdjęcia i pliku z dysku, z kontrolą właścicielską lub rolą moderatora.

### Ulubione
- GET /ulubione — lista ogłoszeń dodanych do ulubionych przez zalogowanego użytkownika, paginowana.
- POST /ogloszenia/{id}/ulubione — dodanie ogłoszenia do ulubionych, idempotentne zachowanie w przypadku duplikatu.
- DELETE /ogloszenia/{id}/ulubione — usunięcie z ulubionych, odpowiedź 204.

### Słowniki: marki i modele
- GET /slowniki/marki — lista marek do interfejsu filtrów oraz formularzy.
- GET /slowniki/modele?marka_id= — modele filtrowane po marce do dynamicznych dropdownów.

### Bezpieczeństwo i limity
- Zastosuj rate limiting np. 60 żądań/min per użytkownik/IP dla grupy tras `api`, definiowane w RateLimiter i przypięte w middleware.
- Rozważ różne limity dla endpointów wrażliwych (logowanie, upload) oraz publicznych list, zgodnie z dobrymi praktykami.

### Dokumentacja API i testowanie
- Zainstaluj Scribe i publikuj `config/scribe.php`, generując HTML docs, kolekcję Postmana i spec OpenAPI z adnotacji kontrolerów.
- Uporządkuj grupy tras w Scribe (np. Auth, Ogloszenia, Zdjecia, Slowniki, Ulubione) oraz dodaj przykładowe response’y przez Resources, aby podnieść jakość dokumentacji.

### Konwencje REST i nazewnictwo
- Używaj rzeczowników w liczbie mnogiej w ścieżkach, unikając czasowników w URI; operacje determinują metody HTTP.
- Wersjonowanie dodaj na poziomie prefiksu `/api` i unikaj zbędnych dopisków w ścieżkach, zachowując prostotę.

### Szkielet zadań dla agenta (kolejność)
- [x] Autoryzacja: zainstaluj/aktywuj Sanctum, dodaj trasy Auth i middleware `auth:sanctum`, wystawianie i unieważnianie tokenów.
- [x] Resources i paginacja: utwórz API Resources dla `Ogloszenie` i kolekcji, ujednolicając odpowiedzi i meta/links oraz obsługując filtrowanie i sortowanie listy ogłoszeń.
- [x] CRUD ogłoszeń: kontroler REST z politykami dostępu do dodawanie/edycji/usuwanie/zmiana statusu i pełną walidacją requestów.
- [x] Upload: endpoint zdjęć, zapis na Storage public oraz kasowanie wraz z plikiem, z testem E2E `multipart/form-data`.
- [ ] Ulubione: relacja pivot i trzy endpointy idempotentne zgodnie z konwencją.
- [ ] Słowniki: publiczne endpointy dla marek i modeli z prostą pamięcią podręczną na poziomie HTTP/Resource w razie potrzeby dokumentacyjnej.
- [ ] Rate limiting: globalny limiter dla grupy `api` i ewentualne niestandardowe limity dla upload/logowania.
- [ ] Dokumentacja: instalacja Scribe, adnotacje, build dokumentacji, publikacja HTML i kolekcji Postmana w repo.

### Przykładowe kontrakty odpowiedzi
- Paginowana lista: kolekcja `data` z polami ogłoszenia i relacjami oraz `links`/`meta` od paginatora.
- Pojedynczy rekord: Resource z polami bazowymi i zagnieżdżonymi zdjęciami, kompatybilny z generowaniem przykładów w Scribe.

### Uwagi końcowe
- Ten plan pozwala wdrożyć w pełni funkcjonalne, spójne i dobrze udokumentowane API zgodne z konwencjami REST i narzędziami Laravel 11/12, co upraszcza implementację i utrzymanie.
- Gdy backend osiągnie stabilny kontrakt, spec OpenAPI wygenerowana przez Scribe stanie się źródłem prawdy dla zespołu front-end i testów automatycznych.

Jeśli chcesz, przygotuje gotowe szkielety kontrolerów, Resources oraz definicje tras dla każdej sekcji, wraz z przykładami adnotacji Scribe i politykami dostępu pod `auth:sanctum`, aby agent mógł wejść i „dokończyć” kod bez decyzji architektonicznych po drodze.