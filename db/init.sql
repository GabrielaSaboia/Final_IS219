CREATE DATABASE usersData;
use usersData;

CREATE TABLE IF NOT EXISTS tblUsersImport (
    `id` int AUTO_INCREMENT,
    `fName` VARCHAR(21) CHARACTER SET utf8,
    `lName` VARCHAR(21) CHARACTER SET utf8,
    `username` VARCHAR(30) CHARACTER SET utf8,
    `password` VARCHAR(50) CHARACTER SET utf8,
    `email` VARCHAR(100) CHARACTER SET utf8,
    PRIMARY KEY (`id`)
);
INSERT INTO tblUsersImport (fName,lName,username,password,email) VALUES
('Gabriela', 'Saboia', 'GSaboia', '123456', 'g@gmail.com'),
('Eileen', 'Wilson', 'WilsonE', '874291', 'EWilson@gmail.com'),
('John', 'Stamos', 'Stamos_still', 'inittowinit', 'inittowinit@gmail.com'),
('Zack', 'Efron', 'TheFron', 'jbdqiuw', 'thefron@gmail.com'),
('Arabella', 'Martinez', 'Arabell', '00000000', 'bella@gmail.com'),
('Elliot', 'Parker', 'EParker', 'Parkedout', 'pweezy@gmail.com');
