import React from 'react';
import { MdArrowBack } from 'react-icons/md';

const StepBar = ({
  addEmployeeStep,
  setAddEmployeeStep,
  onExit
}) => {

  return (
    <div className='stepBar'>
      <div className='row'>
        {addEmployeeStep === 'Job'
          ? (
            <button
              type='button'
              aria-label='Back to personal information'
              title='Back'
              onClick={() => setAddEmployeeStep('Personal')}
            >
              <MdArrowBack />
            </button>
          )
          : <span aria-hidden='true'></span>
        }
        <button 
          type='button'
          style={{
            color: 'rgb(18, 86, 188)'
          }}
          onClick={onExit}
        
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
