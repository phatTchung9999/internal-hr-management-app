import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import NavBar from './NavBar';

const Departments = ({department, setDepartment, navBar, setNavBar}) => {
    const navigate = useNavigate();
    return (
        <main className='departmentPage'>
                <NavBar 
                    navBar={navBar}
                    setNavBar={setNavBar}
                    department={department}
                    setDepartment={setDepartment}
                />
            <section className='departmentContent'>
                <div className='box1'>
                    <div style={{
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: 'solid black 0.5px'
                            
                        }}>
                            <h2>New Hires</h2>
                            <button>View All</button>
                    </div>
                    <div>
                        <p>No new hires found.</p>
                    </div>
                </div>
                <div className='box2'>
                    <div className='box2Item'>
                        <h1>06</h1>
                        <p>Departments</p>
                        <button onClick={() => setNavBar(true)}>View Departments</button>
                    </div>
                    <div className='box2Item'>
                        <h1>0</h1>
                        <p>Employees</p>
                        <button>View Employees</button>
                    </div>
                </div>
                <div className='box3'>
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
