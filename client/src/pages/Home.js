import React from 'react';
import {useEffect} from 'react'
import Login from './Login';



function Home({user, setUser, myApplications, projects}) {

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

    const applicationCount = myApplications.length; 

    return (
      <div>
        <main className="Main">
            <h1>Skill Platform</h1>
            <p>Skill-share platform allows you and other developers to see projects that are available. Go to settings and add a role first. Then find a project that fits your role and submit an application! </p>
        <div>
          <h2>My Applications ({applicationCount})</h2>
          <ul>
            {myApplications.map((application) => (
              <li key={application.id}>
                Project Title: {
                  projects.find((project) => project.id === application.project_id)?.title || "Unknown"
                }
                <br />
                Role: {application.role}
                <br />
              </li>
            ))}
          </ul>
        </div>
        </main> 
      </div>
    );
  }
  export default Home;