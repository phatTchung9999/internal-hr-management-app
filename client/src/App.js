import './index.css';
import Header from './Header';
import Departments from './Departments';
import DepartmentDashboard from './DepartmentDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import Employees from './Employees';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import FeaturePreview from './FeaturePreview';
import Footer from './Footer';
import apiRequest from './apiRequest';

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  || 'https://myhrmanager.azurewebsites.net';
const API_AUTH = `${API_BASE_URL}/auth`;
const API_EMPLOYEES = `${API_BASE_URL}/employees`;
const API_DEPARTMENTS = `${API_BASE_URL}/departments`;
const API_TIME_ENTRIES = `${API_BASE_URL}/time-entries`;

const EMPTY_EMPLOYEE = {
  firstname: '',
  lastname: '',
  dateOfBirth: '',
  gender: '',
  ethnicity: '',

  email: '',
  mobileNumber: '',
  address: '',

  title: '',
  department: '',
  recruiter: '',

  rate: '',
  hireDate: '',
  employmentStatus: '', // Full-Time, Part-Time, Contractor
  manager: '',

  photo: '',
};

const ProtectedRoute = ({ auth, children }) => {
  if (!auth) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState(EMPTY_EMPLOYEE);
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [departments, setDepartments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState('');
  const [navBar, setNavBar] = useState(false);
  const [searchForm, setSearchForm] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const [activeOption, setActiveOption] = useState('Team');
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem('accessToken') ? true : false
  });

  useEffect(() => {
    if (!auth) return;
    const token = localStorage.getItem('accessToken');

    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(API_EMPLOYEES, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw Error('Did not received expected data');
        const listEmployees = await response.json();
        setEmployees(listEmployees);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDepartmentData = async () => {
      try {
        const response = await fetch(API_DEPARTMENTS, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw Error('Did not received expected data');
        const listDepartments = await response.json();
        setDepartments(listDepartments);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };


    setTimeout(() => {
      (async () => await fetchEmployeeData())();
      (async () => await fetchDepartmentData())();
    }, 500)


  }, [auth]);

  const handleSelectAll = async (checked) => {
    const token = localStorage.getItem('accessToken');

    const listEmployees = employees.map(employee => ({
      ...employee,
      checked
    }));

    setEmployees(listEmployees);

    const updatePromises = listEmployees.map(employee => {
      const updateOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: employee._id,
          checked: employee.checked
        })
      };

      return apiRequest(API_EMPLOYEES, updateOptions);
    });

    const results = await Promise.all(updatePromises);
    const error = results.find(result => result);

    if (error) return setFetchError(error);
  }

  const handleDeleteSelection = async () => {
    const token = localStorage.getItem('accessToken');

    const foundEmployees = employees.filter(employee => employee.checked);
    const listEmployees = employees.filter(employee => !employee.checked);

    setEmployees(listEmployees);

    const deletePromises = foundEmployees.map(employee => {
      const deleteOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: employee._id
        })
      };

      return apiRequest(API_EMPLOYEES, deleteOptions);
    });

    const results = await Promise.all(deletePromises);
    const error = results.find(result => result);

    if (error) return setFetchError(error);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newEmployee.firstname) return false;
    const result = await addEmployee(newEmployee);
    if (result) return false;
    setNewEmployee(EMPTY_EMPLOYEE);
    return true;
  }

  const addEmployee = async (employee) => {
    const token = localStorage.getItem('accessToken');
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(employee)
    };

    const result = await apiRequest(API_EMPLOYEES, postOptions);
    if (result) {
      setFetchError(result);
      return result;
    }

    setEmployees(currentEmployees => [...currentEmployees, { ...employee, checked: false }]);
    return null;
  }

  const handleEmployeeChange = async (id) => {
    const token = localStorage.getItem('accessToken');
    const listEmployees = employees.map(employee => employee._id === id ? { ...employee, checked: !employee.checked } : employee);
    setEmployees(listEmployees);

    const myEmployee = listEmployees.find(employee => employee._id === id);
    if (!myEmployee) return setFetchError(`Employee ID ${id} not found`);

    const reqUrl = `${API_EMPLOYEES}`
    const updateOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
        ,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id, checked: myEmployee.checked })
    }

    const result = await apiRequest(reqUrl, updateOptions);
    if (result) return setFetchError(result);
  }

  const handleDeleteEmployee = async (id) => {
    const token = localStorage.getItem('accessToken');
    const listEmployees = employees.filter(employee => employee._id !== id);
    setEmployees(listEmployees);

    const reqUrl = `${API_EMPLOYEES}`;
    const deleteOoptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    };

    const result = await apiRequest(reqUrl, deleteOoptions);
    if (result) return setFetchError(result);
  }

  const loginProps = {
    isLoading,
    setIsLoading,
    fetchError,
    setFetchError,
    username,
    setUsername,
    password,
    setPassword,
    message,
    setMessage,
    auth,
    setAuth,
    API_AUTH,
  };

  return (
    <div className='App'>
      <Header
        title="HRmanager"
      />
      <Routes>
        <Route
          path="/"
          element={
            auth
              ? <Navigate to="/home" replace />
              : <Login {...loginProps} />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute auth={auth}>
              <Home
                username={username}
                setAuth={setAuth}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute auth={auth}>
              <Profile username={username} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute auth={auth}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/features/:featureKey"
          element={
            <ProtectedRoute auth={auth}>
              <FeaturePreview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <ProtectedRoute auth={auth}>
              <Departments
                employees={employees}
                activeDepartment={activeDepartment}
                setActiveDepartment={setActiveDepartment}
                departments={departments}
                setDepartments={setDepartments}
                navBar={navBar}
                setNavBar={setNavBar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments/:departmentName"
          element={
            <ProtectedRoute auth={auth}>
              <DepartmentDashboard
                employees={employees}
                timeEntriesApi={API_TIME_ENTRIES}
                setActiveDepartment={setActiveDepartment}
                departments={departments}
                search={search}
                setSearch={setSearch}
                navBar={navBar}
                setNavBar={setNavBar}
                searchForm={searchForm}
                setSearchForm={setSearchForm}
                showEmployee={showEmployee}
                setShowEmployee={setShowEmployee}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute auth={auth}>
              <Employees
                navBar={navBar}
                setNavBar={setNavBar}
                departments={departments}
                setDepartments={setDepartments}
                activeDepartment={activeDepartment}
                setActiveDepartment={setActiveDepartment}
                newEmployee={newEmployee}
                setNewEmployee={setNewEmployee}
                handleSelectAll={handleSelectAll}
                handleSubmit={handleSubmit}
                handleDeleteSelection={handleDeleteSelection}
                handleDeleteEmployee={handleDeleteEmployee}
                handleEmployeeChange={handleEmployeeChange}
                isLoading={isLoading}
                fetchError={fetchError}
                employees={employees}
                search={search}
                setSearch={setSearch}
              />
            </ProtectedRoute>
          }
        />
        {employees.map(employee => (
          <Route
            path={`/employees/${employee._id}`}
            element={
              <ProtectedRoute auth={auth}>
                <EmployeeDashboard
                  employee={employee}
                  navBar={navBar}
                  setNavBar={setNavBar}
                  activeOption={activeOption}
                  setActiveOption={setActiveOption}
                />
              </ProtectedRoute>
            }
          />))}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
