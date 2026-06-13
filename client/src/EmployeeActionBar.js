import React from 'react';
import { IoMdArrowDropdown, IoMdMore, IoMdRefresh } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const EmployeeActionBar = ({ totalEmployees = 0, pageSize = 50 }) => {
  const visibleCount = Math.min(pageSize, totalEmployees);
  const rangeLabel = totalEmployees
    ? `1-${visibleCount} of ${totalEmployees}`
    : '0 of 0';

  return (
    <div className='employeeActionBar' aria-label='Employee list actions'>
      <div className='employeeActionBarGroup'>
        <button className='iconButton checkboxButton' type='button' aria-label='Select employees'>
          <span aria-hidden='true' className='fakeCheckbox' />
        </button>
        <button className='iconButton smallIconButton' type='button' aria-label='Select options'>
          <IoMdArrowDropdown />
        </button>
        <button className='iconButton' type='button' aria-label='Refresh employees'>
          <IoMdRefresh />
        </button>
        <button className='iconButton' type='button' aria-label='More employee actions'>
          <IoMdMore />
        </button>
      </div>

      <div className='employeeActionBarGroup paginationGroup'>
        <span className='rangeLabel'>{rangeLabel}</span>
        <button className='iconButton' type='button' aria-label='Previous page'>
          <MdKeyboardArrowLeft />
        </button>
        <button className='iconButton' type='button' aria-label='Next page'>
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}

export default EmployeeActionBar;
