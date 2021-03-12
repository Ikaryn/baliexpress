from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
# from app import api
import secrets

from flask_cors import CORS
from flask_restful import Api
# import api.user
# import api.products

# app = Flask(__name__)
# api = Api(app)
# CORS(app)

# user = api.namespace('user', description='User related operations')

# login_details = user.model('login_details', {
#                         'email': fields.String(required=True, example="test@email.com"), 
#                         'password': fields.String(required=True, example="qwerty") })

# register_details = user.model('register_details', {
#                         'email': fields.String,
#                         'password': fields.String,
#                         'name': fields.String,
#                         'phone_number': fields.String        
# })

#dummy accounts
accounts = {'asdf':'fdsa',
            'hey':'man',
            'fuck':'this'}
# @app.route('/login',strict_slashes=False)
class Login(Resource):
    # @user.response(200, 'success', login_details)
    def post(self):
        print('Login Attempt Received')
        print(request.json)
        data = request.json
        print(type(data))

        email = data.get('email')
        password = data.get('password')

        print(email, password)
        # unpack json object

        # replace this with database query for validation
        if email in accounts:
            if password == accounts[email]:
                t = secrets.token_hex()
                return {'token': t}
            else:
                return {'error':'Invalid Password'}
        else:
            return {'error':'Invalid Login Details'}

        
        # return {'asdf': 'asdf'}

# api.add_resource(Login, '/login')
# @user.route('/register')
class Register(Resource):
    def post(self):
        print('Register attempt Recieved')
        data = request.json
        
        email = data.get('email')
        name = data.get('name')
        password = data.get('password')
        phone_number = data.get('phone')
        
        if email in accounts:
            return {'error':'Email already registered'}
            
        t = secrets.token_hex()
        return {'token': t}
        

# api.add_resource(Register, '/register')



# if __name__ == '__main__':
#     app.run(debug=True)