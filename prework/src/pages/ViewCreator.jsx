import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './ViewCreator.css';

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error.message);
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) {
    return <p>Loading creator...</p>;
  }

  if (!creator) {
    return <p>Creator not found.</p>;
  }

  return (
    <div className="creator-view">
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} />
      )}
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <div className="button-group">
        <a href={creator.url} target="_blank" rel="noopener noreferrer">
          Visit Channel
        </a>
        <Link to={`/edit/${creator.id}`} className="edit-button">
          Edit Creator
        </Link>
        <Link to="/">Back to all creators</Link>
      </div>
    </div>
  );
};

export default ViewCreator;
