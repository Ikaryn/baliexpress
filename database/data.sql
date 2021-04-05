INSERT INTO Users (name, email, password, phonenumber, streetaddress, city, state, country, postcode, admin)
VALUES ('Bob', 'admin@email.com', 'adminpassword', 99999999, '123 sesame street', 'Sydney', 'NSW', 'Australia', '2000', 't');

INSERT INTO Users (name, email, password, phonenumber, streetaddress, city, state, country, postcode, admin)
VALUES ('Alice', 'customer@email.com', 'customerpassword', 33333333, '343 fake road', 'Toronto', 'ONT', 'Canada', '666', 'f');

-- CPUs
INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
VALUES
    ('AMD Ryzen 5 5600X 6 Core AM4 4.6GHz CPU Processor',									'CPU',	'AMD',		549, 	'3 years',	'High speed gaming performance', 											2000,	'2000-03-14'),
    ('AMD Ryzen 5 2600 6-Core Socket AM4 3.4GHz CPU Processor with Wraith Stealth Cooler',	'CPU',	'AMD',		229,	'3 years',	'Efficiency and dependability', 											200,	'2006-11-07'),
    ('AMD Ryzen 7 5800X 8 Core AM4 4.7GHz CPU Processor',									'CPU',	'AMD',		735,	'3 years',	'The elite gaming processor', 												1000,'2012-10-14'),
    ('AMD Ryzen 7 3700X 8 Core AM4 3.6GHz CPU with Wraith Prism RGB Cooler', 				'CPU',	'AMD',		489,	'3 years',	'A beautifully balanced design for serious PC enthusiasts', 				350, '2016-08-14'),
    ('Intel Core i9 10900K 10 Core LGA 1200 3.70GHz CPU Processor', 						'CPU',	'Intel',	699,	'3 years',	'Elite real-world performance for ultimate gaming & content creation', 		575, ' 2019-01-29'),
    ('Intel Core i7 9700K 8 Core LGA 1151 3.6GHz CPU Processor', 							'CPU',	'Intel',	449,	'2 years',	'Game, record, stream. Without compromise.', 								200, '2002-12-30'),
    ('Intel Core i7 10700 8 Core LGA 1200 2.90GHz CPU Processor', 							'CPU',	'Intel',	459,	'3 years',	'Elite real-world performance for competitive gaming & content creation',	1500, '2010-08-05'),
    ('Intel Core i3 10100 Quad Core LGA 1200 3.6GHz CPU Processor',						 	'CPU',	'Intel',	169,	'1 year',	'Elite real-world performance for everyday productivity', 					5000, '2012-09-03'),
    ('Intel Core i9 9900K 8 Core LGA 1151 3.6GHz CPU Processor',							'CPU',	'Intel',	559,	'2 years',	'Take your creativity to the next level', 									150, '2017-01-29'),
    ('Intel Core i5 10600 6 Core LGA 1200 3.30GHz CPU Processor',							'CPU',	'Intel',	329,	'3 years',	'Elite real-world performance for seamless gameplay & entertainment', 		1000, '2018-09-17'),
    ('Intel Core i9 7980XE Eighteen Core LGA 2066 2.6 GHz CPU Processor',					'CPU',	'Intel',	2834,	'5 years',	'Create to the power of X', 												80, '2020-01-13'),
    ('AMD Ryzen Threadripper 3970X 32 Core Socket TRX40 3.7GHz CPU Processor',				'CPU',	'AMD',		2899,	'5 years',	'The world''s most powerful desktop processor for creators', 				50, '2014-11-28');

INSERT INTO CPU(id, cores, threads, base_clock, max_clock, socket, cooler_included, overclockable, power_use)
VALUES
    (1,		6,	12,	3.7,	4.6,	'AM4', 		FALSE, 	TRUE,	65),
    (2,		6,	12, 3.4,	3.9,	'AM4', 		TRUE,	TRUE,	47),
    (3,		8,	16, 3.8,	4.7,	'AM4', 		FALSE, 	TRUE,	105),
    (4,		8,	16, 3.6,	4.4,	'AM4', 		TRUE, 	TRUE,	65),
    (5,		10,	20,	3.7,	5.3,	'LGA 1200',	FALSE, 	TRUE,	125),
    (6,		8,	8,	3.6,	4.9,	'LGA 1151',	FALSE,	TRUE,	95),
    (7,		8,	16,	2.9,	4.8,	'LGA 1200',	TRUE,	FALSE,	65),
    (8,		4,	8,	3.6,	4.3,	'LGA 1200',	TRUE,	FALSE,	65),
    (9,		8,	16,	3.6,	5,		'LGA 1151',	FALSE,	TRUE,	95),
    (10,	6,	12,	3.3,	4.8,	'LGA 1200',	TRUE,	FALSE,	65),
    (11,	18,	36,	2.6,	4.2,	'LGA 2066',	FALSE,	TRUE,	165),
    (12,	32,	64,	3.7,	4.5,	'TRX40',	FALSE,	TRUE,	280);

