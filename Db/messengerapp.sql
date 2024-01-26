-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2024 at 01:57 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `messengerapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `chathasmessages`
--

CREATE TABLE `chathasmessages` (
  `chatId` varchar(4) NOT NULL,
  `messageId` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `chatId` varchar(4) NOT NULL,
  `chatStatus` enum('online','offline') NOT NULL,
  `chatName` varchar(255) NOT NULL,
  `chatIsActive` int(1) NOT NULL,
  `chatCreateDate` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`chatId`, `chatStatus`, `chatName`, `chatIsActive`, `chatCreateDate`) VALUES
('bLV3', 'online', 'Diego Maradona', 1, 1705400009),
('hkYS', 'online', 'Leonardo Messi', 1, 1705570713),
('klff', 'offline', 'Karim Benzema', 1, 1705570718),
('ybRJ', 'offline', 'Cristiano Ronaldo', 1, 1705400013);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `messageId` varchar(4) NOT NULL,
  `messageOwner` varchar(255) NOT NULL,
  `messageContent` varchar(255) NOT NULL,
  `messageCreateDate` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `userhaschats`
--

CREATE TABLE `userhaschats` (
  `chatId` varchar(4) NOT NULL,
  `userId` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(4) NOT NULL,
  `userFirstName` varchar(255) NOT NULL,
  `userLastName` varchar(255) NOT NULL,
  `userPhone` int(10) NOT NULL,
  `userImage` varchar(255) DEFAULT NULL,
  `userIsActive` int(1) NOT NULL,
  `userCreateDate` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userFirstName`, `userLastName`, `userPhone`, `userImage`, `userIsActive`, `userCreateDate`) VALUES
('owne', 'owner', 'owner', 54634534, NULL, 1, 1748591548);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chathasmessages`
--
ALTER TABLE `chathasmessages`
  ADD PRIMARY KEY (`chatId`,`messageId`),
  ADD KEY `messageId` (`messageId`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`chatId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`messageId`),
  ADD KEY `messageOwnerId` (`messageOwner`);

--
-- Indexes for table `userhaschats`
--
ALTER TABLE `userhaschats`
  ADD PRIMARY KEY (`chatId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chathasmessages`
--
ALTER TABLE `chathasmessages`
  ADD CONSTRAINT `chathasmessages_ibfk_1` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `chathasmessages_ibfk_2` FOREIGN KEY (`messageId`) REFERENCES `messages` (`messageId`) ON UPDATE CASCADE;

--
-- Constraints for table `userhaschats`
--
ALTER TABLE `userhaschats`
  ADD CONSTRAINT `userhaschats_ibfk_1` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `userhaschats_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
