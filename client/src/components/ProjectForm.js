import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './styles.css';


function ProjectForm({handleNewProject, toggleProjectForm}){

  const initialValues = {
      title: "", 
      description: "", 
      required_roles: "",
  };
  
  const validationSchema = Yup.object().shape({
      title: Yup.string()
          .required("")
          .transform(value => value.toLowerCase())
          .min(4, "Title must be at least 4 characters")
          .max(20, "Title must not exceed 20 characters"),
      description: Yup.string()
          .required("")
          .min(10, "Description must be at least 6 characters")
          .max(80, "Description must not exceed 80 characters"),
      required_roles: Yup.string()
          .required("")
          .transform(value => value.toLowerCase())
          .oneOf(['frontend', 'backend'], "Name must be one: Frontend or Backend"),
      
  });

  const handleSubmit = (values, {setErrors, resetForm}) => {
      fetch('/create_project', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(values)
      })
      .then((r) => {
          if (r.ok) {
              alert('Successfully created a project')
              return r.json().then((newProject) => handleNewProject(newProject));
          } else {
              alert('Failed to create project')
              return r.json().then((err) => {
                  setErrors(err.errors);
                  throw new Error("Create project failed.");
              });
          }
      })
      .catch((error) => {
          console.error("Create project error:", error);
      })
      .finally(() => {
          resetForm();
          toggleProjectForm();
      });
  };


  return (
      <div className="container" style={{padding: 20}}>
          <div className="project-form">
              <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              >
                  <Form>
                      <div className="form-group">
                          <label htmlFor="title">Enter Title:</label>
                          <Field name="title" type="text" className="form-control" />
                          <ErrorMessage name="title" component="div" className="text-danger"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="description">Enter Description:</label>
                          <Field name="description" type="text" className="form-control" />
                          <ErrorMessage name="description" component="div" className="text-danger"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="required_roles">Enter Roles:</label>
                          <Field name="required_roles" type="text" className="form-control" />
                          <ErrorMessage name="required_roles" component="div" className="text-danger"/>
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

export default ProjectForm;