-- Motherboards
INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
    VALUES
    ('MSI MAG B550M Mortar WiFi AM4 mATX Motherboard', 				'Motherboards',	'MSI',		239,	'3 years',	'Conquer the battlefield',															2500, '2016-07-02'),
    ('Gigabyte Z490I Aorus Ultra LGA 1200 ITX Motherboard',			'Motherboards',	'Gigabyte',	389,	'3 years',	'Soar to new heights',																2000, '2017-10-25'),
    ('Gigabyte B550 Aorus Master AM4 ATX Motherboard',				'Motherboards',	'Gigabyte',	299,	'3 years',	'Ultimate power design',															1500, '2017-11-18'),
    ('Asus ROG Strix X570-E Gaming AM4 ATX Motherboard',			'Motherboards',	'Asus',		419,	'5 years',	'Build a formidable weapon above the rest',											1000, '2019-07-25'),
    ('ASRock Z390 Pro4 ATX LGA1151 Motherboard',					'Motherboards',	'ASRock',	115,	'1 year',	'Reliable productivity',															500, '2010-10-24'),
    ('MSI Z390 Plus LGA 1151 ATX Motherboard OEM Brown box',		'Motherboards',	'MSI',		99,		'1 year',	'Easy to DIY with simple setup and use',											500, '2012-03-28'),
    ('Asus ROG Strix Z390-F Gaming ATX LGA1151 Motherboard',		'Motherboards',	'Asus',		325,	'3 years',	'Brilliant design, perfect for gamign',												750, '2014-10-13'),
    ('ASRock B360M-HDV LGA1151 Motherboard',						'Motherboards',	'ASRock',	79,		'5 years',	'Entry level VR ready',																300, '2020-10-13'),
    ('Asus ROG Strix Z490-G Gaming Wifi LGA 1200 mATX Motherboard',	'Motherboards',	'Asus',		389,	'3 years',	'Designed to unleash the maximum performance of 10th Gen Intel Core processors',	1000, '2020-11-01'),
    ('MSI MEG Z490I Unify LGA 1200 ITX Motherboard',				'Motherboards',	'MSI',		429,	'3 years',	'Master the game',																	1200, '2010-06-11'),
    ('Gigabyte A520I AC AM4 ITX Motherboard',						'Motherboards',	'Gigabyte',	159,	'2 years',	'Meet the A-Team',																	700, '2014-03-21'),
    ('ASRock B365M-ITX/AC WiFi LGA 1151 ITX Motherboard',			'Motherboards',	'ASRock',	188,	'1 year',	'Fulfilling the need of performance',												350, '2016-10-10'),
    ('Asus Prime B450M-K mATX Motherboard',							'Motherboards',	'Asus',		75,		'1 year',	'Solid foundation for your first build',											200, '2017-04-23'),
    ('Asus X299 Rampage VI Extreme Encore LGA 2066 Motherboard',	'Motherboards',	'Asus',		1299,	'5 years',	'Finest power delivery and maximum connectivity',									150, '2018-04-27');

INSERT INTO Motherboards(id, cpu_socket, memory_slots, wifi, form_factor_supported, pcie_slots, pcie_type, sata_slots, power_use)
VALUES
    (13,	'AM4',	    4,	TRUE,	'mATX',		2,	3,	6,	60),
    (14,	'LGA 1200',	2,	TRUE,	'ITX',		1,	2, 	4,	65),
    (15,	'AM4',	    4,	TRUE,	'ATX',		2,	4, 	6,	75),
    (16,	'AM4',	    4,	TRUE,	'ATX',		4,	4, 	8,	80),
    (17,	'LGA 1151',	4,	TRUE,	'ATX',		2,	1, 	6,	50),
    (18,	'LGA 1151',	4,	FALSE,	'ATX',		2,	3, 	6,	55),
    (19,	'LGA 1151',	4,	FALSE,	'ATX',		2,	4, 	6,	60),
    (20,	'LGA 1151',	2,	FALSE,	'mATX',		1,	4, 	6,	55),
    (21,	'LGA 1200',	4,	FALSE,	'mATX',		2,	4, 	4,	70),
    (22,	'LGA 1200',	2,	FALSE,	'ITX',		1,	3, 	4,	50),
    (23,	'AM4',	    2,	FALSE,	'ITX',    	1,	1, 	4,	50),
    (24,	'LGA 1151',	2,	TRUE,	'ITX',		1,	3, 	4,	55),
    (25,	'AM4',	    2,	FALSE,	'mATX',		1,	4, 	4,	60),
    (26,	'LGA 2066',	8,	FALSE,	'E-ATX',	3,	2, 	8,	100);

