-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Dec 06, 2025 at 09:43 PM
-- Wersja serwera: 8.0.44
-- Wersja PHP: 8.3.26

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
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('autotablica-cache-6e49a48b7049b5d2a11287848435e0b8', 'i:1;', 1765024855),
('autotablica-cache-6e49a48b7049b5d2a11287848435e0b8:timer', 'i:1765024855;', 1765024855),
('autotablica-cache-c3bd0d9f9eab234c804f2b9cad1e8a30', 'i:1;', 1765022460),
('autotablica-cache-c3bd0d9f9eab234c804f2b9cad1e8a30:timer', 'i:1765022460;', 1765022460),
('autotablica-cache-d2bfa8e8b749d2772a21edee7b70a2b3', 'i:4;', 1765024855),
('autotablica-cache-d2bfa8e8b749d2772a21edee7b70a2b3:timer', 'i:1765024855;', 1765024855);
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('autotablica-cache-slowniki_marki', 'O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:66:{i:0;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:1;s:5:\"nazwa\";s:6:\"Abarth\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:1;s:5:\"nazwa\";s:6:\"Abarth\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:1;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:59;s:5:\"nazwa\";s:6:\"Aiways\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:59;s:5:\"nazwa\";s:6:\"Aiways\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:2;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:2;s:5:\"nazwa\";s:10:\"Alfa Romeo\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:2;s:5:\"nazwa\";s:10:\"Alfa Romeo\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:3;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:3;s:5:\"nazwa\";s:6:\"Alpine\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:3;s:5:\"nazwa\";s:6:\"Alpine\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:4;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:4;s:5:\"nazwa\";s:4:\"Audi\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:4;s:5:\"nazwa\";s:4:\"Audi\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:5;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:5;s:5:\"nazwa\";s:7:\"Bentley\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:5;s:5:\"nazwa\";s:7:\"Bentley\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:6;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:6;s:5:\"nazwa\";s:3:\"BMW\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:6;s:5:\"nazwa\";s:3:\"BMW\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:7;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:60;s:5:\"nazwa\";s:3:\"BYD\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:60;s:5:\"nazwa\";s:3:\"BYD\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:8;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:7;s:5:\"nazwa\";s:8:\"Cadillac\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:7;s:5:\"nazwa\";s:8:\"Cadillac\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:9;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:8;s:5:\"nazwa\";s:9:\"Chevrolet\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:8;s:5:\"nazwa\";s:9:\"Chevrolet\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:10;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:9;s:5:\"nazwa\";s:8:\"Chrysler\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:9;s:5:\"nazwa\";s:8:\"Chrysler\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:11;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:10;s:5:\"nazwa\";s:8:\"Citroën\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:10;s:5:\"nazwa\";s:8:\"Citroën\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:12;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:11;s:5:\"nazwa\";s:5:\"Cupra\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:11;s:5:\"nazwa\";s:5:\"Cupra\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:13;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:12;s:5:\"nazwa\";s:5:\"Dacia\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:12;s:5:\"nazwa\";s:5:\"Dacia\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:14;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:13;s:5:\"nazwa\";s:6:\"Daewoo\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:13;s:5:\"nazwa\";s:6:\"Daewoo\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:15;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:14;s:5:\"nazwa\";s:8:\"Daihatsu\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:14;s:5:\"nazwa\";s:8:\"Daihatsu\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:16;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:61;s:5:\"nazwa\";s:4:\"DFSK\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:61;s:5:\"nazwa\";s:4:\"DFSK\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:17;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:15;s:5:\"nazwa\";s:5:\"Dodge\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:15;s:5:\"nazwa\";s:5:\"Dodge\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:18;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:16;s:5:\"nazwa\";s:14:\"DS Automobiles\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:16;s:5:\"nazwa\";s:14:\"DS Automobiles\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:19;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:17;s:5:\"nazwa\";s:7:\"Ferrari\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:17;s:5:\"nazwa\";s:7:\"Ferrari\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:20;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:18;s:5:\"nazwa\";s:4:\"Fiat\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:18;s:5:\"nazwa\";s:4:\"Fiat\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:21;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:19;s:5:\"nazwa\";s:4:\"Ford\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:19;s:5:\"nazwa\";s:4:\"Ford\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:22;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:66;s:5:\"nazwa\";s:20:\"Great Wall (WEY/ORA)\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:66;s:5:\"nazwa\";s:20:\"Great Wall (WEY/ORA)\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:23;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:20;s:5:\"nazwa\";s:5:\"Honda\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:20;s:5:\"nazwa\";s:5:\"Honda\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:24;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:21;s:5:\"nazwa\";s:7:\"Hyundai\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:21;s:5:\"nazwa\";s:7:\"Hyundai\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:25;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:22;s:5:\"nazwa\";s:8:\"Infiniti\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:22;s:5:\"nazwa\";s:8:\"Infiniti\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:26;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:23;s:5:\"nazwa\";s:5:\"Isuzu\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:23;s:5:\"nazwa\";s:5:\"Isuzu\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:27;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:24;s:5:\"nazwa\";s:6:\"Jaguar\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:24;s:5:\"nazwa\";s:6:\"Jaguar\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:28;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:25;s:5:\"nazwa\";s:4:\"Jeep\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:25;s:5:\"nazwa\";s:4:\"Jeep\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:29;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:26;s:5:\"nazwa\";s:3:\"Kia\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:26;s:5:\"nazwa\";s:3:\"Kia\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:30;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:27;s:5:\"nazwa\";s:4:\"Lada\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:27;s:5:\"nazwa\";s:4:\"Lada\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:31;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:28;s:5:\"nazwa\";s:11:\"Lamborghini\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:28;s:5:\"nazwa\";s:11:\"Lamborghini\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:32;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:29;s:5:\"nazwa\";s:6:\"Lancia\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:29;s:5:\"nazwa\";s:6:\"Lancia\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:33;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:30;s:5:\"nazwa\";s:10:\"Land Rover\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:30;s:5:\"nazwa\";s:10:\"Land Rover\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:34;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:31;s:5:\"nazwa\";s:5:\"Lexus\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:31;s:5:\"nazwa\";s:5:\"Lexus\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:35;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:32;s:5:\"nazwa\";s:5:\"Lotus\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:32;s:5:\"nazwa\";s:5:\"Lotus\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:36;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:62;s:5:\"nazwa\";s:9:\"Lynk & Co\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:62;s:5:\"nazwa\";s:9:\"Lynk & Co\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:37;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:33;s:5:\"nazwa\";s:8:\"Maserati\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:33;s:5:\"nazwa\";s:8:\"Maserati\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:38;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:34;s:5:\"nazwa\";s:5:\"Mazda\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:34;s:5:\"nazwa\";s:5:\"Mazda\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:39;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:35;s:5:\"nazwa\";s:7:\"McLaren\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:35;s:5:\"nazwa\";s:7:\"McLaren\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:40;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:36;s:5:\"nazwa\";s:13:\"Mercedes-Benz\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:36;s:5:\"nazwa\";s:13:\"Mercedes-Benz\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:41;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:37;s:5:\"nazwa\";s:2:\"MG\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:37;s:5:\"nazwa\";s:2:\"MG\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:42;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:38;s:5:\"nazwa\";s:4:\"Mini\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:38;s:5:\"nazwa\";s:4:\"Mini\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:43;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:39;s:5:\"nazwa\";s:10:\"Mitsubishi\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:39;s:5:\"nazwa\";s:10:\"Mitsubishi\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:44;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:63;s:5:\"nazwa\";s:3:\"NIO\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:63;s:5:\"nazwa\";s:3:\"NIO\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:45;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:40;s:5:\"nazwa\";s:6:\"Nissan\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:40;s:5:\"nazwa\";s:6:\"Nissan\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:46;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:41;s:5:\"nazwa\";s:4:\"Opel\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:41;s:5:\"nazwa\";s:4:\"Opel\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:47;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:42;s:5:\"nazwa\";s:7:\"Peugeot\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:42;s:5:\"nazwa\";s:7:\"Peugeot\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:48;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:43;s:5:\"nazwa\";s:8:\"Polestar\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:43;s:5:\"nazwa\";s:8:\"Polestar\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:49;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:44;s:5:\"nazwa\";s:7:\"Porsche\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:44;s:5:\"nazwa\";s:7:\"Porsche\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:50;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:45;s:5:\"nazwa\";s:7:\"Renault\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:45;s:5:\"nazwa\";s:7:\"Renault\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:51;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:46;s:5:\"nazwa\";s:11:\"Rolls-Royce\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:46;s:5:\"nazwa\";s:11:\"Rolls-Royce\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:52;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:47;s:5:\"nazwa\";s:5:\"Rover\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:47;s:5:\"nazwa\";s:5:\"Rover\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:53;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:48;s:5:\"nazwa\";s:4:\"Saab\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:48;s:5:\"nazwa\";s:4:\"Saab\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:54;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:49;s:5:\"nazwa\";s:4:\"Seat\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:49;s:5:\"nazwa\";s:4:\"Seat\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:55;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:64;s:5:\"nazwa\";s:5:\"Seres\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:64;s:5:\"nazwa\";s:5:\"Seres\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:56;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:50;s:5:\"nazwa\";s:6:\"Škoda\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:50;s:5:\"nazwa\";s:6:\"Škoda\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:57;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:51;s:5:\"nazwa\";s:5:\"Smart\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:51;s:5:\"nazwa\";s:5:\"Smart\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:58;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:52;s:5:\"nazwa\";s:9:\"SsangYong\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:52;s:5:\"nazwa\";s:9:\"SsangYong\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:59;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:53;s:5:\"nazwa\";s:6:\"Subaru\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:53;s:5:\"nazwa\";s:6:\"Subaru\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:60;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:54;s:5:\"nazwa\";s:6:\"Suzuki\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:54;s:5:\"nazwa\";s:6:\"Suzuki\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:61;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:55;s:5:\"nazwa\";s:5:\"Tesla\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:55;s:5:\"nazwa\";s:5:\"Tesla\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:62;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:56;s:5:\"nazwa\";s:6:\"Toyota\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:56;s:5:\"nazwa\";s:6:\"Toyota\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:63;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:57;s:5:\"nazwa\";s:10:\"Volkswagen\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:57;s:5:\"nazwa\";s:10:\"Volkswagen\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:64;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:58;s:5:\"nazwa\";s:5:\"Volvo\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:58;s:5:\"nazwa\";s:5:\"Volvo\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:65;O:16:\"App\\Models\\Marka\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:5:\"marki\";s:13:\"\0*\0primaryKey\";s:2:\"id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:2:\"id\";i:65;s:5:\"nazwa\";s:5:\"XPeng\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:11:\"\0*\0original\";a:4:{s:2:\"id\";i:65;s:5:\"nazwa\";s:5:\"XPeng\";s:10:\"created_at\";N;s:10:\"updated_at\";N;}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:0:{}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:1:{i:0;s:5:\"nazwa\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}', 1765025395);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
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
  `nazwa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `marki`
--

CREATE TABLE `marki` (
  `id` bigint UNSIGNED NOT NULL,
  `nazwa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `marki`
