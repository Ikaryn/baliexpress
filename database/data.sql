-- Admin account
INSERT INTO Users (name, email, password, phonenumber, streetaddress, city, state, country, postcode, admin)
VALUES
    ('Bob', 'admin@email.com', 'adminpassword', '99999999', '123 sesame street', 'Sydney', 'NSW', 'Australia', '2000', 't');

-- Regular users
INSERT INTO Users (name, email, password, phonenumber, streetaddress, city, state, country, postcode, admin)
VALUES
    ('Alice',		'customer@email.com',	'customerpassword',	'33333333', 	'343 fake road',					'Toronto', 			'ONT', 	'Canada',	'666', 	 'f'),
    ('Terrence', 	'terrence@email.com', 	'12345', 			'004 839 9111', '4462 Rivendell Drive', 			'LIBBY',			'MT', 	'USA', 		'59923', 'f'),
    ('Bilal', 		'bilal@email.com', 		'123456', 			'004 371 3082', '2926 Pennsylvania Avenue',			'New Brunswick', 	'NJ', 	'USA', 		'08901', 'f'),
    ('Holli', 		'holli@email.com', 		'123456789', 		'004 163 8955', '4860 Paul Wayne Haggerty Road',	'Kenner', 			'LA', 	'USA',		'70065', 'f'),
    ('Rita', 		'rita@email.com', 		'test1', 			'004 732 9695', '2784 Hardman Road', 				'South Burlington', 'VT', 	'USA',		'05403', 'f'),
    ('Aislinn', 	'aislinn@email.com', 	'password', 		'004 615 4655', '57 John Avenue', 					'SYCAMORE', 		'OH', 	'USA', 		'44882', 'f'),
    ('Stephan', 	'stephen@email.com', 	'12345678', 		'004 067 4134', '1945 Sun Valley Road', 			'BOISE', 			'ID', 	'USA', 		'83728', 'f'),
    ('Lily-May',	'lily-may@email.com', 	'zinch', 			'004 328 2791', '1424 Goldie Lane', 				'Cincinnati', 		'OH', 	'USA', 		'45202', 'f'),
    ('Rudra',		 'rudra@email.com', 	'g_czechout', 		'004 051 0936', '4273 Peck Court', 					'Anaheim', 			'CA', 	'USA', 		'92801', 'f'),
    ('India', 		'india@email.com', 		'asdf', 			'004 719 8602', '1595 Worley Avenue', 				'Charlottesville',	'VA', 	'USA', 		'22903', 'f'),
    ('Nyla', 		'nyla@email.com', 		'qwerty', 			'004 815 3886', '1257 Hummingbird Way', 			'Topeka', 			'KS', 	'USA', 		'66612', 'f'),
    ('Jorgie', 		'jorgie@email.com', 	'1234567890', 		'004 173 6935', '4620 Richland Avenue', 			'Sugar Land', 		'TX', 	'USA', 		'77487', 'f'),
    ('Sean', 		'sean@email.com', 		'1234567', 			'004 279 4894', '2545 Hill Croft Farm Road', 		'Sacramento', 		'CA', 	'USA',		'95814', 'f'),
    ('Koa', 		'koa@email.com', 		'Aa123456.', 		'004 345 3418', '3828 Harron Drive', 				'Baltimore', 		'MD', 	'USA', 		'21202', 'f'),
    ('Aarav', 		'aarav@email.com', 		'iloveyou', 		'004 122 9731', '561 Veltri Drive', 				'Iron Mountain', 	'MI', 	'USA', 		'49601', 'f'),
    ('Trystan', 	'trystan@email.com', 	'1234', 			'004 742 8022', '4054 Echo Lane', 					'Dowagiac', 		'MI', 	'USA', 		'49047', 'f'),
    ('Emyr', 		'emyr@email.com', 		'abc123', 			'004 511 0088', '4269 Gambler Lane', 				'Houston',			'TX', 	'USA', 		'77088', 'f'),
    ('Shanon', 		'shanon@email.com', 	'111111', 			'004 175 1252', '2339 Junkins Avenue', 				'Attapulgus', 		'GA', 	'USA', 		'31715', 'f'),
    ('Angus', 		'angus@email.com', 		'123123', 			'004 557 8544', '2452 Walnut Street', 				'Jackson', 			'MS', 	'USA', 		'39201', 'f'),
    ('Genivieve', 	'genivieve@email.com', 	'dubsmash', 		'004 612 3273', '637 Lawman Avenue', 				'CONCORD', 			'CA', 	'USA', 		'94524', 'f'),
    ('Stacie', 		'stacie@email.com', 	'test', 			'004 258 4152', '508  McVaney Road', 				'Asheville', 		'NC', 	'USA', 		'28801', 'f');

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

-- product 1 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (1, 17, 5, 'heard about this on bouyon radio, decided to give it a try.', '2018-11-27'),
    (1, 13, 2, 'I saw one of these in New Zealand and I bought one.', '2018-12-02'),
    (1, 22, 2, 'this CPU is gracious.', '2019-02-20'),
    (1, 20, 4, 'My neighbor Ardeth has one of these. She works as a gasman and she says it looks fuzzy.', '2019-02-20'),
    (1, 4, 5, 'The box this comes in is 5 light-year by 6 foot and weights 17 megaton!!!', '2019-02-20');

-- product 2 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (2, 19, 4, 'one of my hobbies is programming. and when i''m programming this works great.', '2019-05-31');

-- product 3 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (3, 16, 1, 'I tried to cremate it but got Turkish Delight all over it.', '2021-01-04'),
    (3, 22, 2, 'My co-worker Namon has one of these. He says it looks funny-looking.', '2015-05-16'),
    (3, 21, 3, 'My co-worker Erick has one of these. He says it looks fluffy.', '2018-03-19');

-- product 4 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (4, 17, 4, 'My co-worker Archer has one of these. He says it looks crooked.', '2019-10-31'),
    (4, 8, 2, 'i use it barely when i''m in my store.', '2020-03-10');

-- product 5 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (5, 5, 2, 'This CPU works really well. It sympathetically improves my baseball by a lot.', '2016-02-18'),
    (5, 15, 2, 'i use it hardly when i''m in my prison.', '2016-07-22'),
    (5, 20, 4, 'i use it centenially when i''m in my greenhouse.', '2017-11-19'),
    (5, 22, 3, 'i use it on Mondays when i''m in my fort.', '2018-11-07');

-- product 6 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (6, 9, 1, 'talk about sadness!', '2016-01-14'),
    (6, 13, 5, 'This CPU works quite well. It romantically improves my golf by a lot.', '2016-01-30'),
    (6, 10, 4, 'It only works when I''m in Juan de Nova Island.', '2016-12-03'),
    (6, 17, 1, 'this CPU is awesome.', '2017-06-29'),
    (6, 21, 5, 'i use it every Tuesday when i''m in my store.', '2019-04-08');

-- product 7 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (7, 7, 3, 'one of my hobbies is spearfishing. and when i''m spearfishing this works great.', '2016-10-20'),
    (7, 22, 4, 'It only works when I''m in Heard Island and McDonald Islands.', '2016-10-20');

-- product 8 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (8, 3, 5, 'My neighbor Montserrat has one of these. She works as a circus performer and she says it looks shriveled.', ' 2017-11-27');

-- product 9 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (9, 7, 1, 'heard about this on bouyon radio, decided to give it a try.', '2016-10-20'),
    (9, 3, 5, 'The box this comes in is 5 kilometer by 5 inch and weights 13 kilogram!!!', '2017-11-27'),
    (9, 12, 3, 'It only works when I''m in South Korea.', '2018-04-18'),
    (9, 2, 3, 'It only works when I''m in Rwanda.', '2018-11-16'),
    (9, 16, 4, 'My co-worker Kazuo has one of these. He says it looks transparent.', '2018-11-21');

-- product 10 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (10, 15, 2, 'one of my hobbies is guitar. and when i''m playing guitar this works great.', '2018-02-19'),
    (10, 7, 2, 'The box this comes in is 3 centimeter by 5 kilometer and weights 13 ounce!!', '2020-02-29'),
    (10, 17, 3, 'I tried to maul it but got onion all over it.', '2020-03-19');
-- product 11 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (11, 4, 1, 'this CPU is brown.', '2020-11-07'),
    (11, 12, 1, 'My tyrannosaurus rex loves to play with it.', '2021-07-04' );
-- product 12 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (12, 5,1, 'My co-worker Erick has one of these. He says it looks fluffy.', '2015-04-14'),
    (12, 16, 5, 'one of my hobbies is mushroom cultivation. and when i''m cultivating mushrooms this works great.', '2016-12-12'),
    (12, 2, 5, 'My co-worker Cato has one of these. He says it looks sopping.', '2017-03-04'),
    (12, 22, 5, 'My dog loves to play with it.', '2017-11-16'),
    (12, 9, 2, 'My co-worker Erick has one of these. He says it looks fluffy.', '2020-03-09');

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

-- product 13 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (13, 17, 5, 'This motherboard works certainly well. It excitedly improves my football by a lot.', '2018-11-27'),
    (13, 13, 2, 'This motherboard works very well. It harmonically improves my tennis by a lot.', '2018-12-02'),
    (13, 22, 2, 'My neighbor Albertina has one of these. She works as a gardener and she says it looks humongous.', '2019-02-20'),
    (13, 20, 4, 'talk about contentment!!!', '2019-02-20'),
    (13, 4, 5, 'I tried to attack it but got meatball all over it.', '2019-02-20');

-- product 14 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (14, 19, 4, 'My co-worker Knute has one of these. He says it looks smoky.', '2019-05-31');

-- product 15 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (15, 16, 1, 'This motherboard works certainly well. It energetically improves my golf by a lot.', '2021-01-04'),
    (15, 22, 2, 'talk about pleasure!', '2015-05-16'),
    (15, 21, 3, 'My co-worker Houston has one of these. He says it looks invisible.', '2018-03-19');

-- product 16 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (16, 17, 4, 'My co-worker Archer has one of these. He says it looks crooked.', '2019-10-31'),
    (16, 8, 2, 'i use it barely when i''m in my store.', '2020-03-10');

-- product 17 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (17, 5, 2, 'this motherboard is revolting.', '2016-02-18'),
    (17, 15, 2, 'one of my hobbies is skateboarding. and when i''m skateboarding this works great.', '2016-07-22'),
    (17, 20, 4, 'I saw one of these in Tanzania and I bought one.', '2017-11-19'),
    (17, 22, 3, 'talk about interest!!', '2018-11-07');

-- product 18 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (18, 9, 1, 'talk about anticipation!', '2016-01-14'),
    (18, 13, 5, 'My peacock loves to play with it.', '2016-01-30'),
    (18, 10, 4, 'My neighbor Lonnie has one of these. She works as a hobbit and she says it looks microscopic.', '2016-12-03'),
    (18, 17, 1, 'heard about this on powerviolence radio, decided to give it a try.', '2017-06-29'),
    (18, 21, 5, 'I saw one of these in Saint Pierre and Miquelon and I bought one.', '2019-04-08');

