-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Apr 19, 2023 at 12:27 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_auction_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `Item_Id` varchar(10) NOT NULL,
  `Item_Name` varchar(50) NOT NULL,
  `Description` text NOT NULL,
  `Starting_Bid_Price` int(10) NOT NULL,
  `Status` varchar(10) NOT NULL,
  `Curr_Bid_Price` int(10) NOT NULL,
  `Seller_Id` varchar(10) NOT NULL,
  `Auction_Start_Time` datetime NOT NULL,
  `Auction_End_Time` datetime NOT NULL,
  `Category` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`Item_Id`, `Item_Name`, `Description`, `Starting_Bid_Price`, `Status`, `Curr_Bid_Price`, `Seller_Id`, `Auction_Start_Time`, `Auction_End_Time`, `Category`) VALUES
('101', '1495 Old Coin', 'Silver One Rupee Muhammad Shah Shajahanabad Mint RY28 Mughal India Medieval Coin Collection', 150, 'active', 250, 'adele@104', '2023-04-18 19:23:30', '2023-05-18 19:23:30', 'Antique Coins'),
('102', 'Tree Trunk Wall Clock', 'Perfectly made for home and decoration items\r\nThe time has been gone when clocks were used to show the time only Now clocks are a symbol of your class and standard', 650, 'active', 1025, 'alfred@106', '2023-03-01 19:23:30', '2023-03-15 19:23:30', 'Gadgets'),
('103', '1967 Shelby Mustang GT350', 'The Shelby Mustang is a high-performance variant of the Ford Mustang built by Shelby American from 1965 to 1967 and by the Ford Motor Company from 1968 to 1970. ', 522000, 'active', 600000, 'sam@101', '2023-04-18 19:35:16', '2023-05-01 19:35:16', 'Car'),
('104', '16th century Book Document', 'Two book or Bible  fragments with two unknown woodcuts from the 16th century, including the city of Jerusalem', 45112, 'active', 55562, 'jett@101', '2023-01-05 19:38:32', '2023-04-18 15:53:30', 'Books'),
('105', '1962 Mercedes-Benz Unimog-S 404', 'A Spartan cabin up front makes the Unimog at home on a farm or in military use, while a variety of layouts including pickup beds, cargo boxes, and six-wheel drive variants allow for wide customization.', 900000, 'sold', 1100000, 'adele@104', '2023-01-01 19:38:32', '2023-04-18 19:38:32', 'Car'),
('106', 'XF Chinese Brown pottery TEAPOT utensils', 'The item is approximately 14 x 10 x 8.5 centimeters\r\nTotal weight: 215.5 g\r\nThis item is sold as is as pictured. Please review all images\r\nWith wear and imperfections to the pottery', 15000, 'sold', 15100, 'henrey@107', '2023-04-04 19:38:32', '2023-04-18 15:53:30', 'Antique Utensils'),
('107', 'Planet Orbit', 'An old painting of Solar System Planet Orbit.', 1500, 'active', 2000, 'ram@102', '2023-04-18 15:53:30', '2023-09-27 19:38:32', 'Arts');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `Noti_Id` varchar(10) NOT NULL,
  `User_Id` varchar(10) NOT NULL,
  `Message` text NOT NULL,
  `Noti_Time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`Noti_Id`, `User_Id`, `Message`, `Noti_Time`) VALUES
('9001', 'adele@104', 'The Bidding is Live.', '2023-04-18 20:00:14'),
('9002', 'jett@101', 'Congratulations ! You have won the bid.', '2023-04-18 20:00:14'),
('9003', 'sam@101', 'Someone bidded more money than you ! Bid more to win the product.', '2023-04-18 16:30:14');

-- --------------------------------------------------------

--
-- Table structure for table `sell_history`
--

CREATE TABLE `sell_history` (
  `Item_Id` varchar(10) NOT NULL,
  `Item_Name` varchar(50) NOT NULL,
  `Seller_Id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sell_history`
--

INSERT INTO `sell_history` (`Item_Id`, `Item_Name`, `Seller_Id`) VALUES
('101', '1495 Old Coin', 'alfred@106'),
('103', '1967 Shelby Mustang GT350', 'sam@101'),
('104', '16th century Book Document', 'alfred@106'),
('105', '1962 Mercedes-Benz Unimog-S 404', 'alfred@106'),
('106', 'XF Chinese Brown pottery TEAPOT utensils', 'alfred@106'),
('107', 'Planet Orbit', 'sam@101');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Aadhar Card` bigint(20) NOT NULL,
  `Mobile No` bigint(10) NOT NULL,
  `DOB` date NOT NULL,
  `User_Id` varchar(10) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Shipping_Add` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Name`, `Email`, `Aadhar Card`, `Mobile No`, `DOB`, `User_Id`, `Password`, `Shipping_Add`) VALUES
