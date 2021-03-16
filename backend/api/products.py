from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
# from app import api
import secrets, random
import os
from base64 import b64encode
from flask_cors import CORS
from flask_restful import Api
#from PIL import Image
from io import BytesIO

# from dbaccess import *

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

def getEncodedImage (category, imgName):

    ENCODING = 'utf-8'

    dirname = os.path.dirname(__file__)
    path = os.path.join(dirname, 'images', category, imgName + '.jpg')
    with open(path, 'rb') as image:
        im_b64 = b64encode(image.read())
        im_b64_string = im_b64.decode(ENCODING)
        # print("Image successfully encoded:", imgName)
    return im_b64_string

# Actual encoded images, error with not being JSON serializable

AMD_Ryzen_5_5600X_img = getEncodedImage('CPU', 'AMD Ryzen 5 5600X')
AMD_Ryzen_5_3600_img = getEncodedImage('CPU', 'AMD Ryzen 5 3600')
AMD_Ryzen_5_2600_img = getEncodedImage('CPU', 'AMD Ryzen 5 2600')
Intel_Core_i5_10400_img = getEncodedImage('CPU', 'Intel Core i5 10400')
Intel_Core_i5_9400F_img = getEncodedImage('CPU', 'Intel Core i5 9400F')
Intel_Core_i3_10100_img = getEncodedImage('CPU', 'Intel Core i5 10400')
ASRockB550_img = getEncodedImage('Motherboards', 'ASRock B550 Phantom Gaming 4')
MSIB450M_img = getEncodedImage('Motherboards', 'MSI B450M Pro VDH Max')
ASRockB460_img = getEncodedImage('Motherboards', 'ASRock B460 Phantom Gaming 4')
Gigabyte_B450M_D53H_img = getEncodedImage('Motherboards','Gigabyte B450M DS3H')
TeamMS30_img = getEncodedImage('Storage', 'Team MS30 1TB M.2 SATA SSD')
CrucialBX500_img = getEncodedImage('Storage', 'Crucial BX500 480GB 2.5 3D NAND SATA SSD')
WD10EZEX_img = getEncodedImage('Storage', 'WD WD10EZEX 1TB Blue 3.5 7200RPM SATA3 Hard Drive')
Samsung870Evo_img = getEncodedImage('Storage', 'Samsung 870 Evo 500GB 2.5 SATA III 6GBs V-NAND SSD MZ-77E500BW')


# Placeholders to allow the product page to work
# AMD_Ryzen_5_5600X_img = 1
# AMD_Ryzen_5_3600_img = 1
# AMD_Ryzen_5_2600_img = 1
# Intel_Core_i5_10400_img = 1
# Intel_Core_i5_9400F_img = 1
# Intel_Core_i3_10100_img = 1
# ASRockB550_img = 1
# MSIB450M_img = 1
# ASRockB460_img = 1
# Gigabyte_B450M_D53H_img = 1
# TeamMS30_img = 1
# CrucialBX500_img = 1
# WD10EZEX_img = 1
# Samsung870Evo_img = 1




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
    },
    "image": AMD_Ryzen_5_5600X_img
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
    },
    "image": AMD_Ryzen_5_3600_img
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
    },
    "image": AMD_Ryzen_5_2600_img
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
    },
    "image": Intel_Core_i5_10400_img
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
    },
    "image": Intel_Core_i5_9400F_img
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
    },
    "image": Intel_Core_i3_10100_img
}

ASRockB550 = {
    "id":6,
    "name":"ASRock B550 Phantom Gaming 4 AM4 ATX Motherboard",
    "type":"Motherboards",
    "brand":"ASRock",
    "price":159,
    "specs": {
        "socket":"AM4",
        "memory supported":"DDR4",
        "no. memory slots":4,
        "Wi-Fi":False,
    },
    "image": ASRockB550_img
}

MSIB450M = {
    "id":7,
    "name":"MSI B450M PRO-VDH MAX AM4 Micro-ATX Motherboard",
    "type":"Motherboards",
    "brand":"MSI",
    "price":109,
    "specs": {
        "socket":"AM4",
        "memory supported":"DDR4",
        "no. memory slots":4,
        "Wi-Fi":False,
    },
    "image": MSIB450M_img
}
ASRockB460 = {
    "id":8,
    "name":"ASRock B460 Phantom Gaming 4 LGA 1200 ATX Motherboard",
    "type":"Motherboards",
    "brand":"ASRock",
    "price":149,
    "specs": {
        "socket":"LGA 1200",
        "memory supported":"DDR4",
        "no. memory slots":4,
        "Wi-Fi":False,
    },
    "image": ASRockB460_img
}
Gigabyte_B450M_D53H = {
    "id":9,
    "name":"Gigabyte B450M DS3H WIFI AM4 Micro-ATX Motherboard",
    "type":"Motherboards",
    "brand":"Gigabyte",
    "price":139,
    "specs": {
        "socket":"AM4",
        "memory supported":"DDR4",
        "no. memory slots":4,
        "Wi-Fi":False,
    },
    "image": Gigabyte_B450M_D53H_img
}
TeamMS30 = {
    "id":10,
    "name":"Team MS30 1TB M.2 SATA SSD TM8PS7001T0C101",
    "type":"Storage",
    "brand":"Team",
    "price":150,
    "specs": {
        "capacity":"1 TB",
        "format":"SSD",
        "form factor":"M.2",
    },
    "image": TeamMS30_img
 }
CrucialBX500 = {
    "id":11,
    "name":"Crucial BX500 480GB 2.5\" 3D NAND SATA SSD CT480BX500SSD1",
    "type":"Storage",
    "brand":"Crucial",
    "price":67,
    "specs": {
        "capacity":"480 GB",
        "format":"SSD",
        "form factor":"2.5\"",
    },
    "image": CrucialBX500_img
 }
WD10EZEX = {
    "id":12,
    "name":"WD WD10EZEX 1TB Blue 3.5\" 7200RPM SATA3 Hard Drive",
    "type":"Storage",
    "brand":"Western Digital",
    "price":58,
    "specs": {
        "capacity":"1 TB",
        "format":"HDD",
        "form factor":"3.5\"",
    },
    "image": WD10EZEX_img
 }
Samsung870Evo = {
    "id":13,
    "name":"Samsung 870 Evo 500GB 2.5\" SATA III 6GB/s V-NAND SSD MZ-77E500BW",
    "type":"Storage",
    "brand":"Samsung",
    "price":86,
    "specs": {
        "capacity":"500 GB",
        "format":"SSD",
        "form factor":"2.5\"",
    },
    "image": Samsung870Evo_img
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

def getProduct(productId):
    for category in products:
        for product in products[category]:
            if str(product['id']) == str(productId):
                return product

    return None

class ProductList(Resource):
    def get(self,category):
        print("Get ProductList attempt received")

        return ({'products':products[category]})


class ProductPage(Resource):
    def get(self, category, productID):
        print("Product Page request received")

        for product in products[category]:
            if productID == product['id']:
                return ({'product':product})
        return {'error':"Product not found"}

    def post(self):
        print("Product Post received")
        product = request.json
        category = product['type']

        products[category].append(product)