-- Memory
INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
VALUES
    ('Silicon Power 16GB (2x8GB) RGB DDR4 3600MHz CL18 Turbine Gaming Desktop Memory RAM', 	'Memory',	'Silicon Power',	159,	'Lifetime',	'Guaranteed quality',																			1000, '2010-08-23'),
    ('Corsair 16GB (2x8GB) CMH16GX4M2D3600C18 Vengeance RGB Pro SL 3600Mhz DDR4 RAM',		'Memory',	'Corsair',			159,	'Lifetime',	'Visualize, synchronize, memorize',																800, '2010-09-25'),
    ('G Skill 32GB (2X16G)F4-3200C16D-32GVK RipJaws V 3200MHz DDR4 RAM - Black',			'Memory',	'G.Skill',			219,	'1 year	',	'Feel the rush of Ripjaws V',																	1500, '2016-10-05'),
    ('G.Skill 8GB (1x8GB)F4-3200C16S-8GIS Aegis 3200MHz DDR4 RAM',							'Memory',	'G.Skill',			63,		'1 year',	'Power efficient',																				400, '2017-04-01'),
    ('G.Skill RipJaws V 8GB KIT 4GBX2 DDR4 2400Mhz 1 20V',									'Memory',	'G.Skill',			69,		'1 year',	'Rigorously Tested for Compatibility and Reliability',											600, '2019-10-20'),
    ('Corsair 16GB (2 x8) CMK16GX4M2B3200C16W DDR4 3200MHz Vengeance LPX DIMM White',		'Memory',	'Corsair',			129,	'1 year',	'Designed for high-performance overclocking',													1200, '2010-11-07'),
    ('Corsair 32GB (2x16GB) CMW32GX4M2A2666C16 Vengeance RGB Pro 2666MHz DDR4 RAM',			'Memory',	'Corsair',			228,	'1 year',	'Delivering the best in DDR4 performance',														1500, '2011-05-04'),
    ('Kingston 16GB (1x16GB) KCP426SD8/16 2666MHz DDR4 SODIMM RAM',							'Memory',	'Kingston',			129,	'1 year',	'Reliable performance for running more processes',												300, '2013-01-25'),
    ('Kingston 32GB (2x16GB) HX432C16FB3K2/32 HyperX Fury 3200MHz DDR4 RAM - Black',		'Memory',	'Kingston',			205,	'Lifetime',	'Unleash your style. Unleash your FURY',														1300, '2015-07-06'),
    ('Kingston 16GB (2x8GB) HX432C16PB3AK2/16 HyperX Predator RGB 3200Mhz DDR4 RAM',		'Memory',	'Kingston',			164,	'1 year',	'Predator DDR4',																				1600, '2019-02-02'),
    ('Silicon Power 32GB (2x16GB) DDR4 3200MHz CL16 Turbine Gaming Desktop Memory RAM',		'Memory',	'Silicon Power',	245,	'Lifetime',	'Boost up to next level performance',															1000, '2011-06-30'),
    ('Corsair 64GB (4x16GB) CMT64GX4M4C3466C16 Dominator Platinum RGB 3466MHz DDR4 RAM',	'Memory',	'Corsair',			799,	'2 years',	'Redefining premium DDR4 memory with superior aluminium craftsmanship',							300, '2013-12-12'),
    ('Kingston 64GB (4x16GB) KVR24R17S4K4/64I ValueRam 2400MHz DDR4 ECC RAM',				'Memory',	'Kingston',			1459,	'5 years',	'Engineered to meet industry standard specifications and rigorously tested to ensure quality',	200, '2015-04-16'),
    ('Corsair 64GB(8x8GB)CMW64GX4M8C3000C15W DDR4 3000MHz Vengeance Pro RGB',				'Memory',	'Corsair',			1145,	'1 year',	'Optimized for peak performance on the latest Intel and AMD DDR4 motherboards',					400, '2017-01-31'),
    ('G.Skill 64GB (2x32GB) F4-3200C16D-64GVK 3200MHz DDR4 RAM Black',						'Memory',	'G.Skill',			499	,	'Lifetime',	'Cutting-edge performance with the latest Intel Core processors	',								700, '2021-03-04');

