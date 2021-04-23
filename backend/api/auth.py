import random, secrets

from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource

from . import dbaccess as db

class Login(Resource):

    # Logging in request
    # Url formats:
    # Login: `login`
    def post(self):
        print('Login Attempt Received')

        data = request.json

        # Get details from request
        email = data.get('email')
        attemptPass = data.get('password')

        # Attempt to get the relevant userId from database
        userId, admin = db.getUserIDFromEmail(email)
        if userId is None:
            return {'error':'Invalid Login Details'}
        else:
            userPass = db.getPassword(userId)
            if (attemptPass == userPass):
                print('Login successful')
                t = secrets.token_hex()
                return {'token': t, 'userId': userId, 'admin': admin}
            else:
                return {'error':'Invalid Password'}

        return {'error':'Invalid Login Details'}

class Register(Resource):

    # Registering a new account
    # Url formats:
    # Register: `register`
    def post(self):
        print('Register attempt Recieved')
        data = request.json

        # Get details from request
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        phonenumber = data.get('phonenumber')

        # Check if the email has already been registered
        existEmail = db.getUserIDFromEmail(email)
        if existEmail[0] is not None:
            return {'error':'Email already registered'}

        db.addUser(name, password, email, phonenumber)

        print("New Account registered")

        t = secrets.token_hex()
        return {'token': t}
