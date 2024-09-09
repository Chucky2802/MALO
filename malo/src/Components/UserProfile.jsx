import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    birthday: '',
    gender: 'male',
    country: 'South Africa',
    email: '',
    profilePic: ''
  });
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    setUser({ ...user, profilePic: e.target.files[0] });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('birthday', user.birthday);
    formData.append('gender', user.gender);
    formData.append('country', user.country);
    formData.append('email', user.email);
    if (user.profilePic) {
      formData.append('profilePic', user.profilePic);
    }
    
    axios.post('/api/updateProfile', formData)
      .then(response => {
        alert(response.data.Status ? 'Profile updated successfully' : 'Failed to update profile');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '20px' }}>
      <div className="p-4" style={{ width: '100%', maxWidth: '800px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 className="text-center">User Details</h2>
        <form onSubmit={handleSaveProfile} encType="multipart/form-data">
          <div className="row mb-4">
            <div className="col-md-4 d-flex flex-column align-items-center">
              <label>User Photo</label>
              <div className="profile-pic-container mb-2">
                <img
                  src={user.profilePic ? URL.createObjectURL(user.profilePic) : 'default-avatar.png'}
                  alt="Profile"
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                />
                <input
                  type="file"
                  onChange={handleProfilePicChange}
                  className="form-control mt-2"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleProfileChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={user.birthday}
                    onChange={handleProfileChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={user.gender}
                    onChange={handleProfileChange}
                    className="form-control"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Country</label>
                  <select
                    name="country"
                    value={user.country}
                    onChange={handleProfileChange}
                    className="form-control"
                  >
                    <option value="France">South Africa</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
                <div className="col-md-12 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleProfileChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-center">Password</h3>
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <label>Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary">Go Back</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
