import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

const AddEmployee = ({ newEmployee, setNewEmployee, handleSubmit }) => {



    return (

        <form className='addForm' onSubmit={handleSubmit}>
            <div style={{
                width: '100%',
                display: 'flex',
            }}>
                <div className='group1'>
                    <div className='row'>
                        <div className='field'>
                            <label htmlFor='firstname'>First Name</label>
                            <input
                                id='firstname'
                                type='text'
                                placeholder='First Name'
                                value={newEmployee.firstname}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='lastname'>Last Name</label>
                            <input
                                id='lastname'
                                type='text'
                                placeholder='Last Name'
                                value={newEmployee.lastname}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='field'>
                            <label htmlFor='dateOfBirth'>Date of Birth</label>
                            <input
                                style={{
                                    width: '12.5rem'
                                }}
                                id='dateOfBirth'
                                type='date'
                                placeholder='Date of Birth'
                                value={newEmployee.dateOfBirth}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='gender'>Gender</label>

                            <select
                                id='gender'
                                value={newEmployee.gender}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        gender: e.target.value
                                    })
                                }
                            >
                                <option value=''>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='field'>
                            <label htmlFor='ethnicity'>Ethnicity</label>
                            <select
                                style={{ width: '26.5rem' }}
                                id='ethnicity'
                                value={newEmployee.ethnicity}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        ethnicity: e.target.value
                                    })
                                }
                            >
                                <option value=''>Select Ethnicity</option>
                                <option value='Asian'>Asian</option>
                                <option value='Black or African American'>Black or African American</option>
                                <option value='Hispanic or Latino'>Hispanic or Latino</option>
                                <option value='Native American'>Native American</option>
                                <option value='Native Hawaiian or Pacific Islander'>
                                    Native Hawaiian or Pacific Islander
                                </option>
                                <option value='White'>White</option>
                                <option value='Two or More Races'>Two or More Races</option>
                                <option value='Prefer Not to Say'>Prefer Not to Say</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='photo'>
                    Photo
                </div>
            </div>
            <div style={{
                width: '100%',
                display: 'flex',
                margin: '2rem 0'
            }}>
                <div className='row' style={{width: '100%'}}>
                    <div className='field'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            type='email'
                            placeholder='Email'
                            value={newEmployee.email}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor='mobileNumber'>Mobile Number</label>
                        <input
                            id='mobileNumber'
                            type='text'
                            placeholder='Mobile Number'
                            value={newEmployee.mobileNumber}
                        />
                    </div>
                </div>

            </div>

        </form>

    )
}

export default AddEmployee