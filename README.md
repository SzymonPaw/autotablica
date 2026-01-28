# Autotablica  
### Nowoczesna aplikacja ogłoszeń samochodowych **Laravel API + React**

---

## Informacje o uczelni

**Uniwersytet WSB Merito w Gdańsku**  
Wydział Informatyki i Nowych Technologii

---

## Autorzy

- **Szymon Paw**  
  nr albumu: **72815**

- **Filip Mech**  
  nr albumu: **72813**

---

## Charakter pracy

Projekt wdrożeniowy - Praca inżynierska na kierunku **Informatyka**

---

## Opiekun pracy

**Paweł Dziurewicz**
# Demo: https://autotablica.xce.pl/

## Wymagania
- Docker Desktop
- Git
- Node.js (najnowsza LTS)
- Composer

## Uruchomienie projektu

### 1. Sklonuj repozytorium
```bash
git clone https://github.com/SzymonPaw/autotablica.git
cd autotablica
```

### 2. Uruchom środowisko Docker
```bash
docker-compose up -d --build
```

### 3. Sprawdź czy wszystko działa
- React Frontend: http://localhost:3000
- Laravel Backend: http://localhost:8000  
- phpMyAdmin: http://localhost:8080
  - Login: root
  - Hasło: root_password

### 4. Uruchom migracje Laravel (jeśli potrzebne)
```bash
docker exec -it autotablica_backend php artisan migrate
```

## Praca z Git

### Pobieranie najnowszych zmian
```bash
git pull origin main
```

### Wysyłanie własnych zmian
```bash
git add .
git commit -m "Opis zmian"
git push origin main
```

### Praca z gałęziami (zalecane)
```bash
# Stworzenie nowej gałęzi
git checkout -b nazwa-funkcjonalnosci

# Praca na gałęzi
git add .
git commit -m "Opis zmian"
git push origin nazwa-funkcjonalnosci

# Przejście na main i aktualizacja
git checkout main
git pull origin main
```

## Zatrzymanie środowiska
```bash
docker-compose down
```

## Ponowne uruchomienie
```bash
docker-compose up -d
```

## Rozwiązywanie problemów

### Kontener nie startuje
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

### Problemy z bazą danych
```bash
docker exec -it autotablica_backend php artisan migrate:refresh
```

### Problemy z uprawnieniami (Linux/Mac)
```bash
sudo chown -R $USER:$USER .
```
