import React from 'react';
import EmployeeList from './EmployeeList';



const EmployeeContent = ({
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
    <EmployeeList
      employees={employees}
      departments={departments}
      departmentFilter={departmentFilter}
      setDepartmentFilter={setDepartmentFilter}
      handleSelectAll={handleSelectAll}
      handleEmployeeChange={handleEmployeeChange}
      handleDeleteEmployee={handleDeleteEmployee}
      handleDeleteSelection={handleDeleteSelection}
    />
  )
}

export default EmployeeContent
