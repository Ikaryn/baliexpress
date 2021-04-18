
from flask import Flask, request, Response
from flask_restful import Resource
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db
from datetime import datetime
from .helpers import *

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
    
    # Getting all products of a certain category
    # Url formats:
    # All products for a category: `product?category=${category}`
    # A list of specific products: `product?productIds=${productIds}`
    def get(self):

        data = request.args
        category= data.get('category')
        productIds = data.get('productIds')

        if category is not None:
            print("Get ProductList attempt received")
            products = db.getAllProducts(str(category))

            # Converting all date objects and booleans to strings for serialization
            products = boolDateToString(products)

            return ({'products':products})
        else:
            print("Get Products attempt received")

            # Split the query string into productIds
            productIds = productIds.split(',')

            products = []
            for productId in productIds:
                products.append(db.getProduct(int(productId)))
            products = boolDateToString(products)
            return ({'products':products})

    # Adding a new product to database
    # Url format: `product`
    def post(self):
        print('Add product attempt received')
        data = request.json

        newProduct = {}
        for field in data:
            if field == 'image':
                img = data.get(field)

                # Removing the image tag from string
                if img is not None:
                    img = img.split(',')[1]
                    newProduct[field] = img
            elif field == 'cooler_included' or field == 'overclockable':
                value = data.get(field)
                if value.lower() == 'yes':
                    newProduct[field] = True
                else:
                    newProduct[field] = False
            else:
                newProduct[field] = data.get(field)
        
        newReleaseDate = datetime.today().date()
        newProduct['release_date'] = newReleaseDate

        productId = db.addProduct(newProduct)
        product = db.getProduct(productId)

        releaseDate = product['release_date'].strftime('%Y-%m-%d')
        product['release_date'] = releaseDate

        return {'product': product}

    # Editing an existing product
    # Url format: `product`
    def put(self):

        data = request.json

        # Edit product details
        print('Edit product attempt received')

        # Needs productId to get the right product for editing
        productId = data.get('id')
        product = db.getProduct(productId)

        # for field in product:
        #     if field != 'image':
        #         print(field, ":", product[field], type(product[field]))
        # for field in data:
        #     if field != 'image':
        #         print(field, ":", data.get(field), type(data.get(field)))

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
        product.pop('sale')
        db.editProduct(productId, product)

        
        return
    
    # Remove an existing product
    # Url format: `product`
    def delete(self):
        
        # Delete a product using its productId
        print('Remove product attempt received')
        data = request.json

        productId = data.get('id')
        db.deleteProduct(productId)
        return {'message': 'product successfully removed'}

class Search (Resource):

    # Search for products
    # Url formats:
    # Quick search: `search?query=${query}&quickSearch=${true}`
    # Full search: `search?query=${query}`
    def get(self):
        
        data = request.args
        query = data.get('query')
        quickSearch = data.get('quickSearch')

        if quickSearch:
            print('Quick search attempt received')

            resultSize = 5 # Max number of products to be returned

            results = productSearch(query, resultSize)
            results = boolDateToString(results)
            return {'results': results}

        else:
            print('Search attempt received')

            results = productSearch(query)
            results = boolDateToString(results)
            return {'results': results}
