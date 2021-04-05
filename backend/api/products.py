
from flask import Flask, request, Response
from flask_restful import Resource
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db

# Returns a list of products that fit a certain query with a string
# args is either just the query string, or the query string and desired
# number of results to return
def productSearch(*args):

    query = args[0]
    tokens = query.split(' ')
    products = db.getAllProducts()

    results = []
    while len(tokens) > 0:
        for product in products:
            if all(token.lower() in product['name'].lower() for token in tokens) and not 'relevance' in product:
                product['relevance'] = len(tokens)
                results.append(product)
        tokens.pop()

        return results if len(args) == 1 else results[:args[1]]

class Products(Resource):
    
    def get(self):

        # Get request type from header
        requestType = request.headers.get('request-type')
        print(requestType)
        data = request.args
        category= data.get('category')

        # Getting products from category
        if category is not None:
            print("Get ProductList attempt received")

            products = db.getAllProducts(str(category))
            return ({'products':products})

        elif requestType == 'quick search':

            print('Quick search attempt received')
            query = request.args.get('query')

            results = productSearch(query, 5)
            return {'results': results}
        
        elif requestType == 'search':

            print('Search attempt received')
            query = request.args.get('query')


            results = productSearch(query)
            return {'results': results}
        

    def post(self):
        # Add product to product list
        print('Add product attempt received')
        data = request.json

        newProduct = {}
        for field in data:
            if field == 'image':
                img = data.get(field)
                if img is not None:
                    img = img.split(',')[1]
                    newProduct[field] = img
            else:
                newProduct[field] = data.get(field)
        

        productId = db.addProduct(newProduct)
        product = db.getProduct(productId)

        return {'product': product}
    
    def put(self):

        data = request.json

        # Edit product details
        print('Edit product attempt received')

        # Needs productId to get the right product for editing
        productId = data.get('id')
        product = db.getProduct(productId)

        print("Product before:", product)
        print("Data received:", data)

        for field in data:
            if field == 'specs':
                specs = data.get('specs')
                for key in specs:
                    product['specs'][key] = specs[key]
            elif field == 'image':
                img = data.get(field)
                if 'image' in img:
                    img = img.split(',')[1]
                    product[field] = img
            else:
                product[field] = data.get(field)
        
        product.pop('id')
        print("Edited product:", product)
        db.editProduct(productId, product)
        
        return
    
    def delete(self):
        
        # Delete a product using its productId
        print('Remove product attempt received')
        data = request.json

        productId = data.get('id')
        db.deleteProduct(productId)
        return {'message': 'product successfully removed'}