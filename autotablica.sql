-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Paź 09, 2025 at 08:33 PM
-- Wersja serwera: 8.0.43
-- Wersja PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `autotablica`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kategoria_ogloszenie`
--

CREATE TABLE `kategoria_ogloszenie` (
  `kategoria_id` bigint UNSIGNED NOT NULL,
  `ogloszenie_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kategorie`
--

CREATE TABLE `kategorie` (
  `id` bigint UNSIGNED NOT NULL,
  `nazwa` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `marki`
--

CREATE TABLE `marki` (
  `id` bigint UNSIGNED NOT NULL,
  `nazwa` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_10_09_175403_create_ogloszenia_table', 2),
(5, '2025_10_09_175650_create_zdjecia_table', 3),
(6, '2025_10_09_175803_create_marki_table', 4),
(7, '2025_10_09_175900_create_modele_table', 5),
(8, '2025_10_09_180001_create_kategorie_table', 6),
(9, '2025_10_09_180116_create_kategoria_ogloszenie_table', 7),
(10, '2025_10_09_180659_create_ulubione_table', 8);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `modele`
--

CREATE TABLE `modele` (
  `id` bigint UNSIGNED NOT NULL,
  `marka_id` bigint UNSIGNED NOT NULL,
  `nazwa` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ogloszenia`
--

