import React from 'react';
import { IoMdMore } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

const EmployeeActionBar = ({
  employees = [],
  departments = [],
  departmentFilter,
  setDepartmentFilter,
  totalEmployees = 0,
  pageSize = 50,
  handleSelectAll,
  handleDeleteSelection
}) => {
  const visibleCount = Math.min(pageSize, totalEmployees);
  const rangeLabel = totalEmployees
    ? `1-${visibleCount} of ${totalEmployees}`
    : '0 of 0';

  const selectAllRef = useRef(null);
  const filterMenuRef = useRef(null);
  const filterButtonRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const selectedCount = employees.filter(employee => employee.checked).length;
  const hasSelection = selectedCount > 0;
  const allSelected = employees.length > 0 && selectedCount === employees.length;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = hasSelection && !allSelected;
    }
  }, [hasSelection, allSelected]);

  useEffect(() => {
    const closeFilterMenu = event => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setFilterOpen(false);
        filterButtonRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', closeFilterMenu);
    return () => document.removeEventListener('mousedown', closeFilterMenu);
  }, []);


  return (
    <div className='employeeActionBar' aria-label='Employee list actions'>
      <div className='employeeActionBarGroup'>
        <div className='iconButton checkboxButton' type='button' aria-label='Select employees'>
          <input
            ref={selectAllRef}
            type='checkbox'
            className='allSelectCheckbox'
            checked={allSelected}
            aria-label='Select all employees'
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </div>
        {hasSelection && (
            <button
              className='iconButton'
              type='button'
              aria-label={`Delete ${selectedCount} selected employee${selectedCount === 1 ? '' : 's'}`}
              title='Delete selected employees'
              onClick={handleDeleteSelection}
            >
              <FaTrashAlt />
            </button>
        )}
        <div className='departmentFilter' ref={filterMenuRef}>
            <button
              ref={filterButtonRef}
              className={`iconButton ${departmentFilter ? 'filterActive' : ''}`}
              type='button'
              aria-label='Filter employees by department'
              title='Filter by department'
              aria-expanded={filterOpen}
              onClick={() => {
                setFilterOpen(current => {
                  if (current) filterButtonRef.current?.blur();
                  return !current;
                });
              }}
            >
              <IoMdMore />
            </button>
            {filterOpen && (
              <div className='departmentFilterMenu'>
                <p>Filter by department</p>
                <button
                  type='button'
                  className={!departmentFilter ? 'selected' : ''}
                  onClick={() => {
                    setDepartmentFilter('');
                    setFilterOpen(false);
                    filterButtonRef.current?.blur();
                  }}
                >
                  All departments
                </button>
                {departments.map(department => (
                  <button
                    key={department._id}
                    type='button'
                    className={departmentFilter === department.name ? 'selected' : ''}
                    onClick={() => {
                      setDepartmentFilter(department.name);
                      setFilterOpen(false);
                      filterButtonRef.current?.blur();
                    }}
                  >
                    {department.name}
                  </button>
                ))}
              </div>
            )}
        </div>
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
