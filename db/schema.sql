create database burgers_db;
use burgers_db;
create table burgers (
id int not null auto_increment,
primary key (id),
burger_name varchar(120),
devoured boolean
);