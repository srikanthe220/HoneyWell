-- MySQL dump 10.13  Distrib 5.7.15, for Win64 (x86_64)
--
-- Host: localhost    Database: honeywell
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `admin_id` int(11) DEFAULT NULL,
  `user_mail` varchar(30) NOT NULL,
  `password` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`user_mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'something@gmail.com','12345');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dynamic_routing`
--

DROP TABLE IF EXISTS `dynamic_routing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dynamic_routing` (
  `EMac_Addr` varchar(50) NOT NULL,
  `RMac_Addr` varchar(20) NOT NULL,
  PRIMARY KEY (`EMac_Addr`,`RMac_Addr`),
  KEY `RMac_Addr` (`RMac_Addr`),
  CONSTRAINT `dynamic_routing_ibfk_1` FOREIGN KEY (`RMac_Addr`) REFERENCES `routerip` (`RMac_Addr`) ON DELETE CASCADE,
  CONSTRAINT `dynamic_routing_ibfk_2` FOREIGN KEY (`EMac_Addr`) REFERENCES `employee` (`EMac_Addr`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dynamic_routing`
--

LOCK TABLES `dynamic_routing` WRITE;
/*!40000 ALTER TABLE `dynamic_routing` DISABLE KEYS */;
INSERT INTO `dynamic_routing` VALUES ('3C-07-71-54-4C-29','dc:ee:06:65:f6:f8'),('d0:53:49:61:6b:ab','dc:ee:06:65:f6:f8'),('sf:df:43:aa:24:','dc:ee:06:65:f6:f8');
/*!40000 ALTER TABLE `dynamic_routing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `emp_id` int(11) NOT NULL,
  `First_name` varchar(20) NOT NULL,
  `Last_name` varchar(20) NOT NULL,
  `EMac_Addr` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  PRIMARY KEY (`EMac_Addr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'nishanth','M L','3c-07-71-54-4c-29','nishanth.lakshesh@gmail.com'),(1,'srikanth','E','d0:53:49:61:6b:ab','srikanthe220@gmail.com'),(2,'nishanth','M','sf:df:43:aa:24:','something@gmail.com');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routerip`
--

DROP TABLE IF EXISTS `routerip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `routerip` (
  `rou_id` int(5) DEFAULT NULL,
  `RMac_Addr` varchar(50) NOT NULL,
  `Floor` int(4) NOT NULL,
  `Pillar` int(5) NOT NULL,
  `post` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`RMac_Addr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routerip`
--

LOCK TABLES `routerip` WRITE;
/*!40000 ALTER TABLE `routerip` DISABLE KEYS */;
INSERT INTO `routerip` VALUES (1,'b0:7f:b9:0e:25:40',0,5,'21:44'),(2,'dc:ee:06:65:f6:f8',4,6,'10:33');
/*!40000 ALTER TABLE `routerip` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-02 17:11:00
