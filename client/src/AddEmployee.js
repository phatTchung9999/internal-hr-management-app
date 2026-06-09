import React from 'react';

const AddEmployee = ({ newEmployee, setNewEmployee, handleSubmit }) => {

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewEmployee((currentEmployee) => ({
            ...currentEmployee,
            [name]: value,
        }));
    };



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
                                name='firstname'
                                type='text'
                                placeholder='First Name'
                                value={newEmployee.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='lastname'>Last Name</label>
                            <input
                                id='lastname'
                                name='lastname'
                                type='text'
                                placeholder='Last Name'
                                value={newEmployee.lastname}
                                onChange={handleChange}
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
                                name='dateOfBirth'
                                type='date'
                                placeholder='Date of Birth'
                                value={newEmployee.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='gender'>Gender</label>

                            <select
                                id='gender'
                                name='gender'
                                value={newEmployee.gender}
                                onChange={handleChange}
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
                                name='ethnicity'
                                value={newEmployee.ethnicity}
                                onChange={handleChange}
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
                            name='email'
                            type='email'
                            placeholder='Email'
                            value={newEmployee.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor='mobileNumber'>Mobile Number</label>
                        <input
                            id='mobileNumber'
                            name='mobileNumber'
                            type='text'
                            placeholder='Mobile Number'
                            value={newEmployee.mobileNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>

            </div>

            <button type='submit'>Save Employee</button>

        </form>

    )
}

export default AddEmployee