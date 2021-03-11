# Products have the following attributes an ID, a Name, a type, a price, and a brand
# They have more data based upon type
# CPU's have a No. of cores, no. of threads, a base clock, a max clock, a socket, 
#   and a boolean for if cooler is included
# Motherboards have a Socket, memory supported, No. of memory slots, Wi-Fi
# Storage has Capacity, kind(SSD or HDD), and Form Factor

AMD_Ryzen_5_5600X = [0,"AMD Ryzen 5 5600X", "CPU", 549, "AMD", 6, 12, 3.7, 4.6, "AM 4", True]
AMD_Ryzen_5_3600 = [1, "AMD Ryzen 5 3600", "CPU", 299, "AMD", 6, 12, 3.6, 4.2, "AM 4", True]
AMD_Ryzen_5_2600 = [2, "AMD Ryzen 5 2600", "CPU", 229, "AMD", 6, 12, 3.4, 3.9, "AM 4", True]
Intel_Core_i5_10400 = [3, "Intel Core i5-10400", "CPU", 249, "Intel", 6, 12, 2.9, 4.3, "LGA 1200", False]
Intel_Core_i5_9400F = [4, "Intel Core i5-9400F", "CPU", 259, "Intel", 6, 6, 2.9, 4.1, "FCLGA 1151", False]
Intel_Core_i3_10100 = [5, "Intel Core i3-10100", "CPU", 169, "Intel", 4, 8, 3.6, 4.3, "LGA 1200", False]

ASRockB550 = [6, "ASRock B550 Phantom Gaming 4 AM4 ATX Motherboard", "Motherboard", 159, "AM4", "DDR4", 4, False]
MSIB450M = [7, "MSI B450M PRO-VDH MAX AM4 Micro-ATX Motherboard", "Motherboard", 109, "AM4", "DDR4", 4, False]
ASRockB460 = [8, "ASRock B460 Phantom Gaming 4 LGA 1200 ATX Motherboard", "Motherboard", 149, "LGA 1200", "DDR4", 4, False]
Gigabyte_B450M_D53H = [9, "Gigabyte B450M DS3H WIFI AM4 Micro-ATX Motherboard", "Motherboard", 139, "AM4", "DDR4", 4, False]

TeamMS30 = [10, "Team MS30 1TB M.2 SATA SSD TM8PS7001T0C101", "Storage", 150, "1 TB", "SSD", "M.2"]
CrucialBX500 = [11, "Crucial BX500 480GB 2.5\" 3D NAND SATA SSD CT480BX500SSD1", "Storage", 67, "480 GB", "SSD", "2.5\""]
WD10EZEX = [12, "WD WD10EZEX 1TB Blue 3.5\" 7200RPM SATA3 Hard Drive", "Storage", 58, "1 TB", "HDD", "3.5\" SATA"]
Samsung870Evo = [13, "Samsung 870 Evo 500GB 2.5\" SATA III 6GB/s V-NAND SSD MZ-77E500BW", "Storage", 86, "500 GB", "SSD", "2.5\""]
# print(Intel_Core_i5_10400)