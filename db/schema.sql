-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema book
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema book
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `book` DEFAULT CHARACTER SET latin1 ;
USE `book` ;

-- -----------------------------------------------------
-- Table `book`.`books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book`.`books` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `book_id` VARCHAR(16) NOT NULL,
  `title` VARCHAR(320) NOT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `book_id` (`book_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 526
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `book`.`imageLinks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book`.`imageLinks` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `smallThumbnail` VARCHAR(500) NOT NULL,
  `thumbnail` VARCHAR(500) NOT NULL,
  `bid` INT(4) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_imageLinks_1_idx` (`bid` ASC),
  CONSTRAINT `fk_imageLinks_1`
    FOREIGN KEY (`bid`)
    REFERENCES `book`.`books` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 213
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `book`.`listPrice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book`.`listPrice` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `ammount` INT(8) NOT NULL,
  `currency_code` VARCHAR(32) NOT NULL,
  `bid` INT(4) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_listPrice_1_idx` (`bid` ASC),
  CONSTRAINT `fk_listPrice_1`
    FOREIGN KEY (`bid`)
    REFERENCES `book`.`books` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 163
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `book`.`retailPrice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book`.`retailPrice` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `ammount` INT(8) NOT NULL,
  `currency_code` VARCHAR(32) NOT NULL,
  `bid` INT(4) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_retailPrice_1_idx` (`bid` ASC),
  CONSTRAINT `fk_retailPrice_1`
    FOREIGN KEY (`bid`)
    REFERENCES `book`.`books` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 203
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `book`.`saleInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book`.`saleInfo` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(32) NOT NULL,
  `saleability` VARCHAR(32) NOT NULL,
  `isEbook` TINYINT(1) NOT NULL DEFAULT '0',
  `lid` INT(4) NOT NULL,
  `rid` INT(4) NOT NULL,
  `bid` INT(4) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_saleInfo_1_idx` (`bid` ASC),
  INDEX `fk_saleInfo_2_idx` (`lid` ASC),
  INDEX `fk_saleInfo_3_idx` (`rid` ASC),
  CONSTRAINT `fk_saleInfo_1`
    FOREIGN KEY (`bid`)
    REFERENCES `book`.`books` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_saleInfo_2`
    FOREIGN KEY (`lid`)
    REFERENCES `book`.`listPrice` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_saleInfo_3`
    FOREIGN KEY (`rid`)
    REFERENCES `book`.`retailPrice` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `book`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book`.`users` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(64) NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  `bid` INT(4) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_1_idx` (`bid` ASC),
  CONSTRAINT `fk_users_1`
    FOREIGN KEY (`bid`)
    REFERENCES `book`.`books` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
