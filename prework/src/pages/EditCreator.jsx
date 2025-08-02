import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './AddCreator.css';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single();

      if (error) setError(error.message);
      else if (data) {
        setCreator(data);
        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageURL || '');
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !url || !description) {
      setError('Please fill in all required fields (name, url, description).');
      return;
    }

    const { error } = await supabase
      .from('creators')
      .update({ name, url, description, imageURL: imageURL || null })
      .eq('id', id);

    if (error) {
      setError(error.message);
    } else {
      navigate(`/creators/${id}`);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this creator? This action cannot be undone.'
    );
    if (!confirmed) return;

    const { error } = await supabase.from('creators').delete().eq('id', id);

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  if (loading) return <p>Loading creator data...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <div className="container">
      <h2 className="form-title">Edit Creator</h2>
      <form onSubmit={handleSubmit} className="creator-form">
        <div className="form-group">
          <label>Name (required): </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>URL (required): </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description (required): </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL (optional): </label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Delete Creator
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;