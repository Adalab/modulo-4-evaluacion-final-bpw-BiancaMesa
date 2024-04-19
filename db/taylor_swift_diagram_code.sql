-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema taylor_swift_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema taylor_swift_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `taylor_swift_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `taylor_swift_db` ;

-- -----------------------------------------------------
-- Table `taylor_swift_db`.`album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taylor_swift_db`.`album` (
  `albumId` INT NOT NULL AUTO_INCREMENT,
  `albumName` VARCHAR(45) NOT NULL,
  `cover` LONGTEXT NULL DEFAULT NULL,
  `genre` VARCHAR(45) NULL DEFAULT NULL,
  `releaseDate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`albumId`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `taylor_swift_db`.`song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taylor_swift_db`.`song` (
  `songId` INT NOT NULL AUTO_INCREMENT,
  `songName` VARCHAR(100) NOT NULL,
  `musicVideo` VARCHAR(45) NULL DEFAULT NULL,
  `writtenBy` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`songId`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
