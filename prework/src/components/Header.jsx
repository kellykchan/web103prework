import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const handleViewCreators = () => {
    if (location.pathname === '/') {
      const section = document.getElementById('creator-gallery');
      section?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="header">
      <h1>CreatorVerse</h1>
      <div className="header-buttons">
        <button onClick={handleViewCreators}>View Creators</button>
        <Link to="/add">
          <button>Add Creator</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
