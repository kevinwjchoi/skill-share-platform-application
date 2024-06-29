#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User

from flask import request, make_response, jsonify, session


# Views go here!
# This is for the users
class Users(Resource):
    def get(self):

        users = User.query.all()
        return make_response(
            jsonify([user.to_dict() for user in users]),
            200,
        )


class Signup(Resource):
    def post(self):
        if 'username' not in request.get_json():
            return {'error': 'Username and password are required.'}, 422
        
        username = User(username=request.get_json()['username'])
        username.password_hash = request.get_json()['password']

        user_exists = User.query.filter(username == username).first() is not None

        if user_exists:
            return jsonify({"error": "Username already exists"}), 409

        db.session.add(username)
        db.session.commit()
        return username.to_dict(), 201
    

class CheckSession(Resource):
    
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()

        if user:
            return user.to_dict(), 201
        else:
            return {"error": "Unauthorized"}, 401


class Login(Resource):
    
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()

        password = request.get_json()['password']

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401

class Logout(Resource):
    
    def delete(self):
        if session['user_id'] == ['user_id']:
            session['user_id'] = None
            return {'message': '204: No Content'}, 204

        return {'error': 'Unauthorized'}, 401


#api resource for users
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

