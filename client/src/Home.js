import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";

const Home = ({ username }) => {
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
            <a href="#">Open</a>
          </div>

          <div className="card">
            <h3>New Hires</h3>
            <p>Manage onboarding</p>
            <a href="#">Open</a>
          </div>

          <div className="card">
            <h3>Attendance</h3>
            <p>Track employee attendance</p>
            <a href="#">Open</a>
          </div>

          <div className="card">
            <h3>Requests</h3>
            <p>Approve employee requests</p>
            <a href="#">Open</a>
          </div>

          <div className="card">
            <h3>Departments</h3>
            <p>View company departments</p>
            <a href="/departments">Open</a>
          </div>

          <div className="card">
            <h3>Payroll</h3>
            <p>Manage salary and payment</p>
            <a href="#">Open</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
