# Skill-Share Platform

## Overview

The Skill-Share Platform is a web application that allows users to create, update, read, and delete accounts. Users can create and manage projects, apply for projects, and manage their roles. The application is built using Python, SQLAlchemy, JavaScript, React, and Formik for validations. Passwords are securely hashed using bcrypt.

## Features

- **User Authentication**: Users can create accounts, log in, and manage their profiles.
- **Project Management**: Logged-in users can create, view, and delete projects. Each project includes a title, description, and required role.
- **Role Management**: Users can add and manage their roles on the settings page.
- **Application Management**: Users can apply for projects if their role matches the required role for the project. Users can view their applications on the home page, showing the job title and role.
- **Home Page**: Displays the user's applications, including the job title and role.

## Technologies Used

- **Backend**: Python, Flask, SQLAlchemy
- **Frontend**: JavaScript, React
- **Validation**: Formik, Yup
- **Password Security**: bcrypt
- **Client-Side Routing**: React Router

## Models

### User

- **Attributes**:
  - `id`: Integer, primary key
  - `username`: String, unique
  - `password_hash`: String (hashed password)

### Project

- **Attributes**:
  - `id`: Integer, primary key
  - `title`: String
  - `description`: String
  - `required_roles`: String

### Application

- **Attributes**:
  - `id`: Integer, primary key
  - `user_id`: ForeignKey (references `User`)
  - `project_id`: ForeignKey (references `Project`)
  - `role`: String

### Role

- **Attributes**:
  - `id`: Integer, primary key
  - `name`: String
  - `proficiency`: String
  - `user_id`: ForeignKey (references `User`)

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/kevinwjchoi/skill-share-platform.git
   cd skill-share-platform

2. **Backend Setup**:
  ```sh
  pipenv install && pipenv shell

  cd server
  flask db init
  flask db migrate
  flask db upgrade
  python seed.py
