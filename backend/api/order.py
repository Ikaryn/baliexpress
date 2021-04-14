from flask import Flask, request, Response
from flask_restful import Resource
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db
from datetime import datetime

class Order(Resource):

    # Getting an order
    # Url format: `order?orderId=${orderId}`
    def get(self):
        print('Get order attempt received')
        orderId = int(request.args.get('orderId'))

        order = db.getOrder(orderId)

        if order is None:
            return {'Error: Failed to get order'}

        return {'order': order}


    # Making a payment/adding a new order
    # Url format: `order`
    def post(self):
        print('Order/Payment attempt received')
        data = request.json

        orderDate = datetime.today().strftime('%Y-%m-%d')
        userId = int(data.get('userId'))
        products = date.get('products')

        orderId = db.addOrder(userId, orderDate, products)
        
        if orderId is None:
            return {'Error: Failed to make order'}
        
        return {'orderId': orderId}