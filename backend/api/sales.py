import random, secrets
from datetime import datetime

from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource

from . import dbaccess as db
from .helpers import *


class Sales(Resource):

    # Getting sales
    # Url formats:
    # Get a single sale: `sales?saleId=${saleId}`
    # Get all sales: `sales?all=true`
    # Get only the current sales: `sales?all=false`
    def get(self):

        allSales = request.args.get('all')
        saleId = request.args.get('saleId')

        if saleId is not None:
            print('Get sale attempt received')
            sale = db.getSale(saleId)

            products = []

            # Get associated productIds for the sale
            for item in sale['products']:
                # Get the actual product from the productIds
                product = db.getProduct(item['productid'])
                product['salepercent'] = item['salepercent']
                product['saleSold'] = item['sold']
                products.append(product)

            # Format appropriate fields for JSON serialization
            sale['productList'] = boolDateToString(products)
            sale['startdate'] = sale['startdate'].strftime('%Y-%m-%d')
            sale['enddate'] = sale['enddate'].strftime('%Y-%m-%d')

            return {'sale': sale}

        elif allSales == 'true':
            print('Get all sales attempt received')
            sales = db.getAllSales()

        elif allSales == 'false':
            print('Get current sales attempt received')
            sales = db.getAllCurrentSales()

            for sale in sales:
                # print(sale)
                saleProducts = []

                # Get associated productIds for the sale
                item = db.getSale(sale['id'])
                for saleProduct in item['products']:

                    # Get the actual product from the productIds
                    product = db.getProduct(saleProduct['productid'])
                    saleProducts.append(product)

                # # Format appropriate fields for JSON serialization
                sale['productList'] = boolDateToString(saleProducts)

        else:
            return {'Error: Invalid api request'}

        for sale in sales:

            # # Format appropriate fields for JSON serialization
            sale['startdate'] = sale['startdate'].strftime('%Y-%m-%d')
            sale['enddate'] = sale['enddate'].strftime('%Y-%m-%d')
    
        return {'sales': sales}
        
    # Adding/making a new sale
    # Url format: `sales`
    def post(self):
        print('Add sale attempt received')

        # Getting data from request
        data = request.json
        name = data.get('name')
        start = data.get('start')
        startDate = datetime.strptime(start, '%Y-%m-%d').date()
        end = data.get('end')
        endDate = datetime.strptime(end, '%Y-%m-%d').date()
        products = data.get('products')

        image = data.get('image')
        if image is not None:
            image = image.split(',')[1]
        else:
            return {'Error: No image'}, 400
        
        # Add the sale to the database
        saleId = db.addSale(name, startDate, endDate, products, image)
        if saleId is None:
            return {'error': 'Failed to create sale'}
        
        # Return list of all sales to the frontend
        sales = db.getAllSales()
        for sale in sales:

            sale['startdate'] = sale['startdate'].strftime('%Y-%m-%d')
            sale['enddate'] = sale['enddate'].strftime('%Y-%m-%d')
        
        return {'sales': sales}

    # Editing a sale such as adding/removing products
    # Url format: `sales`
    def put(self):
        print('Edit sale attempt received')

        data = request.json
        saleId = data.get('saleId')

        for field in data:
            if field is not 'saleId':
                sale[field] = data.get(field)
