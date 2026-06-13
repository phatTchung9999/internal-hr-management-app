import React from 'react';
import { IoMdMore } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react';

const EmployeeActionBar = ({ totalEmployees = 0, pageSize = 50, handleSelectAll, handleDeleteSelection }) => {
  const visibleCount = Math.min(pageSize, totalEmployees);
  const rangeLabel = totalEmployees
    ? `1-${visibleCount} of ${totalEmployees}`
    : '0 of 0';

  const [selectAll, setSelectAll] = useState(false);


  return (
    <div className='employeeActionBar' aria-label='Employee list actions'>
      <div className='employeeActionBarGroup'>
        <div className='iconButton checkboxButton' type='button' aria-label='Select employees'>
          <input
            type='checkbox'
            className='allSelectCheckbox'
            onChange={(e) => {
              handleSelectAll(e.target.checked);
              setSelectAll(e.target.checked);
            }}
          />
        </div>
        {!selectAll && (
          <>
            <button className='iconButton' type='button' aria-label='More employee actions'>
              <IoMdMore />
            </button>
          </>
        )}
        {selectAll && (
          <>
            <button className='iconButton' type='button' aria-label='Refresh employees' onClick={()=> handleDeleteSelection()}>
              <FaTrashAlt />
            </button>
            <button className='iconButton' type='button' aria-label='More employee actions'>
              <IoMdMore />
            </button>
          </>
        )}
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
