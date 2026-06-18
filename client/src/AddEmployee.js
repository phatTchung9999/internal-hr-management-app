import React from 'react';
import { MdAddToPhotos } from "react-icons/md";

const AddEmployee = ({ newEmployee, setNewEmployee, addEmployeeStep, setAddEmployeeStep, handleSubmit, setAddEmployeeVisible }) => {
    const requiredFields = [
        ['First Name', 'firstname'],
        ['Last Name', 'lastname'],
        ['Email', 'email'],
        ['Mobile Number', 'mobileNumber'],
        ['Title', 'title'],
        ['Department', 'department']
    ];

    const missingFields = requiredFields
        .filter(([, key]) => !String(newEmployee[key] || '').trim())
        .map(([label]) => label);

    const displayValue = (value) => value || 'Not provided';

    const displayDate = (value) => {
        if (!value) return 'Not provided';

        return new Date(`${value}T00:00:00`).toLocaleDateString(
            undefined,
            { year: 'numeric', month: 'long', day: 'numeric' }
        );
    };

    const personalDetails = [
        ['Full Name', `${newEmployee.firstname} ${newEmployee.lastname}`.trim()],
        ['Date of Birth', displayDate(newEmployee.dateOfBirth)],
        ['Gender', newEmployee.gender],
        ['Ethnicity', newEmployee.ethnicity],
        ['Email', newEmployee.email],
        ['Mobile Number', newEmployee.mobileNumber],
        ['Address', newEmployee.address]
    ];

    const jobDetails = [
        ['Job Title', newEmployee.title],
        [
            'Hourly Rate',
            newEmployee.rate !== ''
                ? `$${Number(newEmployee.rate).toFixed(2)} / hr`
                : ''
        ],
        ['Department', newEmployee.department],
        ['Manager', newEmployee.manager],
        ['Hire Date', displayDate(newEmployee.hireDate)],
        ['Employment Status', newEmployee.employmentStatus],
        ['Recruiter', newEmployee.recruiter]
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewEmployee((currentEmployee) => ({
            ...currentEmployee,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event) => {
        const submitted = await handleSubmit(event);
        if (submitted) {
            setAddEmployeeVisible(false);
            setAddEmployeeStep('Personal');
        } else {
            window.alert('Employee could not be saved. Check required fields, backend validation, and your role permissions.');
        }
    };

    return (
        <form className='addForm' onSubmit={handleFormSubmit}>
            {addEmployeeStep === 'Personal' &&
                <>
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
                            <div className='photoField'>
                                <label htmlFor='photo'>
                                    <MdAddToPhotos />
                                    <p>Upload Employee Photo</p>
                                </label>

                                <input
                                    id='photo'
                                    name='photo'
                                    type='file'
                                    accept='image/*'
                                    hidden
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        margin: '2rem 0 1rem 0'
                    }}>
                        <div className='row' style={{ width: '100%' }}>
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
                    <div style={{
                        width: '100%',
                        display: 'flex',
                    }}>
                        <div className='row' style={{ width: '100%' }}>
                            <div className='field'>
                                <label htmlFor='address'>Address</label>
                                <input
                                    id='address'
                                    name='address'
                                    type='text'
                                    placeholder='Street, Apt #, City, State, ZIP'
                                    value={newEmployee.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                    </div>
                </>
            }
            {
                addEmployeeStep === 'Job' &&
                <>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            margin: '1rem 0'
                        }}
                    >
                        <div className='row' style={{ width: '100%' }}>
                            <div className='field'>
                                <label htmlFor='title'>Title</label>
                                <input
                                    id='title'
                                    name='title'
                                    type='text'
                                    placeholder='Title'
                                    value={newEmployee.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='field'>
                                <label htmlFor='rate'>Rate</label>
                                <input
                                    id='rate'
                                    name='rate'
                                    type='number'
                                    placeholder='Rate'
                                    value={newEmployee.rate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                        }}
                    >
                        <div className='row' style={{ width: '100%' }}>
                            <div className='field'>
                                <label htmlFor='department'>Department</label>
                                <input
                                    id='department'
                                    name='department'
                                    type='text'
                                    placeholder='Department'
                                    value={newEmployee.department}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='field'>
                                <label htmlFor='manager'>Manager</label>
                                <input
                                    id='manager'
                                    name='manager'
                                    type='text'
                                    placeholder='Manager Name'
                                    value={newEmployee.manager}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            margin: '1rem 0'
                        }}
                    >
                        <div className='row' style={{ width: '100%' }}>
                            <div className='field'>
                                <label htmlFor='hireDate'>Hire Date</label>
                                <input
                                    id='hireDate'
                                    name='hireDate'
                                    type='date'
                                    value={newEmployee.hireDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='field'>
                                <label htmlFor='employmentStatus'>Employment Status</label>

                                <select
                                    id='employmentStatus'
                                    name='employmentStatus'
                                    value={newEmployee.employmentStatus}
                                    onChange={handleChange}
                                >
                                    <option value=''>Select Status</option>
                                    <option value='Full-Time'>Full-Time</option>
                                    <option value='Part-Time'>Part-Time</option>
                                    <option value='Contractor'>Contractor</option>
                                    <option value='Intern'>Intern</option>
                                    <option value='Temporary'>Temporary</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                        }}
                    >
                        <div className='row' style={{ width: '100%' }}>
                            <div className='field'>
                                <label htmlFor='recruiter'>Recruiter</label>
                                <input
                                    id='recruiter'
                                    name='recruiter'
                                    type='text'
                                    placeholder='Recruiter'
                                    value={newEmployee.recruiter}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </>
            }

            {addEmployeeStep === 'Review' &&
                <section className='employeeReview'>
                    <div className='reviewIntro'>
                        <div>
                            <h2>Review Employee Details</h2>
                            <p>Confirm the information below before creating the employee.</p>
                        </div>
                        <div className='reviewInitials' aria-hidden='true'>
                            {newEmployee.firstname?.[0] || newEmployee.lastname?.[0]
                                ? `${newEmployee.firstname?.[0] || ''}${newEmployee.lastname?.[0] || ''}`
                                : 'Empty'
                            }
                        </div>
                    </div>

                    {missingFields.length > 0 &&
                        <div className='reviewWarning' role='alert'>
                            <strong>Required information is missing:</strong>
                            <span>{missingFields.join(', ')}</span>
                        </div>
                    }

                    <div className='reviewSections'>
                        <section className='reviewSection'>
                            <div className='reviewSectionHeader'>
                                <h3>Personal Information</h3>
                                <button
                                    type='button'
                                    onClick={() => setAddEmployeeStep('Personal')}
                                >
                                    Edit
                                </button>
                            </div>
                            <dl className='reviewDetails'>
                                {personalDetails.map(([label, value]) => (
                                    <div className='reviewDetail' key={label}>
                                        <dt>{label}</dt>
                                        <dd>{displayValue(value)}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>

                        <section className='reviewSection'>
                            <div className='reviewSectionHeader'>
                                <h3>Job Information</h3>
                                <button
                                    type='button'
                                    onClick={() => setAddEmployeeStep('Job')}
                                >
                                    Edit
                                </button>
                            </div>
                            <dl className='reviewDetails'>
                                {jobDetails.map(([label, value]) => (
                                    <div className='reviewDetail' key={label}>
                                        <dt>{label}</dt>
                                        <dd>{displayValue(value)}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    </div>
                </section>
            }

            <div className='addEmployeeActions'>

                {addEmployeeStep !== 'Review' &&
                    <button style={{
                        width: '80%',
                        border: 'none',
                        color: 'white',
                        backgroundColor: 'rgb(18, 86, 188)',
                        fontWeight: 'bolder'
                    }}
                        type='button'
                        onClick={() => {
                            if (addEmployeeStep === 'Personal') {
                                setAddEmployeeStep('Job')
                            } else if (addEmployeeStep === 'Job') {
                                setAddEmployeeStep('Review')
                            }
                        }}
                    >
                        Continue
                    </button>}

                {addEmployeeStep === 'Review' &&
                    <button
                        className='submitEmployeeButton'
                        type='submit'
                        disabled={missingFields.length > 0}
                    >
                        Create Employee
                    </button>}


            </div>
        </form>

    )
}

export default AddEmployee
