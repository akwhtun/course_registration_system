-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2025 at 01:09 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course_registration_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course_name` varchar(60) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `course_year` varchar(20) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `major` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_name`, `course_code`, `course_year`, `semester`, `major`, `created_date`, `updated_date`) VALUES
(54, 'Physics', 'P-1101', 'First Year', 'Semester I', 'Computer Science and Computer Technology', '2024-03-01 19:52:36', '2024-03-01 19:52:36'),
(56, 'Physics(II)', 'P-1201', 'First Year', 'Semester II', 'Computer Science and Computer Technology', '2024-03-01 19:53:11', '2024-03-06 20:59:01'),
(57, 'Calculus I', 'CST-1142', 'First Year', 'Semester I', 'Computer Science and Computer Technology', '2024-03-01 19:53:50', '2024-03-01 19:53:50'),
(58, 'Discrete Mathematics', 'CST-1242', 'First Year', 'Semester II', 'Computer Science and Computer Technology', '2024-03-01 19:54:28', '2024-03-01 19:54:28'),
(59, 'Basic Data Processing', 'CST-1123(SS)', 'First Year', 'Semester I', 'Computer Science and Computer Technology', '2024-03-01 19:55:22', '2024-03-01 19:55:22'),
(60, 'Digital Citizenship and Smart Living Society', 'CST-1223(SS)', 'First Year', 'Semester II', 'Computer Science and Computer Technology', '2024-03-01 19:56:27', '2024-03-01 19:57:09'),
(61, 'English Result', 'E-1101', 'First Year', 'Semester I', 'Computer Science and Computer Technology', '2024-03-01 20:01:56', '2024-03-01 20:01:56'),
(62, 'English Result(II)', 'E-1201', 'First Year', 'Semester II', 'Computer Science and Computer Technology', '2024-03-01 20:02:19', '2024-03-06 20:51:07'),
(63, 'Programming Logic & design (Programming in C++)', 'CST-1211', 'First Year', 'Semester II', 'Computer Science and Computer Technology', '2024-03-01 20:22:04', '2024-03-01 20:22:04'),
(64, 'Programming Language Skills (Java Programming)', 'CST-2111', 'Second Year', 'Semester III', 'Computer Science and Computer Technology', '2024-03-01 20:36:07', '2024-03-01 20:36:07'),
(65, 'Database Management System', 'CST-2124', 'Second Year', 'Semester III', 'Computer Science and Computer Technology', '2024-03-01 20:37:21', '2024-03-01 20:37:21'),
(66, 'Traveller B2', 'E-2101', 'Second Year', 'Semester III', 'Computer Science and Computer Technology', '2024-03-01 20:38:14', '2024-03-01 20:38:14'),
(67, 'Digital Logic Design', 'CST-2133', 'Second Year', 'Semester III', 'Computer Science and Computer Technology', '2024-03-01 20:39:16', '2024-03-01 20:39:16'),
(68, 'HTML+CSS', 'CST-2155(SK)', 'Second Year', 'Semester III', 'Computer Science and Computer Technology', '2024-03-01 20:40:01', '2024-03-01 20:40:01'),
(69, 'Calculus II', 'CST-2142', 'Second Year', 'Semester III', 'Computer Science and Computer Technology', '2024-03-01 20:41:04', '2024-03-01 20:41:04'),
(71, 'Traveller B2(II)', 'E-2201', 'Second Year', 'Semester IV', 'Computer Science and Computer Technology', '2024-03-05 10:38:38', '2024-03-05 10:38:38'),
(72, 'Software Engineering', 'CST-2223', 'Second Year', 'Semester IV', 'Computer Science and Computer Technology', '2024-03-05 10:41:14', '2024-03-05 10:43:12'),
(73, 'Linear Algebra', 'CST-2242', 'Second Year', 'Semester IV', 'Computer Science and Computer Technology', '2024-03-05 10:41:55', '2024-03-05 10:41:55'),
(74, 'Web Technology (Java Script Programming)', 'CS-2254', 'Second Year', 'Semester IV', 'Computer Science', '2024-03-05 10:44:49', '2024-03-05 10:44:49'),
(75, 'Advanced Java Programming', 'SS-2205', 'Second Year', 'Semester IV', 'Computer Science and Computer Technology', '2024-03-05 10:46:50', '2024-03-06 01:02:23'),
(76, 'Arduino Fundamentals', 'SS-2231', 'Second Year', 'Semester IV', 'Computer Technology', '2024-03-05 10:48:28', '2024-03-06 21:06:14'),
(77, 'Differential Equations and Numerical Analysis', 'CST-3142', 'Third Year', 'Semester V', 'Computer Science and Computer Technology', '2024-03-05 10:51:59', '2024-03-05 10:51:59'),
(78, 'Software Analysis and Design', 'CST-3124', 'Third Year', 'Semester V', 'Computer Science and Computer Technology', '2024-03-05 10:53:18', '2024-03-05 10:53:18'),
(79, 'Database System Structure', 'CS-3125', 'Third Year', 'Semester V', 'Computer Science', '2024-03-05 10:54:05', '2024-03-05 10:54:05'),
(81, 'Circuits and Electronics', 'CT-2234', 'Second Year', 'Semester IV', 'Computer Technology', '2024-03-06 21:10:18', '2024-03-06 21:10:18'),
(82, 'Principle of Information Technology', 'CST-1101', 'First Year', 'Semester I', 'Computer Science and Computer Technology', '2024-03-06 21:12:12', '2024-03-06 21:12:12'),
(83, 'Data Structures & Algorithms', 'CST-2211', 'Second Year', 'Semester IV', 'Computer Science and Computer Technology', '2024-03-06 21:24:01', '2024-03-06 21:24:01'),
(84, 'Myanmar', 'M-1101', 'First Year', 'Semester I', 'Computer Science and Computer Technology', '2024-03-06 21:42:57', '2024-03-06 21:42:57'),
(85, 'Myanmar(II)', 'M-1201', 'First Year', 'Semester II', 'Computer Science and Computer Technology', '2024-03-06 21:43:31', '2024-03-06 21:43:31');

