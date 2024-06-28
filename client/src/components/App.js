import './styles.css';
import React, { useEffect, useState } from "react";
import { Route, Routes} from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewRecipe user={user} />
          </Route>
          <Route path="/">
            <RecipeList />
          </Route>
        </Switch>
      </main>
    </>
  );

}

export default App;
