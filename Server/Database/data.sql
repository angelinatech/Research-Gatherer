
-- *~*~*~* how the database is set up *~*~*~* 

-- CREATE DATABASE multiSearchApp;

CREATE TABLE usercollection (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    url VARCHAR(255),
    date VARCHAR(300),
    username VARCHAR(300)
);

CREATE TABLE appUsers (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
    username VARCHAR(30)
)