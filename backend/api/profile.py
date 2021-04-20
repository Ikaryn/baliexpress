from flask import Flask, request, Response
from flask_restful import Resource
import secrets, random
from flask_cors import CORS
from flask_restful import Api
from . import dbaccess as db


class Profile(Resource):

    # Getting a single profile or all users
    # Url formats:
    # Single profile: `profile?userId=${userId}`
    # All users: `profile`
    def get(self):

        userId = request.args.get('userId')

        if userId is not None:
            print('Get profile attempt received')
            user = db.getUserInfo(userId)

            if user is None:
                return {'error': 'User not found'}

            print(user)

            return {'accountInfo': user}

        else:
            print('Get all users attempt received')

            return {'users': db.getAllUsers()}

    # Editing profile details, changing password, changing admin status
    # Url formats:
    # Edit profile: `profile?userId=${userId}`
    # Changing password: `profile?changePassword=${true}&userId=${userId}`
    # Changing admin: `profile?changeAdmin=${true}&userId=${userId}`
    def put(self):
        args = request.args
        passwordChange = args.get('changePassword')
        adminChange = args.get('changeAdmin')
        userId = args.get('userId')

        data = request.json
        print("DATA RECEIVED:", data)

        if passwordChange:
            print('Change password attempt received')

            db.updatePassword(userId, data.get('password'))
            user = db.getUserInfo(userId)
            return {'accountInfo': user}

        elif adminChange:
            print('Change admin status attempt received')
            targetUserId = data.get('userId')
            user = db.getUserInfo(targetUserId)

            booleanValue = data.get('admin')

            if booleanValue:
                user['admin'] = True
            else:
                user['admin'] = False

        else:
            print('Edit profile attempt received')

            print("id:", userId)

            editedUser = {}
            # Get changed details from request
            for field in data:
                editedUser[field] = data.get(field)

            # Update db with new values
            db.updateUser(userId, editedUser)

            user = db.getUserInfo(userId)
            return {'accountInfo': user}
