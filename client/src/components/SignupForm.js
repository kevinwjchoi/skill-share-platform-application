import React from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';

function SignupForm(){
    const initialValues = {
        username: "",
        password: "",
    };

    //handles all the input values  
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("")
            .min(6, "Username must be at least 6 characters")
            .max(15, "Username must not exceed 15 characters"),
        password: Yup.string()
            .required("")
            .min(8, "Password must be at least 8 characters")
            .max(80, "Password must not exceed 80 characters")
    });

    const handleSubmit = (values, { resetForm }) => {

        console.log("Form submitted:", values);
        resetForm();
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
}

export default SignupForm