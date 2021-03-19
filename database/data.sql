INSERT INTO Users (name, email, password, phonenumber, streetaddress, city, state, country, postcode, admin)
VALUES ('Bob', 'admin@email.com', 'adminpassword', 99999999, '123 sesame street', 'Sydney', 'NSW', 'Australia', '2000', 't');

INSERT INTO Users (name, email, password, phonenumber, streetaddress, city, state, country, postcode, admin)
VALUES ('Alice', 'customer@email.com', 'customerpassword', 33333333, '343 fake road', 'Toronto', 'ONT', 'Canada', '666', 'f');

INSERT INTO Products(name, category, brand, price, warranty, description, stock)
VALUES
    ('AMD RYZEN 5 3600', 'CPU', 'AMD', 114.99, 'heat death of universe', 'Serious gaming, fully unlocked. Everyone deserves a powerful processor', 10),
    ('ARCTIC Freezer 34 eSports DUO CPU Cooler', 'CPU_Cooling', 'ARCTIC', 39.99, '3 years', 'IMPROVED HEAT DISSIPATION: Evenly spread direct-touch heat pipes and an optimised heat sink design with 54 cooling fins lead to an ideal heat dissipation for the Freezer 34 eSports DUO', 22),
    ('MSI B550-A PRO ATX AM4 Motherboard','Motherboards', 'MSI', 139.99, '1 week', 'Support for 3rd Gen AMD Ryzen processors and future AMD Ryzen processors with BIOS update', 6),
    ('Crucial Ballistix 16 GB (2 x 8 GB) DDR4-3600 CL16 Memory', 'Memory', 'Crucial', 39.99, '10 years', 'Ideal for gamers and performance enthusiasts', 99),
    ('Team MP33 1 TB M.2-2280 NVME Solid State Drive', 'Storage', 'Crucial', 94.99, 'lifetime', 'Buy it or else', 100),
    ('ASRock Radeon RX 5700 XT 8 GB Challenger D OC Video Card', 'Graphics_Cards', 'ASRock', 999.00, '2 years', 'Graphics Engine: AMD Radeon RX 5700 XT Bus Standard: PCI Express 4', 8900),
    ('Phanteks Eclipse P300A Mesh ATX Mid Tower Case', 'Cases', 'Phanteks', 59.99, 'lifetime', 'Ultra-fine Performance Mesh front panel for the best optimal cooling performance; Tempered glass side panel to showcase your build', 1),
    ('EVGA B5 550 W 80+ Bronze Certified Fully Modular ATX Power Supply', 'PSU', 'EVGA', 59.99, 'None', '80 PLUS Bronze certified, with 89% efficiency or higher under typical loads', 24),
    ('ASUS VY279HE 27” Eye Care Monitor, 1080P Full HD, 75Hz, IPS, 1ms, Adaptive-Sync/FreeSync, Eye Care Plus, Color Augmentation, Antibacterial Surface, HDMI VGA, Frameless, VESA Wall Mountable, Black ','Monitors', 'ASUS', 149.99, '2 years', '27-inch Full HD (1920 x 1080) LED backlight display with IPS 178° wide viewing angle panel', 12),
    ('VicTsing MM057 2.4G Wireless Portable Mobile Mouse Optical Mice with USB Receiver, 5 Adjustable DPI Levels, 6 Buttons for Notebook, PC, Laptop, Computer, Macbook - Black ', 'Mouses', 'VicTsing', 9.99, '5 years', 'Comfortable Ergonomic DesignAfter thousands of samples of palm data we designed this ergonomic mouse. The mouse has a streamlined arc and thumb rest to help reduce the stress caused by prolonged use of the mouse. The side pits help reduce slippage and maximize your feeling of use!', 1222),
    ('Intel Core i3-10100 3.6 GHz Quad-Core Processor', 'CPU', 'Intel', 199.99, '1 day',  '4 Cores / 8 Threads', 20);

INSERT INTO CPU(id, cores, threads, base_clock, max_clock, socket, cooler_included, overclockable, power_use)
VALUES
    (1, 6, 12, 3.6, 4.2, 'AM4', 't', 't', '65'),
    (11, 4, 8, 3.6, 4.3, 'LGA1200', 't', 't', '65');

INSERT INTO CPU_Cooling(id, socket, power_use)
VALUES (2, 'AM4 LGA1150 LGA1151 LGA1155 LGA1156 LGA1200 LGA2011 LGA2011-3 LGA2066', '5');

INSERT INTO Motherboards(id, cpu_socket, max_memory_supported, memory_slots, wifi, form_factor_supported, pcie, sata_slots, power_use)
VALUES (3, 'AM4', '64 GB', 4, 'f', 'Micro ATX', '4.0', 3, 100);

INSERT INTO Memory(id, type, frequency, capacity, number_of_sticks, power_use)
VALUES (4, 'DDR4', 3600, 16, 2, 30);

INSERT INTO Storage(id, capacity, format, form_factor, power_use)
VALUES (5, 512, 'SSD', 'M.2-2280', 3);

INSERT INTO Graphics_Cards(id)
VALUES (6);

INSERT INTO Cases(id)
VALUES(7);

INSERT INTO PSU(id)
VALUES (8);

INSERT INTO Monitors(id)
VALUES (9);

INSERT INTO Mouses(id)
VALUES (10);
