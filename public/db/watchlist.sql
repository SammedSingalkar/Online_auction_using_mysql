use online_auction;

CREATE TABLE `watchlist` (
  `WatchList_Id` varchar(10) NOT NULL,
  `Item_Id` varchar(10) NOT NULL,
  `User_Id` varchar(10) NOT NULL, 
  primary key (watchlist_Id),
  FOREIGN KEY (`Item_Id`) REFERENCES `item` (`Item_Id`),
  FOREIGN KEY (`User_Id`) REFERENCES `user` (`User_Id`)
);

INSERT INTO `watchlist` (`WatchList_Id`, `Item_Id`, `User_Id`) VALUES
('1101', '103', 'sam@101'),
('1102', '102', 'henrey@107'),
('1103', '105', 'ram@102'),
('1104', '103', 'alfred@106'),
('1105', '101', 'jett@101'),
('1106', '105', 'adele@104'),
('1107', '101', 'alfred@106');