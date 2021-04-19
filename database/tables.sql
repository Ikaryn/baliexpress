DROP TYPE IF EXISTS Categories CASCADE;

CREATE TYPE categories AS ENUM ('Cases', 'CPU_Cooling', 'PC_Cooling', 'CPU', 'Graphics_Cards', 'Memory', 'Mouses', 'Monitors', 'Motherboards', 'PSU', 'Storage', 'Keyboards', 'Wifi_Adaptors');

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Order_Items;
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
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS Review_Votes;
DROP TABLE IF EXISTS Reports;
DROP TABLE IF EXISTS Sales CASCADE;
DROP TABLE IF EXISTS Sale_Products;


CREATE TABLE Users(
    id              int GENERATED ALWAYS AS IDENTITY,
    name            text NOT NULL,
    email           varchar(40) UNIQUE NOT NULL,
    password        varchar(35) NOT NULL,
    phonenumber     text UNIQUE NOT NULL,
    streetaddress   text,
    city            text,
    state           text,
    country         text,
    postcode        text,
    admin           boolean,
    primary key (id)
);

CREATE TABLE Products(
    id              int GENERATED ALWAYS AS IDENTITY,
    name            varchar(150) NOT NULL,
    category        categories NOT NULL,
    brand           text,
    price           numeric(50, 2) NOT NULL,
    image           text,
    warranty        text,
    description     text,
    stock           int DEFAULT 0 CHECK (stock >= 0),
    release_date    date,
    sold            int DEFAULT 0,
    discontinued    boolean DEFAULT 'f',
    primary key (id)
);

CREATE TABLE Orders(
    id      int GENERATED ALWAYS AS IDENTITY,
    userid  integer NOT NULL,
    date    date NOT NULL,
    streetaddress   text,
    city            text,
    state           text,
    country         text,
    postcode        text,
    total           numeric(50, 2), 
    primary key (id),
    foreign key (userid) references Users(id)
);

CREATE TABLE Order_Items(
    orderid     integer,
    productid   integer,
    quantity    integer NOT NULL CHECK (quantity > 0),
    primary key (orderid, productid),
    foreign key (orderid) references Orders(id) on delete CASCADE,
    foreign key (productid) references Products(id)
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
    memory_slots            int,
    wifi                    boolean,
    form_factor_supported   text,
    pcie_slots              int,
    pcie_type               int,
    sata_slots              int,
    power_use               numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Memory(
    id                  int,
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
    pcie_type       int,
    power_use       numeric(50, 1),
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Cases(
    id                      int,
    colour                  text,
    size                    text,
    motherboard_support     text,
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE PSU(
    id                  int,
    wattage             int,
    power_efficiency    text,
    modularity          text,
    primary key (id),
    foreign key (id) references Products(id) on delete CASCADE
);

CREATE TABLE Monitors(
    id              int,
    size            text,
    resolution      text,
    refresh_rate    text,
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
    userid      int NOT NULL,
    buildname   text NOT NULL,
    description text,
    primary key (buildid),
    foreign key (userid) references Users(id)
);

CREATE TABLE BuildParts(
    buildid     int,
    productid   int,
    quantity    int NOT NULL CHECK (quantity > 0),
    primary key (buildid, productid),
    foreign key (buildid) references Builds(buildid) on delete CASCADE,
    foreign key (productid) references Products(id) on delete CASCADE
);

CREATE TABLE Reviews(
    reviewid    int GENERATED ALWAYS AS IDENTITY UNIQUE,
    productid   int,
    userid      int,
    rating      int NOT NULL CHECK (rating <= 5) CHECK (rating >= 0),
    reviewtext  text,
    reviewdate  date NOT NULL,
    primary key (productid, userid),
    foreign key (productid) references Products(id) on delete CASCADE,
    foreign key (userid) references Users(id) on delete CASCADE
);

CREATE TABLE Review_Votes(
    reviewid    int,
    voterid     int,
    vote        int NOT NULL CHECK (vote IN (-1, 1)),
    primary key (reviewid, voterid),
    foreign key (reviewid) references Reviews(reviewid) on delete CASCADE,
    foreign key (voterid) references Users(id) on delete CASCADE
);

CREATE TABLE Reports(
    reportid    int GENERATED ALWAYS AS IDENTITY UNIQUE,
    reviewid    int,
    reason      text,
    primary key (reportid),
    foreign key (reviewid) references Reviews(reviewid) on delete CASCADE
);

CREATE TABLE Sales(
    id          int GENERATED ALWAYS AS IDENTITY,
    name        text,
    startdate   date NOT NULL,
    enddate     date NOT NULL,
    image       text,
    primary key (id)
);

CREATE TABLE Sale_Products(
    saleid          int,
    productid       int,
    salepercent     int NOT NULL,
    sold            int DEFAULT 0,
    primary key (saleid, productid),
    foreign key (saleid) references Sales(id) on delete CASCADE,
    foreign key (productid) references Products(id) on delete CASCADE
);
