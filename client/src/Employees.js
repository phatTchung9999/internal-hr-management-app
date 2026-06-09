import React from 'react'
import AddEmployee from './AddEmployee';
import EmployeeContent from './EmployeeContent';
import SearchItem from './SearchItem';
import StepBar from './StepBar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from 'react';

const Employees = ({
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
    }) => {

        const [addEmployeeVisible, setAddEmployeeVisible] = useState(false);
    return (
        <>
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
                    setAddEmployeeVisible(prev => prev = true);
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

                            handleEmployeeChange={handleEmployeeChange}
                            handleDeleteEmployee={handleDeleteEmployee}
                        />
                    }
                    {addEmployeeVisible && 
                        <div className='addEmployeeContainer'>
                            <StepBar />
                            <AddEmployee
                                newEmployee={newEmployee}
                                setNewEmployee={setNewEmployee}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    }

                </main>
            </section>
        </>
    )
}

export default Employees