--

INSERT INTO `marki` (`id`, `nazwa`, `created_at`, `updated_at`) VALUES
(1, 'Abarth', NULL, NULL),
(2, 'Alfa Romeo', NULL, NULL),
(3, 'Alpine', NULL, NULL),
(4, 'Audi', NULL, NULL),
(5, 'Bentley', NULL, NULL),
(6, 'BMW', NULL, NULL),
(7, 'Cadillac', NULL, NULL),
(8, 'Chevrolet', NULL, NULL),
(9, 'Chrysler', NULL, NULL),
(10, 'Citroën', NULL, NULL),
(11, 'Cupra', NULL, NULL),
(12, 'Dacia', NULL, NULL),
(13, 'Daewoo', NULL, NULL),
(14, 'Daihatsu', NULL, NULL),
(15, 'Dodge', NULL, NULL),
(16, 'DS Automobiles', NULL, NULL),
(17, 'Ferrari', NULL, NULL),
(18, 'Fiat', NULL, NULL),
(19, 'Ford', NULL, NULL),
(20, 'Honda', NULL, NULL),
(21, 'Hyundai', NULL, NULL),
(22, 'Infiniti', NULL, NULL),
(23, 'Isuzu', NULL, NULL),
(24, 'Jaguar', NULL, NULL),
(25, 'Jeep', NULL, NULL),
(26, 'Kia', NULL, NULL),
(27, 'Lada', NULL, NULL),
(28, 'Lamborghini', NULL, NULL),
(29, 'Lancia', NULL, NULL),
(30, 'Land Rover', NULL, NULL),
(31, 'Lexus', NULL, NULL),
(32, 'Lotus', NULL, NULL),
(33, 'Maserati', NULL, NULL),
(34, 'Mazda', NULL, NULL),
(35, 'McLaren', NULL, NULL),
(36, 'Mercedes-Benz', NULL, NULL),
(37, 'MG', NULL, NULL),
(38, 'Mini', NULL, NULL),
(39, 'Mitsubishi', NULL, NULL),
(40, 'Nissan', NULL, NULL),
(41, 'Opel', NULL, NULL),
(42, 'Peugeot', NULL, NULL),
(43, 'Polestar', NULL, NULL),
(44, 'Porsche', NULL, NULL),
(45, 'Renault', NULL, NULL),
(46, 'Rolls-Royce', NULL, NULL),
(47, 'Rover', NULL, NULL),
(48, 'Saab', NULL, NULL),
(49, 'Seat', NULL, NULL),
(50, 'Škoda', NULL, NULL),
(51, 'Smart', NULL, NULL),
(52, 'SsangYong', NULL, NULL),
(53, 'Subaru', NULL, NULL),
(54, 'Suzuki', NULL, NULL),
(55, 'Tesla', NULL, NULL),
(56, 'Toyota', NULL, NULL),
(57, 'Volkswagen', NULL, NULL),
(58, 'Volvo', NULL, NULL),
(59, 'Aiways', NULL, NULL),
(60, 'BYD', NULL, NULL),
(61, 'DFSK', NULL, NULL),
(62, 'Lynk & Co', NULL, NULL),
(63, 'NIO', NULL, NULL),
(64, 'Seres', NULL, NULL),
(65, 'XPeng', NULL, NULL),
(66, 'Great Wall (WEY/ORA)', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
(10, '2025_10_09_180659_create_ulubione_table', 8),
(11, '2025_10_16_133003_create_personal_access_tokens_table', 9);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `modele`
--

CREATE TABLE `modele` (
  `id` bigint UNSIGNED NOT NULL,
  `marka_id` bigint UNSIGNED NOT NULL,
  `nazwa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `tytul` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `opis` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cena` decimal(10,2) NOT NULL,
  `marka_id` int UNSIGNED NOT NULL,
  `model_id` int UNSIGNED NOT NULL,
  `vin` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `numer_rejestracyjny` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_pierwszej_rej` date NOT NULL,
  `przebieg` int NOT NULL,
  `rodzaj_paliwa` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `skrzynia_biegow` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pojemnosc_silnika` decimal(5,2) NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
(7, 1, 'Ford Focus 1.5 EcoBoost', 'Rok 2019, silnik benzynowy, przebieg 45000 km, sportowy pakiet.', 63000.00, 5, 9, 'WF0GPXEEGPE123456', 'KR33333', '2019-09-05', 45000, 'Benzyna', 'Manualna', 1.50, 'aktywne', '2025-10-09 20:26:45', '2025-10-09 20:26:45'),
(8, 1, 'Audi A4 2.0 TDI Quattro', 'Zadbany sedan z napędem quattro, pełna historia serwisowa.', 84900.00, 1, 101, 'WAUZZZ8K4EA123456', 'PO1A4TDI', '2019-03-18', 86500, 'diesel', 'automatyczna', 2.00, 'aktywny', '2025-09-01 09:10:00', '2025-09-01 09:10:00'),
(9, 2, 'BMW 320d Sport Line', 'Dynamiczny diesel, świeżo po wymianie oleju i filtrów.', 91800.00, 2, 201, 'WBA3A5G57FNR12345', 'WA3BMW20', '2020-01-22', 74200, 'diesel', 'automatyczna', 2.00, 'aktywny', '2025-09-02 10:05:00', '2025-09-02 10:05:00'),
(10, 1, 'Toyota Corolla 1.8 Hybrid Comfort', 'Hybryda idealna do miasta, niski przebieg.', 96500.00, 3, 301, 'JTNB23HK9K3123456', 'PO2COL18', '2021-06-11', 44500, 'hybryda', 'automatyczna', 1.80, 'aktywny', '2025-09-03 11:40:00', '2025-09-03 11:40:00'),
(11, 3, 'Skoda Octavia 1.5 TSI Style', 'Bogate wyposażenie, pierwszy właściciel.', 79900.00, 6, 601, 'TMBJG7NE1L0123456', 'KR2OCT15', '2020-09-07', 60200, 'benzyna', 'manualna', 1.50, 'aktywny', '2025-09-04 08:55:00', '2025-09-04 08:55:00'),
(12, 4, 'Tesla Model 3 Long Range AWD', 'Auto elektryczne z pakietem Full Self Driving.', 182500.00, 4, 401, '5YJ3E1EB5MF123456', 'WW1TESLR', '2022-02-14', 28500, 'elektryczny', 'automatyczna', 0.00, 'aktywny', '2025-09-05 13:30:00', '2025-09-05 13:30:00'),
(13, 2, 'Hyundai Tucson 1.6 T-GDI 4WD', 'SUV z napędem 4x4, komplet opon.', 112900.00, 5, 501, 'KMHJB81DLNU123456', 'GD1TUC16', '2021-05-24', 51200, 'benzyna', 'automatyczna', 1.60, 'aktywny', '2025-09-06 15:20:00', '2025-09-06 15:20:00'),
(14, 3, 'Volkswagen Golf 1.5 TSI R-Line', 'Wersja R-Line, bogate wyposażenie, pierwszy właściciel.', 87900.00, 9, 901, 'WVWZZZCDZMW123456', 'PO3GOLF1', '2020-08-19', 55800, 'benzyna', 'manualna', 1.50, 'aktywny', '2025-09-07 16:45:00', '2025-09-07 16:45:00'),
(15, 1, 'Mercedes C200 4MATIC Avantgarde', 'Napęd 4MATIC, salon Polska.', 154500.00, 10, 1001, 'WDD2050831F123456', 'WA4C200M', '2021-11-30', 38900, 'benzyna', 'automatyczna', 2.00, 'aktywny', '2025-09-08 09:35:00', '2025-09-08 09:35:00'),
(16, 4, 'Volvo XC60 B4 AWD Momentum', 'Mild hybrid, pakiet Winter.', 168900.00, 7, 701, 'YV1UZBLVDM1123456', 'KR3XC60B', '2022-04-02', 31200, 'hybryda', 'automatyczna', 2.00, 'aktywny', '2025-09-09 10:50:00', '2025-09-09 10:50:00'),
(17, 2, 'Kia Sportage 1.6 T-GDi GT Line', 'Topowa wersja, gwarancja producenta.', 128400.00, 8, 801, 'U5YPC81DCL8123456', 'GD2SPTG1', '2021-12-18', 48200, 'benzyna', 'automatyczna', 1.60, 'aktywny', '2025-09-10 12:15:00', '2025-09-10 12:15:00'),
(18, 1, 'BMW i3 120Ah Lodge', 'Elektryk z dużym akumulatorem, oryginalne ładowarki.', 117500.00, 2, 202, 'WBY8P6C54L7R12345', 'PO4BMWI3', '2020-10-05', 36500, 'elektryczny', 'automatyczna', 0.00, 'aktywny', '2025-09-11 09:05:00', '2025-09-11 09:05:00'),
(19, 2, 'Toyota RAV4 Plug-in Hybrid', 'Plug-in, zasięg EV do 75 km.', 215900.00, 3, 302, 'JTMGB3FV4N5123456', 'WA5RAVPH', '2022-07-13', 22800, 'hybryda', 'automatyczna', 2.50, 'aktywny', '2025-09-12 11:45:00', '2025-09-12 11:45:00'),
(20, 3, 'Audi Q5 45 TFSI quattro', 'Pakiet S line, matrycowe reflektory.', 189900.00, 1, 102, 'WAUZZZFY6M2123456', 'KR4Q5TFS', '2021-09-29', 40100, 'benzyna', 'automatyczna', 2.00, 'aktywny', '2025-09-13 08:20:00', '2025-09-13 08:20:00'),
(21, 4, 'Skoda Superb 2.0 TDI L&K', 'Topowa wersja Laurin & Klement, świetna kondycja.', 132700.00, 6, 602, 'TMBJG9NP6M7123456', 'WW2SUP20', '2021-04-21', 58800, 'diesel', 'automatyczna', 2.00, 'aktywny', '2025-09-14 10:25:00', '2025-09-14 10:25:00'),
(22, 1, 'Volkswagen Passat 2.0 TDI Elegance', 'Salon PL, adaptacyjny tempomat, fotele ergoComfort.', 124900.00, 9, 902, 'WVWZZZ3CZME123456', 'PO5PASSA', '2019-11-08', 79200, 'diesel', 'automatyczna', 2.00, 'aktywny', '2025-09-15 13:50:00', '2025-09-15 13:50:00'),
(23, 2, 'Hyundai Ioniq 5 AWD Ultimate', 'Ładowanie 350 kW, pakiet Vision Roof.', 199500.00, 5, 502, 'KMHGH4JAFMU123456', 'GD3IONIQ', '2022-03-17', 25400, 'elektryczny', 'automatyczna', 0.00, 'aktywny', '2025-09-16 15:05:00', '2025-09-16 15:05:00'),
(24, 3, 'Kia Ceed 1.4 T-GDi Business', 'Serwisowana, gwarancja do 2027 r.', 76500.00, 8, 802, 'U5YPC51AACL123456', 'KR5CEED1', '2019-04-04', 83500, 'benzyna', 'manualna', 1.40, 'aktywny', '2025-09-17 09:55:00', '2025-09-17 09:55:00'),
(25, 4, 'Mercedes GLC 300e 4MATIC', 'Plug-in hybrid, pneumatyczne zawieszenie.', 236900.00, 10, 1002, 'W1N0G5DB3PF123456', 'WW3GLC30', '2023-01-26', 18200, 'hybryda', 'automatyczna', 2.00, 'aktywny', '2025-09-18 08:35:00', '2025-09-18 08:35:00'),
(26, 1, 'Volvo V60 T6 AWD Recharge', 'Kombi plug-in, pakiet Inscription.', 178400.00, 7, 702, 'YV1ZWBFVDM2123456', 'PO6V60PH', '2021-08-30', 34800, 'hybryda', 'automatyczna', 2.00, 'aktywny', '2025-09-19 12:10:00', '2025-09-19 12:10:00'),
(27, 2, 'Toyota Yaris 1.5 Hybrid City', 'Miejska hybryda, zużycie 4 l/100 km.', 79500.00, 3, 303, 'VNKKL3D39P0123456', 'WA6YAR15', '2022-10-07', 22300, 'hybryda', 'automatyczna', 1.50, 'aktywny', '2025-09-20 14:20:00', '2025-09-20 14:20:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'frontend', '660b2cb11ea227e9fd0f3e233f64618541bc4044fd3adc2684d409994113076a', '[\"*\"]', NULL, NULL, '2025-10-16 14:09:18', '2025-10-16 14:09:18'),
(8, 'App\\Models\\User', 3, 'frontend', 'a93d2b7361667739dff1e6613b488a77f9ab25c07f4e43088713847097e110ab', '[\"*\"]', '2025-10-16 17:00:31', NULL, '2025-10-16 16:39:31', '2025-10-16 17:00:31'),
(9, 'App\\Models\\User', 5, 'api-token', '93a9b07b8082964197d7627cb8a311d032938bf6e39fff7f2171fb534ff3c105', '[\"*\"]', NULL, NULL, '2025-12-06 11:11:00', '2025-12-06 11:11:00'),
(11, 'App\\Models\\User', 3, 'frontend', '5ac89bac51a6d3c740f5bdc275251d72498cab6ecd19bcffd8aa24ae00b924e8', '[\"*\"]', '2025-12-06 12:39:55', NULL, '2025-12-06 12:00:00', '2025-12-06 12:39:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2ld6uy25iM8Gp8B1pp2R4bpZmVyuFXb3xyALvjHI', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV2ZaaHZYWnNmRDBuQlFqeFNYUGlTcmdKQ3AwcEpiMjBrTUVORGVnWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041763),
('2nRXb9XWxMuXonniqYDU3YesmKZ8wvPqa96MFPAC', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ1F4YzBYbXZuUTRXZnlibERmVHpNM0lSeTJLTjVpZHRiUnhnNFFvSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287479),
('3PcD6rq733HyEsivpzfEZXY48Iok206NQf6KgJky', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOUtON1NNU05EUmlGNng4UkNNbTRlMW81eWg3WFRxN1lEUE9hdUNzdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288388),
('3pGHDhXYbjeYh76StEixb6zNhOb1HeFzEemcheBS', NULL, '172.19.0.1', 'PostmanRuntime/7.43.2', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZXF6d2Y4TFlvVTlPWUJjZTV5SzNwVzhhcUxHQVIwaHVld1NXZGJvRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043816),
('4KltLp2zd67a8rAlFV5KtWBWrH5mK23awUD72pOD', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2ZuaWVhU2xRQkVxcUppR2h4R21KNExrblBiOGNOSFpLN2d3RUx4SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041556),
('5kCbA0yMKFrpt1NZGPzOBEqQVmOcducphLf0nkYS', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmJJaUtHNk5LUTRURFJCM3BDeE5nQnBCOERSRXowSzBEOTlicTNIdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041554),
('8ZGJQsUJK6IWdrN2v5dR1HKb6dc4JwUSpgTyIlGH', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSGNyS3o5OXFPVFhudERZblcyeFJqTk5QS0pYQXdtRmZsTElSaU10SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041774),
('9FZ8zDDQjtIY7i6sLbZUpHfl4sN8zIEkFgmqye2e', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT01RNUhXcDRCMzNtTkpyN0ZsN3pZS2xJV0NCYlBldjFyT3V1a3k1ciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287952),
('9Ph2WKqC0bhygwVs0pCSaiZFEP7NAFsLF4A5sCsz', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieHA4bklBNExTTHg4MVpoaXc5d2dGSkY2YmF6WkJqcGtOWjVqS0xobCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288404),
('AAnLAv8tVBlMFJUNWHAo6NGAFSCfL3xkFcPYBYdJ', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ1V6eEV3WHNRRHI3N1Y5M09XS2o5OXc5YjVoNFBUajdIREhyNTlGdyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287935),
('AiJFVh53zN9yiHwp3Qe7H3TZ7xdaIfrSK8SWHfXm', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidmxrMmpCc0lwYmJHWmFZY3ZnbVQzRXlGSjk1cjhxQTNwNXVITzBSayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287474),
('bBnnhb5B8imYzxEHRkrFedZSKn713Rc8OLeMz1zN', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUzh0bmtjd2JkRHVCakhDck5qS0VtamV0dHdHNmllNmUwVEhsbXVtdyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760207615),
('bbs9OUNCdZykNh7vrUYkhiCxuDwl68sMQ3YUvbdI', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYnZKSDNheEhpVEVjNElUcjkwYng5MnFGMEZGWWFaOEh3QzR2Q2U4cSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287451),
('Bh1scNDzEZkk9RSz8ij81cOYc0G7aqPlnXLoDCYS', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieGE3YmNIVzlKM2lCRHRkaHV1T1NYekNDcE5LWkNjUUh6QTIwY0duMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287963),
('Ca0JBxehQ3UiDu9U9nFpt5e6syrkczHMEYTfiY47', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYVVKaWZBSGYxb0ozMXF5MHNGM2lYRVJpRWN4b3dVNnRpR3RmSXFBbiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288071),
('cFkUW6D8v57Irbb4QEufTZcNY1JHKajuii11wJDb', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNUZFdWVhRjM0U25LWEhPMEpMWFA4bUdmV0JmeExQbXM5b2dQWEFUUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287935),
('d5G0Dncarb5aXh02TzxQ7WNzmkhMxw3OM2fhlPGa', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRE81UmxKRk5NVVNWbjZmT3dWWmZhOUdyV3o1N0d6ZjNRTTVNOWZqbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287933),
('dOwawYNPbnRe0pcrprLJM9tpNH1PrQzKDXtdN8oK', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSWw4OTdiVEd3RjVRaDNTU0Zsa0VxRlFnbFF5Wk81ZHBKa1dSTERGMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041851),
('ea1aikFCrizcVqwskE4RNPjNLqHbTxwsqJ2RE4Kj', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidHNzY2ZNbzVkZXhNd3ROS3JKa2VCamdIaDl1ZmdSUndSN1V1TEtqVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287961),
('EHp7Y929qVAeTvnbKHrFBEOhdQtSTRXmcjZdRbbF', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibHlveG40QjcwRGFZbG1lTnBIcUEyd1Zuend1VEp0R2Zqb0FTMWpMVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288402),
('EjtYa0rqgywB5HdQ8fEyhLJ8bOL1qZ6xDHfJ3Net', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia3NoazZvclE3ajhOc21PREV3dVFBMHdYTHZGVkNXdXJhbkhpYXBVMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043809),
('eQG9hsR8tMnF5T5IeKfqwKeN7mxHSwAg48ZPWOIO', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieGpQQVFONk8xV0FKdFVvelRiOTc1ZTZ2OGc1UlNWQVZINlZwSkVveCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760112569),
('eVY6oyWw4GGiOu1bahLXNW4cgDpZc4NELO9wVFfe', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN2JuZXJ4YjBBWmZqQnJlanlZZlNwb0pMbkZQUWFRanR4MVVOVElTaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041774),
('fGzI6xY2YNCbUbyST1WiwbPRA9GYF25NptcHSiIg', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieEd3SXlsSm5zVUZtQUhmQ3BqNUpnV2RLRUhjMXRCYnFONnhjbDZWZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288407),
('GaTf6AH0dSa9FznjgIvat1jNqueKXUZSa2YoLbXF', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicjltRmVYZnNGRHo4cmltdFE1TUhvM0FpV2l6MlVuVWRFSE5zb0tNdyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288408),
('GG80U6WxAuhNnfim2wUJiTgXTAbUcAxfomts9TST', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWE9CcVR4Y2pKTTAxZXpRRzhta0VMVXp4TUV4R25NaFpLWmNVMzN2NiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288382),
('gGTnMvSkmhuKyuN08TV3c3IqVUDrbRwUhkrKX6UG', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQWVYYno2NnJDTUFSTk1DRkR0b3JpcUxZRXplaWU0M2tlbmhYMm1CMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288385),
('gWE4JHSWM5DhfCuo2RS71OlvamuAShP6prHvl2aY', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWnlUZks0Rkx2NW5xM09oQXhZZEVjaGZDVVB1THU2ZUZQZTRId21CTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760207670),
('h1hPbDdsKkdCkQzsbirxvAvy7Pmo8vwegP9UCtYn', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiek1OQWRVQWNJeGVkUnpSS0dYRzlBVGlhejdpcU1uem8yTW9DVThTRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288148),
('H3UBI6Z1kpa98zYefWfBJ2i5VswcdqGZfB1sg8R9', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaHh5aGtjc0YwUzFXNk1rQXVWQjZkMjRCVEFlOFU0VXJpVUxYR002bCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041040),
('hB4CzupzlAsaOXnZyQDWNTGw2Q1m4AFSODUILp8j', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieEM5T1M2U2s1bEFXSmZRZk5PMlRkbWZBWDdYVDJpbHZJSFJIMzM4dSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760207672),
('hCvgXR6Im2Bu0JxkZMLszgRkVJQvXIyGJGAl2o1t', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0lFdWlUMUt6eVFZUWthcW8wdTRlQTNKZmlSMTZ6b3JnTUpUR3Q3ayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043804),
('hKSUetusgYrgZP8aMBIOzdKwazMwHGBFJGeouzpK', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib01TUlpiRGQ1aXI5NEtHUk9DRG1IOFVMVzZKaTlqbXhLbEV1RW5pRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288076),
('IftR8M4phC42hFSwSsQ4hO1RSxVHU1NeuFMY4vrY', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSHVaRGs2bUZ6TkhBOGlQS0J4QzJ4UE9oSm4xSzV6akVtM2RCNmpQeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288155),
('JdrRaM7ehPApeh2um8SXAtFD9WlCTCYRavEb1qm8', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaXh0bjFJRTdQWlVOWGJUNUV5dkRKbVhSNnRpWDFUeWlLcnk3dVZ5MyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041043),
('kLf3w7ExzQ5fxVISICgZ8GAdm1bbhyEEelcdfqsB', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidmdWWE5mS3E3aFRWVVNLanI3ODVwRjZjNEVieDVIV1czZ0xodWRCQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288068),
('KPIbJLljYUnMj2vxuzLN8VyZ568NziU0PGGf4Vju', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib0QwQ29RU3g2VWs2NTZSald4azUxUHhtb0R5d2VKV1l1VVcxdVNYdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043804),
('kUNgPOxCpFeoV0VSXplH8mqB4JwA8iBIpjPdQepF', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRVpnZnBlVmtOdkNrRVRnV3B6bXgyczNmR25HSzF1OUVLZkNsM2NaYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041668),
('l99RWj1SXMWm6f3J3rlmVsJcbCZrT0S1L7KYHEqJ', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU09pSFNRZ05jTEVjR2swaG83VlQ3Z1p3Zjc0bjRNMEhlYVJobzVzWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288368),
('Lio7M31wI0lZLepVVXgHyHPoZP90OgnkeRLz7qQ3', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR3R1QWU2ejN5bmZXeFV4S3IzTUg2cTRSNEFZalQ5Tjdnb1ZjZGFKbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288071),
('lIRdKiTw3w66oukZrnyUhrpn6piNCl65YgVmIL0h', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicEkweWx5aDh6VFFjbTZ6SWVKcWdKTThiNmpzdVFFUGNPOGdqTlJUZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288413),
('LWOMJkkZJj75woHtms4dUO1KrcGuVb6W9WwamgY1', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTTdCTmRmTEh0Q3dTblQ4S0pUMnRhamZMRlpLdE02NUZGcUJwZGY0ayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287936),
('m6BhoiGsOzluszWWVfMkwMIBAagrN0ROOkolTNMJ', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidjczajhwM21kWWVMWTE2VFVIUzFrU0M1ZWQyNGtaaktkT3E4Q3FCUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287454),
('mRYe2oQ7tXniq4SLoJMW3nPvbbA5tEpFxIu4BQcp', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMUE5MWdZS21QaFJnaVhzOU8wc2poaVBQeXdzdUY2dlk5bVRyTG5VaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287476),
('NGrzPcklUS6N91r3S146UzT7LtK1Uh0EqYpNaEz3', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRTdSeDdaaXZjNU01SWE1SzNNc1FtVDZjV1JydDRWa1B0SExTRFNTbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287479),
('Npz2A3THzCoGeVP1aGKTe1rZkw9ng0nIFFJ2yVeL', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMERhbzFyaVBoT2tVQm1kbTJTU2JIYk9NRllTdnh3YkhqenJtMHY2NiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288379),
('NyIeE7QwDC38b3SkRtP46vWkd87orlYfA93DNBFj', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM1ZNUU5iMUxpa25qbjJPaGpyb0R1WnF1aUpJd3B6VGNIOFF3anRURiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041849),
('OFiNxTZgSwkRdyymZUIt0Rt1TpwX2AilzF6WsWr3', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVGwzNGZJWXU2clI0QnA5OElBR241N0p3bUFmSHpSSWRYTUFzOW1GOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043792),
('oiMWH94M7GGfZF6xItggZk2K8eENpvzerdX1crvy', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicGVlZ2thUE55b3J3TFlGRHR4RlZuUXBNZnZHUjRLcmtyczM2R3ZrRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043044),
('OK5kLD8WjCJWDwUYevWJyBYo0a1UDiB1kp5hx6hj', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRUtnSFBhcXpyaDAxVEtXQnVmSnJyQ01COUQxN2F6azhnOWNQT25FbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288148),
('ON6SFk8cwNqO0PFTyQkkYNNJ9MP9GMgtsnZXrIl6', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibVo3SGtvRm1jS21YQWw2QmtZMHRhTjBrZDBqNHN1UXRBbkVZMFFyaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041022),
('oyzrOBEcMUGjXVjPucBRjQULu68AKlbeho4JHk1b', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTHRreXNnRVJHMFplZE5BS2NOd2p6Y1pQNlFscUhidlZnVFhzWmRsOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760113989),
('pfJu8mrjVmBxUYrKRNiTZ56zaTttuLqG0kU4RuSk', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2JzandjMkpja3ZBQUpZWkNxZnJXSFRGdkdyT0lhTEZWUzY2MllFaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288416),
('pJJrv9OwKPa1UD8vizhi3Q1W8xHTcFxUIgZC6kOl', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNXAyOUt0RFgwbzNCNk5jcHNwcElDNlVBV3E4eDBUNFhxWllPMjFHRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043685),
('pKkfmj8CwGA6b4bXpB3fxtTDKOIaQdSsNRicvEjN', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUFZXT0lieGJsNmMzd3BXaW5mUUpDYjNEYUt3RmxmZ2VVbkhFaHRPYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287951),
('pPwja4iv7mR3mnEks1vINLQeCXtOuZ17Bbw65nCZ', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWUpZM0xmUzdCQWdnMGl2YkE5YmY0OERRNVp3aEY3ckRtcE1iWkdqTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760207655),
('PtXH8fPZmJLkxsvcqWbhfPow6RZBESIcpwfndR3a', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSzdXVzlocUVqQWx5NzkzZGNQODg2a0FmdHRpdUVtN2JhZlJ5SGpIcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288148),
('qcA5UIedEdQahrQmUxIddYXVPk5OPZ5sLxYHgLcb', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYlRpNEJCbE1pTndOM0lMYXVHazJEQjZqdHowZG9oMDFCYWhFTHJUayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288137),
('R5IT0Yw4ConxmLuLFUfIS74WLHZcl0J3LaXtZAKX', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY0tONHVuRHdVcWtVRWhTNUJqaGs5QkR3dlE1Y3MwVkhJNkk0VDhFRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760207653),
('rJe1XcNtVAI8gRFSkDCKVPMuhLwmfieuyHwnVjmT', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUXc2NmdvZDlDem9JVEl6czc5YXRNUW5DZDd2bENJMUFHM0swRFA0ayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760112571),
('rytZYyWkIudp3oGuiA6FoHJ3e4YLd82VvHyGR1Fr', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ3ozZU9CVG9qSzBGNUVJdWlNeG5mY3BGcVVtNUFlSzNnSTJGcENHbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287963),
('S0MHhxhPWCyz4Utp0NNb4qPX6fwAtQ29G6oPxLQM', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWXdVSjZZTXJQNVZNaDdxN2dkY1F1aTNzVmdGUWNsV0tTa0d2RWJiUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288154),
('sj6GI3kZovb8stg3UHYM93unNpvYvvGDQ9EqZWZD', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTUZOWFlob3VYNEdnUFBGaUM0emRiaVViME9NTlNuMEZ5UFN2d1lXaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287960),
('SQi9MxweHHS7VtK4AyOYlc9lyjqisTgXfGLEYzoq', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMWZsNGVhVTJaY1JNcTRLODdJRDdQWXZOTzI5VEthTUhSZmI1dTRLciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043685),
('sYhkuJOi9Ho6hqzFvKuOZI0yIGpXCN3qKIRrv7sV', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMnM2OElMdGVvMmN5VmdoOWt3SnM5UkJMdnhlbGt2SEt4bFlpRHF0ZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288476),
('t3oBxANcVn08wFUJsl7NVStVaTgDG0cxugjIyOfN', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWnFiT0piS3JRejRlQ1NoQXVIWURsVmJKVmc2Y0pJQWxPUTNQWHBrbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288283),
('t4gemMIrOwHB1oxxrjSlJMTIOYAKL6HJV7BCcob4', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV2pidDBLeG5BV0tsR1VWS1FJVVRwUWNQTUhHVHQ5cERzQzJSb1ZzMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043809),
('TgUr9iRrRbbSTYkjjiigoiOWxZuwdOWHzJIi6zlj', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaWlPdzNNc3VLVFlvdEg2dGZsdDMzSFhlNVBROElWN210ODdsUjNvMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288237),
('tPFq0In8SXCANQWXFHyZZwUZ9dQbLiNpPYh0FhbN', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQTNvTWNYT2xLS0szdVZGV0lPRXJpUTRjbDlaMFBPblBvaEpHUzI3OSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288078),
('TpOJhLCiexXwJhgsUzpGCi5Pc2fthajUVf6oYbr7', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSk1rRUdQbzZCcFlodDVrQkFlUDRkRG9XbVNFaEI0UFg4R3hnblJMVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041616),
('ttbmwEwAyUInZjKsfydCoWwXE1rz5MfLMSwcVMpb', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0ZkRmd6ZDhCSkV4SnphdVRRWWZwMjREOHJDSUtvTmUzZkF6TkxWbiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041666),
('TzUBx5NE0uRcSd8ZIKLYMMNiYPZcp5ep9LvA5BCn', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNHpuRmVlZ0FpU0pFcHFVM1pNYlJObzhqR2Q2MUtmYkRkOTNIa2hJVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760287962),
('UmerZSqTYJpKhh0nUxuOfnn1IPkEnhYrM1GhtZsN', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidFlYT2s3QzN2TmNLNjJGazhXY2xTaWNjbnpnSmN4dmJaUHVURDZkeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760289709),
('UZ6xyuw3acSq5HacZgvzUFFFTolj7CzBqJFLgXeL', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSU1TZDJiRzAxYkF3a2tsWEtQc25CN3JHa2wzTmc3cDhRRlY4R0VGcyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288284),
('vhJkwHpLwYoA2kyNtV4bXoYVA9muMswCamC3LqND', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMTdQb1pxZWRKUFRVazA2Zkh6SnZ6dWJwOWhiOEJRck10cVZHMzQ3dSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760041616),
('W7H0iA3xSIpOZ3vkpPZAnMobUDH7xFdwkYJUXnf9', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ292NEdyOUYzSmNIMm9FS2p3eXVYMW1kNzdFTU9TM3VFWEFsOGRJWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288146),
('XjefIhomRVOXJMoveGciMJ9rxJ9DT7slQw2AG5rk', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUGUwbWJzQ29Xd2xsUG9ZTHBiYjNXUGJmWGJycmVqOFZIbmNjSEZieiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288240),
('Xncok6Y1FxS8otdPMA7NafHFVHXaozmHRP2909VM', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRklEdm5scUlyNTR4SHp0aW1mUDQ2QnFXanhYRlJnWFFzMWlVdG1mUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288371),
('ZSmnWZBOFRWlZiplhtxKF4zl8ZsV5yvEwjZr5wld', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMGJCdERpaGliejBjRlM2VGRBYk1SeldQak1aTUVzNkFwQk1RVEl0cyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288132),
('zt6INJ31hPX30hRIpkq7yMfdD8CuFdR1qE9dd9sR', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid2hRYnJLdlhTb1pjWDBxZTFPT01ERnFyNXFTaGRTT2xMd2xXTDBibSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760288071),
('zzqHhoBSreHpSpj4I4940twEjxUfpQ5OQLl9nStn', NULL, '172.19.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 OPR/121.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibGx4NVZ3dTZqazN0ak12STg4SUU5YlZ0RGVJV1JkbHBUa3JoUEl5bSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvb2dsb3N6ZW5pYSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760043040);

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
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Jan Kowalski', 'jan.kowalski@example.com', NULL, '$2y$10$abcdefghijklmnopqrstuv', NULL, '2025-10-09 19:37:30', '2025-10-09 19:37:30'),
(2, 'Jan', 'jan@example.com', NULL, '$2y$12$30xDYpT/NWvKgH7GTT9k5erh6qQZoZu2dixXihzX4kZ6TuLZ0VGCy', NULL, '2025-10-16 14:09:18', '2025-10-16 14:09:18'),
(3, 'Symon', 'symon@wp.pl', NULL, '$2y$12$nBXeuOy38wgqm.8zQp.Z9.fBSI3sq7Poz1wCswEZQUeY4QX7L8Lsi', NULL, '2025-10-16 14:43:51', '2025-10-16 14:43:51'),
(4, 'Zbigniew', 'stonoga@wp.pl', NULL, '$2y$12$YxZwmJ5mSjEUWqbfD0pi0OHhAnV/XNVRWg3LUAWFCQ17A.ftfEZty', NULL, '2025-10-16 15:05:54', '2025-10-16 15:05:54'),
(5, 'Test User', 'test.user+$(date +%s)@example.com', NULL, '$2y$12$Gy/uRwb9uLorNscaQTuLyuVLyysoDEh3MgEGnNLTQQzBob6D43URi', NULL, '2025-12-06 11:11:00', '2025-12-06 11:11:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zdjecia`
--

CREATE TABLE `zdjecia` (
  `id` bigint UNSIGNED NOT NULL,
  `ogloszenie_id` bigint UNSIGNED NOT NULL,
  `sciezka` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nazwa_pliku` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
-- Indeksy dla tabeli `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT dla tabeli `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `modele`
--
ALTER TABLE `modele`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `ogloszenia`
--
ALTER TABLE `ogloszenia`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT dla tabeli `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `ulubione`
--
ALTER TABLE `ulubione`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
