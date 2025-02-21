-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2025 at 08:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game_zone`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_flappy_bird` (IN `user_name` VARCHAR(50))   BEGIN
	DELETE FROM flappy_bird WHERE username = user_name;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_game_2048` (IN `user_name` VARCHAR(50))   BEGIN
	DELETE FROM game_2048 WHERE username = user_name;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_rock_paper_scissor` (IN `user_name` VARCHAR(50))   BEGIN
	DELETE FROM rock_paper_scissor WHERE username = user_name;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_tic_toe_data` (IN `user_name` VARCHAR(50))   BEGIN
	DELETE FROM tic_tac_toe WHERE username = user_name;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user` (INOUT `user_name` VARCHAR(50))   BEGIN
	DELETE FROM users WHERE username = user_name;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `flappy_bird`
--

CREATE TABLE `flappy_bird` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flappy_bird`
--

INSERT INTO `flappy_bird` (`id`, `username`, `score`, `timestamp`) VALUES
(55, 'Hetu', 4, '2025-01-19 10:50:49'),
(56, 'Hetu', 1, '2025-01-19 11:34:56'),
(57, 'Hetu', 8, '2025-01-19 11:35:11'),
(58, 'arpatel', 0, '2025-01-20 01:12:41'),
(59, 'arpatel', 0, '2025-01-20 01:12:51'),
(60, 'arpatel', 6, '2025-01-20 01:13:02'),
(61, 'arpatel', 1, '2025-01-20 01:13:21'),
(62, 'arpatel', 2, '2025-01-20 01:13:29'),
(63, 'arpatel', 5, '2025-01-20 01:13:40'),
(64, 'arpatel', 0, '2025-01-20 01:13:43'),
(65, 'arpatel', 5, '2025-01-20 01:13:53');

-- --------------------------------------------------------

--
-- Table structure for table `game_2048`
--

CREATE TABLE `game_2048` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `time_played` int(11) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_2048`
--

INSERT INTO `game_2048` (`id`, `username`, `score`, `time_played`, `time_stamp`) VALUES
(20, 'arpatel', 64, 81, '2025-01-19 06:16:06'),
(23, 'Hetu', 512, 43, '2025-01-19 10:51:55');

-- --------------------------------------------------------

--
-- Table structure for table `rock_paper_scissor`
--

CREATE TABLE `rock_paper_scissor` (
  `id` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `player_score` int(50) NOT NULL,
  `computer_score` int(50) NOT NULL,
  `tie_count` int(11) NOT NULL,
  `result` varchar(250) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rock_paper_scissor`
--

INSERT INTO `rock_paper_scissor` (`id`, `username`, `player_score`, `computer_score`, `tie_count`, `result`, `timestamp`) VALUES
(9, 'arpatel', 2, 1, 2, 'User wins', '2025-01-19 06:15:44'),
(19, 'Hetu', 2, 3, 0, 'Computer wins', '2025-01-19 10:51:02'),
(20, 'Hetu', 1, 2, 2, 'Computer wins', '2025-01-19 11:35:19');

-- --------------------------------------------------------

--
-- Table structure for table `tic_tac_toe`
--

CREATE TABLE `tic_tac_toe` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `win` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tic_tac_toe`
--

INSERT INTO `tic_tac_toe` (`id`, `username`, `win`, `timestamp`) VALUES
(22, 'arpatel', 'user wins', '2025-01-19 06:14:56'),
(28, 'Hetu', 'it is draw', '2025-01-19 10:50:36'),
(29, 'Hetu', 'user wins', '2025-01-19 11:33:59'),
(30, 'Hetu', 'user wins', '2025-01-19 11:34:30'),
(31, 'arpatel', 'user wins', '2025-01-20 01:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `password`) VALUES
(20, 'arpatel', 'Avi Patel', 'avi@gmail.com', '321'),
(21, 'abhi123', 'Abhi ', 'abhi@gmail.com', '321654'),
(24, 'Hetu', 'Hetvi', 'hetvi@gmail.com', '321654');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `delete_user_data` AFTER DELETE ON `users` FOR EACH ROW BEGIN
	CALL delete_tic_toe_data(old.username);
	CALL delete_flappy_bird(old.username);
	CALL delete_game_2048(old.username);
	CALL delete_rock_paper_scissor(old.username);
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flappy_bird`
--
ALTER TABLE `flappy_bird`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_2048`
--
ALTER TABLE `game_2048`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rock_paper_scissor`
--
ALTER TABLE `rock_paper_scissor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tic_tac_toe`
--
ALTER TABLE `tic_tac_toe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flappy_bird`
--
ALTER TABLE `flappy_bird`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `game_2048`
--
ALTER TABLE `game_2048`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `rock_paper_scissor`
--
ALTER TABLE `rock_paper_scissor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tic_tac_toe`
--
ALTER TABLE `tic_tac_toe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



-- Granthalaya is an simple user friendly website where user can enter into the website using his/her email and username and than user can explore the different ebooks and if user want to purchase that ebook user can add that book to the cart and than after make cart final user can checkout the cart and  get the zip file of the cart which has bill of that cart and the pdfs of the books 