import React from 'react';
import EmployeeList from './EmployeeList';



const EmployeeContent = ({ employees, handleSelectAll, handleDeleteSelection, handleEmployeeChange, handleDeleteEmployee }) => {

  return (
    <>
      {(employees.length) ? (
        <EmployeeList
          employees={employees}
          handleSelectAll={handleSelectAll}
          handleEmployeeChange={handleEmployeeChange}
          handleDeleteEmployee={handleDeleteEmployee}
          handleDeleteSelection={handleDeleteSelection}
        />
      ) : (
        <p>The employee list is empty!!!</p>
      )
      }
    </>
  )
}

export default EmployeeContent