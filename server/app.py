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
        data = request.get_json()

        if 'username' not in data or 'password' not in data:
            return {'error': 'Username and password are required.'}, 422
        
        username = data['username']
        password = data['password']

        user_exists = User.query.filter_by(username=username).first()

        if user_exists:
            return {"error": "Username already exists"}, 409

        new_user = User(username=username)
        new_user.password_hash = password 

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 201


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
        if 'user_id' in session and session['user_id']:
            session['user_id'] = None
            return {'message': 'Logged out successfully'}, 204
        else:
            return {'error': 'Unauthorized'}, 401

class UpdatePassword(Resource):
    def patch(self):
        data = request.get_json()

        if 'user_id' not in session:
            return {'error': 'Unauthorized'}, 401
        
        user_id = session['user_id']
        user = User.query.get(user_id)

        if not user:
            return {'error': 'User not found'}, 404
    
        old_password = data('old_password')
        new_password = data('new_password')

        if not old_password or not new_password:
            return {'error': 'Old password and new password are required'}, 422
        
        if not user.authenticate(old_password):
            return {'error': 'Incorrect old password'}, 401
        
        user.update_password(new_password)
        return {'message': 'Password updated successfully'}, 200

#api resource for users
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(UpdatePassword, '/update_password', endpoint='update_password')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

