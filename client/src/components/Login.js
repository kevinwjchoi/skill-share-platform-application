import React from 'react'
import LoginForm from './LoginForm';
import Home from './Home';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Login({ user, setUser }) {
    const navigate = useNavigate();
  
    useEffect(() => {
      // auto-login
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((data) => setUser(data));
        }
      });
    }, []);
  
    useEffect(() => {
        if (user) {
          navigate('/home');
        }
      }, [user, navigate]);

    return (
    <div className="login-container">

      <LoginForm setUser={setUser} />
      <p>
        Don't have an account yet?{' '}
        <Link to='/signup'>Sign up</Link>
      </p>
    </div>
  );


}

export default Login;