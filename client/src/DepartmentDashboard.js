import React, { useEffect, useMemo, useState } from 'react';
import NavBar from './NavBar';
import HoursChart from './HoursChart';
import PaidChart from './PaidChart';
import { useNavigate, useParams } from 'react-router-dom';


const DepartmentDashboard = ({
    employees,
    departments,
    timeEntriesApi,
    navBar,
    setNavBar,
    setActiveDepartment,
    showEmployee,
    setShowEmployee,
    activeOption,
    setActiveOption
}) => {
    const navigate = useNavigate();
    const [hoursData, setHoursData] = useState({
        employees: [],
        dailyTotals: []
    });
    const [hoursLoading, setHoursLoading] = useState(false);
    const [hoursError, setHoursError] = useState('');

    const { departmentName } = useParams();
    const selectedDepartment = departments.find(
        department =>
            department.name.toLowerCase() === departmentName?.toLowerCase()
    );
    const activeDepartment = selectedDepartment?.name || '';

    useEffect(() => {
        if (activeDepartment) {
            setActiveDepartment(activeDepartment);
        }
    }, [activeDepartment, setActiveDepartment]);

    useEffect(() => {
        if (!activeDepartment || !timeEntriesApi) return;

        const controller = new AbortController();

        const fetchHours = async () => {
            setHoursLoading(true);
            setHoursError('');

            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch(
                    `${timeEntriesApi}/department/${encodeURIComponent(activeDepartment)}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        signal: controller.signal
                    }
                );

                if (!response.ok) {
                    throw new Error('Unable to load department hours and payroll.');
                }

                const data = await response.json();
                setHoursData({
                    employees: data.employees || [],
                    dailyTotals: data.dailyTotals || []
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setHoursError(err.message);
                    setHoursData({ employees: [], dailyTotals: [] });
                }
            } finally {
                if (!controller.signal.aborted) {
                    setHoursLoading(false);
                }
            }
        };

        fetchHours();

        return () => controller.abort();
    }, [activeDepartment, timeEntriesApi]);

    const employeeHours = useMemo(
        () => new Map(
            hoursData.employees.map(summary => [summary.employeeId, summary])
        ),
        [hoursData.employees]
    );

    return (
        <main className='departmentDashboard' >
            <NavBar
                navBar={navBar}
                setNavBar={setNavBar}
                departments={departments}
                activeDepartment={activeDepartment}
                setActiveDepartment={setActiveDepartment}
            />
            <section className='searchBar'>
                <h2
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowEmployee(false)}
                >
                    {`${activeDepartment} members`}
                </h2>

            </section>
            <section className='dashboardContent'>
                <div className='employeeCards'>
                    <table>
                        <thead>
                            <tr>
                                <th>Members</th>
                                <th>Worked Hours</th>
                                <th>Effective Hours</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.map(employee => {
                                if (employee.department !== activeDepartment) return null;

                                const summary = employeeHours.get(employee._id);

                                return (
                                    <tr key={employee._id}>
                                        <td className="memberInfo">
                                            <div
                                                className="memberPhoto"
                                                role='button'
                                                tabIndex='0'
                                                aria-label={`View ${employee.firstname} ${employee.lastname}`}
                                                onClick={() => navigate(`/employees/${employee._id}`)}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                        event.preventDefault();
                                                        navigate(`/employees/${employee._id}`);
                                                    }
                                                }}
                                            >
                                                {employee.firstname?.[0]}
                                                {employee.lastname?.[0]}
                                            </div>
                                            <div className="memberName">
                                                <h4>{employee.firstname} {employee.lastname}</h4>
                                                <p>{employee.title}</p>
                                            </div>
                                        </td>
                                        <td className="workedHours" data-label="Worked Hours">
                                            {(summary?.workedHours || 0).toFixed(1)}
                                            <span> hrs</span>
                                        </td>
                                        <td className="effectiveHours" data-label="Effective Hours">
                                            {(summary?.effectiveHours || 0).toFixed(1)}
                                            <span> hrs</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='summaryCards'>
                    <div className='card'>
                        {hoursLoading && <p>Loading department hours...</p>}
                        {hoursError
                            ? <p role="alert">{hoursError}</p>
                            : !hoursLoading && <HoursChart data={hoursData.dailyTotals} />
                        }
                    </div>
                    <hr style={{ width: '90%', color: 'lightgray', marginBottom: '0' }} />
                    <div className='card' style={{ marginTop: '0' }}>
                        {hoursLoading && <p>Loading department payroll...</p>}
                        {hoursError
                            ? <p role="alert">{hoursError}</p>
                            : !hoursLoading && <PaidChart data={hoursData.dailyTotals} />
                        }
                    </div>

                </div>
            </section>




        </main>
    )
}

export default DepartmentDashboard
