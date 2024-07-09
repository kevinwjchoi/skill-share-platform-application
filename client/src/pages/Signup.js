import React , {useEffect} from "react";
import SignupForm from "../components/SignupForm";

function Signup({handleNewUser, setUser}){

    useEffect(() => {
        
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((data) => setUser(data));
          }
        });
      }, []);
    


    return (
        <>
            <header>
            <h2>Create a new user</h2>
            <SignupForm handleNewUser={handleNewUser} />
            </header>

        </>    
        

    )
}


export default Signup; 