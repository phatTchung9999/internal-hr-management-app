import React from 'react';
import NavBar from './NavBar';
import HoursChart from './HoursChart';
import PaidChart from './PaidChart';
import { FaSearch } from "react-icons/fa";


const DepartmentDashboard = ({
    departments,
    setDepartments,
    search,
    setSearch,
    navBar,
    setNavBar,
    activeDepartment,
    setActiveDepartment,
    searchForm,
    setSearchForm,
    showEmployee,
    setShowEmployee,
    activeOption,
    setActiveOption
}) => {

    return (
        <main className='departmentDashboard' >
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
                >
                    {`${activeDepartment?.name} members`}
                </h2>

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




        </main>
    )
}

export default DepartmentDashboard