-- --------------------------------------------------------

--
-- Table structure for table `dates`
--

CREATE TABLE `dates` (
  `id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dates`
--

INSERT INTO `dates` (`id`, `start_date`, `end_date`) VALUES
(1, '2024-01-22 12:12:13', '2024-12-26 19:12:13');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `marks` int(11) NOT NULL,
  `letter_grade` varchar(10) NOT NULL,
  `grade_score` double(10,1) NOT NULL,
  `remark` varchar(10) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `student_id`, `course_id`, `marks`, `letter_grade`, `grade_score`, `remark`, `created_date`, `updated_date`) VALUES
(1, 17, 57, 22, 'F/Abs/l', 0.0, 'Fail', '2024-03-07 23:12:20', '2024-03-07 23:12:20'),
(2, 16, 62, 22, 'F/Abs/l', 0.0, 'Fail', '2024-03-07 23:18:19', '2024-03-07 23:18:19'),
(3, 27, 54, 33, 'F/Abs/l', 0.0, 'Fail', '2024-03-08 15:28:26', '2024-03-08 15:28:46'),
(4, 27, 58, 88, 'A', 4.0, 'Pass', '2025-01-31 19:59:06', '2025-01-31 19:59:06');

-- --------------------------------------------------------

--
-- Table structure for table `prequisites`
--

CREATE TABLE `prequisites` (
  `id` int(11) NOT NULL,
  `course` varchar(50) NOT NULL,
  `prequisite_course` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prequisites`
--

INSERT INTO `prequisites` (`id`, `course`, `prequisite_course`) VALUES
(6, 'Traveller B2', 'English Result(II)'),
(7, 'Programming Language Skills (Java Programming)', 'Programming Logic & design (Programming in C++)'),
(8, 'Advanced Java Programming', 'Programming Language Skills (Java Programming)'),
(11, 'Calculus II', 'Calculus I'),
(12, 'Physics(II) ', 'Physics');

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` int(11) NOT NULL,
  `cr_code` varchar(20) NOT NULL,
  `user_id` varchar(30) NOT NULL,
  `student_name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `course_name` varchar(60) NOT NULL,
  `major` varchar(50) NOT NULL,
  `student_year` varchar(20) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `status` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `registration_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `cr_code`, `user_id`, `student_name`, `email`, `phone`, `course_code`, `course_name`, `major`, `student_year`, `semester`, `academic_year`, `status`, `start_date`, `end_date`, `registration_date`) VALUES