INSERT INTO Memory (id, frequency, capacity, number_of_sticks, power_use)
VALUES
    (27,	3600,	16,	2,	4),
    (28,	3600,	16,	2,	5),
    (29,	3200,	32,	2,	6),
    (30,	3200,	8,	1,	3),
    (31,	2400,	8,	2,	4),
    (32,	3200,	16,	2,	5),
    (33,	2666,	32,	2,	6),
    (34,	2666,	16,	1,	5),
    (35,	3200,	32,	2,	6),
    (36,	3200,	16,	2,	5),
    (37,	3200,	32,	2,	6),
    (38,	3466,	64,	4,	8),
    (39,	2400,	64,	4,	7),
    (40,	3400,	64,	8,	8),
    (41,	3200,	64,	2,	7);

--Storage
INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
VALUES
    ('Seagate 18TB IronWolf Pro 3.5in SATA Hard Drive (ST18000NE000)', 							'Storage',	'Seagate',			839,	'5 years',	'Be tough. Be ready',											500, '2011-07-17'),
    ('Seagate Barracuda 4TB ST4000DM004 Desktop HDD 4TB, SATA3, 3.5", 256MB',					'Storage',	'Seagate',			123,	'1 year',	'Good value for money',											800, '2011-07-26'),
    ('Western Digital Purple WD40PURZ 3.5" PURPLE 4TB Intellipower 64MB SATA III(6Gbps)3YRS',	'Storage',	'Western Digital',	139,	'3 years',	'Performance you can trust',									1000, '2012-09-24'),
    ('Western Digital Blue 1TB SATA3 HDD 64M Caviar Blue WD10EZEX',								'Storage',	'Western Digital',	57,		'2 years',	'More value, more reliability',									2000, '2012-12-28'),
    ('Western Digital 2.5" BLACK, 500GB 7200RPM SATA 6Gb/s 7MM',								'Storage',	'Western Digital',	68,		'1 year',	'Maximum performance. No compromises',							1500, '2017-06-08'),
    ('Seagate Barracuda 2TB 2.5inch 7mm Form Factor 128mb Cache 5400RPM SATA 6Gb/s',			'Storage',	'Seagate',			125,	'1 year',	'Versatile, fast, and dependable',								1000, '2010-10-05'),
    ('Seagate BarraCuda 4TB 2.5 ST4000LM024 15mm 2.5inch 128mb 5400RPM SATA 6Gb/s',				'Storage',	'Seagate',			239,	'1 year',	'Versatility with large storage',								700, '2012-01-23'),
    ('ADATA XPG 512GB SX8200 Pro M.2 NVMe SSD',													'Storage',	'ADATA',			114,	'5 years',	'Designed for avid PC enthusiasts, gamers, and overclockers.',	1700, '2012-11-03'),
    ('Samsung 1TB 970 EVO Plus M.2 NVMe SSD',													'Storage',	'Samsung',			199,	'5 years',	'The ultimate in performance, upgraded',						2500, '2014-10-08'),
    ('Samsung 1TB M.2 SSD 860 EVO',																'Storage',	'Samsung',			159,	'5 years',	'The SSD to trust',												800, '2019-04-09'),
    ('Silicon Power 1TB P34A80 M.2 NVMe SSD PCIe Gen3x4 TLC R/W up to 3,400/3,000 MB/s',		'Storage',	'Silicon Power',	180,	'5 years',	'Boost up your computer',										1000, '2011-09-02'),
    ('Samsung 4TB 870 EVO 2.5in SATA SSD',														'Storage',	'Samsung',			569,	'5 years',	'The world''s favourite SSD',									3000, '2012-08-01'),
    ('Crucial MX500 2TB 3D NAND SATA 6Gbps 2.5 SSD 560MB/s 510MB/s',							'Storage',	'Crucial',			285,	'1 year',	'Performance. Price. Crucial MX500 - A solid combination.',		1800, '2013-06-27'),
    ('Crucial MX500 1TB M.2 Type 2280SS SSD',													'Storage',	'Crucial',			149,	'1 year',	'The best value in SATA',										2000, '2020-01-06'),
    ('Crucial P5 1TB 3D NAND NVMe PCIe M.2 SSD',												'Storage',	'Crucial',			189,	'5 years',	'Extra fast. Extraordinary',									800, '2020-08-29'),
    ('Western Digital 2TB Black SN850 Gen4 M.2 NVMe PCIe SSD',									'Storage',	'Western Digital',	699,	'5 years',	'SSD performance storage that redefines speed',					750, '2010-10-29');

