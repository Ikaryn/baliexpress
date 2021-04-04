# from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
import secrets, random
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db

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

        db.addUser(name, email, password, phone_number)

        print("New Account registered")

        t = secrets.token_hex()
        return {'token': t}

class Profile(Resource):
    def get(self):
        data = request.args

        # Get request type from header
        requestType = request.headers.get('request-type')

        # Get user profile
        if requestType == 'profile':
            print('Get profile attempt received')

            user = db.getUserInfo(data.get('userId'))

            if user is None:
                return {'error': 'User not found'}
            else:
                return {'accountInfo': user}
            return {'error': 'User not found'}

        # Get all users
        elif requestType == 'all users':
            print('Get all users attempt received')

            return {'users': db.getAllUsers()}

        else:
            print('Nothing should be here, we screwed up')
            return {'error': 'incorrect api call'}

    def put(self):
        data = request.json
        id = request.args.get('userId')

        # Get request type from header
        requestType = request.headers.get('request-type')

        # Edit user profile details
        if requestType == 'edit profile':
            print('Edit profile attempt received')

            userId = id
            user = db.getUserInfo(id)

            # Replace changed details from request 
            for field in data:
                user[field] = data.get(field)

            # Update db with new values
            db.updateUser(userId,
                            user['name'],
                            user['email'],
                            user['password'],
                            user['phone'],
                            user['streetAddress'],
                            user['city'],
                            user['state'],
                            user['country'],
                            user['postcode'])

            user = db.getUserInfo(userId)
            return {'accountInfo': user}

        # Change the admin status for a user
        # DOES NOT WORK - SUBJECT TO CHANGE
        elif requestType == 'admin status':
            print('Change admin status attempt received')
            userId = data.get('userId')
            user = db.getUserInfo(userId)

            booleanValue = data.get('admin')

            if booleanValue:
                user['admin'] = True
            else:
                user['admin'] = False

            return {'accountInfo': user}

        # Change password
        elif requestType == 'change password':
            print('Change password attempt received')

            db.updatePassword(id, data.get('password'))
            user = db.getUserInfo(id)
            return {'accountInfo': user}
            
        else:
            return {'error': 'incorrect api call'}


# if __name__ == '__main__':
#     app.run(debug=True)
