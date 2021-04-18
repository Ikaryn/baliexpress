from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
import secrets, random
import os
from base64 import b64encode
from flask_cors import CORS
from flask_restful import Api
#from PIL import Image
from . import dbaccess as db
from datetime import datetime
import json

class Reviews(Resource):

    # Getting reviews for a product
    # Url format: `review?productId=${productId}&userId=${userId)}`
    def get(self):
        print('Get reviews attempt received')

        productId = request.args.get('productId')
        userId = request.args.get('userId')
        reviews = db.getProductReviews(int(productId))

        for review in reviews:
            review['reviewdate'] = json.dumps(review['reviewdate'].__str__())
            score = 0
            review['userVote'] = 0
            for id in review['votes']:
                score += review['votes'][id]
                if userId != 'null' and id == int(userId):
                    print('here')
                    review['userVote'] = review['votes'][id]

            if score < 0:
                score = 0

            review['score'] = score

        if reviews is None:
            return {'error': 'Unable to fetch reviews'}

        return {'reviews': reviews}

    # Adding a new review
    # Url format: `review`
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

    # Removing a review
    # Url format: `review`
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

    # Adding a vote
    # Url format: `review/vote`
    def post(self):
        print ('Add vote attempt received')

        data = request.json
        print('data for add vote:', data)
        reviewId = int(data.get('reviewId'))
        userId = int(data.get('userId'))
        vote = int(data.get('vote'))
        status = db.addVote(reviewId, userId, vote)

        if status == 0:
            return {'error': 'Error: voting failed'}
        else:
            return {'status': 'Vote successfully submitted'}

    # Changing an existing vote (e.g. from upvote to downvote)
    # Url format: `review/vote`
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

    # Deleting a vote 
    # Url format: `review/vote`
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

class Reports(Resource):
    def get(self):
        print("Get reports received")
        reports = db.getReports()
        reportedReviews = []
        reportedReview = {
            'productname': None,
            'reviewid': None,
            'reviewtext': "",
            'harassment': 0,
            'offensive': 0,
            'irrelevant': 0
        }
        for report in reports:
            print ("Report = ",report)
            review = db.getReview(report['reviewid'])
            print("Review = ", review)
            reportedReview['reviewid'] = review['reviewid']
            reportedReview['reviewtext'] = review['reviewtext']
            product = db.getProduct(review['productid'])
            reportedReview['productname'] = product['name']
            if reportedReview not in reportedReviews:
                reportedReviews.append(reportedReview)
        for reported in reportedReviews:
            reviewReports = db.getReviewReports(reported['reviewid'])
            for reviewReport in reviewReports:
                reported[reviewReport['reason']] += 1
            print(reported)
        return reportedReviews
        
    
    def post(self):
        print("Post report recieved")
        data = request.json
        print(data)
        reviewID = data.get('reviewID')
        reason = data.get('reason')

        db.reportReview(reviewID, reason)