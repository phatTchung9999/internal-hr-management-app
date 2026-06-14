import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// import { FaTrashAlt } from 'react-icons/fa';

const EmployeeRow = ({ employee, handleEmployeeChange}) => {
    const navigate = useNavigate();
    return (
        <li className="employee" 
            key={employee._id}
        >
            <input
                type="checkbox"
                checked={employee.checked}
                onChange={() => handleEmployeeChange(employee._id)}
            />
            <label
                onClick={()=>  navigate(`employees/${employee._id}`)}
            >
                {`${employee.firstname} ${employee.lastname}, ${employee.department}, ${employee.title}`}
            </label>
        </li>
    )
}

export default EmployeeRow