import React , {useState} from "react";
import SignupForm from "../components/SignupForm";

function Signup({handleNewUser}){





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