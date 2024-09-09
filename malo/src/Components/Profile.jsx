import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [query, setQuery] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/searchProfiles`, {
        params: { query }
      });
      if (response.data.Status) {
        setProfiles(response.data.Result);
      } else {
        setError('No profiles found.');
        setProfiles([]);
      }
    } catch (err) {
      setError('Error searching profiles.');
    }
    setLoading(false);
  };

  return (
    <div className='p-3'>
      <h2>Search Profiles</h2>
      <form onSubmit={handleSearch} className='mb-4'>
        <div className='form-group'>
          <label htmlFor='searchQuery'><strong>Search:</strong></label>
          <input
            type='text'
            id='searchQuery'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='form-control'
            placeholder='Enter name or email'
            style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
          />
        </div>
        <button type='submit' className='btn btn-primary mt-2' style={{ borderRadius: '8px' }}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && (
        <div className='text-center'>
          <div style={{ fontSize: '3em', color: '#f48fb1' }}>
            <i className="fa fa-search"></i>
          </div>
          <p>{error}</p>
        </div>
      )}

      {profiles.length === 0 && !loading && !error && (
        <div className='text-center'>
          <div style={{ fontSize: '5em', color: '#f48fb1' }}>
            <i className="fa fa-search"></i>
          </div>
          <p>No profiles found. Try searching with a different query.</p>
        </div>
      )}

      {profiles.length > 0 && (
        <div className='mt-4'>
          <h3>Results</h3>
          <div className='row'>
            {profiles.map(profile => (
              <div key={profile.id} className='col-md-4 mb-3'>
                <div className='card' style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                  <img 
                    src={profile.profilePic} 
                    alt={`${profile.name}'s profile`} 
                    className='card-img-top' 
                    style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} 
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{profile.name}</h5>
                    <p className='card-text'>{profile.email}</p>
                    <a href={`/profile/${profile.id}`} className='btn btn-info' style={{ borderRadius: '8px' }}>View Profile</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
