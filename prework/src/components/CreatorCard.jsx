import React from 'react';
import { Link } from 'react-router-dom';
import './CreatorCard.css';

const CreatorCard = ({ creator }) => {
  return (
    <div className="creator-card">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="creator-image"
        />
      )}

      <h2 className="creator-name">{creator.name}</h2>

      <p className="creator-description">{creator.description}</p>
      <div className="card-buttons">
        <a href={creator.url} target="_blank" rel="noopener noreferrer" className="creator-link" >
          Visit Channel
        </a>
        <Link to={`/creators/${creator.id}`} className="creator-detail-link">
          View Details
        </Link>
        <Link to={`/edit/${creator.id}`}>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default CreatorCard;