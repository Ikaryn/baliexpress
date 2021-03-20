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
        # print("comparing", str(userId), 'to', str(account['userId']))
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
        data = request.args

        # Get request type from header
        requestType = request.headers.get('request-type')

        # Get user profile
        if requestType == 'profile':
            print('Get profile attempt received')
            print('id:', id)
            
            user = db.getUserInfo(id)
            print("user:", user)
            if user is None:
                return {'error': 'User not found'}
            else:
                return {'accountInfo': user}
            return {'error': 'User not found'}

        # Get all users
        elif requestType == 'all users':
            print('Get all users attempt received')
            return {'users': db.getAllUsers()}

        # Get product using received productId
        # elif requestType == 'product':
        #     print('Get product attempt received')
        #     productId = data.get('productId')
        #     product = p.getProduct(productId)
        #     return {'product': product}
        else:
            print('Get profile attempt received')
            print('Nothing should be here, we screwed up')
            data = request.args

            userId = data.get('userId')
            user = getUser(userId)

            if user is None:
                return {'error': 'User not found'}
            else:
                return {'accountInfo': user}
        
            return {'error': 'User not found'}

    def post(self, id):

        # Add product to product list
        print('Add product attempt received')
        print('redundant, shouldn not be used')
        data = request.json

        newProduct = {}

        print(data)
        for field in data:
            newProduct[field] = data.get(field)

        status = db.addProduct(newProduct)
        

        return

    def put(self, id):

        # print('Put profile attempt received')
        data = request.json

        # Get request type from header
        requestType = request.headers.get('request-type')

        # Edit user profile details
        if requestType == 'edit profile':
            userId = id
            print(type(userId))

            print("DATA\n", data)

            user = db.getUserInfo(id)
            for field in data:
                user[field] = data.get(field)

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
            print (user)
            return {'accountInfo': user}
        # Change the admin status for a user
        elif requestType == 'admin status':
            print('Change admin status attempt received')
            userId = data.get('userId')
            user = getUser(userId)

            # Change the data.get to what is needed to be received from frontend
            # user['userInfo']['admin'] = data.get('admin')

            booleanValue = data.get('admin')
            print("booleanValue:", booleanValue)
            # print("type", type(booleanValue))
            if booleanValue:
                print("here")
                user['userInfo']['admin'] = True
            else:
                print("there")
                user['userInfo']['admin'] = False

            # print("user after change:", user)

            return {'accountInfo': user}
        
        # # Edit product details
        # elif requestType == 'edit product':
        #     print('Edit product attempt received')

        #     print("product data", data)

        #     # Needs productId to get the right product for editing
        #     productId = data.get('id')
        #     product = p.getProduct(productId)
        #     for field in product:
        #         if field == 'image':

        #             # CHANGE THIS IF IMAGES DON'T WORK
        #             product['image'] = data.get(field)
        #             pass
        #         if field == 'id':
        #             product['id'] = int(data.get(field))
        #         if field == 'price':
        #             product['price'] = int(data.get(field))
        #         else:
        #             print('field is', field)
        #             product[field] = data.get(field)
        #             print('fielf after update:', product[field])
            
        #     print("response to send:", product)
        #     return {'productInfo': product}

        # Change password
        elif requestType == 'change password':
            print('Change password attempt received')

            db.updatePassword(id, data.get('password'))
            user = db.getUserInfo(id)
            return {'accountInfo', user}
            
        else:
            print('Put profile attempt received')
            data = request.json

            userId = id
            user = getUser(userId)

            for field in user['userInfo']:
                user['userInfo'][field] = data.get(field)

            print (user)
            return {'accountInfo': user}

    # def delete(self, id):
        
    #     # Delete a product using its productId
    #     print('Remove product attempt received')
    #     data = request.json

    #     productId = data.get('id')
    #     product = p.getProduct(productId)
    #     category = product['type']

    #     for partType in p.products:
    #         for part in p.products[partType]:
    #             if (str(part['id']) == str(productId)):
    #                 toDelete = part

    #     p.products[category].remove(toDelete)
    #     return {'message': 'product successfully removed'}


# api.add_resource(Register, '/register')



# if __name__ == '__main__':
#     app.run(debug=True)
