use online_auction;

CREATE TABLE `user` (
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL unique,
  `Aadhar_Card` bigint(20) NOT NULL,
  `Mobile_No` bigint(10) NOT NULL,
  `DOB` date NOT NULL,
  `User_Id` varchar(10) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Shipping_Add` varchar(100) NOT NULL,
  primary key(User_Id)
);

INSERT INTO `user` (`Name`, `Email`, `Aadhar_Card`, `Mobile_No`, `DOB`, `User_Id`, `Password`, `Shipping_Add`) VALUES
('Adele', 'adele@gmail.com', 784598851254, 8665232603, '1993-09-08', 'adele@104', 'adele@104', '5454 Beier Plain, Apt. 147, 74963-4646, New Elvie, Montana, United States'),
('Alan', 'alan@gmail.com', 798465541252, 8989598778, '1976-11-04', 'alan@105', 'alan@105', '181 Valentine Union, Suite 792, 80312-1723, Port Babymouth, Kansas, United States'),
('Alfred', 'alfred@gmail.com', 123809812398, 7878989856, '1972-04-12', 'alfred@106', 'alfred@106', '4498 Nolan Garden, Suite 697, 83482-9959, Lubowitzbury, California, United States'),
('Henrey', 'henrey@gmail.com', 45454652321, 9494636363, '1943-01-12', 'henrey@107', 'henrey@107', '2943 Jazlyn Tunnel, Apt. 342, 11336-8240, New Arne, Florida, United States'),
('Jett', 'jett@gmail.com', 132156431222, 9326515312, '2000-01-27', 'jett@101', 'jett@101', '1315 Wolks Vegas Ridges, Apt. 167, 80484, Oklahoma, United States'),
('Kylie', 'kylie@gmail.com', 123443219889, 1234567890, '1995-06-15', 'kylie@108', 'kylie@108', '38032 Olen Ville, Apt. 861, 26594-1999, New Katelynmouth, Indiana, United States'),
('Ram', 'ram@gmail.com', 999944442222, 9797979755, '1996-04-10', 'ram@102', 'ram@102', '486 Greenfelder Forges, Apt. 077, 65022, New Cindy, Illinois, United States'),
('Sam', 'sam@gmail.com', 111122223333, 9494948787, '2000-01-18', 'sam@101', 'sam@101', '751 Greenfelder Ridges, Apt. 167, 80484, Port Virginia, Oklahoma, United States');
INSERT INTO `user`VALUES ('Sammed', 'sammedsingalkar@gmail.com', 784598851254, 8665232603, '1993-09-08', 'sam@102', 'iamsammed@12', '5454 Beier Plain, Apt. 147, 74963-4646, New Elvie, Montana, United States');

select * from user;
drop table user;

ALTER TABLE user RENAME COLUMN `Mobile No` TO `Mobile_No`;