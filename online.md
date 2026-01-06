## Instrukcja wdrożenia autotablica.xce.pl na hostido.pl

### 1. Przygotowania lokalne
1. Zaktualizuj repozytorium i sprawdź, czy testy przechodzą:
	```bash
	git pull
	cd backend && composer install && php artisan test
	cd ../frontend && npm install && npm run test
	```
2. Ustal wersje runtime zgodne z hostingiem:
	- PHP ≥ 8.2 z rozszerzeniami: `bcmath`, `ctype`, `curl`, `dom`, `fileinfo`, `json`, `mbstring`, `openssl`, `pdo`, `tokenizer`, `xml`.
	- Node.js ≥ 18 (potrzebny tylko lokalnie do builda frontu).
3. W `.env` lokalnie skonfiguruj docelowe adresy, aby móc wygenerować poprawne buildy:
	```env
	APP_URL=https://autotablica.xce.pl
	FRONTEND_URL=https://autotablica.xce.pl
	SANCTUM_STATEFUL_DOMAINS=autotablica.xce.pl
	SESSION_DOMAIN=.xce.pl
	```

### 2. Konfiguracja domeny i hostingu
1. W panelu rejestratora domeny ustaw rekord A domeny `autotablica.xce.pl` na adres IP serwera hostido (sprawdź w panelu cPanel → Zone Editor → „Use this IP”).
2. W cPanel → **Domains** upewnij się, że `autotablica.xce.pl` wskazuje na katalog `public_html/` (nie ma subdomen, więc frontend będzie w katalogu głównym).
3. Włącz darmowy certyfikat SSL (cPanel → **SSL/TLS Status** → „Run AutoSSL”). Po wydaniu certyfikatu włącz wymuszanie HTTPS w `.htaccess` frontendu (patrz sekcja 6).

### 3. Struktura katalogów na serwerze
- `~/autotablica-backend` – cały projekt Laravel (wszystkie pliki z katalogu `backend/`).
- `~/public_html/` – produkcyjny build Reacta + katalog `api/` zawierający publiczny entrypoint Laravel.
- `~/storage` – katalog na uploady (opcjonalnie, można użyć `~/autotablica-backend/storage`).

### 4. Deployment backendu (Laravel API)
1. Spakuj katalog `backend` do archiwum `.zip` (bez folderu `vendor/`):
	```bash
	cd backend
	composer install --no-dev
	php artisan config:clear && php artisan cache:clear
	zip -r ../autotablica-backend.zip . -x "vendor/*" -x "node_modules/*"
	```
2. W cPanel → **File Manager** wgraj `autotablica-backend.zip` do katalogu domowego i rozpakuj do `~/autotablica-backend`.
3. Na serwerze (cPanel → Terminal lub SSH) przejdź do `~/autotablica-backend`:
	```bash
	cd autotablica-backend
	composer install --no-dev --optimize-autoloader
	cp .env.example .env
	php artisan key:generate
	```
4. Dodaj połączenie z bazą w `.env` (dane z cPanel → **MySQL® Databases**). Przykład:
	```env
	DB_CONNECTION=mysql
	DB_HOST=localhost
	DB_PORT=3306
	DB_DATABASE=autotablica
	DB_USERNAME=autotablica_user
	DB_PASSWORD=SuperTajneHaslo

	APP_URL=https://autotablica.xce.pl
	FRONTEND_URL=https://autotablica.xce.pl
	SANCTUM_STATEFUL_DOMAINS=autotablica.xce.pl
	SESSION_DOMAIN=.xce.pl
	VITE_APP_URL=https://autotablica.xce.pl/api
	```
5. Wygeneruj symlink storage (jeśli hosting blokuje `php artisan storage:link`, skopiuj ręcznie):
	```bash
	php artisan storage:link || ln -s /home/USER/autotablica-backend/storage/app/public /home/USER/public_html/storage
	```
