import React, { useEffect, useRef, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { MdLogout, MdPerson, MdSettings } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setAuth }) => {
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const displayName = username || 'HR Staff';
  const initials = displayName
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    if (!profileOpen) return;

    const closeProfile = event => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !profileButtonRef.current?.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    const closeWithEscape = event => {
      if (event.key === 'Escape') {
        setProfileOpen(false);
        profileButtonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', closeProfile);
    document.addEventListener('keydown', closeWithEscape);

    return () => {
      document.removeEventListener('mousedown', closeProfile);
      document.removeEventListener('keydown', closeWithEscape);
    };
  }, [profileOpen]);

  const goTo = path => {
    setProfileOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setProfileOpen(false);
    setAuth(false);
    navigate('/', { replace: true });
  };

  return (
    <main className='homepage'>
      <section className='profile'>
        <div>
          <h3>{`Welcome back, ${username}`}</h3>
        </div>
        <div className='profileActions'>
          <button
            className='homeIconButton'
            type='button'
            aria-label='Notifications'
            title='Notifications'
          >
            <IoIosNotifications />
          </button>
          <button
            ref={profileButtonRef}
            className={`homeIconButton ${profileOpen ? 'active' : ''}`}
            type='button'
            aria-label='Open profile menu'
            aria-expanded={profileOpen}
            aria-haspopup='menu'
            onClick={() => {
              setProfileOpen(current => {
                if (current) profileButtonRef.current?.blur();
                return !current;
              });
            }}
          >
            <CgProfile />
          </button>
          {profileOpen && (
            <div className='homeProfileMenu' ref={profileMenuRef} role='menu'>
              <div className='profileMenuHeader'>
                <div className='profileMenuAvatar'>{initials}</div>
                <div>
                  <strong>{displayName}</strong>
                  <span>HR staff account</span>
                </div>
              </div>
              <button type='button' role='menuitem' onClick={() => goTo('/profile')}>
                <MdPerson />
                Profile
              </button>
              <button type='button' role='menuitem' onClick={() => goTo('/settings')}>
                <MdSettings />
                Settings
              </button>
              <button
                className='profileLogoutButton'
                type='button'
                role='menuitem'
                onClick={handleLogout}
              >
                <MdLogout />
                Log out
              </button>
            </div>
          )}
        </div>
      </section>
      <section className='dashboardContent'>
        <div className='cards'>

          <div className="card">
            <h3>Departments</h3>
            <p>View company departments</p>
            <button onClick={() => {
              navigate('/departments');
            }
              }>Open</button>
          </div>

          <div className="card">
            <h3>Applications</h3>
            <p>Review job applications</p>
            <button onClick={() => navigate('/features/applications')}>Open</button>
          </div>

          <div className="card">
            <h3>New Hires</h3>
            <p>Manage onboarding</p>
            <button onClick={() => navigate('/features/onboarding')}>Open</button>
          </div>

          <div className="card">
            <h3>Attendance</h3>
            <p>Track employee attendance</p>
            <button onClick={() => navigate('/features/attendance')}>Open</button>
          </div>

          <div className="card">
            <h3>Requests</h3>
            <p>Approve employee requests</p>
            <button onClick={() => navigate('/features/requests')}>Open</button>
          </div>

          <div className="card">
            <h3>Payroll</h3>
            <p>Manage salary and payment</p>
            <button onClick={() => navigate('/features/payroll')}>Open</button>
          </div>
        </div>
      </section>
      <section className='activity'>
        <div className='activityBoard'>
          <div className='activityTitle'>
              <h2>Recent Activities</h2>
          </div>
          <div className='activityContent'>
              <p>No activity found!</p>
          </div>  
        </div>
      </section>
    </main>
  )
}

export default Home
