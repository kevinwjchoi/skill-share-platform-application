import React from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


function SignupForm({handleNewUser}){

    const initialValues = {
        username: "",
        password: "",
    };
    
    const navigate = useNavigate();

    //handles all the input values  
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("")
            .transform(value => value.toLowerCase())
            .min(4, "Username must be at least 4 characters")
            .max(15, "Username must not exceed 15 characters"),
        password: Yup.string()
            .required("")
            .min(6, "Password must be at least 6 characters")
            .max(80, "Password must not exceed 80 characters")
    });

    const handleSubmit = (values, { setErrors, resetForm }) => {
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((newUser) => handleNewUser(newUser));
            } else {
                return r.json().then((err) => {
                    setErrors(err.errors);
                    throw new Error("Signup failed.");
                });
            }
        })
        .catch((error) => {
            console.error("Signup error:", error);
        })
        .finally(() => {
            resetForm();
            navigate('/login');
        });
    };


    return (
        <div className="container" style={{padding: 20}}>
            <div className="signup-form">
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                        <Form>
                        <div className="form-group">
                            <label htmlFor="username">Create username: </label>
                            <Field name="username" type="text" className="form-control" />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Create password: </label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="form-group-btn">
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </div>
                    </Form>
                </Formik>
            
            </div>    
        </div>
            
    );

};
export default SignupForm;