INSERT INTO Storage(id, capacity, format, form_factor, power_use)
VALUES
    (42,	18000,	'HDD',	'3.5in',	7),
    (43,	4000,	'HDD',	'3.5in',	6),
    (44,	4000,	'HDD',	'3.5in',	5),
    (45,	1000,	'HDD',	'3.5in',	4),
    (46,	500,	'HDD',	'2.5in',	4),
    (47,	2000,	'HDD',	'2.5in',	4),
    (48,	4000,	'HDD',	'2.5in',	5),
    (49,	512,	'SSD',	'M.2 NVMe',	5),
    (50,	1000,	'SSD',	'M.2 NVMe',	6),
    (51,	1000,	'SSD',	'M.2 SATA',	4),
    (52,	1000,	'SSD',	'M.2 NVMe',	5),
    (53,	4000,	'SSD',	'2.5in',	6),
    (54,	2000,	'SSD',	'2.5in',	5),
    (55,	1000,	'SSD',	'M.2 SATA',	5),
    (56,	1000,	'SSD',	'M.2 NVMe',	6),
    (57,	2000,	'SSD',	'M.2 NVMe',	6);

-- Graphics cards
INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
VALUES
    ('Asus ROG Strix GeForce RTX 3080 OC 10G Graphics Card',					'Graphics_Cards',	'Asus',		2199,	'3 years',	'Take flight',													100, '2010-10-29'),
    ('MSI GeForce RTX 3080 Suprim X 10G Graphics Card',							'Graphics_Cards',	'MSI',		2299,	'3 years',	'Change the game',												80, '2011-03-10'),
    ('Gigabyte GeForce GTX 1070 Ti Gaming 8GB Graphics Card',					'Graphics_Cards',	'Gigabyte',	997,	'2 years',	'Game in style',												50, '2013-08-11'),
    ('EVGA GeForce RTX 2080 Super Black Gaming 8G Graphics Card',				'Graphics_Cards',	'EVGA',		1099,	'5 years',	'Graphics reinvented',											50, '2014-01-18'),
    ('Gigabyte GeForce RTX 2060 R2.0 6G OC Graphics Card',						'Graphics_Cards',	'Gigabyte',	799,	'3 years',	'Revised power and performance',								75, '2015-09-18'),
    ('MSI GeForce GTX 1650 Super Gaming X 4G Graphics Card',					'Graphics_Cards',	'MSI',		289,	'3 years',	'Play hard stay silent',										30, '2012-08-01'),
    ('Inno3D GeForce RTX 3070 iChill X4 8G Graphics Card',						'Graphics_Cards',	'Inno3D',	1439,	'2 years',	'Brutal by nature',												45, '2012-09-06'),
    ('Galax GeForce RTX 3070 SG 1-Click OC 8G Graphics Card',					'Graphics_Cards',	'Galax',	1539,	'2 years',	'The ultimate play',											70, '2016-10-23'),
    ('Asus GeForce RTX 3070 Dual 8G Graphics Card',								'Graphics_Cards',	'Asus',		1349,	'3 years',	'Better, faster, stronger',										35, '2018-08-26'),
    ('Asus ROG STRIX GeForce RTX 3070 8G Graphics Card',						'Graphics_Cards',	'Asus',		1499,	'3 years',	'Next level in gaming performance',								50, '2021-02-05'),
    ('Galax GeForce RTX 2070 Super EX Gamer Black Edition 8G Graphics Card',	'Graphics_Cards',	'Galax',	649,	'2 years',	'"What''s your game? My game is Galax"',						120, '2013-10-28'),
    ('MSI GeForce RTX 2070 Super Ventus GP 8G OC Graphics Card',				'Graphics_Cards',	'MSI',		749,	'3 years',	'Premium design and performance',								110, '2015-08-21'),
    ('Gigabyte GeForce GTX 1650 Super Windforce 4G OC Graphics Card',			'Graphics_Cards',	'Gigabyte',	399,	'3 years',	'Built strong',													50, '2017-05-06'),
    ('Galax GeForce GTX 1650 Super EX 1 Click OC 4G Graphics Card',				'Graphics_Cards',	'Galax',	299,	'1 year',	'Reliable gaming',												60, '2018-05-06'),
    ('Asus GeForce GT 1030 2GB GDDR5',											'Graphics_Cards',	'Asus',		149,	'3 years',	'Perfect for quiet home theater PCs and multimedia centers',	200, '2018-07-02'),
    ('Asus Cerberus GeForce GTX 1050 Ti OC 4GB Video Card',						'Graphics_Cards',	'Asus',		259,	'3 years',	'Enhanced reliability and performance',							150, '2010-02-28'),
    ('MSI GeForce GT 1030 Low Profile Fan OC 2G Graphics Card',					'Graphics_Cards',	'MSI',		139,	'3 years',	'Great for HD video and picture editing',						100, '2012-08-02');

