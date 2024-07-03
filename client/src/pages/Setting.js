import React from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SettingForm from '../components/SettingForm'

function Setting({user, setUser}){
    const navigate = useNavigate();

    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((data) => setUser(data));
          } else {
            navigate("/login"); 
          }
        });
      }, [setUser, navigate]);

      if (!user) {
        return <p>Loading...</p>;
      }

    return (
    <>
        <main className="Main">
            <h1>Settings</h1>
            <h2>Username: {user.username}</h2>
            <SettingForm user={user} setUser={setUser} />
        </main> 
    </>
    );
}
export default Setting;