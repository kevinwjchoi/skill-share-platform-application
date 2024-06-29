import './styles.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import Signup from  './Signup'



function App() {

  const [users, setUsers] = useState(null)

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
      <NavBar />
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
        </Routes>

    </header>

  </div>
  );

}

export default App;
