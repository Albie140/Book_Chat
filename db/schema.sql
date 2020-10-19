DROP DATABASE IF EXISTS bookchat_db;

CREATE DATABASE bookchat_db;
USE bookchat_db;


ALTER TABLE Clubs ADD COLUMN book_description VARCHAR(15) AFTER book_rating;