(146, 'Reg-662e7039ef9e2-6b', 'ucspku-000114', 'John', 'john@ucspkku.edu.mm', '09-891082264', 'P-1201', 'Physics(II)', 'Computer Science and Computer Technology', 'First Year', 'Semester I', '2024-2025', 0, '2024-01-22 12:12:13', '2024-06-27 19:12:13', '2024-04-28 22:20:18'),
(147, 'Reg-662e7039ef9e2-6b', 'ucspku-000114', 'John', 'john@ucspkku.edu.mm', '09-891082264', 'CST-1242', 'Discrete Mathematics', 'Computer Science and Computer Technology', 'First Year', 'Semester I', '2024-2025', 0, '2024-01-22 12:12:13', '2024-06-27 19:12:13', '2024-04-28 22:20:18'),
(148, 'Reg-662e7039ef9e2-6b', 'ucspku-000114', 'John', 'john@ucspkku.edu.mm', '09-891082264', 'E-1201', 'English Result(II)', 'Computer Science and Computer Technology', 'First Year', 'Semester I', '2024-2025', 0, '2024-01-22 12:12:13', '2024-06-27 19:12:13', '2024-04-28 22:20:18'),
(149, 'Reg-662e7039ef9e2-6b', 'ucspku-000114', 'John', 'john@ucspkku.edu.mm', '09-891082264', 'CST-1211', 'Programming Logic & design (Programming in C++)', 'Computer Science and Computer Technology', 'First Year', 'Semester I', '2024-2025', 0, '2024-01-22 12:12:13', '2024-06-27 19:12:13', '2024-04-28 22:20:18'),
(150, 'Reg-662e7039ef9e2-6b', 'ucspku-000114', 'John', 'john@ucspkku.edu.mm', '09-891082264', 'M-1201', 'Myanmar(II)', 'Computer Science and Computer Technology', 'First Year', 'Semester I', '2024-2025', 0, '2024-01-22 12:12:13', '2024-06-27 19:12:13', '2024-04-28 22:20:18'),
(151, 'Reg-662e7039ef9e2-6b', 'ucspku-000114', 'John', 'john@ucspkku.edu.mm', '09-891082264', 'CST-1223(SS)', 'Digital Citizenship and Smart Living Society', 'Computer Science and Computer Technology', 'First Year', 'Semester I', '2024-2025', 0, '2024-01-22 12:12:13', '2024-06-27 19:12:13', '2024-04-28 22:20:18');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `value`) VALUES
(1, 'admin', 1),
(2, 'sub_admin', 2),
(3, 'student', 3);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `user_id` varchar(30) NOT NULL,
  `semester` varchar(30) NOT NULL,
  `major` varchar(50) NOT NULL,
  `student_year` varchar(20) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `user_id`, `semester`, `major`, `student_year`, `created_date`, `updated_date`) VALUES
(15, 'ucspku-000111', 'Semester II', 'Computer Science and Computer Technology', 'First Year', '2024-03-06 19:15:06', '2024-03-07 21:03:58'),
(16, 'ucspku-000112', 'Semester II', 'Computer Science and Computer Technology', 'First Year', '2024-03-06 19:19:36', '2024-03-07 21:13:06'),
(17, 'ucspku-000113', 'Semester I', 'Computer Science and Computer Technology', 'First Year', '2024-03-06 19:20:40', '2024-03-06 19:20:40'),
(18, 'ucspku-000114', 'Semester I', 'Computer Science and Computer Technology', 'First Year', '2024-03-06 19:21:53', '2024-03-06 19:21:53'),
(19, 'ucspku-000115', 'Semester III', 'Computer Science', 'First Year', '2024-03-06 19:22:53', '2024-03-08 13:51:24'),
(20, 'ucspku-000116', 'Semester IV', 'Computer Science', 'Second Year', '2024-03-06 19:24:08', '2024-03-07 21:28:02'),
(21, 'ucspku-000117', 'Semester III', 'Computer Science', 'Second Year', '2024-03-06 19:25:30', '2024-03-06 19:25:30'),
(22, 'ucspku-000118', 'Semester III', 'Computer Science', 'Second Year', '2024-03-06 19:27:03', '2024-03-06 19:27:03'),
(23, 'ucspku-000119', 'Semester IV', 'Computer Science', 'Second Year', '2024-03-06 19:28:27', '2024-03-06 19:28:27'),
(24, 'ucspku-000120', 'Semester IV', 'Computer Science', 'Second Year', '2024-03-06 19:29:45', '2024-03-06 19:29:45'),
(25, 'ucspku-000121', 'Semester IV', 'Computer Science', 'Second Year', '2024-03-06 20:40:27', '2024-03-06 20:44:36'),
(26, 'ucspku-000131', 'Semester IV', 'Computer Science', 'Second Year', '2024-03-07 20:19:05', '2024-03-07 20:19:05'),
(27, 'ucspku-000714', 'Semester I', 'Computer Science and Computer Technology', 'First Year', '2024-03-08 13:57:21', '2024-03-08 15:26:10'),
(28, 'ucus', 'Semester V', 'Computer Science', 'Third Year', '2024-03-08 15:39:49', '2024-03-08 15:39:49');

