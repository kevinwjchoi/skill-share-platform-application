import React from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';

function SignupForm(){


    //handles all the input values  



    //handles the submit button to make a POST request and create a new obj. Resets input values. 

    function validationSchema() {
        return Yup.object().shape({
            username: Yup.string()
                .required("Username is required")
                .min(6, "Username must be at least 6 characters")
                .max(15, "Username must not exceed 15 characters"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .max(80, "Password must not exceed 80 characters")
            
        })
    }
    const initialValues = {
        username: "",
        password: "",
    };

    return (
        <div className="container" style={{padding: 20}}>
            <div className="signup-form">
                <Formik
                initialValues={initialValues}
                // onSubmit={handleSubmit}
                // validationSchema={this.validationSchema}
                >
                    
                    {({ resetForm }) => (
                        <Form>
                            <div className="form-group">
                                <label>Username</label>
                                <Field name="username" type="text" className="form-control"/>
                                <ErrorMessage name="username" component="div" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <Field name="password" type="text" className="form-control"/>
                                <ErrorMessage name="password" component="div" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="submit-button">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            
            </div>    
            </div>
            
    )
}

export default SignupForm