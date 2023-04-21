use online_auction;

CREATE TABLE `item` (
  `Item_Id` int(10) NOT NULL auto_increment,
  `Item_Name` varchar(50) NOT NULL unique,
  `Description` text NOT NULL,
  `Starting_Bid_Price` int(10) NOT NULL,
  `Status` varchar(10) NOT NULL,
  `Curr_Bid_Price` int(10) NOT NULL,
  `Seller_Id` varchar(10) NOT NULL,
  `Auction_Start_Time` datetime NOT NULL,
  `Auction_End_Time` datetime NOT NULL,
  `Category` varchar(20) NOT NULL, 
  primary key (`Item_Id`),
  FOREIGN KEY (`Seller_Id`) REFERENCES `user` (`User_Id`)
);

INSERT INTO `item` (`Item_Id`, `Item_Name`, `Description`, `Starting_Bid_Price`, `Status`, `Curr_Bid_Price`, `Seller_Id`, `Auction_Start_Time`, `Auction_End_Time`, `Category`) VALUES
(101, '1495 Old Coin', 'Silver One Rupee Muhammad Shah Shajahanabad Mint RY28 Mughal India Medieval Coin Collection', 150, 'active', 250, 'adele@104', '2023-04-18 19:23:30', '2023-05-18 19:23:30', 'Antique Coins'),
(102, 'Tree Trunk Wall Clock', 'Perfectly made for home and decoration items\r\nThe time has been gone when clocks were used to show the time only Now clocks are a symbol of your class and standard', 650, 'active', 1025, 'alfred@106', '2023-03-01 19:23:30', '2023-03-15 19:23:30', 'Gadgets'),
(103, '1967 Shelby Mustang GT350', 'The Shelby Mustang is a high-performance variant of the Ford Mustang built by Shelby American from 1965 to 1967 and by the Ford Motor Company from 1968 to 1970. ', 522000, 'active', 600000, 'sam@101', '2023-04-18 19:35:16', '2023-05-01 19:35:16', 'Car'),
(104, '16th century Book Document', 'Two book or Bible  fragments with two unknown woodcuts from the 16th century, including the city of Jerusalem', 45112, 'active', 55562, 'jett@101', '2023-01-05 19:38:32', '2023-04-18 15:53:30', 'Books'),
(105, '1962 Mercedes-Benz Unimog-S 404', 'A Spartan cabin up front makes the Unimog at home on a farm or in military use, while a variety of layouts including pickup beds, cargo boxes, and six-wheel drive variants allow for wide customization.', 900000, 'sold', 1100000, 'adele@104', '2023-01-01 19:38:32', '2023-04-18 19:38:32', 'Car'),
(106, 'XF Chinese Brown pottery TEAPOT utensils', 'The item is approximately 14 x 10 x 8.5 centimeters\r\nTotal weight: 215.5 g\r\nThis item is sold as is as pictured. Please review all images\r\nWith wear and imperfections to the pottery', 15000, 'sold', 15100, 'henrey@107', '2023-04-04 19:38:32', '2023-04-18 15:53:30', 'Antique Utensils'),
(107, 'Planet Orbit', 'An old painting of Solar System Planet Orbit.', 1500, 'active', 2000, 'sam@101', '2023-04-18 15:53:30', '2023-09-27 19:38:32', 'Arts');

select * from item;
drop table item;