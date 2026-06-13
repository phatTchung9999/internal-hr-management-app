import React from 'react'
import AddEmployee from './AddEmployee';
import EmployeeContent from './EmployeeContent';
import SearchItem from './SearchItem';
import StepBar from './StepBar';
import NavBar from './NavBar';
import { useState } from 'react';

const Employees = ({
    navBar,
    setNavBar,
    activeDepartment,
    setActiveDepartment,
    employees,
    search,
    setSearch,
    newEmployee, 
    setNewEmployee, 
    handleSubmit, 
    isLoading, 
    fetchError, 
    handleEmployeeChange, 
    handleDeleteEmployee,
    handleSelectAll,
    handleDeleteSelection
    }) => {
        const [addEmployeeStep, setAddEmployeeStep] = useState('Personal')
        const [addEmployeeVisible, setAddEmployeeVisible] = useState(false);
    return (
        <main className='employeesTrackPage'>
            <NavBar
                navBar={navBar}
                setNavBar={setNavBar}
                activeDepartment={activeDepartment}
                setActiveDepartment={setActiveDepartment}
            />
            <section style={{
                display: 'flex'
            }}>
                <SearchItem
                    search={search}
                    setSearch={setSearch}
                />
                <button style={{
                    marginTop: '4rem',
                    border: 'none',
                    backgroundColor: '#3f464e',
                    color: 'white',
                }}
                onClick={(e) => {
                    e.preventDefault();
                    setAddEmployeeVisible(true);
                }}
                >
                    Add Employee
                </button>
            </section>
            <section>
                <main className='App-content'>
                    {isLoading && <p>Loading Employee...</p>}
                    {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
                    {!fetchError && !isLoading && !addEmployeeVisible &&
                        <EmployeeContent
                            employees={employees.filter(employee => ((employee.firstname).toLowerCase()).includes(
                                search.toLowerCase()
                            ))}
                            handleSelectAll={handleSelectAll}
                            handleEmployeeChange={handleEmployeeChange}
                            handleDeleteEmployee={handleDeleteEmployee}
                            handleDeleteSelection={handleDeleteSelection}
                        />
                    }
                    {addEmployeeVisible && 
                    <div className='popupOverlay'>
                        <div className='addEmployeeContainer'>
                            <StepBar 
                                addEmployeeStep={addEmployeeStep}
                                setAddEmployeeStep={setAddEmployeeStep}
                                addEmployeeVisible={addEmployeeVisible}
                                setAddEmployeeVisible={setAddEmployeeVisible}
                            />
                            <AddEmployee
                                newEmployee={newEmployee}
                                setNewEmployee={setNewEmployee}
                                addEmployeeStep={addEmployeeStep}
                                setAddEmployeeStep={setAddEmployeeStep}
                                handleSubmit={handleSubmit}
                                setAddEmployeeVisible={setAddEmployeeVisible}
                            />
                        </div>
                    </div>
                    }

                </main>
            </section>
        </main>
    )
}

export default Employees
