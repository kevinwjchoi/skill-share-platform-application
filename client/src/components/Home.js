import React from 'react';
import {useEffect, useState} from 'react'
import Login from './Login';


function Home() {
    const [user, setUser] = useState(null)

    useEffect(() => {
      // auto-login
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
    }, []);
  
    // if (!user) return <Login setUser={setUser} />;


    return (
      <div>
        <header>
            <h1>Skill Platform</h1>
        </header>
        <div>
            <h2>Project list goes below</h2>
            <ul></ul>


        </div>   
      </div>
    );
  }
  export default Home;