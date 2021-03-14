from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
import secrets, random
from flask_cors import CORS
from flask_restful import Api
#dummy accounts
accounts = [   {'userId': 1529870708,
                'name': 'John Smith',
                'email': 'johnS@gmail.com',
                'password': 'asdfasdf',
                'phone':'12345678',
                'admin':False,
                'streetAddress': '35E Crapperdown Road',
                'city': 'Austin',
                'country': 'USA',
                'postcode': '67553'},

                {'userId': 3533306566,
                'name': 'Kevin Eleven',
                'email': 'K11@gmail.com',
                'password': 'fdsafdsa',
                'phone':'87654321',
                'admin':False,
                'streetAddress': '24 Bellavista Road',
                'city': 'Sydney',
                'country': 'Australia',
                'postcode': '2327'},

                {'userId': 2624841935,
                'name': 'Jen',
                'email': 'jen@gmail.com',
                'password': 'aaabbbccc',
                'phone':'10101010',
                'admin':False,
                'streetAddress': '1 Tong Street',
                'city': 'Kyoto',
                'country': 'Japan',
                'postcode': '3456'}]


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

        # unpack json object

        # replace this with database query for validation
        for user in accounts:
            if email == user['email']:
                if password == user['password']:
                    t = secrets.token_hex()
                    return {'token': t, 'userId': user['userId']}
                else:
                    return {'error':'Invalid Password'}
        

        return {'error':'Invalid Login Details'}

        
        # return {'asdf': 'asdf'}

# api.add_resource(Login, '/login')
# @user.route('/register')
class Register(Resource):
    def post(self):
        print('Register attempt Recieved')
        data = request.json

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        phone_number = data.get('phone')
        
        if email in accounts:
            return {'error':'Email already registered'}
        else:
            newId = random.getrandbits(32)
            newUser = { 'userId': newId,
                        'name': name,
                        'email': email,
                        'password': password,
                        'phone': phone_number,
                        'accountType':'customer',
                        'streetAddress': '',
                        'city': '',
                        'country': '',
                        'postcode': ''}
            accounts.append(newUser)
        print("Account registered", newUser)

        t = secrets.token_hex()
        return {'token': t}

class Profile(Resource):
    def get(self):
        print('Get profile attempt received')
        data = request.json

        userId = data.get('userId')
        user = getUser(userId)

        if user is None:
            return {'error': 'User not found'}
        else:
            return {'accountInfo': user}
    
        return {'error': 'User not found'}

    def put(self):
        print('Put profile attempt received')
        data = request.json

        userId = data.get('userId')
        user = getUser(userId)

        for field in user['userInfo']:
            user['userInfo'][field] = data.get(field)

        return {'accountInfo': user}


# api.add_resource(Register, '/register')



# if __name__ == '__main__':
#     app.run(debug=True)
