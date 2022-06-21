-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `portfolio` DEFAULT CHARACTER SET utf8 ;
USE `portfolio` ;

-- -----------------------------------------------------
-- Table `portfolio`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`person` (
  `id_person` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `surname` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `birth_date` DATE NULL,
  `age` VARCHAR(45) NULL,
  `phone` VARCHAR(12) NULL,
  `email` VARCHAR(45) NULL,
  `dni` VARCHAR(45) NULL,
  `lit_about` VARCHAR(200) NULL,
  `about` VARCHAR(200) NULL,
  `photo_url_1` VARCHAR(100) NULL,
  `photo_url_2` VARCHAR(100) NULL,
  PRIMARY KEY (`id_person`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`job_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`job_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`experience` (
  `id` INT NOT NULL,
  `position` VARCHAR(45) NULL,
  `company` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `img_url` VARCHAR(100) NULL,
  `link` VARCHAR(100) NULL,
  `enabled_link` TINYINT NULL,
  `person_id_person` INT NOT NULL,
  `job_type_id` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id_person`, `job_type_id`),
  INDEX `fk_experience_person_idx` (`person_id_person` ASC) VISIBLE,
  INDEX `fk_experience_job_type1_idx` (`job_type_id` ASC) VISIBLE,
  CONSTRAINT `fk_experience_person`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `portfolio`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experience_job_type1`
    FOREIGN KEY (`job_type_id`)
    REFERENCES `portfolio`.`job_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`project` (
  `id` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  `img_url` VARCHAR(100) NULL,
  `link` VARCHAR(100) NULL,
  `enabled_link` TINYINT NULL,
  `person_id_person` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id_person`),
  INDEX `fk_project_person1_idx` (`person_id_person` ASC) VISIBLE,
  CONSTRAINT `fk_project_person1`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `portfolio`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`education`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`education` (
  `id` INT NOT NULL,
  `institute` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `person_id_person` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id_person`),
  INDEX `fk_education_person1_idx` (`person_id_person` ASC) VISIBLE,
  CONSTRAINT `fk_education_person1`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `portfolio`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`skill` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `percentage` VARCHAR(45) NULL,
  `icon` VARCHAR(45) NULL,
  `person_id_person` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id_person`),
  INDEX `fk_skill_person1_idx` (`person_id_person` ASC) VISIBLE,
  CONSTRAINT `fk_skill_person1`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `portfolio`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`social_media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`social_media` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `link` VARCHAR(100) NULL,
  `person_id_person` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id_person`),
  INDEX `fk_social_media_person1_idx` (`person_id_person` ASC) VISIBLE,
  CONSTRAINT `fk_social_media_person1`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `portfolio`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`user` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `level` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