INSERT INTO Graphics_Cards(id, clock_speed, memory_size, interface, memory_type, cuda_cores, pcie_type, power_use)
VALUES
    (58,	1905,	10,	'2x HDMI 2.1, 3x DisplayPort 1.4',				'GDDR6X',	8704, 	3,	470),
    (59,	1905,	10,	'1x HDMI 2.1, 3x DisplayPort 1.4',				'GDDR6X',	8704,  	2, 	370),
    (60,	1683,	8,	'1x HDMI 2.0, 3x DisplayPort 1.4',				'GDDR5',	2432, 	4,	180),
    (61,	1815,	8,	'1x HDMI 2.0, 3x DisplayPort 1.4',				'GDDR6',	3072, 	4,	250),
    (62,	1755,	6,	'1x HDMI 2.0, 3x DisplayPort 1.4',				'GDDR6',	1920, 	1,	170),
    (63,	1755,	4,	'1x HDMI 2.0, 3x DisplayPort 1.4',				'GDDR6',	1280, 	4,	100),
    (64,	1785,	8,	'1x HDMI 2.1, 3x DisplayPort 1.4',				'GDDR6',	5888, 	3,	340),
    (65,	1740,	8,	'1x HDMI 2.1, 3x DisplayPort 1.4',				'GDDR6',	5888, 	4,	340),
    (66,	1725,	8,	'2x HDMI 2.1, 3x DisplayPort 1.4',				'GDDR6',	5888, 	3,	340),
    (67,	1725,	8,	'2x HDMI 2.1, 3x DisplayPort 1.4',				'GDDR6',	5888, 	2,	350),
    (68,	1815,	8,	'1x HDMI 2.0, 3x DisplayPort 1.4',				'GDDR6',	2560, 	1,	215),
    (69,	1785,	8,	'1x HDMI 2.0, 3x DisplayPort 1.4',				'GDDR6',	2560, 	4,	235),
    (70,	1755,	4,	'1x HDMI 2.0, 1x DisplayPort 1.4',				'GDDR6',	1280, 	4,	100),
    (71,	1740,	4,	'1x HDMI 2.0, 1x DisplayPort 1.4',				'GDDR6',	1280,	3, 	100),
    (72,	1468,	2,	'1x HDMI 2.0, 1x DVI-D',						'GDDR5',	384,	4,	34),
    (73,	1455,	4,	'1x HDMI 2.0, 1x DisplayPort 1.4, 1x DVI-D',	'GDDR5',	768,	4,	75),
    (74,	1518,	2,	'1x HDMI 2.0, 1x DisplayPort 1.4',				'GDDR5',	384,	4,	30);

