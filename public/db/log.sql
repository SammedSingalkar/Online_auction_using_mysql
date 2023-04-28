use online_auction;

CREATE TABLE `log` (
  `transaction_ID` int(10) NOT NULL auto_increment,
  `User_Bid_Amount` int(10),
  `User_ID` varchar(10) NOT NULL,
  `Date_Time` datetime NOT NULL,
  primary key (`transaction_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_Id`)
);

INSERT INTO `log` VALUES (110001,95000, 'adele@104', '2023-05-18 19:23:30');
