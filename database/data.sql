INSERT INTO Users (name, email, password, phonenumber, streetaddress, city, country, postcode, admin)
VALUES ('Bob', 'admin@email', 'adminpassword', 99999999, '123 sesame street', 'Sydney', 'Australia', '2000', 't');

INSERT INTO Users (name, email, password, phonenumber, streetaddress, city, country, postcode, admin)
VALUES ('Alice', 'customer@email', 'customerpassword', 33333333, '343 fake road', 'Toronto', 'Canada', '666', 'f');

INSERT INTO Products(name, price, type, description, stock)
VALUES ('AMD RYZEN 5 3600', 199.99, 'CPU',  'Serious gaming, fully unlocked. Everyone deserves a powerful processor', 10);

INSERT INTO Products(name, price, type, description, stock)
VALUES
    ('ARCTIC Freezer 34 eSports DUO CPU Cooler', 39.99, 'Cooling', 'IMPROVED HEAT DISSIPATION: Evenly spread direct-touch heat pipes and an optimised heat sink design with 54 cooling fins lead to an ideal heat dissipation for the Freezer 34 eSports DUO', 22),
    ('MSI B550-A PRO ATX AM4 Motherboard', 139.99, 'Motherboards', 'Support for 3rd Gen AMD Ryzen processors and future AMD Ryzen processors with BIOS update', 6),
    ('Crucial Ballistix 16 GB (2 x 8 GB) DDR4-3600 CL16 Memory', 39.99, 'Memory', 'Ideal for gamers and performance enthusiasts', 99),
    ('Team MP33 1 TB M.2-2280 NVME Solid State Drive', 94.99, 'Storage', 'Buy it or else', 100),
    ('ASRock Radeon RX 5700 XT 8 GB Challenger D OC Video Card', 999.00, 'GraphicsCards', 'Graphics Engine: AMD Radeon RX 5700 XT Bus Standard: PCI Express 4', 8900),
    ('Phanteks Eclipse P300A Mesh ATX Mid Tower Case', 59.99, 'Cases', 'Ultra-fine Performance Mesh front panel for the best optimal cooling performance; Tempered glass side panel to showcase your build', 1),
    ('EVGA B5 550 W 80+ Bronze Certified Fully Modular ATX Power Supply', 59.99, 'PSU', '80 PLUS Bronze certified, with 89% efficiency or higher under typical loads', 24),
    ('External DVD Drive, USB 3.0 Portable CD/DVD+/-RW Drive/DVD Player for Laptop CD ROM Burner Compatible with Laptop Desktop PC Windows Linux OS Apple Mac Black ', 29.99, 'OpticalDrives', 'High Writing and Reading Speed】 Max 8x DVDR Write Speed and Max 24x CD Write Speed provide high writing and reading speed', 5),
    ('ASUS VY279HE 27” Eye Care Monitor, 1080P Full HD, 75Hz, IPS, 1ms, Adaptive-Sync/FreeSync, Eye Care Plus, Color Augmentation, Antibacterial Surface, HDMI VGA, Frameless, VESA Wall Mountable, Black ', 149.99, 'Monitors', '27-inch Full HD (1920 x 1080) LED backlight display with IPS 178° wide viewing angle panel', 12),
    ('VicTsing MM057 2.4G Wireless Portable Mobile Mouse Optical Mice with USB Receiver, 5 Adjustable DPI Levels, 6 Buttons for Notebook, PC, Laptop, Computer, Macbook - Black ', 9.99, 'Mice', 'Comfortable Ergonomic DesignAfter thousands of samples of palm data we designed this ergonomic mouse. The mouse has a streamlined arc and thumb rest to help reduce the stress caused by prolonged use of the mouse. The side pits help reduce slippage and maximize your feeling of use!', 1222);

INSERT INTO CPU
VALUES (1, 'AMD', 6);

INSERT INTO Cooling
VALUES (2, 'ARCTIC', 'Red/Black');

INSERT INTO Motherboards
VALUES (3, 'MSI', 'Black/Silver');

INSERT INTO Memory
VALUES (4, 'Crucial', 'Red');

INSERT INTO Storage
VALUES (5, 'Team', 'Hot Pink');

INSERT INTO GraphicsCards
VALUES (6, 'ASRock', 'Black/Yellow');

INSERT INTO Cases
VALUES(7, 'Phanteks', 'Black');

INSERT INTO PSU
VALUES (8, 'EVGA', 'Black');

INSERT INTO OpticalDrives
VALUES (9, 'Gotega', 'Black');

INSERT INTO Monitors
VALUES (10, 'ASUS', '27"');

INSERT INTO Mice
VALUES (11, 'VicTsing', 'Black');
