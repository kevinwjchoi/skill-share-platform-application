import './styles.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from  '../pages/Signup';
import Setting from '../pages/Setting';



function App() {


  const [users, setUsers] = useState(null)
  const [user, setUser] = useState(null)

  function handleNewUser(newUser){
    setUsers([...users, newUser])
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
  }, [])


  return (
  <div className="App">
      <NavBar user={user} setUser={setUser}/>
        <main className="App-main"> 
        <Routes>
          <Route path="/home" element={<Home user={user} setUser={setUser} />}/>
          <Route path="/login" element={<Login user={user} setUser={setUser} />}/>
          <Route path="/signup" element={<Signup handleNewUser={handleNewUser}/>}/>
          <Route path="/setting" element={<Setting user={user} setUser={setUser}/>}/>
        </Routes>

        </main>

  </div>
  );

}

export default App;
