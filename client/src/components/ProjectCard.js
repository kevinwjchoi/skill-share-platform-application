import React, {useState} from "react";

function ProjectCard({ project }) {

  const {title, description, required_skills} = project;
  const [selectedFavorite, setSelectedFavorite] = useState(false);

  function handleSelectedFavorite(){
    setSelectedFavorite((selectedFavorite) => !selectedFavorite);
  }

  
  
  return (
    <li className="card">
      <div className="details">

        <strong>Title: {title}</strong>
        <br />
        <span>Description: {description}</span>
        <br />
        {selectedFavorite ? (
          <button className="emoji-button favorite active" onClick={handleSelectedFavorite}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={handleSelectedFavorite}>☆</button>
        )}
        <button className="emoji-button delete" >🗑</button>
        {/* Add onClick Delete later */}
        {/* Add an apply for role button */}
      </div>
    </li>
  );
}

export default ProjectCard;

