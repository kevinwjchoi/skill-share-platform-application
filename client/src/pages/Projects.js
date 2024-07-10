import React , {useEffect, useState} from "react";
import ProjectForm from "../components/ProjectForm";

function Projects({setUser, handleNewProject, projects}){

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showAddProjectButton, setShowAddProjectButton] = useState(true)
  useEffect(() => {   
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((data) => setUser(data));
        }
      });
    }, []);
  
  const toggleProjectForm = () => {
      setShowAddProjectButton(!showAddProjectButton)
      setShowProjectForm(!showProjectForm);
  }

  const listOfProjects = projects && projects.length > 0 ? projects.map(project => project.title).join(", ") : 'None';
  



  return (
      <>
          <header>
          <h1>Project list goes below</h1>
          <h2>Projects: {listOfProjects} </h2>
          <h2>Create a new project</h2>
          {showAddProjectButton && (<button onClick={toggleProjectForm}>Add a Project</button>)}

          {showProjectForm && <ProjectForm handleNewProject={handleNewProject} toggleProjectForm={toggleProjectForm}/>}
          </header>


      </>    
      

  )
}


export default Projects; 