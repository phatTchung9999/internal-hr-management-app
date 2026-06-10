import './index.css';
import Header from './Header';
import Departments from './Departments';
import EmployeesDashboard from './EmployeesDashboard';
import Employees from './Employees';
import Login from './Login';
import Home from './Home';
import Footer from './Footer';
import apiRequest from './apiRequest';

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
  const API_EMPLOYEES = "https://myhrmanager.azurewebsites.net/employees";
  const API_DEPARTMENTS = "https://myhrmanager.azurewebsites.net/departments";


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
    const listEmployees = employees.map(employee => employee.id === id ? { ...employee, checked: !employee.checked } : employee);
    setEmployees(listEmployees);

    const myEmployee = listEmployees.filter(employee => employee.id === id);
    const reqUrl = `${API_EMPLOYEES}/${id}`
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myEmployee[0].checked })
    }

    const result = await apiRequest(reqUrl, updateOptions);
    if (result) return setFetchError(result);
  }

  const handleDeleteEmployee = async (id) => {
    const listEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(listEmployees);

    const reqUrl = `${API_EMPLOYEES}/${id}`;
    const deleteOoptions = {
      method: 'DELETE'
    };

    const result = await apiRequest(reqUrl, deleteOoptions);
    if (result) return setFetchError(result);
  }

  const clearStorage = () => {
    localStorage.removeItem('employees');
    setEmployees([]);
    console.log('The localStorage is cleared');
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
  };

  return (
    <div className='App'>
      <Header
        title="HRmanager"
        clearStorage={clearStorage}
        search={search}
        setSearch={setSearch}
        auth={auth}
        setAuth={setAuth}
      />
      <Routes>
        <Route path="/" element={<Login {...loginProps} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute auth={auth}>
              <Home username={username} />
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
          path="/departments/executive"
          element={
            <ProtectedRoute auth={auth}>
              <EmployeesDashboard
                activeDepartment={activeDepartment}
                setActiveDepartment={setActiveDepartment}
                departments={departments}
                setDepartments={setDepartments}
                search={search}
                setSearch={setSearch}
                navBar={navBar}
                setNavBar={setNavBar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute auth={auth}>
              <Employees
                newEmployee={newEmployee}
                setNewEmployee={setNewEmployee}
                handleSubmit={handleSubmit}
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
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
