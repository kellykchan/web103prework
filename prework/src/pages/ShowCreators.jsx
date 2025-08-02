import React, { useEffect, useState } from 'react';
import CreatorCard from '../components/CreatorCard';
import { supabase } from '../client';
import './ShowCreators.css';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from('creators').select();

      if (error) {
        console.error('Error fetching creators:', error.message);
      } else {
        setCreators(data);
      }

      setLoading(false);
    };

    fetchCreators();
  }, []);

  useEffect(() => {
    if (window.history.state && window.history.state.usr?.scrollToGallery) {
      const section = document.getElementById('creator-gallery');
      section?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, '');
    }
  }, []);

  return (
    <div>
      <div id="creator-gallery" className="gallery">
        {loading ? (
          <p>Loading creators...</p>
        ) : creators.length === 0 ? (
          <p>No content creators found.</p>
        ) : (
          creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        )}
      </div>
    </div>
  );
};

export default ShowCreators;