-- --------------------------------------------------------

--
-- Table structure for table `sub_admins`
--

CREATE TABLE `sub_admins` (
  `id` int(11) NOT NULL,
  `user_id` varchar(30) NOT NULL,
  `department` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub_admins`
--

INSERT INTO `sub_admins` (`id`, `user_id`, `department`, `created_date`, `updated_date`) VALUES
(8, 'tt-000001', 'Faculty of Computing', '2024-03-06 19:31:39', '2024-03-06 19:31:39'),
(9, 'tt-000002', 'Faculty of Computer Science', '2024-03-06 20:41:59', '2024-03-06 20:45:46'),
(10, 'tt-000004', 'Information Technology and Service Management', '2024-03-08 14:04:55', '2024-03-08 14:04:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(30) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `profile` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `suspended` int(11) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `password`, `phone`, `gender`, `profile`, `status`, `suspended`, `created_date`, `updated_date`) VALUES
('admin-0001', 1, 'Admin', 'admin@ucspkku.edu.mm', '$2y$10$PqK7QPXYW2uT/fdhHnpEPOnJhgRgaVGnQf.uorhqhbL8EJAposXti', '09-923132332', 'male', 'null', 1, 0, '2024-03-06 18:56:18', '2024-03-06 18:56:18'),
('tt-000001', 2, 'Tom', 'may@ucspkku.edu.mm', '$2y$10$vU2YvsuYlTHaQJW2UIecHeyNBK3ak5Eq4AzPkN9O0QFvdHbXUaZCC', '09-891082043', 'male', 'null', 0, 0, '2024-03-06 19:31:39', '2024-03-06 19:31:39'),
('tt-000002', 2, 'Marry Jame', 'marry@ucspkku.edu.mm', '$2y$10$SuNkfVzOcS8/HJQHQQQG1ujHmF.ObW3GlL2hi7iAyD86xQrQDa1yq', '09-923132330', 'female', 'null', 0, 0, '2024-03-06 20:41:59', '2024-03-06 20:45:46'),
('tt-000004', 2, 'She\'s My Flower', 'simf@gmail.com', '$2y$10$plYFXoOxoF7q6UpQ/By.ZOomKd8AU3jzQpuHJTNsp/4VT0ETNlgGC', 'a', 'female', 'null', 0, 0, '2024-03-08 14:04:54', '2024-03-08 14:04:54'),
('ucspku-000111', 3, 'Harry Hein', 'harryhein@ucspkku.edu.mm', '$2y$10$X0MYLb.ni.k6ua3DhyUtIuS2BstRZDmv1SS7bNpDCwdsasFwWugiq', '09-891082064', 'male', 'null', 1, 0, '2024-03-06 19:15:05', '2024-03-07 17:04:24'),
('ucspku-000112', 3, 'Olivia', 'olivia@ucspkku.edu.mm', '$2y$10$Cb2OO2nMx4zytYpbAQXBDe1cWyZxdIOHIxUT1d9X3CZsIn5KtKITS', '09-881971360', 'female', 'null', 1, 0, '2024-03-06 19:19:36', '2024-03-07 20:57:40'),
('ucspku-000113', 3, 'Taylor', 'taylor@ucspkku.edu.mm', '$2y$10$uSrypzUxAL3/ZK0XS4chAu5d6mVlXZN4fsU/XV/sgtPnCkYA6yTni', '09-923132333', 'female', 'null', 1, 0, '2024-03-06 19:20:40', '2024-03-06 19:20:40'),
('ucspku-000114', 3, 'John', 'john@ucspkku.edu.mm', '$2y$10$lzLUIkGuIsx0Tf/QBzjmVOVUeDNeTywIkPXA3tKVlJNs8JhCflPIW', '09-891082264', 'male', 'null', 1, 0, '2024-03-06 19:21:53', '2024-03-06 19:21:53'),
('ucspku-000115', 3, 'Htoo Aung', 'willsmith@ucspkku.edu.mm', '$2y$10$Y9s9peJOOdUOVneUNIo6Bucj0P9etjyogRAwYi4ehET5FMZsQN/42', '09-881971333', 'male', 'null', 0, 0, '2024-03-06 19:22:53', '2024-03-08 13:51:24'),
('ucspku-000116', 3, 'Justin', 'justin@ucspkku.edu.mm', '$2y$10$U0MEpSSS6VJz8RkjejN4E.lmL1w/5AWRJLHkWNwqImdMKmoLqHwNC', '09-891082224', 'male', 'null', 1, 0, '2024-03-06 19:24:08', '2024-03-06 19:24:08'),
('ucspku-000117', 3, 'Scott Thomas', 'scott@ucspkku.edu.mm', '$2y$10$Anbmv13n/zA2zBMRNofzMOuWepFDvM3D33XYtJbk3l20z4/KTCFcK', '09-923132331', 'male', 'null', 0, 0, '2024-03-06 19:25:30', '2024-03-06 19:25:30'),
('ucspku-000118', 3, 'Bruce', 'bruce@ucspkku.edu.mm', '$2y$10$mLKAi/2.6xEOzVG.hHwFTe5CXuqg3NyCrw5aVAo76BotCb7U//Xde', '09-891082062', 'male', 'null', 0, 0, '2024-03-06 19:27:03', '2024-03-06 19:27:03'),
('ucspku-000119', 3, 'Alice', 'alice@ucspkku.edu.mm', '$2y$10$g9Adt8QSN.0yPin2ZSI6puvg4z3IgNBYWjOALpmM/guo8vC9Ejy4m', '09-891082022', 'female', 'null', 0, 0, '2024-03-06 19:28:27', '2024-03-06 19:28:27'),
('ucspku-000120', 3, 'Bob', 'bob@ucspkku.edu.mm', '$2y$10$Fo8WycgAtaclG/IoGOixV.6kDKfw1F0JqwioJx4iQnm2/UKkG1G9C', '09-791082022', 'male', 'null', 1, 0, '2024-03-06 19:29:45', '2024-03-06 19:29:45'),
('ucspku-000121', 3, 'Michael', 'mike@ucspkku.edu.mm', '$2y$10$16YgLmJwmMV9HL/ZIh1PF.hYlQq7//lQ7Hfsnh5HrA1L4UcpMo6AG', '09-891082367', 'male', 'null', 0, 0, '2024-03-06 20:40:27', '2024-03-06 20:44:35'),
('ucspku-000131', 3, 'Will Smith', 'willsmith@gmail.com', '$2y$10$Apr2/Qk4xzC3B/G5l2R.o.nd12ocheZgQPJhQ780Qz..IbvUmV1cC', '09-894353453', 'male', 'null', 0, 0, '2024-03-07 20:19:05', '2024-03-07 20:19:05'),
('ucspku-000714', 3, 'Aung Kyaw Wai Htun', 'aungkyawwaitun@ucspkku.edu.mm', '$2y$10$ufqxxBjD6xBXWQARLWZqW.RHm/af48ATKTR.kFke1YLnrhQlKupCa', '2494830333', 'male', 'null', 1, 0, '2024-03-08 13:57:21', '2024-03-08 15:23:10'),
('ucus', 3, 'Alice2', 'alice@gmail.com2', '$2y$10$Xw0KJUXm7DSFq7qJM2KCtOozFRFkNhLdwigPigEXAHlRqOmmHsDiu', '747', 'male', 'null', 0, 0, '2024-03-08 15:39:49', '2024-03-08 15:39:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course_name` (`course_name`),
  ADD UNIQUE KEY `course_code` (`course_code`);

--
-- Indexes for table `dates`
--
ALTER TABLE `dates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prequisites`
--
ALTER TABLE `prequisites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course` (`course`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `value` (`value`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sub_admins`
--
ALTER TABLE `sub_admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `dates`
--
ALTER TABLE `dates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `prequisites`
--
ALTER TABLE `prequisites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `sub_admins`
--
ALTER TABLE `sub_admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `sub_admins`
--
ALTER TABLE `sub_admins`
  ADD CONSTRAINT `sub_admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
