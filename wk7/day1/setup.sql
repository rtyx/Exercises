DROP TABLE actors;

CREATE TABLE actors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER,
    oscars INTEGER
);

INSERT INTO actors (name, age, oscars) VALUES ('Leonardo DiCaprio', '41', '1');
INSERT INTO actors (name, age, oscars) VALUES ('Jennifer Lawrence', '25', '1');
INSERT INTO actors (name, age, oscars) VALUES ('Samuel L. Jackson', '67', '0');
INSERT INTO actors (name, age, oscars) VALUES ('Meryl Streep', '66', '3');
INSERT INTO actors (name, age, oscars) VALUES ('John Cho', '43', '0');

SELECT * from actors;

SELECT * from actors WHERE oscars > 1;

SELECT * from actors WHERE age > 30;
