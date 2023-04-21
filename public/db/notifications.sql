use online_auction;

CREATE TABLE `notification` (
  `Noti_Id` int(10) NOT NULL auto_increment,
  `User_Id` varchar(10) NOT NULL,
  `Message` text NOT NULL,
  `Noti_Time` datetime NOT NULL,
  `type` varchar(20),
  primary key(Noti_Id),
  FOREIGN KEY (`User_Id`) REFERENCES `user` (`User_Id`)
);

INSERT INTO `notification` (`Noti_Id`, `User_Id`, `Message`, `Noti_Time`,`type`) VALUES
(9001, 'adele@104', 'The Bidding is Live.', '2023-04-18 20:00:14','Information'),
(9002, 'jett@101', 'Congratulations ! You have won the bid.', '2023-04-18 20:00:14','Success'),
(9003, 'sam@101', 'Someone bidded more money than you ! Bid more to win the product.', '2023-04-18 16:30:14','Error');

 



select * from notification;
drop table notification;

-- Warning 
