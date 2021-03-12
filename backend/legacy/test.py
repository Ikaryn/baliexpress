from flask import Flask, request, Response
from flask_restful import Resource, Api
from flask_cors import CORS
import secrets

app = Flask(__name__)
api = Api(app)
CORS(app)
todos = {}

class TodoSimple(Resource):
    def get(self):
        print('api call')
        return {'test': 'van is great'}

    # def put(self, todo_id):
    #     todos[todo_id] = request.form['data']
    #     return {todo_id: todos[todo_id]}

# api.add_resource(gCard, '/gcard/' + gcardID)

api.add_resource(TodoSimple, '/')

#dummy accounts
accounts = {'asdf':'fdsa',
            'hey':'man',
            'fuck':'this'}

class Login(Resource):
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
            return {'error':'Failed Login'}

        
        # return {'asdf': 'asdf'}

api.add_resource(Login, '/login')

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
        

api.add_resource(Register, '/register')


if __name__ == '__main__':
    app.run(debug=True)