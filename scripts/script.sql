create database companydb;

use companydb;

CREATE TABLE employee(
id INT(11) NOT NULL auto_increment,
name VARCHAR(45) default NULL,
salary INT(5) default null,
primary key(id)
);

INSERT INTO employee(name, salary) VALUES ('Juan', 800),
('Jeremy', 1500),
('José', 750),
('Emanuel', 1300);

SELECT* FROM employee
