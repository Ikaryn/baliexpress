from flask import Flask, request, Response
from flask_restful import Resource
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db


class Featured(Resource):

    def get(self):
        print("Get featured products attempt received")

        major = 3
        minor = 8

        products = db.getAllProducts()

        dateSorted = products.sort(key=lambda item:item['release_date'], reverse=True)
        major_features = {dateSorted[:major]}

        for product in products:
            overallRating = 0
            ratingSum = 0
            reviews = db.getProductReviews(product['productId'])

            for review in reviews:
                ratingSum += review['rating']
                
            if ratingSum != 0:
                overallRating = ratingSum / len(reviews)

            product['rating'] = overallRating 

        ratingSorted = products.sort(key=lambda item:item['rating'], reverse=True)

        minor_features = {ratingSorted[:minor]}

        return {'major features': major_features,
                'minor features': minor_features}
