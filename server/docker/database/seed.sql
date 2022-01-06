-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 06 jan. 2022 à 20:26
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rate_food`
--

-- --------------------------------------------------------

--
-- Structure de la table `meals`
--

CREATE TABLE `meals` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `start` varchar(255) NOT NULL,
  `end` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `meals`
--

INSERT INTO `meals` (`id`, `name`, `created_at`, `start`, `end`) VALUES
('3b9d3bf5-1942-4b5f-89cb-d886ae209867', 'Dinner', '2021-12-16 16:41:32.509145', '20:00:00 PM', '22:00:00 PM'),
('6fa6ac80-2bb6-4912-95bb-a95e15e6cb59', 'Lunch', '2021-12-16 16:41:32.507998', '12:00:00 PM', '03:00:00 PM');

-- --------------------------------------------------------

--
-- Structure de la table `open_meals`
--

CREATE TABLE `open_meals` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `is_open` tinyint(4) NOT NULL DEFAULT 1,
  `mealId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `rates`
--

CREATE TABLE `rates` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `userId` varchar(36) DEFAULT NULL,
  `mealId` varchar(36) DEFAULT NULL,
  `expression` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `rates`
--

INSERT INTO `rates` (`id`, `created_at`, `userId`, `mealId`, `expression`) VALUES
('361871ff-433f-4401-b46f-94b287621e0d', '2022-01-05 21:11:10.529351', '21dfda52-5af7-4ba8-b7b2-c8402b5a0b99', '3b9d3bf5-1942-4b5f-89cb-d886ae209867', 'GOODN');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `campus_id` int(11) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `version` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `campus_id`, `campus`, `created_at`, `version`) VALUES
('21dfda52-5af7-4ba8-b7b2-c8402b5a0b99', 'Brahim Berkasse', 'bberkass', 21, 'Benguerir', '2021-12-15 15:56:04.761245', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `open_meals`
--
ALTER TABLE `open_meals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_adcf3e97926cdc228328337385c` (`mealId`);

--
-- Index pour la table `rates`
--
ALTER TABLE `rates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_cd296144bf64811ed81e3058af1` (`userId`),
  ADD KEY `FK_078a745ef6a086204d8b4b8b64e` (`mealId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `open_meals`
--
ALTER TABLE `open_meals`
  ADD CONSTRAINT `FK_adcf3e97926cdc228328337385c` FOREIGN KEY (`mealId`) REFERENCES `meals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `rates`
--
ALTER TABLE `rates`
  ADD CONSTRAINT `FK_078a745ef6a086204d8b4b8b64e` FOREIGN KEY (`mealId`) REFERENCES `meals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_cd296144bf64811ed81e3058af1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
