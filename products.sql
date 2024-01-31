-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: apr. 19, 2023 la 11:24 AM
-- Versiune server: 10.4.27-MariaDB
-- Versiune PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `scandiweb`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sku` varchar(20) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `productType` varchar(20) NOT NULL,
  `size` int(11) DEFAULT NULL,
  `weight` varchar(20) DEFAULT NULL,
  `height` varchar(20) DEFAULT NULL,
  `length` varchar(20) DEFAULT NULL,
  `width` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Eliminarea datelor din tabel `products`
--

INSERT INTO `products` (`name`, `sku`, `price`, `productType`, `size`, `weight`, `height`, `length`, `width`) VALUES
('DVD 1', 'dvd1', 21, 'dvd', 750, '', '', '', ''),
('DVD 2', 'dvd2', 22, 'dvd', 700, '', '', '', ''),
('DVD 3', 'dvd3', 21, 'dvd', 750, '', '', '', ''),
('DVD 4', 'dvd4', 22, 'dvd', 700, '', '', '', ''),
('DVD 5', 'dvd5', 25, 'dvd', 800, '', '', '', ''),
('DVD 6', 'dvd6', 24, 'dvd', 700, '', '', '', ''),
('DVD 7', 'dvd7', 23, 'dvd', 750, '', '', '', ''),
('DVD 8', 'dvd8', 22, 'dvd', 700, '', '', '', ''),
('DVD 9', 'dvd9', 23, 'dvd', 800, '', '', '', ''),
('DVD 10', 'dvd10', 24, 'dvd', 750, '', '', '', ''),
('DVD 11', 'dvd11', 25, 'dvd', 750, '', '', '', ''),
('DVD 12', 'dvd12', 24, 'dvd', 700, '', '', '', ''),
('BOOK 1', 'book1', 15, 'book', '', '0.8', '', '', ''),
('BOOK 2', 'book2', 20, 'book', '', '0.7', '', '', ''),
('BOOK 3', 'book3', 17, 'book', '', '0.6', '', '', ''),
('BOOK 4', 'book4', 18, 'book', '', '0.7', '', '', ''),
('BOOK 5', 'book5', 16, 'book', '', '0.8', '', '', ''),
('BOOK 6', 'book6', 12, 'book', '', '0.9', '', '', ''),
('BOOK 7', 'book7', 20, 'book', '', '0.5', '', '', ''),
('BOOK 8', 'book8', 21, 'book', '', '0.6', '', '', ''),
('BOOK 9', 'book9', 30, 'book', '', '1', '', '', ''),
('BOOK 10', 'book10', 7, 'book', '', '0.7', '', '', ''),
('BOOK 11', 'book11', 12, 'book', '', '0.8', '', '', ''),
('BOOK 12', 'book12', 15, 'book', '', '0.5', '', '', ''),
('FURNITURE 1', 'furniture1', 70, 'furniture', '', '', '120', '120', '10'),
('FURNITURE 2', 'furniture2', 120, 'furniture', '', '', '120', '100', '30'),
('FURNITURE 3', 'furniture3', 200, 'furniture', '', '', '100', '140', '10'),
('FURNITURE 4', 'furniture4', 500, 'furniture', '', '', '120', '160', '40'),
('FURNITURE 5', 'furniture5', 240, 'furniture', '', '', '140', '120', '30'),
('FURNITURE 6', 'furniture6', 80, 'furniture', '', '', '160', '120', '20'),
('FURNITURE 7', 'furniture7', 270, 'furniture', '', '', '170', '120', '10'),
('FURNITURE 8', 'furniture8', 800, 'furniture', '', '', '180', '120', '20'),
('FURNITURE 9', 'furniture9', 250, 'furniture', '', '', '100', '320', '30'),
('FURNITURE 10', 'furniture10', 170, 'furniture', '', '', '120', '220', '20'),
('FURNITURE 11', 'furniture11', 200, 'furniture', '', '', '220', '120', '30'),
('FURNITURE 12', 'furniture12', 540, 'furniture', '', '', '120', '120', '40');




-- ALTER TABLE `products`
--   ADD PRIMARY KEY (`id`);

-- --
-- -- AUTO_INCREMENT pentru tabele eliminate
-- --

-- --
-- -- AUTO_INCREMENT pentru tabele `products`
-- --
-- ALTER TABLE `products`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
-- COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
