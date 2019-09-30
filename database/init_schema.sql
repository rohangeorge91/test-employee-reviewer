/* role for the member */
CREATE TABLE `test_database`.`member_role` (
  `role` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`role`));

INSERT INTO `test_database`.`member_role` (`role`, `description`) VALUES ('admin', 'The system admin, responsible for connecting the reviewee and reviewer. Assessment year etc.');
INSERT INTO `test_database`.`member_role` (`role`, `description`) VALUES ('member', 'The employee or member of the system who can perform edit operation but not assignment etc.');

/* the member with the role*/
CREATE TABLE `test_database`.`member` (
  `user_id` VARCHAR(100) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_member_role`
    FOREIGN KEY (`role`)
    REFERENCES `test_database`.`member_role` (`role`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);

INSERT INTO `test_database`.`member` (`user_id`, `name`, `role`) VALUES ('johndoe', 'John Doe', 'admin');
INSERT INTO `test_database`.`member` (`user_id`, `name`, `role`) VALUES ('jane', 'Jane Doe', 'member');
INSERT INTO `test_database`.`member` (`user_id`, `name`, `role`) VALUES ('john', 'Johnny', 'member');
INSERT INTO `test_database`.`member` (`user_id`, `name`, `role`) VALUES ('rohan', 'Rohan', 'member');
INSERT INTO `test_database`.`member` (`user_id`, `name`, `role`) VALUES ('sam', 'Sammy', 'member');

/* the year for which the review was assessed for */
CREATE TABLE `test_database`.`assessment_year` (
  `year` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`year`));

INSERT INTO `test_database`.`assessment_year` (`year`) VALUES ('2017');
INSERT INTO `test_database`.`assessment_year` (`year`) VALUES ('2018');

/* the review attribute which is associated with a set of values */
CREATE TABLE `test_database`.`review_attribute` (
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`name`));

ALTER TABLE `test_database`.`review_attribute` 
ADD COLUMN `order_by` INT NOT NULL AFTER `description`;

ALTER TABLE `test_database`.`review_attribute` 
ADD UNIQUE INDEX `order_by_UNIQUE` (`order_by` ASC);

INSERT INTO `test_database`.`review_attribute` (`name`, `description`, `order_by`) VALUES ('Attendance', 'Attendance to work', '1');
INSERT INTO `test_database`.`review_attribute` (`name`, `description`, `order_by`) VALUES ('Punctuality', 'Punctuality to work', '2');
INSERT INTO `test_database`.`review_attribute` (`name`, `description`, `order_by`) VALUES ('Technical Skill', 'Technical Skill to work', '3');
INSERT INTO `test_database`.`review_attribute` (`name`, `description`, `order_by`) VALUES ('Quality of Work', 'Quality of the work', '4');

/* the values which can be set for a given review attribute */
CREATE TABLE `test_database`.`review_attribute_value` (
  `value` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`value`));

ALTER TABLE `test_database`.`review_attribute_value` 
ADD COLUMN `weight` INT(11) NOT NULL AFTER `description`;

/* inserts for attribute value*/
INSERT INTO `test_database`.`review_attribute_value` (`weight`, `value`, `description`) VALUES (0, '', 'Absent attribute. This usually means the the attribute was not present during that assessment');
INSERT INTO `test_database`.`review_attribute_value` (`weight`, `value`, `description`) VALUES (1, 'unsatisfactory', 'The indivduals effort is not adequate for the given criteria (below expectations)');
INSERT INTO `test_database`.`review_attribute_value` (`weight`, `value`, `description`) VALUES (2, 'satisfactory', 'The indivduals effort is adequate for the given criteria (Just enough)');
INSERT INTO `test_database`.`review_attribute_value` (`weight`, `value`, `description`) VALUES (3, 'good', 'The individuals effort is above the adequate for the given criteria (better than expectations).');
INSERT INTO `test_database`.`review_attribute_value` (`weight`, `value`, `description`) VALUES (4, 'excellent', 'The individuals effort is way above adequate for the given criteria (beyond expectations).');
INSERT INTO `test_database`.`review_attribute_value` (`weight`, `value`, `description`) VALUES (0, 'not applicable', 'The individual value for the given criteria is not applicable (not something which can be measured)');

/* review assessment table which connect reviewee, reviewer, assessment_year and the review summary */
CREATE TABLE `test_database`.`review_assessment` (
  `id` BIGINT NOT NULL,
  `reviewee_id` VARCHAR(50) NOT NULL,
  `reviewer_id` VARCHAR(50) NOT NULL,
  `assessment_year` VARCHAR(50) NOT NULL,
  `summary` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_review_assessment_reviewee`
    FOREIGN KEY (`reviewee_id`)
    REFERENCES `test_database`.`member` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_assessment_reviewer`
    FOREIGN KEY (`reviewer_id`)
    REFERENCES `test_database`.`member` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_assessment_assessment_year`
    FOREIGN KEY (`assessment_year`)
    REFERENCES `test_database`.`assessment_year` (`year`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

/*
  unique reviewee, reviewer and assessment year ensure two review from the same person can't be inserted
  for the same assessment year.
*/
ALTER TABLE `test_database`.`review_assessment`
ADD UNIQUE INDEX `unique_reviewee_reviewer_assessment_year`
(`reviewee_id` ASC, `reviewer_id` ASC, `assessment_year` ASC);



/* the performance_review has 1 to many connection to review_attribute and review_attribute_value */
CREATE TABLE `test_database`.`review_assessment_attribute` (
  `id` BIGINT NOT NULL,
  `review_id` BIGINT NOT NULL,
  `attribute` VARCHAR(50) NOT NULL,
  `value` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_review_assessment_attribute_review_id_idx` (`review_id` ASC),
  CONSTRAINT `fk_review_assessment_attribute_review_id`
    FOREIGN KEY (`review_id`)
    REFERENCES `test_database`.`review_assessment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_assessment_attribute_attribute`
    FOREIGN KEY (`attribute`)
    REFERENCES `test_database`.`review_attribute` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_assessment_attribute_attribute_value`
    FOREIGN KEY (`value`)
    REFERENCES `test_database`.`review_attribute_value` (`value`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

