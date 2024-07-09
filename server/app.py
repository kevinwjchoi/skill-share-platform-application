#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Role
from sqlalchemy import and_


from flask import request, make_response, jsonify, session
import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

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
        
        username = data['username'].lower()
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
        data = request.get_json()  # Correct usage of request.get_json()
        logger.debug(f"Received data: {data}")

        if 'user_id' not in session:
            logger.error("Unauthorized: No user_id in session")
            return {'error': 'Unauthorized'}, 401
        
        user_id = session['user_id']
        user = User.query.get(user_id)
        logger.debug(f"User found: {user}")

        if not user:
            logger.error("User not found")
            return {'error': 'User not found'}, 404
    
        old_password = data.get('oldPassword')
        new_password = data.get('newPassword')

        if not old_password or not new_password:
            logger.error("Old password and new password are required")
            return {'error': 'Old password and new password are required'}, 422
        
        if not user.authenticate(old_password):
            logger.error("Incorrect old password")
            return {'error': 'Incorrect old password'}, 401
        
        user.update_password(new_password)
        logger.debug("Password updated successfully")
        return {'message': 'Password updated successfully'}, 200

class DeleteUser(Resource):
    def delete(self):
        if 'user_id' not in session:
            return {'error': 'Unauthorized'}, 401
        
        user_id = session['user_id']
        user = User.query.get(user_id)
        if not user:
            logger.error("user not found")
            return {'error': 'User not found'}, 404
        
        db.session.delete(user)
        db.session.commit()

        session.pop('user_id', None)
        return {'message': 'User deleted successfully'}, 200



#This is for the roles
class GetRoles(Resource):
    def get(self):
        if 'user_id' in session and session['user_id'] is not None:
            user_id = session['user_id']
            roles = Role.query.filter_by(user_id=user_id).all()
            roles_list = [role.to_dict() for role in roles]
            return make_response(jsonify(roles_list), 200)
        return {'error': 'Unauthorized'}, 401


class CreateRole(Resource):
    def post(self):
        data = request.get_json()
        if 'name' not in data or 'proficiency' not in data:
            return {'error': 'name and proficiency are required.'}, 422

        name = data['name']
        proficiency = data['proficiency']
        user_id = session['user_id']

        if not user_id:
            return {'error': 'User must be logged in to create a role.'}, 401

        role_exists = Role.query.filter(and_(Role.name == name, Role.user_id == user_id)).first()
        
        if role_exists:
            return {"error": "Role already exists for this user"}, 409

        new_role = Role(name=name)
        new_role.proficiency = proficiency 
        new_role.user_id = session['user_id']

        db.session.add(new_role)
        db.session.commit()

        return new_role.to_dict(), 201


#api resource for users
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(UpdatePassword, '/update_password', endpoint='update_password')
api.add_resource(DeleteUser, '/users/delete')

#api resource for roles
api.add_resource(GetRoles, '/get_roles', endpoint='get_roles')
api.add_resource(CreateRole, '/create_role', endpoint='create_role')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

