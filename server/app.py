#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Skill, Project, Application


# Views go here!

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        if 'username' not in request.get_json():
            return {'error': 'Username and password are required.'}, 422
        
        user = User(username=request.get_json()['username'])
        user.password_hash = request.get_json()['password']
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201
    




api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

