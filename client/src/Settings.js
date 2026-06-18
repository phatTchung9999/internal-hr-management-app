import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <main className='accountPage'>
      <section className='accountCard'>
        <h2>Settings</h2>
        <p>Account and application settings will appear here.</p>
        <button type='button' onClick={() => navigate('/home')}>
          Back to Home
        </button>
      </section>
    </main>
  );
};

export default Settings;