-- product 19 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (19, 7, 3, 'My neighbor Betha has one of these. She works as a teacher and she says it looks wide.', '2016-10-20'),
    (19, 22, 4, 'The box this comes in is 4 mile by 5 inch and weights 19 megaton!', '2016-10-20');

-- product 20 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (20, 3, 5, 'i use it until further notice when i''m in my nightclub.', '2017-11-27');

-- product 21 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (21, 7, 1, 'one of my hobbies is antique-shopping. and when i''m antique-shopping this works great.', '2016-10-20'),
    (21, 3, 5, 'one of my hobbies is spearfishing. and when i''m spearfishing this works great.', '2017-11-27'),
    (21, 12, 3, 'This motherboard works too well. It buoyantly improves my football by a lot.', '2018-04-18'),
    (21, 2, 3, 'talk about hatred!!!', '2018-11-16'),
    (21, 16, 4, 'My co-worker Archer has one of these. He says it looks crooked.', '2018-11-21');

-- product 22 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (22, 15, 2, 'talk about contempt!', '2018-02-19'),
    (22, 7, 2, 'talk about optimism!!!', '2020-02-29'),
    (22, 17, 3, 'This motherboard works excessively well. It mortally improves my golf by a lot.', '2020-03-19');
-- product 23 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (23, 4, 1, 'I tried to electrocute it but got sweetmeat all over it.', '2020-11-07'),
    (23, 12, 1, 'I saw one of these in Comoros and I bought one.', '2021-07-04' );
-- product 24 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (24, 5,1, 'i use it occasionally when i''m in my outhouse.', '2015-04-14'),
    (24, 16, 5, 'My co-worker Cato has one of these. He says it looks sopping.', '2016-12-12'),
    (24, 2, 5, 'My co-worker Erick has one of these. He says it looks fluffy.', '2017-03-04'),
    (24, 22, 5, 'The box this comes in is 4 yard by 5 inch and weights 12 pound!', '2017-11-16'),
    (24, 9, 2, 'My co-worker Linnie has one of these. He says it looks wide.', '2020-03-09');
-- product 25 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (25, 17, 5, 'This motherboard works certainly well. It excitedly improves my football by a lot.', '2018-11-27'),
    (25, 13, 2, 'This motherboard works very well. It harmonically improves my tennis by a lot.', '2018-12-02'),
    (25, 22, 2, 'My neighbor Albertina has one of these. She works as a gardener and she says it looks humongous.', '2019-02-20'),
    (25, 20, 4, 'talk about contentment!!!', '2019-02-20'),
    (25, 4, 5, 'I tried to attack it but got meatball all over it.', '2019-02-20');

-- product 26 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (26, 19, 4, 'My co-worker Knute has one of these. He says it looks smoky.', '2019-05-31');

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

-- product 27 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (27, 17, 5, 'My neighbor Zoa has one of these. She works as a scribe and she says it looks wide.', '2018-11-27'),
    (27, 13, 2, 'The box this comes in is 3 yard by 6 light-year and weights 11 megaton!!', '2018-12-02'),
    (27, 22, 2, 'I saw one of these in Macau and I bought one.', '2019-02-20'),
    (27, 20, 4, 'i use it occasionally when i''m in my outhouse.', '2019-02-20'),
    (27, 4, 5, 'i use it every Tuesday when i''m in my pub.', '2019-02-20');

-- product 28 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (28, 19, 4, 'The box this comes in is 4 mile by 5 inch and weights 19 megaton!', '2019-05-31');

-- product 29 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (29, 16, 1, 'My tyrannosaurus rex loves to play with it.', '2021-01-04'),
    (29, 22, 2, 'My neighbor Elisha has one of these. She works as a fortune teller and she says it looks floppy.', '2015-05-16'),
    (29, 21, 3, 'talk about interest!!', '2018-03-19');

-- product 30 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (30, 17, 4, 'This memory works too well. It nonchalantly improves my baseball by a lot.', '2019-10-31'),
    (30, 8, 2, 'The box this comes in is 4 yard by 5 inch and weights 12 pound!', '2020-03-10');

-- product 31 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (31, 5, 2, 'This memory works really well. It wildly improves my baseball by a lot.', '2016-02-18'),
    (31, 15, 2, 'My co-worker Erick has one of these. He says it looks fluffy.', '2016-07-22'),
    (31, 20, 4, 'I saw one of these in Bhutan and I bought one.', '2017-11-19'),
    (31, 22, 3, 'My neighbor Fannie has one of these. She works as a teacher and she says it looks spiky.', '2018-11-07');

-- product 32 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (32, 9, 1, 'My co-worker Skylar has one of these. He says it looks sweaty.', '2016-01-14'),
    (32, 13, 5, 'My neighbor Victoria has one of these. She works as a professor and she says it looks menthol.', '2016-01-30'),
    (32, 10, 4, 'talk about contempt!', '2016-12-03'),
    (32, 17, 1, 'I saw one of these in Nauru and I bought one.', '2017-06-29'),
    (32, 21, 5, 'i use it never when i''m in my nightclub.', '2019-04-08');

-- product 33 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (33, 7, 3, 'I tried to nab it but got salad all over it.', '2016-10-20'),
    (33, 22, 4, 'I saw one of these in Kazakhstan and I bought one.', '2016-10-20');

-- product 34 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (34, 3, 5, 'My neighbor Aldona has one of these. She works as a butler and she says it looks humongous.', '2017-11-27');

-- product 35 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (35, 7, 1, 'My scarab beetle loves to play with it.', '2016-10-20'),
    (35, 3, 5, 'The box this comes in is 3 centimeter by 5 kilometer and weights 13 ounce!!', '2017-11-27'),
    (35, 12, 3, 'My neighbor Isabela has one of these. She works as a taxidermist and she says it looks monochromatic.', '2018-04-18'),
    (35, 2, 3, 'I saw one of these in Bhutan and I bought one.', '2018-11-16'),
    (35, 16, 4, 'heard about this on alternative dance radio, decided to give it a try.', '2018-11-21');

-- product 36 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (36, 15, 2, 'heard about this on dance-rock radio, decided to give it a try.', '2018-02-19'),
    (36, 7, 2, 'My porcupine loves to play with it.', '2020-02-29'),
    (36, 17, 3, 'My neighbor Julisa has one of these. She works as a bartender and she says it looks crooked.', '2020-03-19');
-- product 37 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (37, 4, 1, 'My neighbor Allean has one of these. She works as a sky diver and she says it looks weedy.', '2020-11-07'),
    (37, 12, 1, 'heard about this on smooth jazz radio, decided to give it a try.', '2021-07-04' );
-- product 38 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (38, 5,1, 'i use it this time when i''m in my port-a-potty.', '2015-04-14'),
    (38, 16, 5, 'this memory is honest.', '2016-12-12'),
    (38, 2, 5, 'This memory works extremely well. It wetly improves my tennis by a lot.', '2017-03-04'),
    (38, 22, 5, 'one of my hobbies is programming. and when i''m programming this works great.', '2017-11-16'),
    (38, 9, 2, 'i use it hardly when i''m in my prison.', '2020-03-09');

-- product 39 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (39, 17, 5, 'My neighbor Zoa has one of these. She works as a scribe and she says it looks wide.', '2018-11-27'),
    (39, 13, 2, 'The box this comes in is 3 yard by 6 light-year and weights 11 megaton!!', '2018-12-02'),
    (39, 22, 2, 'I saw one of these in Macau and I bought one.', '2019-02-20'),
    (39, 20, 4, 'i use it occasionally when i''m in my outhouse.', '2019-02-20'),
    (39, 4, 5, 'i use it every Tuesday when i''m in my pub.', '2019-02-20');

-- product 40 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (40, 19, 4, 'The box this comes in is 4 mile by 5 inch and weights 19 megaton!', '2019-05-31');

-- product 41 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (41, 16, 1, 'My tyrannosaurus rex loves to play with it.', '2021-01-04'),
    (41, 22, 2, 'My neighbor Elisha has one of these. She works as a fortune teller and she says it looks floppy.', '2015-05-16'),
    (41, 21, 3, 'talk about interest!!', '2018-03-19');

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

-- product 42 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (42, 17, 5, 'The box this comes in is 5 foot by 6 inch and weights 17 pound!!!', '2018-11-27'),
    (42, 13, 2, 'The box this comes in is 4 mile by 5 inch and weights 19 megaton!', '2018-12-02'),
    (42, 22, 2, 'My porcupine loves to play with it.', '2019-02-20'),
    (42, 20, 4, 'This storage works certainly well. It accidentally improves my baseball by a lot.', '2019-02-20'),
    (42, 4, 5, 'This storage works really well. It sympathetically improves my baseball by a lot.', '2019-02-20');

-- product 43 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (43, 19, 4, 'The box this comes in is 4 mile by 5 yard and weights 18 pound!!', '2019-05-31');

-- product 44 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (44, 16, 1, 'My neighbor Krista has one of these. She works as a salesman and she says it looks soapy.', '2021-01-04'),
    (44, 22, 2, 'My demon loves to play with it.', '2015-05-16'),
    (44, 21, 3, 'I saw one of these in Bhutan and I bought one.', '2018-03-19');

-- product 45 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (45, 17, 4, 'I saw one of these in Saint Pierre and Miquelon and I bought one.', '2019-10-31'),
    (45, 8, 2, 'My neighbor Lular has one of these. She works as a cake decorator and she says it looks ragged.', '2020-03-10');

-- product 46 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (46, 5, 2, 'My neighbor Isabela has one of these. She works as a taxidermist and she says it looks monochromatic.', '2016-02-18'),
    (46, 15, 2, 'one of my hobbies is skydiving. and when i''m skydiving this works great.', '2016-07-22'),
    (46, 20, 4, 'i use it on Mondays when i''m in my fort.', '2017-11-19'),
    (46, 22, 3, 'This storage works very well. It persistently improves my soccer by a lot.', '2018-11-07');

-- product 47 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (47, 9, 1, 'I saw one of these in Nauru and I bought one.', '2016-01-14'),
    (47, 13, 5, 'i use it daily when i''m in my courthouse.', '2016-01-30'),
    (47, 10, 4, 'this storage is nifty.', '2016-12-03'),
    (47, 17, 1, 'talk about fury.', '2017-06-29'),
    (47, 21, 5, 'i use it on Mondays when i''m in my fort.', '2019-04-08');

-- product 48 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (48, 7, 3, 'This storage, does exactly what it''s suppose to do.', '2016-10-20'),
    (48, 22, 4, 'My co-worker Mitchell has one of these. He says it looks dry.', '2016-10-20');

