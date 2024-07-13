#!/usr/bin/env python3

# Standard library imports
from random import choice

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
        Role.query.delete()
        Project.query.delete()
        Application.query.delete()
        

        print("--Creating users--")
        users=[]
        usernames=[]

        for i in range(10):
            username = fake.first_name().lower()
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

        print("--Creating projects--")
        projects = []
        for i in range(10):
            title = fake.sentence(nb_words=3).strip('.').lower()
            if len(title) < 4:
                title += ' project' 
            title = title[:20]  

            description = fake.paragraph(nb_sentences=3).strip('.')
            if len(description) < 10:
                description += ' description' 
            description = description[:80]

            required_roles = choice(['frontend', 'backend']) 

            project = Project(
                title=title,
                description=description,
                required_roles=required_roles
            )

            projects.append(project)

        db.session.add_all(projects)
        db.session.commit()
        
        print("--Seeding complete--")    
        

