#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import User, Role, Project, Application
from config import db

if __name__ == '__main__':

    fake = Faker()

    with app.app_context():

        print("--Deleting all records--")
        # Delete existing data
        User.query.delete()
        

        print("--Creating users--")
        users=[]
        usernames=[]

        for i in range(10):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(
                username = username
            )

            user.password_hash = user.username + 'password'

            users.append(user)
        
        db.session.add_all(users)

        db.session.commit()
