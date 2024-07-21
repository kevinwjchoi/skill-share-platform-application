import React from 'react'
import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login({ user, setUser, setRoles, fetchProjects}) {
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

      <LoginForm setUser={setUser} setRoles={setRoles} fetchProjects={fetchProjects}/>
      <p>
        Don't have an account yet?{' '}
        <Link to='/signup'>Sign up</Link>
      </p>
    </div>
  );


}

export default Login;