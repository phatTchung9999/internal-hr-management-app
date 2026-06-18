import React from 'react';
import EmployeeRow from './EmployeeRow';
import EmployeeActionBar from './EmployeeActionBar';

const EmployeeList = ({
    employees,
    departments,
    departmentFilter,
    setDepartmentFilter,
    handleSelectAll,
    handleDeleteSelection,
    handleEmployeeChange,
    handleDeleteEmployee
}) => {
    return (
        <div className='employeeList'>
            <EmployeeActionBar 
                totalEmployees={employees.length} 
                employees={employees}
                departments={departments}
                departmentFilter={departmentFilter}
                setDepartmentFilter={setDepartmentFilter}
                handleSelectAll={handleSelectAll}
                handleDeleteSelection={handleDeleteSelection}/> 
            {employees.length > 0
                ? <ul>
                    {employees.map((employee) => (
                    <EmployeeRow
                        key={employee._id}
                        employee={employee}
                        handleEmployeeChange={handleEmployeeChange}
                        handleDeleteEmployee={handleDeleteEmployee}
                    />
                    ))}
                </ul>
                : <p className='emptyEmployeeList'>No employees found for this filter.</p>
            }
        </div>
    )
}

export default EmployeeList
