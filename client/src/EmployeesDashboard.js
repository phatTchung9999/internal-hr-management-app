import React from 'react';
import NavBar from './NavBar';
import HoursChart from './HoursChart';
import PaidChart from './PaidChart';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';


const EmployeesDashboard = ({
    departments,
    setDepartments,
    search,
    setSearch,
    navBar,
    setNavBar,
    activeDepartment,
    setActiveDepartment
}) => {
    const [searchForm, setSearchForm] = useState(false);
    const [showEmployee, setShowEmployee] = useState(false);
    const [activeOption, setActiveOption] = useState('Team');
    return (
        <main className='employeesDashboard' >
            <NavBar
                navBar={navBar}
                setNavBar={setNavBar}
                departments={departments}
                setDepartments={setDepartments}
                activeDepartment={activeDepartment}
                setActiveDepartment={setActiveDepartment}
            />
            <section className='searchBar'>
                <h2 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowEmployee(false)} 
                >{`${activeDepartment?.name} members`}</h2>
                <div>
                    {!searchForm ?
                        <button onClick={() => setSearchForm(!searchForm)}>
                            <FaSearch />
                            Search
                        </button>
                        : <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor='search'></label>
                            <input
                                autoFocus
                                id='search'
                                type='text'
                                placeholder='Search Employee'
                                value={search}
                                onChange={(e) => { setSearch(e.target.value) }}
                                onBlur={() => {
                                    if (search === '') setSearchForm(false);
                                }}
                            />
                        </form>
                    }
                </div>

            </section>
            {!showEmployee &&
                <section className='dashboardContent'>
                    <div className='employeeCards'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Members</th>
                                    <th>Worked Hours</th>
                                    <th>Effective Hours</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="memberInfo">
                                        <div
                                            className="memberPhoto"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setShowEmployee(true)}
                                        >
                                            P
                                        </div>
                                        <div className="memberName">
                                            <h4>Phat Chung</h4>
                                            <p>CEO</p>
                                        </div>
                                    </td>
                                    <td>Worked Hours</td>
                                    <td>Effective Hours</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='summaryCards'>
                        <div className='card'>
                            <HoursChart />
                        </div>
                        <hr style={{ width: '90%', color: 'lightgray', marginBottom: '0' }} />
                        <div className='card' style={{ marginTop: '0' }}>
                            <PaidChart />
                        </div>

                    </div>
                </section>
            }

            {showEmployee &&
                <section className='dashboardContent'>
                    <div className='employeeProfile'>
                        <div className='employeePhotoName'>
                            <div className='photo'>
                                <div>
                                    <h1>P</h1>
                                </div>
                            </div>
                            <div className='name'>
                                <table>
                                    <tr>
                                        <th>Full Name:</th>
                                        <td>Phat T. Chung</td>
                                    </tr>
                                    <tr>
                                        <th>Job Tittle:</th>
                                        <td>CEO</td>
                                    </tr>
                                    <tr>
                                        <th>Department:</th>
                                        <td>Executive, Engineering</td>
                                    </tr>

                                </table>
                                <table>
                                    <tr>
                                        <th>Office Location:</th>
                                        <td>Franklin St, Malden, MA</td>
                                    </tr>
                                    <tr>
                                        <th>Phone Number:</th>
                                        <td>(234) 785 8516</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile:</th>
                                        <td>(234) 785 8516</td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                        <div className="optionsBar">
                            {["Team", "Documents", "Leaves", "Payroll", "Parking", "Performance", "More"].map(option => (
                                <button
                                    key={option}
                                    className={`option ${activeOption === option ? "active" : ""}`}
                                    onClick={() => setActiveOption(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                </section>
            }

        </main>
    )
}

export default EmployeesDashboard
