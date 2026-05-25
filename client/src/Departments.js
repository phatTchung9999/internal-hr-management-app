import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const Departments = () => {
    const navigate = useNavigate();
    const [navBar, setNavBar] = useState(false);

    return (

        <main className='departmentPage'>
            <nav className={navBar ? 'open' : 'closed'}>
                <button>Executive</button>
                <button>Production</button>
                <button>Research & Development</button>
                <button>Marketing</button>
                <button>Sales</button>
                <button>Finance</button>
                <button onClick={() => { navigate('/home') }}>Back to home</button>
                <div
                    onClick={() => {
                        setNavBar(!navBar);
                    }}>
                        { !navBar ?
                        <SlArrowRight /> :
                        <SlArrowLeft />
                        }
                </div>
            </nav>
            <section className='departmentContent'>
                <div className='box1'>
                    <h1>Overview</h1>
                </div>
                <div className='box2'>
                    <div style={{
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <h2>Latest Announcement</h2>
                            <button>View All</button>
                    </div>
                    <div>
                        <p>No announcement found.</p>
                    </div>
                </div>
                <div className='box3'>
                    <div className='box3Item'>
                        <h1>06</h1>
                        <p>Departments</p>
                        <button onClick={() => setNavBar(true)}>View Departments</button>
                    </div>
                    <div className='box3Item'>
                        <h1>0</h1>
                        <p>Employees</p>
                        <button>View Employees</button>
                    </div>
                </div>
                <div className='box2'>
                    <div style={{borderBottom: 'solid black 0.5px', width: '100%', textAlign: 'start'}}>
                        <h2>Birthday Buddies</h2>
                        <p>Upcoming birthday</p>
                    </div>
                    <div style={{height: '25rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <p>No one has birthday this week!</p>
                    </div>
                </div>
            </section>


        </main>

    )
}

export default Departments
