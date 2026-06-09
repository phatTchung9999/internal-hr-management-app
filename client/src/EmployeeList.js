import React from 'react';
import EmployeeRow from './EmployeeRow';

const EmployeeList = ({ employees, handleEmployeeChange, handleDeleteEmployee }) => {
    return (
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
    )
}

export default EmployeeList