-- Cases
INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
VALUES
    ('MSI MAG Forge 100R RGB TG Mid Tower ATX Case', 						'Cases',	'MSI',				99,		'1 year',	'Beyond the power',																			300, '2017-02-08'),
    ('Silverstone Sugo Series Mesh Mini ITX Case - Pink',					'Cases',	'Silverstone',		69,		'1 year',	'Truly compact',																			120, '2017-03-03'),
    ('MSI MAG Vampiric 010X ARGB TG Mid Tower ATX Case',					'Cases',	'MSI',				79,		'2 years',	'First blood in shadow',																	170, '2018-04-24'),
    ('CoolerMaster MasterBox Q300P, mATX RGB Lighting Control',				'Cases',	'Cooler Master',	119,	'1 year',	'High flexibility for system building',														200, '2014-02-23'),
    ('AZZA Apollo 430 ARGB Tempered Glass ATX Case - Black',				'Cases',	'AZZA',				79,		'1 year',	'Mid tower gaming case with style',															300, '2016-10-11'),
    ('AZZA Iris 330 ARGB Tempered Glass ATX Case',							'Cases',	'AZZA',				69,		'1 year',	'Standard mid tower ATX case, with extra bell and whistles',								250, '2019-10-17'),
    ('Thermaltake View 71 Tempered Glass Snow Edition Full Tower Chassis',	'Cases',	'Thermaltake',		255,	'1 year',	'Thermaltake premium',																		150, '2020-03-31'),
    ('be quiet! Dark Base Pro 900 E-ATX Case Rev 2 - Black',				'Cases',	'be quiet!',		345,	'3 years',	'The perfect case for all who expect the highest standards when it comes to modularity',	100, '2020-07-02'),
    ('Thermaltake S100 Snow Edition Tempered Glass Micro ATX Case - White',	'Cases',	'Thermaltake',		89,		'1 year',	'Slim and compact design',																	150, '2010-08-07'),
    ('Cooler Master MasterBox NR200P TG Mini ITX Case',						'Cases',	'Cooler Master',	149,	'2 years',	'Big features, small sie',																	80, '2010-08-31'),
    ('Fractal Design Node 304 Mini ITX Case - Black',						'Cases',	'Fractal Design',	129,	'2 years',	'Unique modular interior for outstanding configurability',									75, '2011-03-21');

INSERT INTO Cases(id, colour, size, motherboard_support)
VALUES
    (75,	'Black',	'Mid Tower',	'ATX/mATX/ITX'),
    (76,	'Pink',		'Cube',			'ITX'),
    (77,	'Black',	'Mid Tower',	'ATX/mATX/ITX'),
    (78,	'Black',	'Mini Tower',	'mATX/ITX'),
    (79,	'Gray',		'Mid Tower',	'ATX/mATX'),
    (80,	'Black',	'Mid Tower',	'ATX'),
    (81,	'White',	'Full Tower',	'E-ATX/ATX/mATX/ITX'),
    (82,	'Black',	'Full Tower',	'E-ATX/ATX/mATX/ITX'),
    (83,	'White',	'Mini Tower',	'mATX/ITX'),
    (84,	'Black',	'Mini Tower',	'ITX'),
    (85,	'Black',	'Cube',			'ITX');

INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
VALUES
    ('Corsair 450w CV450 80+ Bronze Power Supply (CP-9020209-AU)',				'PSU',	'Corsair',		45,		'1 year',	'Quiet and dependable 80 PLUS Bronze efficiency',																	300, '2011-11-26'),
    ('Thermaltake 650W Smart BX1 80+ Bronze Power Supply',						'PSU',	'Thermaltake',	99,		'5 years',	'Built to deliver 80 PLUS Bronze with 88% power efficiency',														700, '2020-07-08'),
    ('Corsair 650W CX650F RGB 80+ Bronze Power Supply (CP-9020217-AU)',			'PSU',	'Corsair',		138,	'5 years',	'Steady power. Spectacular colour',																					500, '2011-01-05'),
    ('Corsair 650W RM650x Fully Modular 80+ Gold Power Supply (CP-9020178-AU)',	'PSU',	'Corsair',		165,	'10 years',	'Tuned for low-noise operation',																					600, '2013-09-01'),
    ('Thermaltake 600W Smart 80+ Gold OEM Power Supply (PS-TTP-0600NNFAGA-1)',	'PSU',	'Thermaltake',	109,	'3 years',	'The perfect upgrade for your humble system',																		400, '2013-10-03'),
    ('Thermaltake TR2 S 450W 80PLUS Power Supply',								'PSU',	'Thermaltake',	59,		'3 years',	'Built for PC users that are looking for reliable, high efficiency and dependable power at an affordable price.',	700, '2016-09-24'),
    ('SilverStone 700W Strider Essential 80+ Power Supply (ST70F-ES230)',		'PSU',	'Silverstone',	89,		'3 years',	'Designed for high affordability and great performance',															1100, '2017-07-26'),
    ('Gigabyte 850W Aorus 80 Plus Gold Modular Power Supply (GP-AP850GM)',		'PSU',	'Gigabyte',		169,	'3 years',	'Power overwhelming',																								500, '2011-01-23'),
    ('EVGA 700w GQ 80+ Gold Power Supply (21E-GQ-700W)',						'PSU',	'EVGA',			119,	'5 years',	'Reduce clutter and improve airflow',																				1500, '2012-02-09'),
    ('EVGA 850W GQ 80+ Gold Power Supply (210-GQ-0850-V4)',						'PSU',	'EVGA',			199,	'5 years',	'Great quality, great value',																						2000, '2014-12-31'),
    ('be quiet! 700W System Power 9 80+ Bronze Power Supply (BN921)',			'PSU',	'be quiet!',	115,	'3 years',	'Very quiet operation',																								400, '2015-02-08'),
    ('Thermaltake Toughpower 1200W 80+ GOLD',									'PSU',	'Thermaltake',	309,	'1 year',	'Stable performance and unbeatable efficiency',																		200, '2020-07-23'),
    ('SilverStone ET750-G 750W 80Plus Essential Power Supply',					'PSU',	'Silverstone',	135,	'3 years',	'Providing enthusiasts with affordable, but highly efficient choices when building PCs.',							800, '2012-03-15'),
    ('Asus ROG Strix 850W 80+ Gold Power Supply (ROG-STRIX-850G)',				'PSU',	'Asus',			269,	'10 years',	'Frozen silence',																									150, '2012-11-22'),
    ('Corsair 850W HX850 80 Plus Platinum High Performance Power Supply',		'PSU',	'Corsair',		269,	'1 year',	'Quiet, efficient operation',																						900, '2013-11-10'),
    ('Thermaltake 850W Toughpower PF1 80+ Platinum RGB Modular Power Supply',	'PSU',	'Thermaltake',	319,	'10 years',	'Glow with the flow',																								500, '2019-05-14'),
    ('Corsair 1000W HX1000 80 Plus Platinum High Performance Power Supply',		'PSU',	'Corsair',		349,	'10 years',	'Platinum efficiency, fully modular and virtually silent',															300, '2021-01-12'),
    ('Thermaltake 650W Toughpower PF1 80+ Platinum Modular Power Supply',		'PSU',	'Thermaltake',	199,	'10 years',	'Premium edition with platinum efficiency',																			750, '2010-01-09'),
    ('Corsair 850W AX 80+ Titanium Modular ATX Power Supply',					'PSU',	'Corsair',		349,	'10 years',	'80 PLUS Titanium efficient power and ultra-low-noise operation to complete your most ambitious builds',			900, '2010-06-30'),
    ('be quiet! 1200W Dark Power Pro 12 80+ Titanium Power Supply (BN816)',		'PSU',	'be quiet!',	649,	'10 years',	'World class power regulation',																						100, '2011-12-02'),
    ('SilverStone ET550-HG Essential Series 80 Plus Gold Power Supply',			'PSU',	'Silverstone',	128,	'3 years',	'Seeking the best enthusiast value for money',																		850, '2018-04-25'),
    ('EVGA 600w GD 80+ Gold Power Supply (21E-GD-600W)',						'PSU',	'EVGA',			89,		'5 years',	'Solid gold foundation',																							1500, '2018-08-20');

INSERT INTO PSU(id, wattage, power_efficiency, modularity)
VALUES
(86,	450,	'Bronze',		'Not'),
(87,	650,	'Bronze',		'Not'),
(88,	650,	'Bronze',		'Fully'),
(89,	650,	'Gold',			'Fully'),
(90,	600,	'Gold',			'Not'),
(91,	450,	'Certified',	'Not'),
(92,	700,	'Certified',	'Not'),
(93,	850,	'Gold',			'Fully'),
(94,	700,	'Gold',			'Semi'),
(95,	850,	'Gold',			'Semi'),
(96,	700,	'Bronze',		'Semi'),
(97,	1200,	'Gold',			'Semi'),
(98,	750,	'Gold',			'Not'),
(99,	850,	'Gold',			'Not'),
(100,	850,	'Platinum',		'Fully'),
(101,	850,	'Platinum',		'Fully'),
(102,	1000,	'Platinum',		'Fully'),
(103,	650,	'Platinum',		'Fully'),
(104,	850,	'Titanium',		'Fully'),
(105,	1200,	'Titanium',		'Fully'),
(106,	550,	'Gold',			'Semi'),
(107,	600,	'Gold',			'Not');
