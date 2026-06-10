import React from 'react';

const StepBar = () => {
  return (
    <div className='stepBar'>
      <div className='step active'>
        <div className='stepNumber'>1</div>
        <p>Personal</p>
      </div>

      <div className='stepLine'></div>

      <div className='step'>
        <div className='stepNumber'>2</div>
        <p>Job</p>
      </div>

      <div className='stepLine'></div>

      <div className='step'>
        <div className='stepNumber'>3</div>
        <p>Review</p>
      </div>
    </div>
  );
};

export default StepBar;