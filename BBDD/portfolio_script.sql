-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`person` (
  `id_person` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `surname` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `birth_date` VARCHAR(10) NULL,
  `age` VARCHAR(10) NULL,
  `phone` VARCHAR(25) NULL,
  `email` VARCHAR(45) NULL,
  `lit_about` VARCHAR(80) NULL,
  `about` VARCHAR(200) NULL,
  PRIMARY KEY (`id_person`),
  UNIQUE INDEX `id_person_UNIQUE` (`id_person` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`education`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`education` (
  `id_education` INT NOT NULL AUTO_INCREMENT,
  `where` VARCHAR(100) NULL,
  `degree` VARCHAR(45) NULL,
  `is_actual` TINYINT NULL,
  `start_date` VARCHAR(10) NULL,
  `end_date` VARCHAR(10) NULL,
  `img_url` VARCHAR(200) NULL,
  `link` VARCHAR(200) NULL,
  `enabled_link` TINYINT NULL,
  `person_id_person` INT NOT NULL,
  PRIMARY KEY (`id_education`, `person_id_person`),
  UNIQUE INDEX `id_education_UNIQUE` (`id_education` ASC) VISIBLE,
  INDEX `fk_education_person_idx` (`person_id_person` ASC) VISIBLE,
  CONSTRAINT `fk_education_person`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `mydb`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `level` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`image` (
  `id_image` INT NOT NULL AUTO_INCREMENT,
  `header` VARCHAR(200) NULL,
  `about` VARCHAR(200) NULL,
  `person_id_person` INT NOT NULL,
  PRIMARY KEY (`id_image`, `person_id_person`),
  UNIQUE INDEX `id_image_UNIQUE` (`id_image` ASC) VISIBLE,
  INDEX `fk_image_person1_idx` (`person_id_person` ASC) VISIBLE,
  CONSTRAINT `fk_image_person1`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `mydb`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`skill` (
  `id_skill` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `percentage` VARCHAR(10) NULL,
  `icon` VARCHAR(45) NULL,
  `person_id_person` INT NOT NULL,
  PRIMARY KEY (`id_skill`, `person_id_person`),
  UNIQUE INDEX `id_skill_UNIQUE` (`id_skill` ASC) VISIBLE,
  INDEX `fk_skill_person1_idx` (`person_id_person` ASC) VISIBLE,
  CONSTRAINT `fk_skill_person1`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `mydb`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`project` (
  `id_project` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  `img_url` VARCHAR(200) NULL,
  `link` VARCHAR(200) NULL,
  `enabled_link` TINYINT NULL,
  `projectcol` VARCHAR(45) NULL,
  `person_id_person` INT NOT NULL,
  PRIMARY KEY (`id_project`, `person_id_person`),
  UNIQUE INDEX `id_project_UNIQUE` (`id_project` ASC) VISIBLE,
  INDEX `fk_project_person1_idx` (`person_id_person` ASC) VISIBLE,
  CONSTRAINT `fk_project_person1`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `mydb`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`job_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`job_type` (
  `id_job_type` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id_job_type`),
  UNIQUE INDEX `id_job_type_UNIQUE` (`id_job_type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`experience` (
  `id_experience` INT NOT NULL AUTO_INCREMENT,
  `company` VARCHAR(45) NULL,
  `job` VARCHAR(45) NULL,
  `is_actual` TINYINT NULL,
  `start_date` VARCHAR(10) NULL,
  `end_date` VARCHAR(10) NULL,
  `img_url` VARCHAR(200) NULL,
  `link` VARCHAR(200) NULL,
  `enabled_link` TINYINT NULL,
  `person_id_person` INT NOT NULL,
  `job_type_id_job_type` INT NOT NULL,
  PRIMARY KEY (`id_experience`, `person_id_person`, `job_type_id_job_type`),
  UNIQUE INDEX `id_experience_UNIQUE` (`id_experience` ASC) VISIBLE,
  INDEX `fk_experience_person1_idx` (`person_id_person` ASC) VISIBLE,
  INDEX `fk_experience_job_type1_idx` (`job_type_id_job_type` ASC) VISIBLE,
  CONSTRAINT `fk_experience_person1`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `mydb`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experience_job_type1`
    FOREIGN KEY (`job_type_id_job_type`)
    REFERENCES `mydb`.`job_type` (`id_job_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`social_media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`social_media` (
  `id_social_media` INT NOT NULL,
  `facebook` VARCHAR(100) NULL,
  `twitter` VARCHAR(100) NULL,
  `instagram` VARCHAR(100) NULL,
  `github` VARCHAR(100) NULL,
  `linkedin` VARCHAR(100) NULL,
  `person_id_person` INT NOT NULL,
  PRIMARY KEY (`id_social_media`, `person_id_person`),
  INDEX `fk_social_media_person1_idx` (`person_id_person` ASC) VISIBLE,
  CONSTRAINT `fk_social_media_person1`
    FOREIGN KEY (`person_id_person`)
    REFERENCES `mydb`.`person` (`id_person`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