CREATE TABLE `ogloszenia` (
  `id` bigint UNSIGNED NOT NULL,
  `uzytkownik_id` bigint UNSIGNED NOT NULL,
  `tytul` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `opis` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cena` decimal(10,2) NOT NULL,
  `marka_id` int UNSIGNED NOT NULL,
  `model_id` int UNSIGNED NOT NULL,
  `vin` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numer_rejestracyjny` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_pierwszej_rej` date NOT NULL,
  `przebieg` int NOT NULL,
  `rodzaj_paliwa` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skrzynia_biegow` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pojemnosc_silnika` decimal(5,2) NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `ogloszenia`
--

INSERT INTO `ogloszenia` (`id`, `uzytkownik_id`, `tytul`, `opis`, `cena`, `marka_id`, `model_id`, `vin`, `numer_rejestracyjny`, `data_pierwszej_rej`, `przebieg`, `rodzaj_paliwa`, `skrzynia_biegow`, `pojemnosc_silnika`, `status`, `created_at`, `updated_at`) VALUES
(3, 1, 'Sprzedam Audi A4 2.0 TDI', 'Rok produkcji 2015, przebieg 120000 km, pełna historia serwisowa.', 55000.00, 1, 1, 'WAUZZZ8K7FFA12345', 'KR12345', '2015-06-15', 120000, 'Diesel', 'Automatyczna', 2.00, 'aktywne', '2025-10-09 19:37:30', '2025-10-09 19:37:30'),
(4, 1, 'Sprzedam BMW 320i', 'Rok 2017, benzyna, przebieg 85000 km, pełna historia serwisowa.', 68000.00, 2, 2, 'WBA8E9G52JAN12345', 'KR98765', '2017-04-10', 85000, 'Benzyna', 'Manualna', 2.00, 'aktywne', '2025-10-09 20:26:45', '2025-10-09 20:26:45'),
(5, 1, 'Volkswagen Golf VII 1.4 TSI', 'Rok 2016, przebieg 90000 km, klimatyzacja automatyczna, 150 KM.', 52000.00, 3, 5, 'WVWZZZ1KZFW00001', 'WA1234', '2016-07-22', 90000, 'Benzyna', 'Automatyczna', 1.40, 'aktywne', '2025-10-09 20:26:45', '2025-10-09 20:26:45'),
(6, 1, 'Toyota Corolla 1.8 Hybrid', 'Model 2018, hybryda, przebieg 60000 km, niski koszt eksploatacji.', 75000.00, 4, 7, 'JTDBU4EE9A9123456', 'KR56789', '2018-03-14', 60000, 'Hybryda', 'E-CVT', 1.80, 'aktywne', '2025-10-09 20:26:45', '2025-10-09 20:26:45'),
(7, 1, 'Ford Focus 1.5 EcoBoost', 'Rok 2019, silnik benzynowy, przebieg 45000 km, sportowy pakiet.', 63000.00, 5, 9, 'WF0GPXEEGPE123456', 'KR33333', '2019-09-05', 45000, 'Benzyna', 'Manualna', 1.50, 'aktywne', '2025-10-09 20:26:45', '2025-10-09 20:26:45');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2ld6uy25iM8Gp8B1pp2R4bpZmVyuFXb3xyALvjHI', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV2ZaaHZYWnNmRDBuQlFqeFNYUGlTcmdKQ3AwcEpiMjBrTUVORGVnWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041763),
('3pGHDhXYbjeYh76StEixb6zNhOb1HeFzEemcheBS', NULL, '172.19.0.1', 'PostmanRuntime/7.43.2', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZXF6d2Y4TFlvVTlPWUJjZTV5SzNwVzhhcUxHQVIwaHVld1NXZGJvRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041934),
('4KltLp2zd67a8rAlFV5KtWBWrH5mK23awUD72pOD', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2ZuaWVhU2xRQkVxcUppR2h4R21KNExrblBiOGNOSFpLN2d3RUx4SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041556),
('5kCbA0yMKFrpt1NZGPzOBEqQVmOcducphLf0nkYS', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmJJaUtHNk5LUTRURFJCM3BDeE5nQnBCOERSRXowSzBEOTlicTNIdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041554),
('8ZGJQsUJK6IWdrN2v5dR1HKb6dc4JwUSpgTyIlGH', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSGNyS3o5OXFPVFhudERZblcyeFJqTk5QS0pYQXdtRmZsTElSaU10SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041774),
('dOwawYNPbnRe0pcrprLJM9tpNH1PrQzKDXtdN8oK', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSWw4OTdiVEd3RjVRaDNTU0Zsa0VxRlFnbFF5Wk81ZHBKa1dSTERGMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041851),
('eVY6oyWw4GGiOu1bahLXNW4cgDpZc4NELO9wVFfe', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN2JuZXJ4YjBBWmZqQnJlanlZZlNwb0pMbkZQUWFRanR4MVVOVElTaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041774),
('H3UBI6Z1kpa98zYefWfBJ2i5VswcdqGZfB1sg8R9', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaHh5aGtjc0YwUzFXNk1rQXVWQjZkMjRCVEFlOFU0VXJpVUxYR002bCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041040),
('JdrRaM7ehPApeh2um8SXAtFD9WlCTCYRavEb1qm8', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaXh0bjFJRTdQWlVOWGJUNUV5dkRKbVhSNnRpWDFUeWlLcnk3dVZ5MyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041043),
('kUNgPOxCpFeoV0VSXplH8mqB4JwA8iBIpjPdQepF', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRVpnZnBlVmtOdkNrRVRnV3B6bXgyczNmR25HSzF1OUVLZkNsM2NaYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041668),
('NyIeE7QwDC38b3SkRtP46vWkd87orlYfA93DNBFj', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM1ZNUU5iMUxpa25qbjJPaGpyb0R1WnF1aUpJd3B6VGNIOFF3anRURiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041849),
('OFiNxTZgSwkRdyymZUIt0Rt1TpwX2AilzF6WsWr3', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVGwzNGZJWXU2clI0QnA5OElBR241N0p3bUFmSHpSSWRYTUFzOW1GOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041937),
('ON6SFk8cwNqO0PFTyQkkYNNJ9MP9GMgtsnZXrIl6', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibVo3SGtvRm1jS21YQWw2QmtZMHRhTjBrZDBqNHN1UXRBbkVZMFFyaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041022),
('TpOJhLCiexXwJhgsUzpGCi5Pc2fthajUVf6oYbr7', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSk1rRUdQbzZCcFlodDVrQkFlUDRkRG9XbVNFaEI0UFg4R3hnblJMVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041616),
('ttbmwEwAyUInZjKsfydCoWwXE1rz5MfLMSwcVMpb', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0ZkRmd6ZDhCSkV4SnphdVRRWWZwMjREOHJDSUtvTmUzZkF6TkxWbiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041666),
('vhJkwHpLwYoA2kyNtV4bXoYVA9muMswCamC3LqND', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMTdQb1pxZWRKUFRVazA2Zkh6SnZ6dWJwOWhiOEJRck10cVZHMzQ3dSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041616);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ulubione`
--

CREATE TABLE `ulubione` (
  `id` bigint UNSIGNED NOT NULL,
  `uzytkownik_id` bigint UNSIGNED NOT NULL,
  `ogloszenie_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Jan Kowalski', 'jan.kowalski@example.com', NULL, '$2y$10$abcdefghijklmnopqrstuv', NULL, '2025-10-09 19:37:30', '2025-10-09 19:37:30');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zdjecia`
--

CREATE TABLE `zdjecia` (
  `id` bigint UNSIGNED NOT NULL,
  `ogloszenie_id` bigint UNSIGNED NOT NULL,
  `sciezka` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nazwa_pliku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeksy dla tabeli `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeksy dla tabeli `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeksy dla tabeli `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeksy dla tabeli `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `kategoria_ogloszenie`
--
ALTER TABLE `kategoria_ogloszenie`
  ADD KEY `kategoria_ogloszenie_kategoria_id_foreign` (`kategoria_id`),
  ADD KEY `kategoria_ogloszenie_ogloszenie_id_foreign` (`ogloszenie_id`);

--
-- Indeksy dla tabeli `kategorie`
--
ALTER TABLE `kategorie`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `marki`
--
ALTER TABLE `marki`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `modele`
--
ALTER TABLE `modele`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modele_marka_id_foreign` (`marka_id`);

--
-- Indeksy dla tabeli `ogloszenia`
--
ALTER TABLE `ogloszenia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ogloszenia_uzytkownik_id_foreign` (`uzytkownik_id`);

--
-- Indeksy dla tabeli `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeksy dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeksy dla tabeli `ulubione`
--
ALTER TABLE `ulubione`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ulubione_uzytkownik_id_foreign` (`uzytkownik_id`),
  ADD KEY `ulubione_ogloszenie_id_foreign` (`ogloszenie_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indeksy dla tabeli `zdjecia`
--
ALTER TABLE `zdjecia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zdjecia_ogloszenie_id_foreign` (`ogloszenie_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `kategorie`
--
ALTER TABLE `kategorie`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `marki`
--
ALTER TABLE `marki`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `modele`
--
ALTER TABLE `modele`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `ogloszenia`
--
ALTER TABLE `ogloszenia`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `ulubione`
--
ALTER TABLE `ulubione`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `zdjecia`
--
ALTER TABLE `zdjecia`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `kategoria_ogloszenie`
--
ALTER TABLE `kategoria_ogloszenie`
  ADD CONSTRAINT `kategoria_ogloszenie_kategoria_id_foreign` FOREIGN KEY (`kategoria_id`) REFERENCES `kategorie` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kategoria_ogloszenie_ogloszenie_id_foreign` FOREIGN KEY (`ogloszenie_id`) REFERENCES `ogloszenia` (`id`) ON DELETE CASCADE;

--
-- Ograniczenia dla tabeli `modele`
--
ALTER TABLE `modele`
  ADD CONSTRAINT `modele_marka_id_foreign` FOREIGN KEY (`marka_id`) REFERENCES `marki` (`id`);

--
-- Ograniczenia dla tabeli `ogloszenia`
--
ALTER TABLE `ogloszenia`
  ADD CONSTRAINT `ogloszenia_uzytkownik_id_foreign` FOREIGN KEY (`uzytkownik_id`) REFERENCES `users` (`id`);

--
-- Ograniczenia dla tabeli `ulubione`
--
ALTER TABLE `ulubione`
  ADD CONSTRAINT `ulubione_ogloszenie_id_foreign` FOREIGN KEY (`ogloszenie_id`) REFERENCES `ogloszenia` (`id`),
  ADD CONSTRAINT `ulubione_uzytkownik_id_foreign` FOREIGN KEY (`uzytkownik_id`) REFERENCES `users` (`id`);

--
-- Ograniczenia dla tabeli `zdjecia`
--
ALTER TABLE `zdjecia`
  ADD CONSTRAINT `zdjecia_ogloszenie_id_foreign` FOREIGN KEY (`ogloszenie_id`) REFERENCES `ogloszenia` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
