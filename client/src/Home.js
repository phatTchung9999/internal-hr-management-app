import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Home = ({ username }) => {

  const navigate = useNavigate();

  return (
    <main className='homepage'>
      <section className='profile'>
        <div>
          <h3>{`Wellcome back, ${username}`}</h3>
        </div>
        <div>
          <button>
            <IoIosNotifications />
          </button>
          <button>
            <CgProfile />
          </button>
        </div>
      </section>
      <section className='dashboardContent'>
        <div className='cards'>
          <div className="card">
            <h3>Applications</h3>
            <p>Review job applications</p>
            <button href="#">Open</button>
          </div>

          <div className="card">
            <h3>New Hires</h3>
            <p>Manage onboarding</p>
            <button href="#">Open</button>
          </div>

          <div className="card">
            <h3>Attendance</h3>
            <p>Track employee attendance</p>
            <button href="#">Open</button>
          </div>

          <div className="card">
            <h3>Requests</h3>
            <p>Approve employee requests</p>
            <button href="#">Open</button>
          </div>

          <div className="card">
            <h3>Departments</h3>
            <p>View company departments</p>
            <button onClick={() => navigate('/departments')}>Open</button>
          </div>

          <div className="card">
            <h3>Payroll</h3>
            <p>Manage salary and payment</p>
            <button href="#">Open</button>
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
