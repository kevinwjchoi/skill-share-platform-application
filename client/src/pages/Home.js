import React from 'react';
import {useEffect} from 'react'
import Login from './Login';



function Home({user, setUser, myApplications}) {

    useEffect(() => {
      // auto-login
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((data) => setUser(data));
        }
      });
    }, []);
  
    if (!user) 
      return <Login setUser={setUser} />;


    return (
      <div>
        <main className="Main">
            <h1>Skill Platform</h1>
            <p>Skill-share platform allows you and other developers to see projects that are available. Find a project that fits your role and submit an application! </p>
        
        <div>
          <h2>Project list goes below</h2>
          <ul></ul>
        </div>  
        <div>
          <h2>My Applications</h2>
          <ul>
            {myApplications.map((application) => (
              <li key={application.id}>
                Project ID: {application.project_id} 
                <br />
                User ID: {application.user_id}
                <br />
                Role: {application.role}
              </li>
            ))}
          </ul>
        </div>
        </main> 
      </div>
    );
  }
  export default Home;