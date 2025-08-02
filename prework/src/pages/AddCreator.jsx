import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './AddCreator.css';

const AddCreator = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !url || !description) {
      setError('Please fill in all required fields (name, url, description).');
      return;
    }

    const { data, error } = await supabase.from('creators').insert([
      { name, url, description, imageURL: imageURL || null },
    ]);

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h2 className="form-title">Add a New Content Creator</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="creator-form">
        <div className="form-group">
          <label>Name (required): </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>URL (required): </label>
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description (required): </label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Image URL (optional): </label>
          <input type="url" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </div>

        <button type="submit" className="submit-button">Add Creator</button>
      </form>
    </div>
  );
};

export default AddCreator;
