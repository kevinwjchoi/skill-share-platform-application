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

3. **Frontend Setup**:
  cd client
  npm install
  npm start 

4. **Running the Application**: 
  # In the server directory 
  python app.py 

## Usage

### Sign Up
Create a new account by providing a username, email, and password.

### Log In
Log in to your account to access the platform's features.

### Create Projects
Navigate to the Projects page to create new projects.

### Manage Roles
Go to the Settings page to add and manage your roles.

### Apply for Projects
Browse available projects and apply for those that match your role.

### View Applications
Check the Home page to see a list of your applications, including the job title and role.

## Client-Side Routing with React Router

The client-side of the application uses React Router for navigation. The following routes are set up:

- `/home`: Home page.
- `/login`: Login page.
- `/signup`: Signup page.
- `/setting`: Settings page.
- `/projects`: Projects page.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes. 

## License 
See the LICENSE file for details. 