DROP TYPE IF EXISTS Categories CASCADE;

CREATE TYPE Categories AS ENUM ('Cases', 'Cooling', 'CPU', 'Graphics Cards', 'Memory', 'Mice', 'Monitors', 'Motherboards', 'Optical Drives', 'PSU', 'Storage' );

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Purchased;
DROP TABLE IF EXISTS CPU;
DROP TABLE IF EXISTS Cooling;
DROP TABLE IF EXISTS Motherboards;
DROP TABLE IF EXISTS Memory;
DROP TABLE IF EXISTS Storage;
DROP TABLE IF EXISTS GraphicsCards;
DROP TABLE IF EXISTS Cases;
DROP TABLE IF EXISTS PSU;
DROP TABLE IF EXISTS OpticalDrives;
DROP TABLE IF EXISTS Monitors;
DROP TABLE IF EXISTS Mice;
DROP TABLE IF EXISTS Builds CASCADE;
DROP TABLE IF EXISTS BuildParts;
DROP TABLE IF EXISTS Reviews;

CREATE TABLE Users(
    id          int GENERATED ALWAYS AS IDENTITY,
    name        text,
    email       varchar(40),
    password    varchar(35),
    phonenumber int,
    streetaddress text,
    city        text,
    country     text,
    postcode    varchar(4),
    admin       boolean,
    primary key (id)
);

CREATE TABLE Products(
    id          int GENERATED ALWAYS AS IDENTITY,
    name        text,
    price       numeric(50, 2),
    type        text,
    image       text,
    description text,
    stock       int,
    primary key (id)
);

CREATE TABLE Orders(
    id      int GENERATED ALWAYS AS IDENTITY,
    userid  integer,
    date    date,
    primary key (id),
    foreign key (userid) references Users(id)
);

CREATE TABLE Purchased(
    orderid     integer,
    productid   integer,
    quantity    integer,
    primary key (orderid, productid),
    foreign key (orderid) references Orders(id),
    foreign key (productid) references Users(id)
);

CREATE TABLE CPU(
    id              int,
    manufacturer    text,
    corecount       int,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE Cooling(
    id              int,
    manufacturer    text,
    colour          text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE Motherboards(
    id              int,
    manufacturer    text,
    colour          text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE Memory(
    id              int,
    manufacturer    text,
    colour          text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE Storage(
    id              int,
    manufacturer    text,
    colour          text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE GraphicsCards(
    id              int,
    manufacturer    text,
    colour          text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE Cases(
    id              int,
    manufacturer    text,
    colour          text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE PSU(
    id              int,
    manufacturer    text,
    colour          text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE OpticalDrives(
    id              int,
    manufacturer    text,
    colour          text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE Monitors(
    id              int,
    manufacturer    text,
    screensize      text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE Mice(
    id              int,
    manufacturer    text,
    colour          text,
    primary key (id),
    foreign key (id) references Products(id)
);

CREATE TABLE Builds(
    buildid int GENERATED ALWAYS AS IDENTITY,
    userid  int,
    primary key (buildid),
    foreign key (userid) references Users(id)
);

CREATE TABLE BuildParts(
    buildid     int,
    productid   int,
    quantity    int,
    primary key (buildid, productid),
    foreign key (buildid) references Builds(buildid),
    foreign key (productid) references Products(id)
);

CREATE TABLE Reviews(
    productid   int,
    userid      int,
    rating      int,
    reviewtext  text,
    reviewdate  date,
    primary key (productid, userid),
    foreign key (productid) references Products(id),
    foreign key (userid) references Users(id)
);