('Adele', 'adele@gmail.com', 784598851254, 8665232603, '1993-09-08', 'adele@104', 'adele@104', '5454 Beier Plain, Apt. 147, 74963-4646, New Elvie, Montana, United States'),
('Alan', 'alan@gmail.com', 798465541252, 8989598778, '1976-11-04', 'alan@105', 'alan@105', '181 Valentine Union, Suite 792, 80312-1723, Port Babymouth, Kansas, United States'),
('Alfred', 'alfred@gmail.com', 123809812398, 7878989856, '1972-04-12', 'alfred@106', 'alfred@106', '4498 Nolan Garden, Suite 697, 83482-9959, Lubowitzbury, California, United States'),
('Henrey', 'henrey@gmail.com', 45454652321, 9494636363, '1943-01-12', 'henrey@107', 'henrey@107', '2943 Jazlyn Tunnel, Apt. 342, 11336-8240, New Arne, Florida, United States'),
('Jett', 'jett@gmail.com', 132156431222, 9326515312, '2000-01-27', 'jett@101', 'jett@101', '1315 Wolks Vegas Ridges, Apt. 167, 80484, Oklahoma, United States'),
('Kylie', 'kylie@gmail.com', 123443219889, 1234567890, '1995-06-15', 'kylie@108', 'kylie@108', '38032 Olen Ville, Apt. 861, 26594-1999, New Katelynmouth, Indiana, United States'),
('Ram', 'ram@gmail.com', 999944442222, 9797979755, '1996-04-10', 'ram@102', 'ram@102', '486 Greenfelder Forges, Apt. 077, 65022, New Cindy, Illinois, United States'),
('Sam', 'sam@gmail.com', 111122223333, 9494948787, '2000-01-18', 'sam@101', 'sam@101', '751 Greenfelder Ridges, Apt. 167, 80484, Port Virginia, Oklahoma, United States');

-- --------------------------------------------------------

--
-- Table structure for table `watch_list`
--

CREATE TABLE `watch_list` (
  `WatchList_Id` varchar(10) NOT NULL,
  `Item_Id` varchar(10) NOT NULL,
  `User_Id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `watch_list`
--

INSERT INTO `watch_list` (`WatchList_Id`, `Item_Id`, `User_Id`) VALUES
('1101', '103', 'sam@101'),
('1102', '102', 'henrey@107'),
('1103', '105', 'ram@102'),
('1104', '103', 'alfred@106'),
('1105', '101', 'jett@101'),
('1106', '105', 'adele@104'),
('1107', '101', 'alfred@106');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`Item_Id`),
  ADD UNIQUE KEY `Item_Name` (`Item_Name`),
  ADD KEY `Seller_Id` (`Seller_Id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`Noti_Id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Indexes for table `sell_history`
--
ALTER TABLE `sell_history`
  ADD KEY `Item_Name` (`Item_Name`),
  ADD KEY `Item_Id` (`Item_Id`),
  ADD KEY `Seller_Id` (`Seller_Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_Id`);

--
-- Indexes for table `watch_list`
--
ALTER TABLE `watch_list`
  ADD PRIMARY KEY (`WatchList_Id`),
  ADD KEY `Item_Id` (`Item_Id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`Seller_Id`) REFERENCES `user` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `user` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sell_history`
--
ALTER TABLE `sell_history`
  ADD CONSTRAINT `sell_history_ibfk_1` FOREIGN KEY (`Item_Name`) REFERENCES `item` (`Item_Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sell_history_ibfk_2` FOREIGN KEY (`Item_Id`) REFERENCES `item` (`Item_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sell_history_ibfk_3` FOREIGN KEY (`Seller_Id`) REFERENCES `item` (`Seller_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `watch_list`
--
ALTER TABLE `watch_list`
  ADD CONSTRAINT `watch_list_ibfk_1` FOREIGN KEY (`Item_Id`) REFERENCES `item` (`Item_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `watch_list_ibfk_2` FOREIGN KEY (`User_Id`) REFERENCES `user` (`User_Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