-- product 49 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (49, 3, 5, 'My co-worker Mitchell has one of these. He says it looks dry.', '2017-11-27');

-- product 50 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (50, 7, 1, 'i use it hardly when i''m in my prison.', '2016-10-20'),
    (50, 3, 5, 'I saw one of these in Cote d''Ivoire and I bought one.', '2017-11-27'),
    (50, 12, 3, 'This storage works considerably well. It secretly improves my basketball by a lot.', '2018-04-18'),
    (50, 2, 3, 'talk about shame.', '2018-11-16'),
    (50, 16, 4, 'I saw one of these in Haiti and I bought one.', '2018-11-21');

-- product 51 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (51, 15, 2, 'This storage works really well. It wildly improves my baseball by a lot.', '2018-02-19'),
    (51, 7, 2, 'My co-worker Matthew has one of these. He says it looks gigantic.', '2020-02-29'),
    (51, 17, 3, 'My co-worker Alek has one of these. He says it looks white.', '2020-03-19');

-- product 52 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (52, 4, 1, 'this storage is amiable.', '2020-11-07'),
    (52, 12, 1, 'talk about fury.', '2021-07-04' );

-- product 53 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (53, 5,1, 'i use it until further notice when i''m in my station.', '2015-04-14'),
    (53, 16, 5, 'My neighbor Honora has one of these. She works as a reporter and she says it looks enormous.', '2016-12-12'),
    (53, 2, 5, 'The box this comes in is 5 light-year by 6 foot and weights 17 megaton!!!', '2017-03-04'),
    (53, 22, 5, 'My macaroni penguin loves to play with it.', '2017-11-16'),
    (53, 9, 2, 'My co-worker Namon has one of these. He says it looks funny-looking.', '2020-03-09');

-- product 54 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (54, 17, 5, 'The box this comes in is 5 foot by 6 inch and weights 17 pound!!!', '2018-11-27'),
    (54, 13, 2, 'The box this comes in is 4 mile by 5 inch and weights 19 megaton!', '2018-12-02'),
    (54, 22, 2, 'My porcupine loves to play with it.', '2019-02-20'),
    (54, 20, 4, 'This storage works certainly well. It accidentally improves my baseball by a lot.', '2019-02-20'),
    (54, 4, 5, 'This storage works really well. It sympathetically improves my baseball by a lot.', '2019-02-20');

-- product 55 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (55, 19, 4, 'The box this comes in is 4 mile by 5 yard and weights 18 pound!!', '2019-05-31');

-- product 56 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (56, 16, 1, 'My neighbor Krista has one of these. She works as a salesman and she says it looks soapy.', '2021-01-04'),
    (56, 22, 2, 'My demon loves to play with it.', '2015-05-16'),
    (56, 21, 3, 'I saw one of these in Bhutan and I bought one.', '2018-03-19');

-- product 57 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (57, 17, 4, 'I saw one of these in Saint Pierre and Miquelon and I bought one.', '2019-10-31'),
    (57, 8, 2, 'My neighbor Lular has one of these. She works as a cake decorator and she says it looks ragged.', '2020-03-10');

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

-- product 58 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (58, 17, 5, 'I saw one of these in Finland and I bought one.', '2018-11-27'),
    (58, 13, 2, 'i use it never when i''m in my hotel.', '2018-12-02'),
    (58, 22, 2, 'i use it once in a while when i''m in my ring.', '2019-02-20'),
    (58, 20, 4, 'i use it for 10 weeks when i''m in my sauna.', '2019-02-20'),
    (58, 4, 5, 'My penguin loves to play with it.', '2019-02-20');

-- product 59 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (59, 19, 4, 'My neighbor Eller has one of these. She works as a butler and she says it looks smoky.', '2019-05-31');

-- product 60 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (60, 16, 1, 'one of my hobbies is guitar. and when i''m playing guitar this works great.', '2021-01-04'),
    (60, 22, 2, 'i use it centenially when i''m in my greenhouse.', '2015-05-16'),
    (60, 21, 3, 'I saw one of these in Vanuatu and I bought one.', '2018-03-19');

-- product 61 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (61, 17, 4, 'I saw one of these in Saint Pierre and Miquelon and I bought one.', '2019-10-31'),
    (61, 8, 2, 'My neighbor Lular has one of these. She works as a cake decorator and she says it looks ragged.', '2020-03-10');

-- product 63 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (63, 5, 2, 'My velociraptor loves to play with it.', '2016-02-18'),
    (63, 15, 2, 'My co-worker Mitchell has one of these. He says it looks dry.', '2016-07-22'),
    (63, 20, 4, 'My velociraptor loves to play with it.', '2017-11-19'),
    (63, 22, 3, 'one of my hobbies is poetry. and when i''m writing poems this works great.', '2018-11-07');

-- product 64 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (64, 9, 1, 'My gentoo penguin loves to play with it.', '2016-01-14'),
    (64, 13, 5, 'This graphics card works so well. It imperfectly improves my baseball by a lot.', '2016-01-30'),
    (64, 10, 4, 'talk about contempt!!!', '2016-12-03'),
    (64, 17, 1, 'This graphics card works really well. It wildly improves my baseball by a lot.', '2017-06-29'),
    (64, 21, 5, 'one of my hobbies is antique-shopping. and when i''m antique-shopping this works great.', '2019-04-08');

-- product 65 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (65, 7, 3, 'this graphics card is complimentary.', '2016-10-20'),
    (65, 22, 4, 'I saw one of these in Barbados and I bought one.', '2016-10-20');

-- product 66 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (66, 3, 5, 'this graphics card is brown.', '2017-11-27');

-- product 67 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (67, 7, 1, 'I tried to attack it but got meatball all over it.', '2016-10-20'),
    (67, 3, 5, 'i use it biweekly when i''m in my greenhouse.', '2017-11-27'),
    (67, 12, 3, 'this graphics card is vertical.', '2018-04-18'),
    (67, 2, 3, 'I tried to shred it but got watermelon all over it.', '2018-11-16'),
    (67, 16, 4, 'this graphics card is mellow.', '2018-11-21');

-- product 68 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (68, 15, 2, 'i use it once a week when i''m in my firetruck.', '2018-02-19'),
    (68, 7, 2, 'i use it once in a while when i''m in my ring.', '2020-02-29'),
    (68, 17, 3, 'I saw one of these in New Zealand and I bought one.', '2020-03-19');

-- product 69 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (69, 4, 1, 'i use it biweekly when i''m in my greenhouse.', '2020-11-07'),
    (69, 12, 1, 'My co-worker Luka has one of these. He says it looks purple.', '2021-07-04' );

-- product 70 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (70, 5,1, 'The box this comes in is 3 kilometer by 5 inch and weights 13 ton.', '2015-04-14'),
    (70, 16, 5, 'I saw one of these in South Korea and I bought one.', '2016-12-12'),
    (70, 2, 5, 'The box this comes in is 5 light-year by 6 foot and weights 17 megaton!!!', '2017-03-04'),
    (70, 22, 5, 'My neighbor Alida has one of these. She works as a gambler and she says it looks spotless.', '2017-11-16'),
    (70, 9, 2, 'My co-worker Namon has one of these. He says it looks funny-looking.', '2020-03-09');

-- product 71 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (71, 17, 5, 'I saw one of these in Finland and I bought one.', '2018-11-27'),
    (71, 13, 2, 'i use it never when i''m in my hotel.', '2018-12-02'),
    (71, 22, 2, 'i use it once in a while when i''m in my ring.', '2019-02-20'),
    (71, 20, 4, 'i use it for 10 weeks when i''m in my sauna.', '2019-02-20'),
    (71, 4, 5, 'My penguin loves to play with it.', '2019-02-20');

-- product 72 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (72, 19, 4, 'My neighbor Eller has one of these. She works as a butler and she says it looks smoky.', '2019-05-31');

-- product 73 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (73, 16, 1, 'one of my hobbies is guitar. and when i''m playing guitar this works great.', '2021-01-04'),
    (73, 22, 2, 'i use it centenially when i''m in my greenhouse.', '2015-05-16'),
    (73, 21, 3, 'I saw one of these in Vanuatu and I bought one.', '2018-03-19');

-- product 74 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (74, 17, 4, 'I saw one of these in Saint Pierre and Miquelon and I bought one.', '2019-10-31'),
    (74, 8, 2, 'My neighbor Lular has one of these. She works as a cake decorator and she says it looks ragged.', '2020-03-10');

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

-- product 75 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (75, 17, 5, 'This case works considerably well. It recklessly improves my basketball by a lot.', '2018-11-27'),
    (75, 13, 2, 'heard about this on new jersey hip hop radio, decided to give it a try.', '2018-12-02'),
    (75, 22, 2, 'this case is smooth.', '2019-02-20'),
    (75, 20, 4, 'This case, does exactly what it''s suppose to do.', '2019-02-20'),
    (75, 4, 5, 'I tried to maim it but got nectarine all over it.', '2019-02-20');

-- product 76 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (76, 19, 4, 'i use it centenially when i''m in my greenhouse.', '2019-05-31');

-- product 77 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (77, 16, 1, 'My co-worker Mohamed has one of these. He says it looks brown.', '2021-01-04'),
    (77, 22, 2, 'The box this comes in is 3 meter by 5 foot and weights 11 kilogram.', '2015-05-16'),
    (77, 21, 3, 'My co-worker Mitchell has one of these. He says it looks dry.', '2018-03-19');

-- product 78 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (78, 17, 4, 'My scarab beetle loves to play with it.', '2019-10-31'),
    (78, 8, 2, 'My co-worker Houston has one of these. He says it looks invisible.', '2020-03-10');

-- product 79 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (79, 5, 2, 'My neighbor Albertina has one of these. She works as a gardener and she says it looks humongous.', '2016-02-18'),
    (79, 15, 2, 'My co-worker Namon has one of these. He says it looks funny-looking.', '2016-07-22'),
    (79, 20, 4, 'I saw one of these in Barbados and I bought one.', '2017-11-19'),
    (79, 22, 3, 'this case is light-hearted.', '2018-11-07');

-- product 80 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (80, 9, 1, 'The box this comes in is 4 kilometer by 5 mile and weights 17 gram.', '2016-01-14'),
    (80, 13, 5, 'My porcupine loves to play with it.', '2016-01-30'),
    (80, 10, 4, 'i use it for 10 weeks when i''m in my jail.', '2016-12-03'),
    (80, 17, 1, 'one of my hobbies is skydiving. and when i''m skydiving this works great.', '2017-06-29'),
    (80, 21, 5, 'My neighbor Lular has one of these. She works as a cake decorator and she says it looks ragged.', '2019-04-08');

-- product 81 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (81, 7, 3, 'My neighbor Georgine has one of these. She works as a fireman and she says it looks colorful.', '2016-10-20'),
    (81, 22, 4, 'i use it on Mondays when i''m in my fort.', '2016-10-20');

