import React , {useState} from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';
import SignupForm from "./SignupForm";

function Signup(){

    const [inputUsername, setInputUsername] = useState("")



    return (
        <>
            <header>
            <h1>Create a new user!</h1>
            <SignupForm />
            </header>
        <div>
            <form >
            <button>Submit</button>
            </form>
        </div>
        </>    
        

    )
}


export default Signup; 