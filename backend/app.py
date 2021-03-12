from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from api.user import *
# import api.user
# import api.products

app = Flask(__name__)
api = Api(app)
CORS(app)
api.add_resource(Login, '/login')
api.add_resource(Register, '/login')
