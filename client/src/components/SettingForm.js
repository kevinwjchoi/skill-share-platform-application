import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from 'yup';
import React from "react";
import './styles.css';

function SettingForm({ setUser, toggleSettingForm, fetchUser }){
    const initialValues= {
        oldPassword: "",
        newPassword: "",
    };

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required("")
            .min(6, "Password must be at least 6 characters")
            .max(80, "Password must not exceed 80 characters")
    });

    const handleSubmit = (values, { setErrors, resetForm }) => {
        fetch("/update_password", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((data) => setUser(data));
            } else {
                return r.json().then((err) => {
                    setErrors(err.errors);
                });
            }
        })
        .catch((error) => {
            console.error("Password update error:", error);
        })
        .finally(() => {
            resetForm();
            fetchUser();
        });
        toggleSettingForm()
    }





    return(
        <div className="container" style={{padding: 20}}>
            <div className="setting-form">
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="oldPassword">Enter old password:</label>
                            <Field name="oldPassword" type="password" className="form-control" />
                            <ErrorMessage name="oldPassword" component="div" className="text-danger"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Enter new password:</label>
                            <Field name="newPassword" type="password" className="form-control" />
                            <ErrorMessage name="newPassword" component="div" className="text-danger"/>
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

export default SettingForm;