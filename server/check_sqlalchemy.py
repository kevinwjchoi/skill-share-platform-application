try:
    from sqlalchemy.orm import sessionmaker, relationship
    from sqlalchemy.ext.declarative import declarative_base
    from sqlalchemy.ext.hybrid import hybrid_property
    from sqlalchemy.ext.associationproxy import association_proxy
    print("All necessary SQLAlchemy ORM components are installed.")
except ImportError as e:
    print(f"ImportError: {e}")
