--- Schema
DROP DATABASE IF EXISTS automentor_db;

CREATE DATABASE automentor_db;
USE automentor_db;


-- note: you should let sequelize to generate the tables instead

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `role` (`role`)
);

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `choices` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `next_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
);

CREATE TABLE `results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `user_answer` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `results_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_users_name ON users (first_name, last_name); 
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_quizzes_category_id ON quizzes (category_id);
CREATE INDEX idx_quizzes_type_id ON quizzes (type_id); 
CREATE INDEX idx_quizzes_question ON quizzes (question);
CREATE INDEX idx_quizzes_choices ON quizzes (choices);
CREATE INDEX idx_quizzes_answer ON quizzes (answer);
CREATE INDEX idx_quizzes_next ON quizzes (next_id);
CREATE INDEX idx_results_user_answer ON results (user_answer);
CREATE INDEX idx_results_score ON results (score);
