from flask import Flask, request, Response
from flask_restful import Resource
import secrets, random
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db
from datetime import datetime

# ALL PLACEHOLDER DB FUNCTIONS ARE JUST COSMETICS,
# NO NEED TO FOLLOW THAT SYNTAX, YOU DO YOU

class Sales(Resource):

    # Getting sales
    # Url format: `sales`
    def get(self):
        print('Get sales attempt received')

        # Placeholder function to get sales and sale products from database
        # sales = db.getSales()
        # products = db.getSaleProducts()

        # Placeholder code to add the actual products to each sale object
        # Depending on how we do it, might not need this or needs to be changed
        # for sale in sales:
        #     productList = []
        #     for product in products:
        #         if product['saleId'] == sale['saleId']:
        #             productList.append(product)

        #     sale['productList'] = productList

        # return {'sales': sales}
    
    # Adding/making a new sale
    # Url format: `sales`
    def post(self):
        print('Add sale attempt received')

        data = request.json
        name = data.get('name')
        start = data.get('start')
        startDate = datetime.strptime(start, '%Y-%m-%d').date()
        end = data.get('end')
        endDate = datetime.strptime(end, '%Y-%m-%d').date()
        products = data.get('products')

        print(name, startDate, endDate, products)
        
        # Placeholder function to send to database
        # db.addSale(name, startDate, endDate, products)

    # Editing a sale such as adding/removing products
    # Url format: `sales`
    def put(self):
        print('Edit sale attempt received')

        data = request.json
        saleId = data.get('saleId')
        
        # Placeholder function to get sale from database
        # sale = db.getSale(int(saleId))

        for field in data:
            if field is not 'saleId':
                sale[field] = data.get(field)

        # Placeholder function to update sale
        # db.updateSale(sale)