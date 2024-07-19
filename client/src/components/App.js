import './styles.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Setting from '../pages/Setting';
import Projects from '../pages/Projects';

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [myApplications, setMyApplications] = useState([]);

  function handleNewUser(newUser) {
    setUsers([...users, newUser]);
  }

  function handleNewRole(newRole) {
    setRoles([...roles, newRole]);
  }

  function handleNewProject(newProject) {
    setProjects([...projects, newProject]);
  }

  function handleNewApplication(newApplication) {
    setApplications([...applications, newApplication]);
  }

  function handleDeleteProject(deletedProject) {
    const updatedProjectList = projects.filter((project) => project.id !== deletedProject.id);
    setProjects(updatedProjectList);
  }

  const fetchProjects = () => {
    fetch("/get_projects")
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Failed to fetch projects.");
        }
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Fetch projects error:", error);
      });
  };

  const fetchApplications = () => {
    fetch("/get_my_applications")
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Failed to fetch applications.");
        }
      })
      .then((data) => {
        setMyApplications(data);
      })
      .catch((error) => {
        console.error("Fetch applications error:", error);
      });
  };

  const fetchUser = () => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data);
        });
      }
    });
  };

  useEffect(() => {
    fetchUser();
    fetchProjects();
    fetchApplications();
  }, []);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar user={user} setUser={setUser} />
        <main className="App-main">
          <Routes>
            <Route path="/home" element={<Home user={user} setUser={setUser} myApplications={myApplications} projects={projects} />} />
            <Route path="/login" element={<Login user={user} setUser={setUser} setRoles={setRoles} fetchProjects={fetchProjects} fetchApplications={fetchApplications} />} />
            <Route path="/signup" element={<Signup user={user} setUser={setUser} handleNewUser={handleNewUser} />} />
            <Route path="/setting" element={<Setting user={user} users={users} setUser={setUser} handleNewRole={handleNewRole} roles={roles} fetchUser={fetchUser} />} />
            <Route path="/projects" element={<Projects projects={projects} user={user} setUser={setUser} handleNewProject={handleNewProject} handleDeleteProject={handleDeleteProject} handleNewApplication={handleNewApplication} fetchApplications={fetchApplications} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;