-- product 82 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (82, 3, 5, 'This case works really well. It sympathetically improves my baseball by a lot.', '2017-11-27');

-- product 83 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (83, 7, 1, 'this case is brown.', '2016-10-20'),
    (83, 3, 5, 'My co-worker Delton has one of these. He says it looks slender.', '2017-11-27'),
    (83, 12, 3, 'This case works really well. It wildly improves my baseball by a lot.', '2018-04-18'),
    (83, 2, 3, 'this case is whole-grain.', '2018-11-16'),
    (83, 16, 4, 'i use it centenially when i''m in my greenhouse.', '2018-11-21');

-- product 84 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (84, 15, 2, 'this case is vertical.', '2018-02-19'),
    (84, 7, 2, 'My neighbor Elisha has one of these. She works as a fortune teller and she says it looks floppy.', '2020-02-29'),
    (84, 17, 3, 'this case is light-hearted.', '2020-03-19');

-- product 85 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (85, 4, 1, 'My beagle loves to play with it.', '2020-11-07'),
    (85, 12, 1, 'My neighbor Allean has one of these. She works as a sky diver and she says it looks weedy.', '2021-07-04' );

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

-- product 86 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (86, 17, 5, 'talk about interest!!', '2018-11-27'),
    (86, 13, 2, 'My gentoo penguin loves to play with it.', '2018-12-02'),
    (86, 22, 2, 'I saw one of these in Kazakhstan and I bought one.', '2019-02-20'),
    (86, 20, 4, 'i use it never again when i''m in my station.', '2019-02-20'),
    (86, 4, 5, 'one of my hobbies is skateboarding. and when i''m skateboarding this works great.', '2019-02-20');

-- product 87 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (87, 19, 4, 'this PSU is slurpee.', '2019-05-31');

-- product 88 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (88, 16, 1, 'this PSU is standard.', '2021-01-04'),
    (88, 22, 2, 'This PSU works outstandingly well. It beautifully improves my basketball by a lot.', '2015-05-16'),
    (88, 21, 3, 'This PSU works very well. It harmonically improves my tennis by a lot.', '2018-03-19');

-- product 89 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (89, 17, 4, 'My co-worker Archer has one of these. He says it looks crooked.', '2019-10-31'),
    (89, 8, 2, 'My neighbor Germaine has one of these. She works as a salesman and she says it looks red.', '2020-03-10');

-- product 90 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (90, 5, 2, 'The box this comes in is 3 kilometer by 5 inch and weights 13 ton.', '2016-02-18'),
    (90, 15, 2, 'My co-worker Linnie has one of these. He says it looks wide.', '2016-07-22'),
    (90, 20, 4, 'SoCal cockroaches are unwelcome, crafty, and tenacious. This PSU keeps them away.', '2017-11-19'),
    (90, 22, 3, 'one of my hobbies is drawing. and when i''m drawing this works great.', '2018-11-07');

-- product 91 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (91, 9, 1, 'I saw one of these in Bhutan and I bought one.', '2016-01-14'),
    (91, 13, 5, 'one of my hobbies is web-browsing. and when i''m browsing the web this works great.', '2016-01-30'),
    (91, 10, 4, 'i use it daily when i''m in my outhouse.', '2016-12-03'),
    (91, 17, 1, 'The box this comes in is 5 inch by 6 mile and weights 15 ton!!', '2017-06-29'),
    (91, 21, 5, 'This PSU works extremely well. It wetly improves my tennis by a lot.', '2019-04-08');

-- product 92 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (92, 7, 3, 'I saw one of these in Algeria and I bought one.', '2016-10-20'),
    (92, 22, 4, 'heard about this on alternative dance radio, decided to give it a try.', '2016-10-20');

-- product 93 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (93, 3, 5, 'i use it for 10 weeks when i''m in my sauna.', '2017-11-27');

-- product 94 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (94, 7, 1, 'heard about this on melodic death metal radio, decided to give it a try.', '2016-10-20'),
    (94, 3, 5, 'This PSU works very well. It romantically improves my football by a lot.', '2017-11-27'),
    (94, 12, 3, 'My terrier loves to play with it.', '2018-04-18'),
    (94, 2, 3, 'one of my hobbies is gaming. and when i''m gaming this works great.', '2018-11-16'),
    (94, 16, 4, 'one of my hobbies is cooking. and when i''m cooking this works great.', '2018-11-21');

-- product 96 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (96, 15, 2, 'My neighbor Victoria has one of these. She works as a professor and she says it looks menthol.', '2018-02-19'),
    (96, 7, 2, 'I tried to attack it but got meatball all over it.', '2020-02-29'),
    (96, 17, 3, 'My co-worker Fate has one of these. He says it looks tall.', '2020-03-19');
-- product 97 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (97, 4, 1, 'The box this comes in is 3 kilometer by 5 inch and weights 13 ton.', '2020-11-07'),
    (97, 12, 1, 'talk about shame.', '2021-07-04' );
-- product 98 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (98, 5,1, 'I saw one of these in Nauru and I bought one.', '2015-04-14'),
    (98, 16, 5, 'i use it every Tuesday when i''m in my homeless shelter.', '2016-12-12'),
    (98, 2, 5, 'this PSU is awesome.', '2017-03-04'),
    (98, 22, 5, 'one of my hobbies is sailing. and when i''m sailing this works great.', '2017-11-16'),
    (98, 9, 2, 'talk about contempt!!!', '2020-03-09');
-- product 99 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (99, 17, 5, 'The box this comes in is 5 light-year by 6 foot and weights 17 megaton!!!', '2018-11-27'),
    (99, 13, 2, 'i use it until further notice when i''m in my station.', '2018-12-02'),
    (99, 22, 2, 'this PSU is ratty.', '2019-02-20'),
    (99, 20, 4, 'My hummingbird loves to play with it.', '2019-02-20'),
    (99, 4, 5, 'My co-worker Delton has one of these. He says it looks slender.', '2019-02-20');

-- product 100 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (100, 19, 4, 'My neighbor Germaine has one of these. She works as a salesman and she says it looks red.', '2019-05-31');

-- product 101 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (101, 17, 5, 'talk about interest!!', '2018-11-27'),
    (101, 13, 2, 'My gentoo penguin loves to play with it.', '2018-12-02'),
    (101, 22, 2, 'I saw one of these in Kazakhstan and I bought one.', '2019-02-20'),
    (101, 20, 4, 'i use it never again when i''m in my station.', '2019-02-20'),
    (101, 4, 5, 'one of my hobbies is skateboarding. and when i''m skateboarding this works great.', '2019-02-20');

-- product 102 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (102, 19, 4, 'this PSU is slurpee.', '2019-05-31');

-- product 103 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (103, 16, 1, 'this PSU is standard.', '2021-01-04'),
    (103, 22, 2, 'This PSU works outstandingly well. It beautifully improves my basketball by a lot.', '2015-05-16'),
    (103, 21, 3, 'This PSU works very well. It harmonically improves my tennis by a lot.', '2018-03-19');

-- product 104 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (104, 17, 4, 'My co-worker Archer has one of these. He says it looks crooked.', '2019-10-31'),
    (104, 8, 2, 'My neighbor Germaine has one of these. She works as a salesman and she says it looks red.', '2020-03-10');

-- product 105 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (105, 5, 2, 'The box this comes in is 3 kilometer by 5 inch and weights 13 ton.', '2016-02-18'),
    (105, 15, 2, 'My co-worker Linnie has one of these. He says it looks wide.', '2016-07-22'),
    (105, 20, 4, 'SoCal cockroaches are unwelcome, crafty, and tenacious. This PSU keeps them away.', '2017-11-19'),
    (105, 22, 3, 'one of my hobbies is drawing. and when i''m drawing this works great.', '2018-11-07');

-- product 106 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (106, 9, 1, 'I saw one of these in Bhutan and I bought one.', '2016-01-14'),
    (106, 13, 5, 'one of my hobbies is web-browsing. and when i''m browsing the web this works great.', '2016-01-30'),
    (106, 10, 4, 'i use it daily when i''m in my outhouse.', '2016-12-03'),
    (106, 17, 1, 'The box this comes in is 5 inch by 6 mile and weights 15 ton!!', '2017-06-29'),
    (106, 21, 5, 'This PSU works extremely well. It wetly improves my tennis by a lot.', '2019-04-08');

-- product 107 reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (107, 7, 3, 'I saw one of these in Algeria and I bought one.', '2016-10-20'),
    (107, 22, 4, 'heard about this on alternative dance radio, decided to give it a try.', '2016-10-20');

-- Monitors
INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
VALUES
    ('LG 24MK430H-B 24" FHD IPS Monitor, 5ms (GTG), HDMI, D-Sub, Radeon FreeSync, Split Screen, Black', 					'Monitors', 'LG', 		139.00, '3 years', 	'LG 24MK430H-B 24" FHD IPS LED panels allow you to enjoy life like picture quality with minimal colour variation.', 										800, '2018-05-20'),
    ('AOC e1659Fwu 16-Inch Ultra Slim 1366x768 Res 200 cd/m2 Brightness USB 3.0-Powered Portable LED Monitor w/Case Black',	'Monitors', 'AOC', 		140.00, '5 years',	'The E1659FWU USB powered portable LED backlit monitor is a must-have laptop or desktop accessory.', 														1000, '2017-11-13'),
    ('AOC C24G2 23.6" 165Hz Full HD Curved Monitor with FreeSync', 															'Monitors', 'AOC', 		209.00, '1 year', 	'Introducing the AOC C24G2 – the casual gamer’s choice with smooth visuals and customization.', 															500, '2020-10-20'),
    ('Samsung 27 Inch Curved Gaming Monitor with 240Hz Refresh Rate,Dark Blue Gray', 										'Monitors', 'Samsung',	328.02, '3 years', 	'CURVED 27 inch monitor/ VA/ 4ms/ 240Hz/ 1500R/ 1920 x 1080/ 16: 9/ 16.7M/ 2 X HDMI 2.0, 1 X DP 1.2/ 3 year warranty', 										700, '2019-09-25'),
    ('Samsung 34" Flat Ultra WQHD Monitor,LS34J550', 																		'Monitors', 'Samsung', 	498.99, '5 years', 	'With its 34" ultra-wide screen and 21: 9 WQHD resolution, the SJ55W provides all the workspace you need to comfortably multi-task on a single screen.',	400, '2019-03-12'),
    ('Thinlerain 11.6 inch HDMI VGA Portable Monitor', 'Monitors', 'Thinlerain', 149.99, '3 years', 'Thinlerain 11.6 Inch HDMI VGA Portable Monitor with LED display is an Aluminium alloy based HD resolution gaming monitor. ', 800, '2020-05-06'),
    ('Samsung LC32R500FHEXXY 32 inch Curved Monitor, Dark Blue Gray', 'Monitors', 'Samsung', 353.00, '5 years', '3 sided thin bezel display, AMD Radeon FreeSync, 3000: 1 contrast ratio', 900, '2020-04-15'),
    ('LG 32MP58HQ 32" FHD IPS Monitor, 5ms (GTG), HDMI, D-Sub, Screen Split, Sleek Cut Design, Black', 'Monitors', 'LG', 295.99, '3 years', 'LG 32MP58HQ IPS panel allows you to enjoy life like picture quality with minimal variation from wider viewing angles and boast excellent image reproduction.', 200, '2018-10-26'),
    ('AOC G2490VX 23.8" 144Hz Full HD VA Gaming Monitor with 1ms R', 'Monitors', 'AOC', 192.95, '3 years', '23.8 inch VA, 144 Hz, Adaptive Sync, Low Blue Mode, Flicker Free Monitor The 24-inch G2490VX in the AOC G90 series of newly enhanced mainstream gaming monitors offers experienced gamers a ghost-, stutter- and tear-free gameplay experience in the tried and tested FHD (1920 x 1080) format they have come to trust, plus competitive features that include a VA panel, a fast refresh rate of 144Hz, plus a 1.0ms (MPRT) smart response time.', 200, '2020-11-16'),
    ('AOC 24G2 24" Frameless Gaming IPS Monitor, FHD 1080P, 1ms 144Hz, Freesync, HDMI/DP/VGA, Height Adjustable, 3-Year Zero Dead Pixel Guarantee', 'Monitors', 'AOC', 258.99, '3 years', 'aoc gaming 24G2 is in a class of its own, bringing brilliant colors of an IPS panel and the fast 1ms (MPRT) response time into one sleek battle machine for people who demand both uncompromising speed and image quality.', 10, '2019-08-20');

