DROP DATABASE IF EXISTS evolve_db;

CREATE database evolve_db;

USE evolve_db;

-- CREATE TABLE passport

CREATE TABLE exercise (
id INTEGER NOT NULL AUTO_INCREMENT,
title VARCHAR (50) NOT NULL,
body VARCHAR (500) NOT NULL,
category VARCHAR (20) NOT NULL,
PRIMARY KEY (id)
);