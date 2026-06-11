import React from 'react'
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const Departments = ({ departments, setDepartments, navBar, setNavBar, activeDepartment, setActiveDepartment, employees }) => {
    const navigate = useNavigate();
    return (
        <main className='departmentPage'>
                <NavBar 
                    navBar={navBar}
                    setNavBar={setNavBar}
                    departments={departments}
                    setDepartments={setDepartments}
                    activeDepartment={activeDepartment}
                    setActiveDepartment={setActiveDepartment}
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
                        <h1>
                            {departments.length}
                        </h1>
                        <p>Departments</p>
                        <button onClick={() => {
                            setNavBar(true);
                        }}>View Departments</button>
                    </div>
                    <div className='box2Item'>
                        <h1>
                            {employees ? employees.length : 0}
                        </h1>
                        <p>Employees</p>
                        <button onClick={() => {
                            navigate('/employees');
                        }}>View Employees</button>
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
