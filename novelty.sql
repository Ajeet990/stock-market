-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2021 at 02:06 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `novelty`
--

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `available_stock` int(10) NOT NULL,
  `per_s_price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `name`, `available_stock`, `per_s_price`) VALUES
(1, 'Nepal investment bank ', 347, 150),
(2, 'Sanima bank limited', 530, 10),
(3, 'Rastray banijya bank', 398, 10),
(4, 'NIC asia ', 717, 20),
(5, 'Janta Bikash Bank', 150, 12),
(7, 'Nabil Bank', 560, 10),
(11, 'Muktinath  Bikash bank ', 350, 15),
(24, 'Bank of baroda', 270, 20);

-- --------------------------------------------------------

--
-- Table structure for table `bought`
--

CREATE TABLE `bought` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `per_s_cost` int(10) NOT NULL,
  `stock_amt` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bought`
--

INSERT INTO `bought` (`id`, `name`, `per_s_cost`, `stock_amt`, `amount`, `date`) VALUES
(2, 'Nepal investment bank', 15, 91, 1350, '2021-09-27 21:57:19'),
(4, 'NIC asia ', 20, 31, 540, '2021-09-27 22:02:27'),
(16, 'Nabil Bank', 15, 35, 525, '2021-09-30 13:28:30'),
(26, 'Bank of baroda', 20, 20, 400, '2021-10-01 17:10:45'),
(31, 'Muktinath  Bikash bank ', 15, 40, 600, '2021-10-02 23:39:36'),
(33, 'Janta Bikash Bank', 12, 3, 36, '2021-10-03 08:06:55');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `final` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `amount`, `final`) VALUES
(1, 1392, 5000);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(10) NOT NULL,
  `math` int(10) NOT NULL,
  `science` int(10) NOT NULL,
  `eng` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `math`, `science`, `eng`) VALUES
(1, 8, 7, 8),
(2, 5, 6, 9);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(10) NOT NULL,
  `bname` varchar(40) NOT NULL,
  `num_stock` int(10) NOT NULL,
  `per_unit` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(10) NOT NULL DEFAULT 'Bought'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `bname`, `num_stock`, `per_unit`, `amount`, `date`, `status`) VALUES
(2, 'nabil', 34, 3, 234, '2021-10-01 08:22:54', 'Bought'),
(3, 'Muktinath  Bikash bank ', 34, 15, 510, '2021-10-01 08:31:50', 'Bought'),
(4, 'Bank of baroda', 30, 2, 60, '2021-10-01 08:41:17', 'Sold'),
(5, 'Nepal investment bank 2', 50, 150, 7500, '2021-10-01 10:59:11', 'Bought'),
(6, 'Nepal investment bank 2', 50, 150, 7500, '2021-10-01 11:05:18', 'Sold'),
(7, 'Bank of baroda', 2, 20, 40, '2021-10-01 11:40:58', 'Bought'),
(8, 'Bank of baroda', 2, 20, 40, '2021-10-01 11:53:59', 'Sold'),
(9, 'Sanima bank limited', 2, 10, 20, '2021-10-01 11:56:32', 'Bought'),
(10, 'Sanima bank limited', 2, 10, 20, '2021-10-01 12:16:25', 'Sold'),
(11, 'Muktinath  Bikash bank ', 40, 15, 600, '2021-10-01 15:03:43', 'Bought'),
(12, 'Muktinath  Bikash bank ', 34, 15, 510, '2021-10-01 15:04:27', 'Sold'),
(13, 'Muktinath  Bikash bank ', 40, 15, 600, '2021-10-01 15:04:32', 'Sold'),
(14, 'Rastray banijya bank', 10, 10, 100, '2021-10-01 15:04:38', 'Sold'),
(15, 'Nepal investment bank', 10, 15, 150, '2021-10-01 16:39:46', 'Sold'),
(16, 'NIC asia ', 30, 20, 600, '2021-10-01 16:41:13', 'Sold'),
(17, 'NIC asia ', 40, 20, 800, '2021-10-01 16:41:17', 'Sold'),
(18, 'Nabil Bank', 30, 15, 450, '2021-10-01 16:41:22', 'Sold'),
(19, 'NIC asia ', 4, 20, 80, '2021-10-01 17:04:09', 'Bought'),
(20, 'NIC asia ', 4, 20, 80, '2021-10-01 17:10:25', 'Sold'),
(21, 'Bank of baroda', 20, 20, 400, '2021-10-01 17:10:45', 'Bought'),
(22, 'Muktinath  Bikash bank ', 6, 15, 90, '2021-10-01 17:18:24', 'Bought'),
(23, 'Sanima bank limited', 25, 10, 250, '2021-10-01 17:42:52', 'Bought'),
(24, 'Sanima bank limited', 28, 10, 250, '2021-10-01 18:11:39', 'Sold'),
(25, 'my bank', 10, 2, 20, '2021-10-01 20:01:29', 'Bought'),
(26, 'Sanima bank limited', 1, 10, 10, '2021-10-01 20:45:35', 'Bought'),
(27, 'Muktinath  Bikash bank ', 50, 15, 750, '2021-10-02 23:39:36', 'Bought'),
(28, 'Rastray banijya bank', 40, 10, 400, '2021-10-02 23:48:29', 'Bought'),
(29, 'Sanima bank limited', 9, 10, 90, '2021-10-03 07:48:11', 'Sold'),
(30, 'Nepal investment bank', 1, 15, 15, '2021-10-03 07:57:40', 'Sold'),
(31, 'NIC asia ', 1, 20, 20, '2021-10-03 08:04:28', 'Bought'),
(32, 'Nepal investment bank ', 1, 150, 150, '2021-10-03 08:05:21', 'Bought'),
(33, 'Janta Bikash Bank', 8, 12, 96, '2021-10-03 08:06:55', 'Bought'),
(34, 'Janta Bikash Bank', 5, 12, 60, '2021-10-03 11:36:25', 'Sold');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `first` varchar(20) NOT NULL,
  `last` varchar(20) NOT NULL,
  `handle` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bought`
--
ALTER TABLE `bought`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `bought`
--
ALTER TABLE `bought`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