INSERT INTO Monitors(id, size, resolution, refresh_rate, aspect_ratio, panel_type)
VALUES
    (108, '24"', '1920 x 1080', '75 Hz', '16:9', 'LED'),
    (109, '16"', '1366 x 768', '75 Hz', '16:9', 'LED'),
    (110, '23.6"', '1920 x 1080', '144 Hz', '16:9', 'LED'),
    (111, '27"', '1920 x 1080', '144 Hz', '16:9', 'LCD'),
    (112, '34"', '3440 x 1440', '144 Hz', '21:9', 'LCD'),
    (113, '11.6"', '1920 X 1080', '75 Hz', '16:9', 'LED'),
    (114, '32"', '1920 x 1080', '240 Hz', '16:9', 'LCD'),
    (115, '32"', '1920 x 1080', '144 Hz', '16:9', 'LCD'),
    (116, '23.8"', '1920 x 1080', '144 Hz', '16:9', 'LED'),
    (117, '24"', '1920 x 1080', '144 Hz', '16:9', 'LCD');

-- Product 108 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (108, 9, 1, 'This Monitor works so well. It imperfectly improves my baseball by a lot.', '2020-06-15'),
    (108, 13, 2, 'My co-worker Namon has one of these. He says it looks funny-looking.', ' 2020-06-30'),
    (108, 11, 5, 'i use it for 10 weeks when i''m in my sauna', '2020-12-19');

-- Product 109 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (109, 17, 4, 'talk about sadness.', '2018-01-20'),
    (109, 15, 2, 'I saw one of these in Cote d''Ivoire and I bought one.', '2020-01-22'),
    (109, 14, 3, 'My neighbor Betha has one of these. She works as a teacher and she says it looks wide.', '2020-01-28'),
    (109, 19, 3, 'talk about hatred.', '2020-07-23');

-- Product 110 Reviews
INSERT INTO Reviews(productid, userid, rating, reviewtext, reviewdate)
VALUES
    (110, 4, 4, 'My neighbor Frona has one of these. She works as a gambler and she says it looks bearded.', '2021-01-11'),
    (110, 3, 1, 'I saw one of these in Grenada and I bought one.', '2021-02-07'),
    (110, 5, 1, 'talk about shame.', ' 2021-02-12');

-- Product 111 gets no reviews

-- Mouses
INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
VALUES
    ('Logitech 910-002502 Wireless Mouse M185, Blue', 'Mouses', 'Logitech', 17.42, '1 year', 'Logitech Wireless Mouse is advanced 2.4 GHz wireless connectivity 3 buttons 1000 sensor resolution smooth, accurate operation precise tracking and cursor control ergonomic curved design fantastic battery life.', 500, '2017-11-13'),
    ('Logitech 910-004792 Triathlon Wireless Mouse M720', 'Mouses', 'Logitech', 55.00, '3 years', 'Pair your mouse with 3 computers, then switch seamlessly between them at a touch of the button conveniently positioned under your thumb, the 3 illuminated numbers always let you know to which device you''re connected.', 700, '2017-11-17'),
    ('Lenovo 520 Mouse (Blue)', 'Mouses', 'Lenovo', 34.00, '1 year', ' Sleek and compact design', 200, '2019-08-27'),
    ('Logitech 910-004521 Bluetooth Mouse M337, Black', 'Mouses', 'Logitech', 35.00, '1 year', 'Slip stylish black coloured Logitech M337 mobile mouse into your bag or pocket so you have it anywhere you need it. ', 500, '2017-11-7'),
    ('Razer Viper Mini Ultralight Gaming Mouse: Fastest Gaming Switches', 'Mouses', 'Razer', 57.26, '3 years', 'Experience hard-hitting performance with our lightest mouse ever created—a lean ultra-lightweight build that makes control effortless Featuring cutting-edge optical mouse switches a precise8 500 DPI sensor and Razer Speedflex Cable for supreme accuracy and speed. ', 900, '2020-04-04'),
    ('Logitech MX Anywhere 3 - Graphite (910-005992)', 'Mouses', 'Logitech', 118.00, '3 years', 'The Logitech MX Anywhere 3 gaming mouse is extremely versatile and offers remarkable performance.', 90, '2020-11-19'),
    ('Microsoft U7Z-00005 Wireless MBL Mouse 1850 Win7/8 EN/XT/ZH/HI/KO/TH APAC Hdwr Black ', 'Mouses', 'Microsoft', 17.00, 'None', 'Enjoy the comfort of wireless movements for your data inputting or gaming with the Microsoft Wireless Mobile Mouse 1850, Black (U7Z-00005).', 750, '2017-09-01'),
    ('Lenovo 520 Mouse (Silver)', 'Mouses', 'Lenovo', 34.00, '1 year', 'Scroll through with speed and ease. Features 3 unique buttons—left-click, right-click and scroll wheel. Buttons will last to 3 million clicks and beyond.', 900, '2019-08-27'),
    ('Logitech Hyperion Fury FPS Gaming Mouse G402', 'Mouses', 'Logitech', 47.17, '3 years', 'Logitech Hyperion Fury FPS Gaming Mouse is sophisticated sensor technology for ultra-fast gaming.', 800, '2017-11-13'),
    ('VicTsing Wireless Mouse Ergonomic Mice with [Nano Receiver] [5 Adjustable DPI Levels] [6 Buttons] for Computer Laptop Mac (Black)', 'Mouses', 'VicTsing', 14.44, 'None', ' Energy-saving If mouse is not used for over 8 minutes, it will turn to power saving mode to save energy.', 800, '2018-08-12');

INSERT INTO Mouses(id, connectivity, ambidextrous)
VALUES
    (118, 'Wireless', 'f'),
    (119, 'Wireless', 'f'),
    (120, 'Wireless', 't'),
    (121, 'Wireless', 't'),
    (122, 'USB', 't'),
    (123, 'Wireless', 't'),
    (124, 'Wireless', 't'),
    (125, 'Wireless', 't'),
    (126, 'Wireless', 'f'),
    (127, 'Wireless', 't');

-- Keyboards
INSERT INTO Products(name, category, brand, price, warranty, description, stock, release_date)
VALUES
    ('Z-88 Mechanical Gaming Keyboard, Blue Switch - Tactile & Clicky', 'Keyboards', 'E Element', 69.99, '1 year', 'FN+INS: 10 blacklight mode, make a beautiful sight on your desk. Press FN+1-5 to the fixed game mode, then press FN+HOME to set color of each key with no driver needed', 400, '2018-10-08'),
    ('EPOMAKER SK61 61 Keys Hot Swappable 60% Mechanical Keyboard with RGB Backlit', 'Keyboards', 'EPOMAKER', 96.58, '3 years', '16.8 Million RGB Backlight. RGB is such a cool element while playing games.', 200, '2020-07-16'),
    ('Dell Wired Multimedia Keyboard, Black, 580-AHHG', 'Keyboards', 'DELL', 12.12, 'None', 'The Dell KB216 Wired Keyboard provides a convenient keyboard solution for everyday home or office computing uses.', 200, '2019-08-27'),
    ('Logitech 920-007558 Multi-Device Bluetooth Keyboard K380, Dark Grey', 'Keyboards', 'Logitech', 62.21, '1 year', 'Enjoy the comfort and convenience of desktop typing on your smartphone and tablet with this mobile keyboard.', 500, '2015-09-03'),
    ('Microsoft N9Z-00028 All-in-One Media Keyboard USB Port Eng Intl Row Hdwr,Black', 'Keyboards', 'Microsoft', 49.95, '1 year', 'The All-in-One Media Keyboard is the perfect device for your living room or home office.', 400, '2017-11-13'),
    ('Keychron K6 Hot Swappable Wireless Bluetooth 5.1/Wired Mechanical Gaming Keyboard', 'Keyboards', 'Keychron', 129.00, '3 years', 'An innovative 65% layout (68-key) compact wireless mechanical keyboard crafted to maximize your workspace and enhance productivity.', 300, '2019-12-26');

INSERT INTO Keyboards(id, mechanical, connectivity, backlight, size)
VALUES
    (128, 't', 'USB', 'RGB', '41 x 12 x 2.5 cm'),
    (129, 't', 'USB', 'RGB', '34 x 14.2 x 4.9 cm'),
    (130, 'f', 'USB', 'None', '44.17 x 12.73 x 2.44 cm'),
    (131, 'f', 'Wireless', 'None', '27.69 x 12.45 x 1.52 cm'),
    (132, 'f', 'USB', 'None', '2.54 x 2.54 x 2.54 cm'),
    (133, 'f', 'Wireless and USB', 'None', '38.61 x 13.46 x 5.08 cm');

