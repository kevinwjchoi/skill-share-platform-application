import React , {useState} from "react";
import SignupForm from "../components/SignupForm";

function Signup({handleNewUser}){





    return (
        <>
            <header>
            <h1>Create a new user!</h1>
            <SignupForm handleNewUser={handleNewUser} />
            </header>

        </>    
        

    )
}


export default Signup; 