import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from 'yup';
import React from "react";
import './styles.css';

function RoleForm({ handleNewRole }){

    function handleSubmit(values, { setErrors, resetForm }) {
        fetch("/create_role", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((data) => handleNewRole(data));
            } else {
                return r.json().then((err) => {
                    setErrors(err.errors);
                });
            }
        })
        .catch((error) => {
            console.error("Role creation error:", error);
        })
        .finally(() => {
            resetForm();
        });
    };

    const initialValues = {
        name: "",
        proficiency: "",
    };

    //handles all the input values  
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("")
            .transform(value => value.toLowerCase())
            .oneOf(['frontend', 'backend'], "Name must be one: Frontend or Backend"),
        proficiency: Yup.string()
            .required("")
            .transform(value => value.toLowerCase())
            .oneOf(['beginner', 'intermediate', 'expert'], "Proficiency must be one of: Beginner, Intermediate, Expert")
    });

    return(
        <div className="container" style={{padding: 20}}>
            <div className="role-form">
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Enter role:</label>
                            <Field name="name" type="text" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="proficiency">Enter proficiency:</label>
                            <Field name="proficiency" type="text" className="form-control" />
                            <ErrorMessage name="proficiency" component="div" className="text-danger"/>
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
}


export default RoleForm;
