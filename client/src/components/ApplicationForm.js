import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './styles.css';

function ApplicationForm({toggleApplicationForm, selectedProject, handleNewApplication, fetchApplications}) {

    const initialValues = {
        role: "", 
    };
    
    const validationSchema = Yup.object().shape({
        role: Yup.string()
            .required("")
            .transform(value => value.toLowerCase())
            .oneOf(['frontend', 'backend'], "Name must be one: Frontend or Backend"),
    });
  
    const handleSubmit = (values, {setErrors, resetForm}) => {
        const payload = {
            ...values,
            project_id: selectedProject.id,
        };

        fetch('/create_application', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((newApplication) => handleNewApplication(newApplication));
            } else {
                return r.json().then((err) => {
                    setErrors(err.errors);
                    throw new Error("Create application failed.");
                });
            }
        })
        .catch((error) => {
            console.error("Create application error:", error);
        })
        .finally(() => {
            resetForm();
            toggleApplicationForm();
            fetchApplications();
        });
    };

    return (
        <div className="container" style={{padding: 20}}>
        <div className="application-form">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="role">Enter Role:</label>
                        <Field name="role" type="text" className="form-control" />
                        <ErrorMessage name="role" component="div" className="text-danger"/>
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

export default ApplicationForm;