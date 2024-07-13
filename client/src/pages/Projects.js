import React , {useEffect, useState} from "react";
import Login from "./Login";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";
import ApplicationForm from "../components/ApplicationForm";

function Projects({user, setUser, handleNewProject, projects, handleDeleteProject, handleNewApplication, fetchApplications }){

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showAddProjectButton, setShowAddProjectButton] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Filter by Role");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {   
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((data) => setUser(data));
        }
      });
    }, []);

    if (!user) 
      return <Login setUser={setUser} />;
  
  const toggleProjectForm = () => {
      setShowAddProjectButton(!showAddProjectButton)
      setShowProjectForm(!showProjectForm);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleApplicationForm = () => {
    setShowApplicationForm(!showApplicationForm)
  }

  const filteredProjectList = projects.length > 0 ? projects.filter((project) => {
    if (selectedCategory === "Filter by Role") return true;
    if (selectedCategory === "Frontend") return project.required_roles === "frontend";
    if (selectedCategory === "Backend") return project.required_roles === "backend";
    return false;
  }) : projects;

  const options = ["Filter by Role", "Frontend", "Backend"]

  return (
    <>
      <header>
        <h1>Project list</h1>
        <h2>Create a new project</h2>
        {showAddProjectButton && (<button onClick={toggleProjectForm}>Add a Project</button>)}
        {showProjectForm && <ProjectForm handleNewProject={handleNewProject} toggleProjectForm={toggleProjectForm} />}
        {showProjectForm && (<button onClick={toggleProjectForm}>Back</button> )}
        {showApplicationForm && <ApplicationForm toggleApplicationForm={toggleApplicationForm} selectedProject={selectedProject} handleNewApplication={handleNewApplication} fetchApplications={fetchApplications}/>}
        {showAddProjectButton && (<select value={selectedCategory} onChange={handleCategoryChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select> )}
      </header>
      <ul className="cards">
        {showAddProjectButton && filteredProjectList.length > 0 ? (
          filteredProjectList.map((project) => (
            <ProjectCard key={project.id} project={project} handleDeleteProject={handleDeleteProject} setSelectedProject={setSelectedProject} setShowApplicationForm={setShowApplicationForm} showApplicationForm={showApplicationForm} fetchApplications={fetchApplications}/>
          ))
        ) : (
          <p>No projects available</p>
        )}
      </ul>
    </>  
      

  )
}


export default Projects; 