6. Przenieś zawartość `backend/public` do `public_html/api`:
	```bash
	mkdir -p ~/public_html/api
	cp -r public/. ~/public_html/api/
	```
	Następnie edytuj `~/public_html/api/index.php`, aby ścieżki wskazywały na katalog bazowy:
	```php
	require __DIR__.'/../../autotablica-backend/vendor/autoload.php';
	$app = require_once __DIR__.'/../../autotablica-backend/bootstrap/app.php';
	```
	Analogicznie zaktualizuj `.htaccess` (zmień `RewriteRule ^ index.php [L]` na `RewriteRule ^ /api/index.php [L]` tylko jeśli plik trafi do katalogu głównego; w naszym przypadku pozostaje jak w oryginale).

### 5. Baza danych i migracje
1. W cPanel → **MySQL® Databases** utwórz bazę oraz użytkownika, a następnie przypisz użytkownika do bazy z pełnymi uprawnieniami.
2. Z terminala wykonaj migracje oraz ewentualne seedy:
	```bash
	cd ~/autotablica-backend
	php artisan migrate --force
	php artisan db:seed --force   # tylko jeśli potrzebne dane startowe
	```
3. Skonfiguruj CRON dla zadań cyklicznych (cPanel → **Cron Jobs**) jeśli aplikacja korzysta z harmonogramu:
	```bash
	* * * * * /usr/local/bin/php /home/USER/autotablica-backend/artisan schedule:run >> /dev/null 2>&1
	```

### 6. Deployment frontendu (React)
1. W katalogu `frontend` ustaw zmienne środowiskowe w `.env.production`:
	```env
	VITE_API_BASE_URL=https://autotablica.xce.pl/api
	```
2. Zbuduj aplikację:
	```bash
	cd frontend
	npm install
	npm run build
	```
	Wynik otrzymasz w `frontend/build`.
3. Usuń zawartość `~/public_html` (poza katalogiem `api/` utworzonym wcześniej) i wgraj pliki z `frontend/build` do `~/public_html`.
4. Dodaj w `~/public_html/.htaccess` reguły wymuszające HTTPS i przekierowania SPA:
	```apache
	RewriteEngine On
	RewriteCond %{HTTPS} !=on
	RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteRule ^ index.html [L]
	```
5. Jeśli potrzebujesz udostępniać pliki z katalogu `storage`, upewnij się, że symlink `public/storage` jest dostępny w `public_html/storage`.

### 7. Testy po wdrożeniu
1. Wejdź na `https://autotablica.xce.pl` i upewnij się, że statyczne zasoby ładują się z HTTPS (Chrome devtools → zakładka Network).
2. Sprawdź wywołania API (`/api/health` lub logowanie) – powinny zwracać 200 i ciasteczka `XSRF-TOKEN` oraz `autotablica_session` z domeną `.xce.pl`.
3. Jeżeli pojawiają się błędy 500, sprawdź `~/autotablica-backend/storage/logs/laravel.log`.
4. W razie błędów CORS upewnij się, że w `config/cors.php` `allowed_origins` zawiera `https://autotablica.xce.pl` i wykonaj `php artisan config:cache` na serwerze.

### 8. Utrzymanie i aktualizacje
1. Przy każdej aktualizacji backendu:
	```bash
	cd backend
	git pull
	composer install --no-dev
	php artisan migrate --force
	php artisan config:cache && php artisan route:cache
	rsync/scp zmianę do ~/autotablica-backend
	```
2. Przy aktualizacji frontendu powtórz `npm run build` i nadpisz zawartość `public_html` (zachowaj `api/`).
3. Regularnie pobieraj backupy bazy (cPanel → **Backup**) oraz katalogu `~/autotablica-backend/storage/app/public`.
4. Monitoruj limity hostingu (CPU/IO) – Laravel + React na jednym hostingu współdzielonym może wymagać optymalizacji (cache, kompresja, usuwanie zbędnych logów).

Po wykonaniu powyższych kroków projekt będzie dostępny w sieci pod jedną domeną z frontendem React oraz backendem Laravel obsługującym API na ścieżce `/api`.
