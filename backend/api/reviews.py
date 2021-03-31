from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
import secrets, random
import os
from base64 import b64encode
from flask_cors import CORS
from flask_restful import Api
from PIL import Image
from . import dbaccess as db
from datetime import datetime
import json

class Reviews(Resource):
    def get(self):
        print('Get reviews attempt received')

        productId = request.args.get('productId')  
        reviews = db.getProductReviews(int(productId))

        for review in reviews:
            review['reviewdate'] = json.dumps(review['reviewdate'].__str__())

        if reviews is None:
            return {'error': 'Unable to fetch reviews'}

        return {'reviews': reviews}

    def post(self):
        print('Add review attempt received')
        data = request.json

        productId = int(data.get('productId'))
        userId = int(data.get('userId'))
        rating = data.get('rating')
        reviewText = data.get('comment')

        reviewDate = datetime.today().strftime('%Y-%m-%d')

        reviewId = db.addReview(productId, userId, 
                                    rating, reviewText, reviewDate)
        
        if reviewId is None:
            return {'error': 'An error occurred: review not added'}
        else:
            return {'reviewId': reviewId}
        
    def delete(self):
        print('Delete review attempt received')
        data = request.json

        reviewId = int(data.get('reviewId'))
        status = db.deleteReview(reviewId)

        if status == 1:
            return {'status': 'Review successfully removed'}
        else:
            return {'error': 'Error: unable to delete review'}

class Votes(Resource):

    def post(self):
        print ('Add vote attempt received')

        data = request.json
        reviewId = int(data.get('reviewId'))
        userId = int(data.get('userId'))
        vote = int(data.get('vote'))
        status = db.addVote(reviewId, userId, vote)

        if status == 0:
            return {'error': 'Error: voting failed'}
        else:
            return {'status': 'Vote successfully submitted'}

    def put(self):
        print ('Edit vote attempt received')
        
        data = request.json
        reviewId = int(data.get('reviewId'))
        userId = int(data.get('userId'))
        newVote = int(data.get('vote'))
        status = db.editVote(reviewId, userId, newVote)

        if status == 0:
            return {'error': 'Error: voting failed'}
        else:
            return {'status': 'New vote successfully submitted'}


    def delete(self):
        print ('Delete vote attempt received')

        data = request.json
        reviewId = int(data.get('reviewId'))
        userId = int(data.get('userId'))
        status = db.deleteVote(reviewId, userId)

        if status == 0:
            return {'error': 'Error: deleting vote failed'}
        else:
            return {'status': 'Vote successfully removed'}
