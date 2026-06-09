import React from 'react';
import EmployeeList from './EmployeeList';



const EmployeeContent = ({ employees, handleEmployeeChange, handleDeleteEmployee }) => {

  return (
    <>
      {(employees.length) ? (
        <EmployeeList
          employees={employees}
          handleEmployeeChange={handleEmployeeChange}
          handleDeleteEmployee={handleDeleteEmployee}
        />
      ) : (
        <p>The employee list is empty!!!</p>
      )
      }
    </>
  )
}

export default EmployeeContent