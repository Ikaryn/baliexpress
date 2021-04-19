from flask import Flask, request, Response
from flask_restful import Resource
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db
from operator import itemgetter
from .helpers import *


class Featured(Resource):

    # Getting the featured products to show on the home page
    # Url format: `featured`
    def get(self):
        print("Get featured products attempt received")

        # Number of products for the main banner and then the minor products below
        major = 3
        minor = 8

        products = db.getAllProducts()

        # Sort all products by descending date
        dateSorted = sorted(products, key=lambda item:item['release_date'], reverse=True)

        # The major features are the newest products
        major_features = dateSorted[:major]

        # For each product, calculate their overall review rating
        for product in products:
            overallRating = 0
            ratingSum = 0
            reviews = db.getProductReviews(product['id'])

            for review in reviews:
                ratingSum += review['rating']
                
            if ratingSum != 0:
                overallRating = ratingSum / len(reviews)

            product['rating'] = overallRating 

        # Sort the products based on their overall rating descending
        ratingSorted = sorted(products, key=lambda item:item['rating'], reverse=True)

        # The minor features are the highest rated products
        minor_features = ratingSorted[:minor]

        # Format products for JSON serialization
        major_features = boolDateToString(major_features)
        minor_features = boolDateToString(minor_features)

        return {'major_features': major_features,
                'minor_features': minor_features}

