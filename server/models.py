from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates, relationship

from config import db, bcrypt

# One to many with roles, Many to many with Projects 
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ("-roles.user", "-projects.users", "-_password_hash")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    
    # One-to-Many relationship with Role
    roles = relationship('Role', back_populates='user', lazy=True, cascade='all, delete-orphan')

    #Many-to-Many relationship with Application
    applications = relationship('Application', back_populates='user', lazy=True, cascade='all, delete-orphan')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def update_password(self, new_password):
        self.password_hash = new_password
        db.session.commit()


    def __repr__(self):
        return f'User: {self.username}, ID: {self.id}'
    

#Many to one with User    
class Role(db.Model, SerializerMixin):
    __tablename__ = 'roles'

    serialize_rules = ("-user.roles",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    proficiency = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = relationship('User', back_populates='roles')

    @validates('name')
    def validates_name(self, key, name):
        if not name:
            raise ValueError('Name must be present.')
        return name.lower()
    
    @validates('proficiency')
    def validates_proficiency(self, key, proficiency):
        if not proficiency:
            raise ValueError('Proficiency must be present.')
        return proficiency.lower()


    def __repr__(self):
        return f'Role: {self.name}, ID: {self.id}'
    

 #Many to many with User    
class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    serialize_rules = ("-applications.project",)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    required_roles = db.Column(db.String, nullable=False)

    #Many-to-Many relationship with Application
    applications = relationship('Application', back_populates='project', lazy=True, cascade='all, delete-orphan')

    @validates('title')
    def validates_title(self, key, title):
        if not title:
            raise ValueError('Title must be present.')
        return title
    
    @validates('description')
    def validates_description(self, key, description):
        if not description:
            raise ValueError('Description must be present.')
        return description
    
    @validates('required_roles')
    def validates_required_roles(self, key, required_roles):
        if not required_roles:
            raise ValueError('required_roles must be present.')
        return required_roles
    
    def __repr__(self):
        return f'Project: {self.title}, ID: {self.id}'
    


class Application(db.Model, SerializerMixin):
    __tablename__ = "applications"

    serialize_rules = ("-user.applications", "-project.applications")

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    role = db.Column(db.String, nullable=False)

    user = relationship('User', back_populates='applications')
    project = relationship('Project', back_populates='applications')


    @validates('role')
    def validates_required_role(self, key, role):
        if not role:
            raise ValueError('Role must be present.')
        return role


    def __repr__(self):
        return f'Application: {self.user_id}, ID: {self.id}, Role: {self.role}'