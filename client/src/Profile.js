import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ username }) => {
  const navigate = useNavigate();

  return (
    <main className='accountPage'>
      <section className='accountCard'>
        <h2>Profile</h2>
        <div className='accountDetail'>
          <span>Username</span>
          <strong>{username || 'HR Staff'}</strong>
        </div>
        <button type='button' onClick={() => navigate('/home')}>
          Back to Home
        </button>
      </section>
    </main>
  );
};

export default Profile;
