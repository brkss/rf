-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: rf
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `meals`
--

DROP TABLE IF EXISTS `meals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meals` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `start` varchar(255) NOT NULL,
  `end` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meals`
--

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;
INSERT INTO `meals` VALUES ('3b9d3bf5-1942-4b5f-89cb-d886ae209867','Dinner','2021-12-16 16:41:32.509145','20:00:00 PM','22:00:00 PM'),('6fa6ac80-2bb6-4912-95bb-a95e15e6cb59','Lunch','2021-12-16 16:41:32.507998','12:00:00 PM','03:00:00 PM');
/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `open_meals`
--

DROP TABLE IF EXISTS `open_meals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `open_meals` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `is_open` tinyint NOT NULL DEFAULT '1',
  `mealId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_adcf3e97926cdc228328337385c` (`mealId`),
  CONSTRAINT `FK_adcf3e97926cdc228328337385c` FOREIGN KEY (`mealId`) REFERENCES `meals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `open_meals`
--

LOCK TABLES `open_meals` WRITE;
/*!40000 ALTER TABLE `open_meals` DISABLE KEYS */;
/*!40000 ALTER TABLE `open_meals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rates`
--

DROP TABLE IF EXISTS `rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rates` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `userId` varchar(36) DEFAULT NULL,
  `mealId` varchar(36) DEFAULT NULL,
  `expression` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cd296144bf64811ed81e3058af1` (`userId`),
  KEY `FK_078a745ef6a086204d8b4b8b64e` (`mealId`),
  CONSTRAINT `FK_078a745ef6a086204d8b4b8b64e` FOREIGN KEY (`mealId`) REFERENCES `meals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_cd296144bf64811ed81e3058af1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rates`
--

LOCK TABLES `rates` WRITE;
/*!40000 ALTER TABLE `rates` DISABLE KEYS */;
INSERT INTO `rates` VALUES ('361871ff-433f-4401-b46f-94b287621e0d','2022-01-05 21:11:10.529351','21dfda52-5af7-4ba8-b7b2-c8402b5a0b99','3b9d3bf5-1942-4b5f-89cb-d886ae209867','GOODN');
/*!40000 ALTER TABLE `rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `campus_id` int NOT NULL,
  `campus` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('21dfda52-5af7-4ba8-b7b2-c8402b5a0b99','Brahim Berkasse','bberkass',21,'Benguerir','2021-12-15 15:56:04.761245',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-06 20:13:55
