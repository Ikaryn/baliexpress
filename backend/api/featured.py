from flask import Flask, request, Response
from flask_restful import Resource
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db
from operator import itemgetter


class Featured(Resource):

    def get(self):
        print("Get featured products attempt received")

        major = 3
        minor = 8

        products = db.getAllProducts()

        dateSorted = sorted(products, key=lambda item:item['release_date'], reverse=True)

        major_features = dateSorted[:major]

        for product in products:
            overallRating = 0
            ratingSum = 0
            reviews = db.getProductReviews(product['id'])

            for review in reviews:
                ratingSum += review['rating']
                
            if ratingSum != 0:
                overallRating = ratingSum / len(reviews)

            product['rating'] = overallRating 

        ratingSorted = sorted(products, key=lambda item:item['rating'], reverse=True)

        minor_features = ratingSorted[:minor]

        for product in major_features:
            releaseDate = product['release_date'].strftime('%Y-%m-%d')
            product['release_date'] = releaseDate

        for product in minor_features:
            releaseDate = product['release_date'].strftime('%Y-%m-%d')
            product['release_date'] = releaseDate

        return {'major features': major_features,
                'minor features': minor_features}

