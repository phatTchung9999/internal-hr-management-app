import React from 'react';
// import { FaTrashAlt } from 'react-icons/fa';

const EmployeeRow = ({ employee, handleEmployeeChange, handleDeleteEmployee }) => {
    return (
        <li className="employee" key={employee._id}>
            <input
                type="checkbox"
                checked={employee.checked}
                onChange={() => handleEmployeeChange(employee._id)}
            />
            <label>
                {`${employee.firstname} ${employee.lastname}, ${employee.department}, ${employee.title}`}
            </label>
            {/* <FaTrashAlt
                role="button"
                tabIndex="0"
                onDoubleClick={() => handleDeleteEmployee(employee._id)}
                aria-label={`Delete ${employee.firstname}`}
            /> */}
        </li>
    )
}

export default EmployeeRow