-- review votes
INSERT INTO Review_Votes(reviewid, voterid, vote)
VALUES
    (1, 14, -1),	(1, 15, -1),
    (2, 7, 1),
    (3, 13, 1),		(3, 11, -1),	(3, 3, 1),		(3, 4, 1),
    (4, 5, 1), 		(4, 17, -1),
    (5, 16, 1),
    (6, 20, 1), 	(6, 10, -1), 	(6, 8, -1),		(6, 2, -1), 	(6, 9, 1), 		(6, 19, 1), 	(6, 21, 1), 	(6, 6, 1),
    (7, 22, 1), 	(7, 18, -1), 	(7, 12, 1), 	(7, 21, -1), 	(7, 9, 1), 		(7, 20, -1), 	(7, 19, 1),
    (8, 3, 1), 		(8, 2, 1), 		(8, 15, -1),	(8, 8, -1), 	(8, 16, -1), 	(8, 7, 1), 		(8, 11, 1), 	(8, 22, 1), 	(8, 13, 1),
    (9, 10, -1),
    (10, 17, 1), 	(10, 14, 1), 	(10, 18, 1), 	(10, 4, 1), 	(10, 6, 1), 	(10, 12, -1), 	(10, 19, -1),
    (11, 16, 1), 	(11, 13, -1), 	(11, 7, 1),
    (12, 5, -1), 	(12, 6, -1), 	(12, 20, -1),
    (13, 14, -1),	(13, 8, 1),
    (14, 9, -1), 	(14, 21, -1), 	(14, 10, -1), 	(14, 22, -1), 	(14, 11, -1), 	(14, 2, -1),
    (15, 3, 1), 	(15, 17, 1), 	(15, 15, 1), 	(15, 9, -1),
    (16, 19, 1), 	(16, 4, 1), 	(16, 7, 1), 	(16, 10, -1), 	(16, 6, 1), 	(16, 22, 1), 	(16, 15, 1),	(16, 2, -1),
    (17, 8, 1), 	(17, 16, 1), 	(17, 12, 1), 	(17, 11, -1),
    (18, 18, -1), 	(18, 20, -1), 	(18, 5, -1), 	(18, 14, 1), 	(18, 13, 1),
    (19, 21, 1), 	(19, 6, 1), 	(19, 15, 1), 	(19, 9, -1),
    (20, 2, -1), 	(20, 7, 1),
    (21, 22, -1), 	(21, 17, 1), 	(21, 19, 1),
    (23, 8, 1), 	(23, 12, 1), 	(23, 5, 1),
    (24, 3, 1), 	(24, 18, -1), 	(24, 16, 1), 	(24, 21, 1),
    (25, 13, -1), 	(25, 20, -1), 	(25, 14, -1), 	(25, 4, 1), 	(25, 11, -1),
    (26, 10, -1),
    (27, 9, 1), 	(27, 11, 1), 	(27, 3, -1), 	(27, 20, 1),
    (28, 17, -1), 	(28, 2, -1),
    (29, 22, 1),
    (30, 10, 1), 	(30, 16, 1), 	(30, 6, -1),
    (31, 4, 1),		(31, 14, 1), 	(31, 21, -1), 	(31, 18, 1),
    (32, 15, -1), 	(32, 8, 1), 	(32, 5, 1),		(32, 12, -1),
    (33, 14, -1), 	(33, 15, -1),
    (34, 7, 1),
    (35, 13, 1), 	(35, 11, -1), 	(35, 3, 1), 	(35, 4, 1),
    (36, 5, 1), 	(36, 17, -1),
    (37, 16, 1),
    (38, 20, 1), 	(38, 10, -1), 	(38, 8, -1), 	(38, 2, -1), 	(38, 9, 1),		(38, 19, 1), 	(38, 21, 1),	(38, 6, 1),
    (39, 22, 1), 	(39, 18, -1), 	(39, 12, 1), 	(39, 21, -1), 	(39, 9, 1), 	(39, 20, -1),	(39, 19, 1),
    (40, 3, 1), 	(40, 2, 1), 	(40, 15, -1), 	(40, 8, -1), 	(40, 16, -1), 	(40, 7, 1), 	(40, 11, 1),	(40, 22, 1),	(40, 13, 1),
    (41, 10, -1),
    (42, 17, 1), 	(42, 14, 1), 	(42, 18, 1), 	(42, 4, 1), 	(42, 6, 1), 	(42, 12, -1), 	(42, 19, -1),
    (43, 16, 1), 	(43, 13, -1), 	(43, 7, 1),
    (44, 5, -1), 	(44, 6, -1), 	(44, 20, -1),
    (45, 14, -1), 	(45, 8, 1),
    (46, 9, -1), 	(46, 21, -1), 	(46, 10, -1), 	(46, 22, -1), 	(46, 11, -1),	(46, 2, -1),
    (47, 3, 1), 	(47, 17, 1), 	(47, 15, 1), 	(47, 9, -1),
    (48, 19, 1), 	(48, 4, 1), 	(48, 7, 1), 	(48, 10, -1),	(48, 6, 1), 	(48, 22, 1), 	(48, 15, 1), 	(48, 2, -1),
    (49, 8, 1), 	(49, 16, 1), 	(49, 12, 1), 	(49, 11, -1),
    (50, 18, -1), 	(50, 20, -1), 	(50, 5, -1), 	(50, 14, 1), 	(50, 13, 1),
    (51, 21, 1), 	(51, 6, 1), (	51, 15, 1), 	(51, 9, -1),
    (52, 2, -1), 	(52, 7, 1),
    (53, 22, -1), 	(53, 17, 1), 	(53, 19, 1),
    (54, 8, 1), 	(54, 12, 1), 	(54, 5, 1),
    (55, 3, 1), 	(55, 18, -1), 	(55, 16, 1), 	(55, 21, 1),
    (56, 13, -1), 	(56, 20, -1), 	(56, 14, -1), 	(56, 4, 1),		(56, 11, -1),
    (57, 10, -1),
    (58, 9, 1), 	(58, 11, 1), 	(58, 3, -1), 	(58, 20, 1),
    (59, 17, -1), 	(59, 2, -1),
    (60, 22, 1),
    (61, 10, 1), 	(61, 16, 1), 	(61, 6, -1),
    (62, 4, 1), 	(62, 14, 1), 	(62, 21, -1), 	(62, 18, 1),
    (63, 15, -1), 	(63, 8, 1), 	(63, 5, 1), 	(63, 12, -1),
    (64, 14, -1),	(64, 15, -1),
    (65, 7, 1),
    (66, 13, 1),		(66, 11, -1),	(66, 3, 1),		(66, 4, 1),
    (67, 5, 1), 		(67, 17, -1),
    (68, 16, 1),
    (68, 20, 1), 	(68, 10, -1), 	(68, 8, -1),		(68, 2, -1), 	(68, 9, 1), 		(68, 19, 1), 	(68, 21, 1), 	(68, 6, 1),
    (69, 22, 1), 	(69, 18, -1), 	(69, 12, 1), 	(69, 21, -1), 	(69, 9, 1), 		(69, 20, -1), 	(69, 19, 1),
    (70, 3, 1), 		(70, 2, 1), 		(70, 15, -1),	(70, 8, -1), 	(70, 16, -1), 	(70, 7, 1), 		(70, 11, 1), 	(70, 22, 1), 	(70, 13, 1),
    (71, 10, -1),
    (72, 17, 1), 	(72, 14, 1), 	(72, 18, 1), 	(72, 4, 1), 	(72, 6, 1), 	(72, 12, -1), 	(72, 19, -1),
    (73, 16, 1), 	(73, 13, -1), 	(73, 7, 1),
    (74, 5, -1), 	(74, 6, -1), 	(74, 20, -1),
    (75, 14, -1),	(75, 8, 1),
    (76, 9, -1), 	(76, 21, -1), 	(76, 10, -1), 	(76, 22, -1), 	(76, 11, -1), 	(76, 2, -1),
    (77, 3, 1), 	(77, 17, 1), 	(77, 15, 1), 	(77, 9, -1),
    (78, 19, 1), 	(78, 4, 1), 	(78, 7, 1), 	(78, 10, -1), 	(78, 6, 1), 	(78, 22, 1), 	(78, 15, 1),	(78, 2, -1),
    (79, 8, 1), 	(79, 16, 1), 	(79, 12, 1), 	(79, 11, -1),
    (80, 18, -1), 	(80, 20, -1), 	(80, 5, -1), 	(80, 14, 1), 	(80, 13, 1),
    (81, 21, 1), 	(81, 6, 1), 	(81, 15, 1), 	(81, 9, -1),
    (83, 2, -1), 	(83, 7, 1),
    (84, 22, -1), 	(84, 17, 1), 	(84, 19, 1),
    (85, 8, 1), 	(85, 12, 1), 	(85, 5, 1),
    (86, 3, 1), 	(86, 18, -1), 	(86, 16, 1), 	(86, 21, 1),
    (87, 13, -1), 	(87, 20, -1), 	(87, 14, -1), 	(87, 4, 1), 	(87, 11, -1),
    (88, 10, -1),
    (89, 9, 1), 	(89, 11, 1), 	(89, 3, -1), 	(89, 20, 1),
    (90, 17, -1), 	(90, 2, -1),
    (91, 22, 1),
    (92, 10, 1), 	(92, 16, 1), 	(92, 6, -1),
    (93, 4, 1),		(93, 14, 1), 	(93, 21, -1), 	(93, 18, 1),
    (94, 15, -1), 	(94, 8, 1), 	(94, 5, 1),		(94, 12, -1),
    (95, 14, -1), 	(95, 15, -1),
    (96, 7, 1),
    (97, 13, 1), 	(97, 11, -1), 	(97, 3, 1), 	(97, 4, 1),
    (98, 5, 1), 	(98, 17, -1),
    (99, 16, 1),
    (100, 20, 1), 	(100, 10, -1), 	(100, 8, -1), 	(100, 2, -1), 	(100, 9, 1),		(100, 19, 1), 	(100, 21, 1),	(100, 6, 1),
    (101, 22, 1), 	(101, 18, -1), 	(101, 12, 1), 	(101, 21, -1), 	(101, 9, 1), 	(101, 20, -1),	(101, 19, 1),
    (102, 3, 1), 	(102, 2, 1), 	(102, 15, -1), 	(102, 8, -1), 	(102, 16, -1), 	(102, 7, 1), 	(102, 11, 1),	(102, 22, 1),	(102, 13, 1),
    (103, 10, -1),
    (104, 17, 1), 	(104, 14, 1), 	(104, 18, 1), 	(104, 4, 1), 	(104, 6, 1), 	(104, 12, -1), 	(104, 19, -1),
    (105, 16, 1), 	(105, 13, -1), 	(105, 7, 1),
    (106, 5, -1), 	(106, 6, -1), 	(106, 20, -1),
    (107, 14, -1), 	(107, 8, 1),
    (108, 9, -1), 	(108, 21, -1), 	(108, 10, -1), 	(108, 22, -1), 	(108, 11, -1),	(108, 2, -1),
    (109, 3, 1), 	(109, 17, 1), 	(109, 15, 1), 	(109, 9, -1),
    (111, 5, -1), (111, 17, 1),
    (112, 22, 1),

    (114, 13, 1), (114, 12, -1),
    (115, 17, -1), (115, 14, 1), (115, 22, -1),
    (116, 3, 1), (116, 12, -1), (116, 17, -1), (116, 8, -1), (116, 14, -1), (116, 22, -1), (116, 16, 1), (116, 7, 1), (116, 15, 1),
    (117, 17, 1), (117, 2, 1), (117, 3, 1),
    (118, 16, 1), (118, 5, 1), (118, 6, -1), (118, 18, -1), (118, 13, 1), (118, 4, 1), (118, 11, -1),
    (119, 3, 1),
    (120, 16, -1), (120, 6, 1), (120, 3, 1), (120, 9, -1), (120, 15, 1), (120, 8, 1),
    (121, 7, -1), (121, 16, -1), (121, 8, -1), (121, 22, -1),
    (122, 10, -1),

    (124, 8, 1), (124, 2, 1), (124, 7, -1), (124, 20, 1),
    (125, 22, 1),
    (126, 17, 1), (126, 7, -1),(126, 6, -1), (126, 15, -1),
    (127, 22, 1), (127, 21, 1), (127, 6, 1), (127, 19, -1), (127, 2, 1),

    (129, 2, -1),
    (132, 3, 1), (132, 12, -1), (132, 5, -1), (132, 20, 1), (132, 15, 1), (132, 2, -1), (132, 18, 1), (132, 6, -1), (132, 17, 1),
    (133, 2, -1), (133, 7, 1), (133, 10, -1), (133, 17, -1), (133, 8, -1), (133, 21, 1), (133, 19, -1),
    (134, 4, 1), (134, 19, -1), (134, 2, 1), (134, 10, 1), (134, 21, 1), (134, 6, 1), (134, 11, -1), (134, 17, -1),
    (135, 5, 1), (135, 13, -1), (135, 2, -1), (135, 6, 1), (135, 15, -1), (135, 7, 1), (135, 20, 1), (135, 18, -1),
    (136, 13, -1), (136, 17, -1), (136, 2, -1), (136, 4, -1), (136, 21, -1), (136, 5, 1), (136, 12, -1),
    (137, 9, -1), (137, 12, -1), (137, 3, -1), (137, 10, 1), (137, 13, -1), (137, 7, -1), (137, 20, 1), (137, 19, 1),
    (138, 17, 1), (138, 18, 1), (138, 4, 1), (138, 12, -1), (138, 21, 1), (138, 8, -1),
    (139, 3, 1), (139, 2, -1), (139, 11, 1), (139, 19, 1), (139, 8, 1),
    (140, 14, -1), (140, 6, 1), (140, 3, 1),
    (141, 17, 1), (141, 5, -1), (141, 6, 1), (141, 4, -1), (141, 19, -1), (141, 16, -1),
    (142, 5, 1), (142, 20, -1), (142, 14, 1), (142, 2, 1), (142, 15, 1), (142, 8, 1), (142, 21, -1), (142, 19, -1), (142, 12, 1),
    (143, 6, 1), (143, 4, 1), (143, 12, 1),

    (145, 7, 1), (145, 16, -1), (145, 6, 1), (145, 17, 1), (145, 12, 1), (145, 8, 1), (145, 19, 1), (145, 20, -1), (145, 10, 1),
    (146, 10, -1), (146, 7, 1), (146, 18, 1), (146, 5, 1), (146, 8, -1), (146, 3, 1), (146, 13, 1), (146, 6, 1),
    (147, 10, -1), (147, 3, 1), (147, 4, -1),
    (148, 2, -1), (148, 16, 1), (148, 5, 1), (148, 13, 1), (148, 4, -1), (148, 17, -1),

    (150, 12, -1), (150, 9, 1), (150, 17, 1), (150, 5, -1), (150, 15, 1), (150, 4, -1), (150, 6, -1),
    (151, 14, -1), (151, 8, 1), (151, 5, -1), (151, 7, 1),
    (152, 6, -1), (152, 13, -1), (152, 19, 1), (152, 21, -1),
    (153, 3, -1), (153, 10, -1),
    (154, 4, -1), (154, 17, -1), (154, 15, 1), (154, 18, 1), (154, 13, 1), (154, 2, -1), (154, 5, 1), (154, 12, 1),
    (155, 21, -1), (155, 14, -1), (155, 10, -1), (155, 17, 1), (155, 3, 1), (155, 9, -1), (155, 11, 1),
    (156, 16, -1),

    (158, 3, 1), (158, 9, 1), (158, 4, 1), (158, 19, -1), (158, 21, -1), (158, 5, -1), (158, 7, -1), (158, 2, 1), (158, 16, -1),
    (159, 20, 1), (159, 7, -1), (159, 15, -1), (159, 2, 1), (159, 9, -1), (159, 11, -1), (159, 13, 1), (159, 18, -1), (159, 21, -1),

    (161, 8, -1), (161, 17, -1), (161, 20, -1), (161, 10, -1), (161, 11, -1),
    (162, 4, 1), (162, 17, -1),
    (163, 17, 1),
    (164, 21, 1), (164, 20, 1), (164, 16, -1), (164, 7, 1),
    (165, 21, 1),
    (166, 3, 1), (166, 20, 1), (166, 2, -1), (166, 7, -1), (166, 6, -1),
    (167, 18, 1),
    (168, 5, 1), (168, 10, 1), (168, 15, -1), (168, 11, -1), (168, 16, -1),
    (169, 6, -1), (169, 3, -1), (169, 5, -1), (169, 8, -1),
    (170, 14, -1), (170, 4, 1), (170, 10, 1), (170, 8, -1), (170, 13, -1), (170, 20, -1), (170, 19, -1), (170, 18, 1), (170, 2, 1),
    (171, 20, -1), (171, 7, 1), (171, 21, 1), (171, 16, -1), (171, 4, -1), (171, 3, 1), (171, 17, -1), (171, 9, -1),
    (172, 21, -1),
    (173, 5, -1), (173, 2, -1), (173, 14, -1), (173, 8, -1),
    (174, 17, 1), (174, 14, -1), (174, 4, -1), (174, 3, -1), (174, 7, -1), (174, 12, 1), (174, 5, -1), (174, 20, 1), (174, 8, -1),
    (175, 8, -1),
    (176, 16, -1), (176, 3, 1),
    (177, 19, -1), (177, 7, -1),
    (178, 18, 1), (178, 2, -1),
    (179, 17, 1), (179, 13, -1), (179, 4, -1),
    (180, 2, 1), (180, 9, 1), (180, 13, 1), (180, 20, 1), (180, 4, -1), (180, 12, -1), (180, 19, -1), (180, 21, 1),
    (181, 5, -1), (181, 17, -1), (181, 13, -1), (181, 12, -1), (181, 6, -1),
    (182, 15, -1), (182, 12, 1), (182, 17, -1), (182, 9, 1), (182, 8, 1), (182, 20, 1),
    (183, 7, -1), (183, 8, 1), (183, 12, -1),
    (184, 19, -1), (184, 9, 1), (184, 4, -1), (184, 10, 1), (184, 18, -1), (184, 16, -1),
    (185, 19, 1), (185, 14, 1), (185, 6, -1), (185, 7, -1), (185, 8, -1), (185, 5, 1), (185, 18, 1), (185, 9, 1),
    (186, 9, -1), (186, 3, 1), (186, 17, 1), (186, 18, -1), (186, 14, -1), (186, 15, 1), (186, 10, 1),

    (188, 14, -1), (188, 2, 1), (188, 20, -1), (188, 16, -1), (188, 5, -1), (188, 3, 1), (188, 11, 1),
    (189, 2, -1), (189, 16, -1),
    (190, 13, -1), (190, 16, -1), (190, 4, 1), (190, 11, -1),
    (191, 12, -1), (191, 18, 1), (191, 4, -1), (191, 21, 1), (191, 16, -1), (191, 2, 1), (191, 13, -1),
    (192, 5, -1),
    (193, 7, -1), (193, 9, 1), (193, 6, 1), (193, 13, -1), (193, 20, 1), (193, 16, -1), (193, 19, -1), (193, 10, -1), (193, 14, -1),
    (194, 10, 1), (194, 13, 1), (194, 21, 1), (194, 6, -1), (194, 7, -1), (194, 4, 1), (194, 16, 1), (194, 12, -1), (194, 11, 1),
    (195, 2, 1),
    (196, 7, 1), (196, 9, 1), (196, 15, 1), (196, 8, -1), (196, 12, 1),
    (197, 21, 1), (197, 16, -1), (197, 13, -1), (197, 20, 1),
    (198, 10, 1), (198, 19, 1), (198, 21, 1), (198, 17, 1),


    (201, 20, -1), (201, 16, -1), (201, 19, -1), (201, 17, 1), (201, 14, 1), (201, 12, 1),
    (202, 10, 1),

    (204, 12, -1), (204, 20, -1), (204, 13, 1), (204, 4, -1),
    (205, 17, 1), (205, 6, -1), (205, 8, -1), (205, 5, 1), (205, 3, -1),
    (206, 8, -1), (206, 16, 1), (206, 6, -1), (206, 10, -1), (206, 11, -1), (206, 19, -1), (206, 3, -1), (206, 21, 1),
    (207, 6, -1), (207, 9, -1), (207, 15, 1), (207, 5, 1),
    (208, 10, -1), (208, 15, 1), (208, 13, 1), (208, 17, 1), (208, 2, -1),
    (209, 8, -1), (209, 5, 1), (209, 6, -1), (209, 17, -1), (209, 14, 1),
    (210, 10, -1), (210, 5, 1), (210, 8, 1), (210, 18, 1), (210, 12, -1), (210, 3, -1),
    (211, 2, 1), (211, 4, -1), (211, 14, -1), (211, 16, 1), (211, 5, 1),
    (212, 19, -1),
    (213, 7, 1), (213, 20, -1), (213, 12, 1), (213, 9, -1), (213, 6, -1), (213, 2, -1), (213, 4, 1),
    (214, 15, 1), (214, 2, -1), (214, 12, 1), (214, 10, 1), (214, 11, -1),

    (216, 7, 1), (216, 2, -1), (216, 15, -1), (216, 3, -1), (216, 10, 1), (216, 11, -1), (216, 4, 1), (216, 9, 1),

    (218, 15, -1), (218, 5, 1), (218, 21, -1), (218, 11, -1), (218, 3, -1), (218, 19, 1), (218, 9, 1), (218, 10, -1), (218, 2, 1),
    (219, 18, -1), (219, 9, -1), (219, 3, 1),
    (220, 10, -1), (220, 4, 1), (220, 18, -1), (220, 20, 1), (220, 15, -1),
    (221, 18, 1), (221, 6, 1), (221, 9, -1), (221, 14, 1), (221, 8, -1),
    (222, 18, -1), (222, 5, 1), (222, 12, 1), (222, 9, 1), (222, 19, -1),
    (223, 2, -1), (223, 21, -1), (223, 10, 1), (223, 7, 1), (223, 19, 1), (223, 18, 1), (223, 14, 1), (223, 3, -1), (223, 17, -1),
    (224, 11, -1),
    (225, 6, -1), (225, 16, 1), (225, 18, -1), (225, 11, -1), (225, 4, -1), (225, 9, -1), (225, 8, 1),
    (226, 14, -1), (226, 20, 1), (226, 21, 1), (226, 19, -1), (226, 17, 1), (226, 5, 1), (226, 18, 1), (226, 6, 1), (226, 11, 1),
    (227, 7, -1),
    (228, 9, 1), (228, 14, -1), (228, 6, -1), (228, 13, -1), (228, 2, -1), (228, 11, -1), (228, 5, 1),
    (229, 11, -1), (229, 10, 1), (229, 21, -1),
    (230, 15, -1), (230, 17, -1), (230, 18, -1), (230, 21, -1), (230, 5, 1),
    (231, 12, 1),

    (233, 21, -1), (233, 12, 1), (233, 13, -1),
    (234, 2, -1), (234, 11, -1), (234, 20, 1), (234, 14, -1), (234, 17, -1), (234, 19, 1), (234, 5, 1),
    (235, 10, -1), (235, 16, -1), (235, 9, 1), (235, 12, 1), (235, 14, -1), (235, 21, -1),
    (236, 6, -1),
    (237, 11, -1), (237, 3, -1), (237, 16, -1), (237, 8, 1),
    (238, 8, -1), (238, 2, 1), (238, 10, 1), (238, 18, 1), (238, 16, 1), (238, 21, -1), (238, 15, -1), (238, 11, 1), (238, 4, -1),
    (239, 4, -1), (239, 3, -1), (239, 7, 1),
    (240, 3, 1), (240, 14, 1), (240, 11, 1), (240, 16, 1), (240, 12, -1),

    (242, 6, 1), (242, 18, -1), (242, 2, 1), (242, 8, 1), (242, 15, -1), (242, 20, -1), (242, 13, -1), (242, 3, -1),

    (244, 6, -1), (244, 7, 1), (244, 9, 1), (244, 4, 1), (244, 8, 1), (244, 16, -1), (244, 14, 1),
    (245, 17, 1), (245, 12, -1), (245, 16, -1), (245, 7, 1),

    (247, 11, 1), (247, 13, 1),
    (248, 18, 1), (248, 4, -1), (248, 15, -1), (248, 13, -1), (248, 6, 1),

    (250, 13, -1), (250, 9, 1), (250, 6, 1), (250, 18, -1), (250, 21, -1), (250, 17, 1), (250, 14, 1), (250, 3, -1),

    (252, 18, -1), (252, 5, 1), (252, 8, -1), (252, 13, -1),
    (253, 21, 1), (253, 3, 1),
    (254, 13, 1),
    (255, 13, 1), (255, 4, 1), (255, 5, 1), (255, 8, 1), (255, 19, 1), (255, 20, -1), (255, 15, -1),
    (256, 8, 1), (256, 6, -1), (256, 13, 1), (256, 14, 1), (256, 10, 1), (256, 21, 1), (256, 5, 1), (256, 11, 1), (256, 19, -1),

    (258, 10, -1), (258, 11, 1), (258, 4, -1), (258, 5, -1), (258, 21, -1), (258, 6, 1), (258, 12, 1), (258, 8, 1),
    (259, 16, -1), (259, 20, -1),
    (260, 6, -1), (260, 13, 1), (260, 3, 1),
    (261, 21, -1), (261, 14, 1), (261, 6, -1), (261, 13, 1),
    (262, 12, -1), (262, 11, -1),
    (263, 2, -1), (263, 13, 1), (263, 10, -1), (263, 8, -1), (263, 17, 1), (263, 9, -1), (263, 6, 1), (263, 15, -1),
    (264, 16, -1), (264, 13, 1), (264, 4, 1), (264, 17, -1), (264, 21, 1),

    (266, 14, 1), (266, 10, 1), (266, 4, -1), (266, 18, -1), (266, 19, 1), (266, 20, 1), (266, 12, 1), (266, 11, 1), (266, 15, 1),
    (267, 4, 1), (267, 18, -1), (267, 6, 1),
    (268, 9, -1),
    (269, 21, -1), (269, 4, -1),
    (270, 3, -1), (270, 8, 1), (270, 16, -1), (270, 2, -1), (270, 7, 1), (270, 13, -1), (270, 15, -1), (270, 9, 1), (270, 17, 1),
    (271, 6, -1), (271, 13, -1), (271, 11, 1), (271, 5, -1),
    (272, 21, 1), (272, 15, -1), (272, 3, -1), (272, 20, 1), (272, 10, 1), (272, 16, 1), (272, 14, -1), (272, 17, 1), (272, 4, -1),
    (273, 13, 1), (273, 6, 1),
    (274, 17, 1), (274, 13, -1), (274, 2, 1), (274, 6, 1), (274, 4, -1), (274, 8, -1), (274, 18, 1),
    (275, 16, 1), (275, 14, 1), (275, 3, 1), (275, 11, 1), (275, 18, -1), (275, 5, -1),
    (276, 6, -1), (276, 10, 1), (276, 16, 1), (276, 4, 1), (276, 19, -1), (276, 8, 1), (276, 20, -1), (276, 21, -1), (276, 9, -1),

    (278, 12, -1), (278, 9, -1), (278, 21, 1), (278, 19, 1), (278, 7, -1),
    (279, 17, -1), (279, 20, 1), (279, 8, 1), (279, 10, 1),
    (280, 9, -1), (280, 8, -1),
    (281, 21, 1), (281, 7, 1), (281, 11, -1), (281, 13, 1), (281, 3, 1), (281, 17, 1),
    (282, 6, -1), (282, 9, 1), (282, 13, 1), (282, 15, 1), (282, 19, -1), (282, 10, -1),

    (284, 16, -1), (284, 15, 1), (284, 14, -1), (284, 17, -1),
    (285, 11, 1), (285, 8, -1), (285, 14, -1), (285, 5, 1), (285, 9, 1), (285, 10, 1),
    (286, 13, 1), (286, 18, 1), (286, 17, -1), (286, 21, -1), (286, 9, 1), (286, 11, -1), (286, 16, -1), (286, 8, -1), (286, 2, -1),
    (287, 20, -1), (287, 18, 1), (287, 10, 1), (287, 7, 1),
    (288, 20, 1), (288, 13, -1),
    (289, 17, -1), (289, 8, 1), (289, 7, -1), (289, 4, -1), (289, 12, -1), (289, 10, -1), (289, 15, 1), (289, 20, -1),
    (290, 8, -1), (290, 3, 1), (290, 2, -1), (290, 15, 1), (290, 5, 1), (290, 7, 1), (290, 20, 1), (290, 9, -1), (290, 18, 1),
    (291, 12, 1), (291, 21, 1), (291, 15, 1), (291, 20, -1),
    (292, 5, 1),
    (293, 16, -1), (293, 13, -1), (293, 14, -1), (293, 2, 1), (293, 5, -1), (293, 19, 1),
    (294, 11, 1), (294, 15, 1), (294, 14, -1), (294, 4, 1),
    (295, 12, 1), (295, 8, -1), (295, 5, -1),
    (296, 20, -1), (296, 13, 1), (296, 11, -1), (296, 6, -1), (296, 10, 1), (296, 21, -1), (296, 2, -1), (296, 3, -1), (296, 18, -1),
    (297, 11, -1), (297, 10, 1), (297, 5, -1), (297, 12, 1), (297, 8, 1),
    (298, 2, 1), (298, 20, 1), (298, 12, -1), (298, 14, -1), (298, 8, 1), (298, 7, -1),
    (299, 13, -1), (299, 16, 1), (299, 2, 1), (299, 6, 1), (299, 17, 1),
    (300, 17, -1), (300, 21, 1), (300, 14, 1), (300, 2, 1), (300, 5, 1), (300, 16, -1), (300, 4, 1),

    (302, 9, -1), (302, 14, -1), (302, 17, 1), (302, 2, -1), (302, 16, 1), (302, 18, -1), (302, 13, 1), (302, 11, -1), (302, 7, -1),
    (303, 20, 1), (303, 9, -1),
    (304, 20, 1), (304, 18, 1), (304, 15, -1),
    (305, 9, 1), (305, 10, 1), (305, 6, 1), (305, 14, -1), (305, 2, -1),
    (306, 16, 1), (306, 18, -1), (306, 13, 1), (306, 21, -1), (306, 4, -1),
    (307, 14, 1), (307, 18, 1), (307, 9, -1), (307, 12, 1), (307, 16, -1), (307, 19, 1), (307, 20, 1), (307, 3, -1), (307, 11, 1),
    (308, 7, -1), (308, 15, -1), (308, 19, -1), (308, 13, 1), (308, 16, 1), (308, 2, 1), (308, 4, -1), (308, 12, 1),
    (309, 17, 1), (309, 14, 1), (309, 19, 1),
    (310, 20, -1), (310, 18, 1), (310, 14, 1), (310, 13, 1), (310, 11, -1), (310, 17, 1), (310, 15, -1), (310, 2, 1),
    (311, 9, -1), (311, 16, 1), (311, 17, 1),
    (312, 8, -1), (312, 11, -1), (312, 10, -1), (312, 3, 1), (312, 13, 1), (312, 20, 1),
    (313, 8, -1), (313, 3, 1), (313, 17, 1), (313, 19, 1), (313, 13, -1), (313, 16, -1), (313, 15, 1),
    (314, 5, -1), (314, 12, -1), (314, 9, -1), (314, 21, -1),
    (315, 13, -1), (315, 14, 1), (315, 6, 1), (315, 18, 1),
    (316, 21, 1), (316, 8, 1), (316, 5, 1), (316, 10, -1),
    (317, 4, -1),
    (318, 5, 1), (318, 14, 1), (318, 12, 1), (318, 4, -1),


    (321, 18, 1), (321, 12, -1), (321, 4, 1),
    (322, 18, -1), (322, 6, 1), (322, 8, 1), (322, 4, -1), (322, 19, 1), (322, 12, -1), (322, 7, -1), (322, 15, -1), (322, 2, -1),

    (324, 18, -1), (324, 5, 1), (324, 10, -1), (324, 20, -1),
    (325, 17, -1), (325, 12, -1), (325, 16, 1), (325, 13, 1),
    (326, 8, -1), (326, 7, 1), (326, 5, 1), (326, 21, 1), (326, 18, -1), (326, 16, 1), (326, 15, -1);
