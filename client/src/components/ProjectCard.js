import React, {useState} from "react";

function ProjectCard() {
  const [selectedFavorite, setSelectedFavorite] = useState(false);

  function handleSelectedFavorite(){
    setSelectedFavorite((selectedFavorite) => !selectedFavorite);
  }

  
  
  return (
    <li className="card">
      <div className="details">
        {selectedFavorite ? (
          <button className="emoji-button favorite active" onClick={handleSelectedFavorite}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={handleSelectedFavorite}>☆</button>
        )}
        {/* <strong>{description}</strong> */}
        {/* <span>{location}</span> */}
        {/* <button className="emoji-button delete" onClick={handleDeleteListing}>🗑</button> */}
      </div>
    </li>
  );
}

export default ProjectCard;