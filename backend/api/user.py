from flask_restplus import Namespace, Resource, fields
from flask import Flask, request, Response
from flask_restful import Resource
import secrets, random
from flask_cors import CORS
from flask_restful import Api
from . import products as p


#dummy accounts
accounts = [    {'userId': 1529870708,
                 'userInfo': {  'name': 'John Smith',
                                'email': 'johnS@gmail.com',
                                'password': 'asdfasdf',
                                'phone':'12345678',
                                'admin':True,
                                'streetAddress': '35E Crapperdown Road',
                                'city': 'Austin',
                                'state': 'Texas',
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
                              'state': 'New South Wales',
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
                              'state': 'Kanto',
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
            if email == user['userInfo']['email']:
                if password == user['userInfo']['password']:
                    print('Login successful')
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

        for account in accounts:
            if email == account['userInfo']['email']:
                return {'error':'Email already registered'}

        # generating a new unique id
        uniqueId = False
        i = 0
        newId = random.getrandbits(32)
        while (not uniqueId):
            if (newId == accounts[i]['userId']):
                newId = random.getrandbits(32)
                i = 0
            else:
                if (i == len(accounts) - 1):
                    uniqueId = True
                else:
                    i += 1

        newUser = {'userId': newId,
                   'userInfo': { 'name': name,
                                'email': email,
                                'password': password,
                                'phone': phone_number,
                                'admin':False,
                                'streetAddress': '',
                                'city': '',
                                'state': '',
                                'country': '',
                                'postcode': ''},
                   'builds': [],
                   'orders': []}
        accounts.append(newUser)
        print("Account registered", newUser)

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
            userId = data.get('userId')
            user = getUser(userId)

            if user is None:
                return {'error': 'User not found'}
            else:
                return {'accountInfo': user}
            return {'error': 'User not found'}

        # Get all users
        elif requestType == 'all users':
            print('Get all users attempt received')
            return {'user': accounts}

        # Get product using received productId
        elif requestType == 'product':
            print('Get product attempt received')
            productId = data.get('productId')
            product = p.getProduct(productId)
            return {'product': product}
        else:
            print('Get profile attempt received')
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
        data = request.json

        category = data.get('type')
        p.productCount += 1

        newProduct = {
                        'id': p.productCount,
        }

        for field in data:
            newProduct[field] = data.get(field)
        
        # CHANGE THIS IF IMAGES DON'T WORK
        newProduct['image'] = data.get('image')
        # newProduct['image'] = 1


        p.products[category].append(newProduct)

        return {'product': newProduct}

    def put(self, id):

        # print('Put profile attempt received')
        data = request.json

        # Get request type from header
        requestType = request.headers.get('request-type')

        # Edit user profile details
        if requestType == 'edit profile':
            print('Edit profile attempt received')
            userId = id
            user = getUser(userId)

            for field in user['userInfo']:
                user['userInfo'][field] = data.get(field)

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
        
        # Edit product details
        elif requestType == 'edit product':
            print('Edit product attempt received')

            print("product data", data)

            # Needs productId to get the right product for editing
            productId = data.get('id')
            product = p.getProduct(productId)
            for field in product:
                if field == 'image':

                    # CHANGE THIS IF IMAGES DON'T WORK
                    product['image'] = data.get(field)
                    pass
                if field == 'id':
                    product['id'] = int(data.get(field))
                if field == 'price':
                    product['price'] = int(data.get(field))
                else:
                    print('field is', field)
                    product[field] = data.get(field)
                    print('fielf after update:', product[field])
            
            print("response to send:", product)
            return {'productInfo': product}

        # Change password
        elif requestType == 'change password':
            print('Change password attempt received')

            userId = id
            user= getUser(userId)
            user['userInfo']['password'] = data.get('password')
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

    def delete(self, id):
        
        # Delete a product using its productId
        print('Remove product attempt received')
        data = request.json

        productId = data.get('id')
        product = p.getProduct(productId)
        category = product['type']

        for partType in p.products:
            for part in p.products[partType]:
                if (str(part['id']) == str(productId)):
                    toDelete = part

        p.products[category].remove(toDelete)
        return {'message': 'product successfully removed'}


# api.add_resource(Register, '/register')



# if __name__ == '__main__':
#     app.run(debug=True)
