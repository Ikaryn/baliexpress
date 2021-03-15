from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
# from app import api
import secrets, random

from flask_cors import CORS
from flask_restful import Api

import dbaccess

# AMD_Ryzen_5_5600X = {
#     "id":0,
#     "name":"AMD Ryzen 5 5600X",
#     "type":"CPU",
#     "brand":"AMD",
#     "price":549,
#     "no. of Cores":6,
#     "no. of Threads":12,
#     "base":3.7,
#     "max":4.6,
#     "socket":"AM4",
#     "cooler included":True
# }
AMD_Ryzen_5_5600X = {
    "id":0,
    "name":"AMD Ryzen 5 5600X",
    "type":"CPU",
    "brand":"AMD",
    "price":549,
    "specs": {
        "no. of Cores":6,
        "no. of Threads":12,
        "base":3.7,
        "max":4.6,
        "socket":"AM4",
        "cooler included":True
    }
}

AMD_Ryzen_5_3600 = {
    "id":1,
    "name":"AMD Ryzen 5 3600",
    "type":"CPU",
    "brand":"AMD",
    "price":299,
    "specs": {
        "no. of Cores":6,
        "no. of Threads":12,
        "base":3.6,
        "max":4.2,
        "socket":"AM4",
        "cooler included":True
    }
}
AMD_Ryzen_5_2600 = {
    "id":2,
    "name":"AMD Ryzen 5 2600",
    "type":"CPU",
    "brand":"AMD",
    "price":229,
    "specs": {
        "no. of Cores":6,
        "no. of Threads":12,
        "base":3.4,
        "max":3.9,
        "socket":"AM4",
        "cooler included":True
    }
}
Intel_Core_i5_10400 = {
    "id":3,
    "name":"Intel Core i5-10400",
    "type":"CPU",
    "brand":"Intel",
    "price":249,
    "specs": {
        "no. of Cores":6,
        "no. of Threads":12,
        "base":2.9,
        "max":4.3,
        "socket":"LGA 1200",
        "cooler included":False
    }
}
Intel_Core_i5_9400F = {
    "id":4,
    "name":"Intel Core i5-9400F",
    "type":"CPU",
    "brand":"Intel",
    "price":259,
    "specs": {
        "no. of Cores":6,
        "no. of Threads":6,
        "base":2.9,
        "max":4.1,
        "socket":"FCLGA 1151",
        "cooler included":False
    }
}
Intel_Core_i3_10100 = {
    "id":5,
    "name":"Intel Core i3-10100",
    "type":"CPU",
    "brand":"Intel",
    "price":169,
    "specs":{
        "no. of Cores":4,
        "no. of Threads":8,
        "base":3.6,
        "max":4.3,
        "socket":"LGA 1200",
        "cooler included":False
    }
}

ASRockB550 = {
    "id":6,
    "name":"ASRock B550 Phantom Gaming 4 AM4 ATX Motherboard",
    "type":"motherboard",
    "brand":"ASRock",
    "price":159,
    "socket":"AM4",
    "memory supported":"DDR4",
    "no. memory slots":4,
    "Wi-Fi":False
}

MSIB450M = {
    "id":7,
    "name":"MSI B450M PRO-VDH MAX AM4 Micro-ATX Motherboard",
    "type":"motherboard",
    "brand":"MSI",
    "price":109,
    "socket":"AM4",
    "memory supported":"DDR4",
    "no. memory slots":4,
    "Wi-Fi":False
}
ASRockB460 = {
    "id":8,
    "name":"ASRock B460 Phantom Gaming 4 LGA 1200 ATX Motherboard",
    "type":"motherboard",
    "brand":"ASRock",
    "price":149,
    "socket":"LGA 1200",
    "memory supported":"DDR4",
    "no. memory slots":4,
    "Wi-Fi":False
}
Gigabyte_B450M_D53H = {
    "id":9,
    "name":"Gigabyte B450M DS3H WIFI AM4 Micro-ATX Motherboard",
    "type":"motherboard",
    "brand":"Gigabyte",
    "price":139,
    "socket":"AM4",
    "memory supported":"DDR4",
    "no. memory slots":4,
    "Wi-Fi":False
}
TeamMS30 = {
    "id":10,
    "name":"Team MS30 1TB M.2 SATA SSD TM8PS7001T0C101",
    "type":"storage",
    "brand":"Team",
    "price":150,
    "capacity":"1 TB",
    "format":"SSD",
    "form factor":"M.2"
 }
CrucialBX500 = {
    "id":11,
    "name":"Crucial BX500 480GB 2.5\" 3D NAND SATA SSD CT480BX500SSD1",
    "type":"storage",
    "brand":"Crucial",
    "price":67,
    "capacity":"480 GB",
    "format":"SSD",
    "form factor":"2.5\""
 }
WD10EZEX = {
    "id":12,
    "name":"WD WD10EZEX 1TB Blue 3.5\" 7200RPM SATA3 Hard Drive",
    "type":"storage",
    "brand":"Western Digital",
    "price":58,
    "capacity":"1 TB",
    "format":"HDD",
    "form factor":"3.5\""
 }
Samsung870Evo = {
    "id":13,
    "name":"Samsung 870 Evo 500GB 2.5\" SATA III 6GB/s V-NAND SSD MZ-77E500BW",
    "type":"storage",
    "brand":"Samsung",
    "price":86,
    "capacity":"500 GB",
    "format":"SSD",
    "form factor":"2.5\""
 }

cpus = [AMD_Ryzen_5_2600, AMD_Ryzen_5_3600, AMD_Ryzen_5_5600X, Intel_Core_i3_10100, Intel_Core_i5_10400, Intel_Core_i5_9400F]
motherboards = [ASRockB550, ASRockB460, MSIB450M, Gigabyte_B450M_D53H]
storage = [TeamMS30, CrucialBX500, WD10EZEX, Samsung870Evo]
products = {
    "CPU" : cpus,
    "Motherboards" : motherboards,
    "Storage" : storage
}
# print(cpus)
# print(motherboards)
# print(storage)

class ProductList(Resource):
    def get(self,category):
        print("Get ProductList attempt received")

        return ({'products':products[category]})

    def put(self):
        return

class ProductPage(Resource):
    def get(self, category, id):
        print("Product Page request received")

        for product in products[category]:
            if productID == product['id']:
                return ({'product':product})
