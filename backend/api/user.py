from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
import secrets, random
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db

#dummy accounts
accounts = [    {'userId': 1529870708,
                 'userInfo': {  'name': 'John Smith',
                                'email': 'johnS@gmail.com',
                                'password': 'asdfasdf',
                                'phone':'12345678',
                                'admin':False,
                                'streetAddress': '35E Crapperdown Road',
                                'city': 'Austin',
                                'country': 'USA',
                                'postcode': '67553'},
                 'builds': [],
                 'orders': []},

                {'userId': 3533306566,
                 'userInfo': {'name': 'Kevin Eleven',
                              'email': 'K11@gmail.com',
                              'password': 'fdsafdsa',
                              'phone':'87654321',
                              'admin':False,
                              'streetAddress': '24 Bellavista Road',
                              'city': 'Sydney',
                              'country': 'Australia',
                              'postcode': '2327'},
                 'builds': [],
                 'orders': []},
                
                {'userId': 2624841935,
                 'userInfo': {'name': 'Jen',
                              'email': 'jen@gmail.com',
                              'password': 'aaabbbccc',
                              'phone':'10101010',
                              'admin':False,
                              'streetAddress': '1 Tong Street',
                              'city': 'Kyoto',
                              'country': 'Japan',
                              'postcode': '3456'},
                 'builds': [],
                 'orders': []},]

# Function to get the account of user through userId
def getUser (userId):
    for account in accounts:
        if (str(userId) == str(account['userId'])):
            return account
    
    return None

class Login(Resource):
    def post(self):
        print('Login Attempt Received')

        data = request.json

        # Get details from request
        email = data.get('email')
        attemptPass = data.get('password')

        # Attempt to get the relevant userId from database
        userId = db.getUserIDFromEmail(email)

        if userId is None:
            return {'error':'Invalid Login Details'}
        else:
            userPass = db.getPassword(userId)
            if (attemptPass == userPass):
                print('Login successful')
                t = secrets.token_hex()
                return {'token': t, 'userId': userId}
            else:
                return {'error':'Invalid Password'}

        return {'error':'Invalid Login Details'}

class Register(Resource):
    def post(self):
        print('Register attempt Recieved')
        data = request.json

        # Get details from request
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        phone_number = data.get('phone')

        # Check if the email has already been registered
        existEmail = db.getUserIDFromEmail(email)
        if existEmail is not None:
            return {'error':'Email already registered'}

        # generating a new unique id
        # uniqueId = False
        # i = 0
        # newId = random.getrandbits(32)
        # while (not uniqueId):
        #     if (newId == accounts[i]['userId']):
        #         newId = random.getrandbits(32)
        #         i = 0
        #     else:
        #         if (i == len(accounts) - 1):
        #             uniqueId = True
        #         else:
        #             i += 1

        db.addUser(name, email, password, phone_number)

        print("New Account registered")

        t = secrets.token_hex()
        return {'token': t}

class Profile(Resource):
    def get(self, id):
        print('Get profile attempt received')
        data = request.args

        userId = data.get('userId')

        user = db.getUserInfo(userId)

        if user is None:
            return {'error': 'User not found'}
        else:
            return {'accountInfo': user}
    
        return {'error': 'User not found'}

    def put(self, id):
        print('Put profile attempt received')
        data = request.json

        userId = id
        print(type(userId))

        print("DATA\n", data)

        db.updateUser(userId,
                        data.get('name'),
                        data.get('email'),
                        db.getPassword(userId),
                        data.get('phone'),
                        data.get('address'),
                        data.get('city'),
                        data.get('country'),
                        data.get('pCode'))

        user = db.getUserInfo(userId)
        print (user)
        return {'accountInfo': user}


# api.add_resource(Register, '/register')



# if __name__ == '__main__':
#     app.run(debug=True)
