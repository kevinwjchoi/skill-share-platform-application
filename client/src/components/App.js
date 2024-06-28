import './styles.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import UserForm from './UserForm';

function App() {
  const [users, setUsers] = useState(null)

  useEffect(()=> {
    fetch("/users").then(
      r => r.json()
    ).then(
        data => {
          setUsers(data)
          console.log(data)
      }
    )
    .catch((error) => console.log(error))
  }, [])

  function handleNewUser(){
    setUsers([...users])
  }

  // useEffect(() => {
    
  //   fetch("/check_session").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //       console.log(user)
  //     }
  //   });
  // }, []);

  // if (!user) return <Login onLogin={setUser} />;


  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/userform" element={<UserForm handleNewUser={handleNewUser}  />} />
        </Routes>
      </Router>
      <main>
        <h1>Hello This Works</h1>
      </main>
    </>
  );

}

export default App;
