import React , {useState} from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';
import SignupForm from "./SignupForm";

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