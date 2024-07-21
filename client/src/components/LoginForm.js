import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './styles.css';

function LoginForm({setUser, setRoles, fetchProjects}){



    function handleSubmit(values, { setErrors, resetForm }) {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((user) => setUser(user));
            } else {
                return r.json().then((err) => {
                    setErrors(err.errors);
                    throw new Error("Login failed.");
                });
            }
        })
        .then((r) => {
            fetch("/get_roles").then(
                r => r.json()
              ).then(
                data => {
                  setRoles(data);
                  fetchProjects();
                }
              )
              .catch((error) => console.log(error))
            })
        .catch((error) => {
            console.error("Login error:", error);
        })
        .finally(() => {
            resetForm();
        });
    };
    
        const initialValues = {
            username: "",
            password: "",
        };
        
        const validationSchema = Yup.object().shape({
            username: Yup.string()
                .required("Username is required")
                .transform(value => value.toLowerCase()), 

            password: Yup.string()
                .required("Password is required"),
        });

        return(
            <div className="container" style={{padding: 20}}>
            <div className="login-form">
                <h3>Login below</h3>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                    
                    {({ resetForm }) => (
                        <Form>
                            <div className="form-group">
                                <label>Username:</label>
                                <Field name="username" type="text" className="form-control"/>
                                <ErrorMessage name="username" component="div" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <Field name="password" type="password" className="form-control"/>
                                <ErrorMessage name="password" component="div" className="text-danger"/>
                            </div>
                            <div className="form-group-btn">
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

export default LoginForm;