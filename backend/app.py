from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from api.user import *
from api.products import *
from api.reviews import *
from api.featured import *
# import api.user
# import api.products

app = Flask(__name__)
api = Api(app)
CORS(app)
api.add_resource(Login, '/login')
api.add_resource(Register, '/register')
api.add_resource(Profile,'/profile')
api.add_resource(Products, '/product', '/search')
api.add_resource(Reviews, '/review')
api.add_resource(Votes, '/review/vote')
api.add_resource(Featured, '/featured')
