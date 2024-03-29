SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

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


INSERT INTO `products` (`name`, `sku`, `price`, `productType`, `size`, `weight`, `height`, `length`, `width`) VALUES
('DVD 1', 'dvd1', 21, 'dvd', 750, null, null, null, null),
('DVD 2', 'dvd2', 22, 'dvd', 700, null, null, null, null),
('DVD 3', 'dvd3', 21, 'dvd', 750, null, null, null, null),
('DVD 4', 'dvd4', 22, 'dvd', 700, null, null, null, null),
('DVD 5', 'dvd5', 25, 'dvd', 800, null, null, null, null),
('DVD 6', 'dvd6', 24, 'dvd', 700, null, null, null, null),
('DVD 7', 'dvd7', 23, 'dvd', 750, null, null, null, null),
('DVD 8', 'dvd8', 22, 'dvd', 700, null, null, null, null),
('DVD 9', 'dvd9', 23, 'dvd', 800, null, null, null, null),
('DVD 10', 'dvd10', 24, 'dvd', 750, null, null, null, null),
('DVD 11', 'dvd11', 25, 'dvd', 750, null, null, null, null),
('DVD 12', 'dvd12', 24, 'dvd', 700, null, null, null, null),
('BOOK 1', 'book1', 15, 'book', null, '0.8', null, null, null),
('BOOK 2', 'book2', 20, 'book', null, '0.7', null, null, null),
('BOOK 3', 'book3', 17, 'book', null, '0.6', null, null, null),
('BOOK 4', 'book4', 18, 'book', null, '0.7', null, null, null),
('BOOK 5', 'book5', 16, 'book', null, '0.8', null, null, null),
('BOOK 6', 'book6', 12, 'book', null, '0.9', null, null, null),
('BOOK 7', 'book7', 20, 'book', null, '0.5', null, null, null),
('BOOK 8', 'book8', 21, 'book', null, '0.6', null, null, null),
('BOOK 9', 'book9', 30, 'book', null, '1', null, null, null),
('BOOK 10', 'book10', 7, 'book', null, '0.7', null, null, null),
('BOOK 11', 'book11', 12, 'book', null, '0.8', null, null, null),
('BOOK 12', 'book12', 15, 'book', null, '0.5', null, null, null),
('FURNITURE 1', 'furniture1', 70, 'furniture', null, null, '120', '120', '10'),
('FURNITURE 2', 'furniture2', 120, 'furniture', null, null, '120', '100', '30'),
('FURNITURE 3', 'furniture3', 200, 'furniture', null, null, '100', '140', '10'),
('FURNITURE 4', 'furniture4', 500, 'furniture', null, null, '120', '160', '40'),
('FURNITURE 5', 'furniture5', 240, 'furniture', null, null, '140', '120', '30'),
('FURNITURE 6', 'furniture6', 80, 'furniture', null, null, '160', '120', '20'),
('FURNITURE 7', 'furniture7', 270, 'furniture', null, null, '170', '120', '10'),
('FURNITURE 8', 'furniture8', 800, 'furniture', null, null, '180', '120', '20'),
('FURNITURE 9', 'furniture9', 250, 'furniture', null, null, '100', '320', '30'),
('FURNITURE 10', 'furniture10', 170, 'furniture', null, null, '120', '220', '20'),
('FURNITURE 11', 'furniture11', 200, 'furniture', null, null, '220', '120', '30'),
('FURNITURE 12', 'furniture12', 540, 'furniture', null, null, '120', '120', '40');

