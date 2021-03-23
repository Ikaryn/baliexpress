DROP TYPE IF EXISTS Categories CASCADE;

CREATE TYPE Categories AS ENUM ('Cases', 'CPU_Cooling', 'PC_Cooling', 'CPU', 'Graphics_Cards', 'Memory', 'Mouses', 'Monitors', 'Motherboards', 'PSU', 'Storage', 'Keyboards', 'Wifi_Adaptors' );

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Purchased;
DROP TABLE IF EXISTS CPU;
DROP TABLE IF EXISTS CPU_Cooling;
DROP TABLE IF EXISTS PC_Cooling;
DROP TABLE IF EXISTS Motherboards;
DROP TABLE IF EXISTS Memory;
DROP TABLE IF EXISTS Storage;
DROP TABLE IF EXISTS Graphics_Cards;
DROP TABLE IF EXISTS Cases;
DROP TABLE IF EXISTS PSU;
DROP TABLE IF EXISTS Monitors;
DROP TABLE IF EXISTS Mouses;
DROP TABLE IF EXISTS Keyboards;
DROP TABLE IF EXISTS Wifi_Adaptors;
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
    state       text,
    country     text,
    postcode    varchar(4),
    admin       boolean,
    primary key (id)
);

CREATE TABLE Products(
    id          int GENERATED ALWAYS AS IDENTITY,
    name        text,
    category    text,
    brand       text,
    price       numeric(50, 2),
    image       text,
    warranty    text,
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
    cores           int,
    threads         int,
    base_clock      numeric(5, 1),
    max_clock       numeric(5, 1),
    socket          text,
    cooler_included boolean,
    overclockable   boolean,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE CPU_Cooling(
    id              int,
    socket          text,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE PC_Cooling(
    id              int,
    num_fans        int,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Motherboards(
    id                      int,
    cpu_socket              text,
    max_memory_supported    text,
    memory_slots            int,
    wifi                    boolean,
    form_factor_supported   text,
    pcie                    text,
    sata_slots              int,
    power_use               numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Memory(
    id                  int,
    type                text,
    frequency           int,
    capacity            int,
    number_of_sticks    int,
    power_use           numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Storage(
    id              int,
    capacity        int,
    format          text,
    form_factor     text,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Graphics_Cards(
    id              int,
    clock_speed     numeric(5, 1),
    memory_size     int,
    interface       text,
    memory_type     text,
    cuda_cores      text,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Cases(
    id              int,
    colour          text,
    size            text,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE PSU(
    id                  int,
    wattage             int,
    power_efficiency    text,
    modularity          text,
    power_use           numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Monitors(
    id              int,
    size            int,
    resolution      int,
    refresh_rate    int,
    aspect_ratio    text,
    panel_type      text,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Mouses(
    id              int,
    connectivity    text,
    ambidextrous    boolean,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Keyboards(
    id              int,
    mechanical      boolean,
    connectivity    text,
    backlight       text,
    size            text,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);


CREATE TABLE Wifi_Adaptors(
    id          int,
    socket      text,
    power_use   numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Builds(
    buildid     int GENERATED ALWAYS AS IDENTITY,
    userid      int,
    buildname        text,
    description text,
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
