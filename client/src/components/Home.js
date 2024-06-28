import React from 'react';

function Home({users}) {


    //mapping out every user name
    const nameOfUsers = users.map((user) => {
       return <h3 key={user.id}>{user.name}</h3>
    })


    return (
      <div>
        <header>
            <h1>Skill Platform</h1>
        </header>
        <div>
            <h2>Here are a list of user spots!</h2>
            <ul>{nameOfUsers}</ul>


        </div>   
      </div>
    );
  }
  export default Home;