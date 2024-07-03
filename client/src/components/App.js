import './styles.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import Signup from  './Signup';



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
    <header className="App-header">  
      <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/home" element={<Home user={user} setUser={setUser} />}/>
          <Route path="/login" element={<Login user={user} setUser={setUser} />}/>
          <Route path="/signup" element={<Signup handleNewUser={handleNewUser}/>}/>
        </Routes>

    </header>

  </div>
  );

}

export default App;
