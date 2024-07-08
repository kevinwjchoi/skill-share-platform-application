import {Formik, Form, Field, ErrorMessage} from 'formik';
import './styles.css';

function LoginForm({setUser}){



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
    

        return(
            <div className="container" style={{padding: 20}}>
            <div className="login-form">
                <h3>Login below</h3>
                <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}>
                    
                    {({ resetForm }) => (
                        <Form>
                            <div className="form-group">
                                <label>Username</label>
                                <Field name="username" type="text" className="form-control"/>
                                <ErrorMessage name="username" component="div" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
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