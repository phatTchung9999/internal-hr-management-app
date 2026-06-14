import React from 'react';
import EmployeeRow from './EmployeeRow';
import EmployeeActionBar from './EmployeeActionBar';

const EmployeeList = ({ employees, handleSelectAll, handleDeleteSelection, handleEmployeeChange, handleDeleteEmployee }) => {
    return (
        <div className='employeeList'>
            <EmployeeActionBar 
                totalEmployees={employees.length} 
                employees={employees}
                handleSelectAll={handleSelectAll}
                handleDeleteSelection={handleDeleteSelection}/> 
            <ul>
                {employees.map((employee) => (
                    <EmployeeRow
                        key={employee._id}
                        employee={employee}
                        handleEmployeeChange={handleEmployeeChange}
                        handleDeleteEmployee={handleDeleteEmployee}
                    />
                ))}
            </ul>
        </div>
    )
}

export default EmployeeList
