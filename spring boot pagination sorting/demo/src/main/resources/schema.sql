

DROP TABLE IF EXISTS books;

CREATE TABLE book (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  author VARCHAR(250) NOT NULL
);