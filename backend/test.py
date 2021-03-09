from flask import Flask, request, Response
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)
todos = {}

class TodoSimple(Resource):
    def get(self):
        print('api call')
        # resp = Flask.Response('hello world')
        # resp.headers['Access-Control-Allow-Origin'] = '*'
        return {'test': 'fuck this assignment'}

    # def put(self, todo_id):
    #     todos[todo_id] = request.form['data']
    #     return {todo_id: todos[todo_id]}

api.add_resource(TodoSimple, '/')

if __name__ == '__main__':
    app.run(debug=True)