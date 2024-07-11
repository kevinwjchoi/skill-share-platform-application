import React , {useEffect, useState} from "react";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";

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
  };

  const options = ["Filter by", "Title", "Role", "Favorite"];



  return (
      <>
          <header>
          <h1>Project list</h1> 
          <h2>Create a new project</h2>
          {showAddProjectButton && (<button onClick={toggleProjectForm}>Add a Project</button>)}

          {showProjectForm && <ProjectForm handleNewProject={handleNewProject} toggleProjectForm={toggleProjectForm}/>}
          </header>
          <ul className="cards">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <p>No projects available</p>
            )}
          </ul>


      </>    
      

  )
}


export default Projects; 