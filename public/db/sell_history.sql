use online_auction;

CREATE TABLE `sell_history` (
  `Item_Id` int(10) NOT NULL,
  `Item_Name` varchar(50) NOT NULL,
  `Seller_Id` varchar(10) NOT NULL,
  FOREIGN KEY (`Item_Name`) REFERENCES `item` (`Item_Name`),
  FOREIGN KEY (`Item_Id`) REFERENCES `item` (`Item_Id`),
  FOREIGN KEY (`Seller_Id`) REFERENCES `item` (`Seller_Id`)
);


INSERT INTO `sell_history` (`Item_Id`, `Item_Name`, `Seller_Id`) VALUES
(101, '1495 Old Coin', 'alfred@106'),
(103, '1967 Shelby Mustang GT350', 'sam@101'),
(104, '16th century Book Document', 'alfred@106'),
(105, '1962 Mercedes-Benz Unimog-S 404', 'alfred@106'),
(106, 'XF Chinese Brown pottery TEAPOT utensils', 'alfred@106'),
(107, 'Planet Orbit', 'sam@101');

select * from sell_history;
drop table sell_history;
SELECT * FROM sell_history JOIN item ON sell_history.Item_Id = item.Item_Id and sell_history.Seller_Id = item.Seller_Id where sell_history.Seller_Id = "sam@101";  