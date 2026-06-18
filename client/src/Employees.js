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
    departments,
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
        const [departmentFilter, setDepartmentFilter] = useState('');

        const handleExitAddEmployee = () => {
            setNewEmployee(currentEmployee =>
                Object.fromEntries(
                    Object.keys(currentEmployee).map(key => [key, ''])
                )
            );
            setAddEmployeeStep('Personal');
            setAddEmployeeVisible(false);
        };

    return (
        <main className='employeesTrackPage'>
            <NavBar
                navBar={navBar}
                setNavBar={setNavBar}
                activeDepartment={activeDepartment}
                setActiveDepartment={setActiveDepartment}
            />
            <section className='employeeSearchBar'>
                <SearchItem
                    search={search}
                    setSearch={setSearch}
                />
                <button
                className='addEmployeeButton'
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
                            employees={employees.filter(employee => {
                                const matchesSearch = employee.firstname
                                    .toLowerCase()
                                    .includes(search.toLowerCase());
                                const matchesDepartment = !departmentFilter
                                    || employee.department === departmentFilter;

                                return matchesSearch && matchesDepartment;
                            })}
                            departments={departments}
                            departmentFilter={departmentFilter}
                            setDepartmentFilter={setDepartmentFilter}
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
                                onExit={handleExitAddEmployee}
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
