import React from "react";
import {useState} from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';

function SignupForm({handleNewUser}){
    const initialValues = {
        username: "",
        password: "",
    };

    //handles all the input values  
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("")
            .min(6, "Username must be at least 4 characters")
            .max(15, "Username must not exceed 15 characters"),
        password: Yup.string()
            .required("")
            .min(8, "Password must be at least 8 characters")
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
                            <label htmlFor="username">Create an username </label>
                            <Field name="username" type="text" className="form-control" />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Create a password </label>
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
            
    )

};
export default SignupForm