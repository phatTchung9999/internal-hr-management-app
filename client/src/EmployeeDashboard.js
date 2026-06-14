import React from 'react';
import NavBar from './NavBar';

const EmployeeDashboard = ({
    employee,
    navBar,
    setNavBar,
    activeOption, 
    setActiveOption
}) => {
    return (
        <main className='employeeDashboard' >
            <NavBar
                navBar={navBar}
                setNavBar={setNavBar}
            />
            <section className='searchBar'>
                <h2>
                    {`${employee.department} Member`}
                </h2>

            </section>
            <section className='dashboardContent'>
                <div className='employeeProfile'>
                    <div className='employeePhotoName'>
                        <div className='photo'>
                            <div>
                                <h1>{employee.firstname[0]}</h1>
                            </div>
                        </div>
                        <div className='name'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th scope="row">Full Name:</th>
                                        <td>{`${employee.firstname} ${employee.lastname}`}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Office Location:</th>
                                        <td>Boston, MA</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Job Title:</th>
                                        <td>{`${employee.title}`}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Phone Number:</th>
                                        <td>{`${employee.mobileNumber}`}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Department:</th>
                                        <td>{`${employee.department}`}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Mobile:</th>
                                        <td>{`${employee.mobileNumber}`}</td>
                                    </tr>
                                </tbody>
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


        </main>
    )
}

export default EmployeeDashboard
