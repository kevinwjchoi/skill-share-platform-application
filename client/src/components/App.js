import './styles.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from  '../pages/Signup';
import Setting from '../pages/Setting';
import Projects from '../pages/Projects';



function App() {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState([])
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState(null)
  const [applications, setApplications] = useState([])
  const [myApplications, setMyApplications] = useState([])


  function handleNewUser(newUser){
  setUsers([...users, newUser])
  }

  function handleNewRole(newRole){
  setRoles([...roles, newRole])
  }

  function handleNewProject(newProject){
  setProjects([...projects, newProject])
  }

  function handleNewApplication(newApplication){
    setApplications([...applications, newApplication])
  }

function handleDeleteProject(deletedProject) {
  const updatedProjectList = projects.filter((project) => project.id !== deletedProject.id);
  console.log(updatedProjectList)
  setProjects(updatedProjectList);
  console.log(projects)
}

  useEffect(() => {
      // auto-login
      fetch("/check_session").then((r) => {
          if (r.ok) {
          r.json().then((data) => setUser(data));
          }
      });
  }, []);

  useEffect(()=> {
      fetch("/users").then(
          r => r.json()
      ).then(
          data => {
              setUsers(data)
          }
      )
      .catch((error) => console.log(error))
  }, []);

  useEffect(() => {
      fetch("/get_projects").then(
          r => r.json()
      ).then(
          data => {
              setProjects(data)
          }
      )
      .catch((error) => console.log(error))
  }, []);
  
  useEffect(() => {
    fetch("/get_my_applications").then(
      r => r.json()
    ).then(
      data => {
        setMyApplications(data)
      }
    )
    .catch((error) => console.log(error))
  }, []);


  return (
  <div className="App">
      <NavBar user={user} setUser={setUser}/>
          <main className="App-main"> 
          <Routes>
          <Route path="/home" element={<Home user={user} setUser={setUser} myApplications={myApplications} />}/>
          <Route path="/login" element={<Login user={user} setUser={setUser} setRoles={setRoles}/>}/>
          <Route path="/signup" element={<Signup user={user} setUser={setUser} handleNewUser={handleNewUser}/>}/>
          <Route path="/setting" element={<Setting user={user} users={users} setUser={setUser} handleNewRole={handleNewRole} roles={roles} />}/>
          <Route path="/projects" element={<Projects projects={projects} user={user} setUser={setUser} handleNewProject={handleNewProject} handleDeleteProject={handleDeleteProject} handleNewApplication={handleNewApplication} />}/>
          </Routes>

          </main>

  </div>
  );

}

export default App;
