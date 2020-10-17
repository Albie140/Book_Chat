DROP DATABASE IF EXISTS bookchat_db;

CREATE DATABASE bookchat_db;
USE bookchat_db;


ALTER TABLE Clubs ADD COLUMN book_rating VARCHAR(15) AFTER picture_url;