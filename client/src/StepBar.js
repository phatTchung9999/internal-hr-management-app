import React from 'react';

const StepBar = ({
  addEmployeeVisible, 
  setAddEmployeeVisible,
  addEmployeeStep, 
  setAddEmployeeStep
}) => {

  return (
    <div className='stepBar'>
      <div className='row'>
        <button>

        </button>
        <button 
          style={{
            color: 'rgb(18, 86, 188)'
          }}
          onClick={() => {setAddEmployeeVisible(false)}}
        
        >
          Exit
        </button>
      </div>
      <div className='row'>
        <div className={`step ${addEmployeeStep === 'Personal' ? 'active' : 'none'}`}>
          <div className='stepNumber'>1</div>
          <p>Personal</p>
        </div>

        <div className='stepLine'></div>

        <div className={`step ${addEmployeeStep === 'Job' ? 'active' : 'none'}`}>
          <div className='stepNumber'>2</div>
          <p>Job</p>
        </div>

        <div className='stepLine'></div>

        <div className={`step ${addEmployeeStep === 'Review' ? 'active' : 'none'}`}>
          <div className='stepNumber'>3</div>
          <p>Review</p>
        </div>
      </div>

    </div>
  );
};

export default StepBar;