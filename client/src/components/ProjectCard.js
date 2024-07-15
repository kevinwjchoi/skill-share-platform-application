import React, {useState} from "react";

function ProjectCard({ project, handleDeleteProject, showApplicationForm, setShowApplicationForm, setSelectedProject, fetchApplications, userApplicationProjectIDs }) {

  const {title, description, required_roles} = project;

  const [selectedFavorite, setSelectedFavorite] = useState(false);
  
  const isApplied = userApplicationProjectIDs.includes(project.id);

  function handleSelectedFavorite(){
    setSelectedFavorite((selectedFavorite) => !selectedFavorite);
  }


  const handleDeleteButton = () => {
    fetch(`/delete_project/${project.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(r => {
      if (!r.ok) {
        throw new Error('Network response was not ok');
      }
      return r.json();
    })
    .then(() => handleDeleteProject(project))
    .catch(error => {
      console.error('Error deleting project:', error);
    })
    .finally(() => {
      fetchApplications()
    });
  }

  const handleApplyButton = () => {
    setSelectedProject(project)
    setShowApplicationForm(!showApplicationForm);
  }
  
  
  return (
    <li className="card">
      <div className="details">

        <strong>Title: {title}</strong>
        <br />
        <span>Description: {description}</span>
        <br />
        <span>Roles: {required_roles}</span>
        <br />
        {selectedFavorite ? (
          <button className="emoji-button favorite active" onClick={handleSelectedFavorite}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={handleSelectedFavorite}>☆</button>
        )}
        {isApplied ? (
            <button className="application-button" disabled>Applied</button>
        ) : (
            <button className="application-button" onClick={handleApplyButton}>Apply</button>
        )}
        
        <button className="emoji-button delete" onClick={handleDeleteButton}>🗑</button>
      </div>
    </li>
  );
}

export default ProjectCard;

