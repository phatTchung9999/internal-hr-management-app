import React from 'react';
import { useNavigate } from 'react-router-dom';
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
                onClick={()=>  navigate(`/employees/${employee._id}`)}
            >
                <span className='employeeName'>
                    {employee.firstname} {employee.lastname}
                </span>
                <span className='employeeMeta'>
                    {employee.department}
                    {employee.title && ` · ${employee.title}`}
                </span>
            </label>
        </li>
    )
}

export default EmployeeRow
