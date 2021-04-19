from flask import Flask, request, Response
from flask_restful import Resource
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db
from datetime import datetime

# Helper function to attach all associated products to an order and format for JSON serialization
def formatOrder(order):
    productList = []
    total = 0

    for product in order['products']:
        productId = product['productid']
        p = db.getProduct(productId)
        p['quantity'] = product['quantity']
        p['release_date'] = p['release_date'].strftime('%Y-%m-%d')
        total += p['price'] * p['quantity']
        productList.append(p)

    order['date'] = order['date'].strftime('%Y-%m-%d')
    order['products'] = productList
    order['total'] = total

class Order(Resource):

    # Getting an order
    # Url formats
    # For a single order: `order?orderId=${orderId}`
    # For a single user: `order?userId=${userId}`
    # For all orders (admin use): `order`
    def get(self):
        print('Get order attempt received')
        orderId = request.args.get('orderId')
        userId = request.args.get('userId')

        if orderId is not None:
            order = db.getOrder(int(orderId))
            if order is None:
                return {'Error: Failed to get order'}
            else:
                formatOrder(order)

            return {'order': order}

        elif userId is not None:
            orders = db.getUsersOrders(int(userId))
            if orders is None:
                return{'orders': None}
            else:
                for order in orders:
                    formatOrder(order)

                return {'orders': orders}
        else:
            orders = db.getAllOrders()
            if orders is None:
                return{'orders': None}
            else:
                for order in orders:
                    formatOrder(order)
                return {'orders': orders}



    # Making a payment/adding a new order
    # Url format: `order`
    def post(self):
        print('Order/Payment attempt received')
        data = request.json

        orderDate = datetime.today().strftime('%Y-%m-%d')
        userId = int(data.get('userId'))
        products = data.get('products')
        builds = data.get('builds')
        shipping = data.get('shipping')

        print(products)
        
        # Convert the product list of dicts to a complete dictionary
        # productDict = {}
        # for product in products:
        #     productDict[product['productid']] = product['quantity']

        # For each build, get the parts and add them to the above dictionary
        for build in builds:
            for field in build:

                # Checking if the component has a product or is empty
                if isinstance(build[field], dict):
                    
                    # Add to exisitng quantity if the product was already in the cart
                    if str(build[field]['id']) in products:
                        products[str(build[field]['id'])] += build['quantity']
                    else:
                        products[str(build[field]['id'])] = build['quantity']

        # Convert back to list of dicts
        # productList = [{'productid': key, 'quantity': productDict[key]} for key in productDict]

        print(products)

        orderId = db.addOrder(  userId, 
                                orderDate, 
                                products,
                                shipping['address'],
                                shipping['city'],
                                shipping['postcode'],
                                shipping['state'],
                                shipping['country'])
        
        if orderId is None:
            return {'Error': 'Failed to make order'}
        
        return {'orderId': orderId}