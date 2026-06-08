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

const ProtectedRoute = ({ auth, children }) => {
  if (!auth) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const API_EMPLOYEE = "https://myhrmanager.azurewebsites.net/employees";
  const API_DEPARTMENTS = "https://myhrmanager.azurewebsites.net/departments";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
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
        const response = await fetch(API_EMPLOYEE, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw Error('Did not received expected data');
        const listItems = await response.json();
        setItems(listItems);
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

  const addItem = async (item) => {
    const token = localStorage.getItem('accessToken');
    const myNewItem = {item, checked: false };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(myNewItem)
    };

    const result = await apiRequest(API_EMPLOYEE, postOptions);
    if (result) setFetchError(result);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  const handleChange = async (id) => {
    const listItems = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter(item => item.id === id);
    const reqUrl = `${API_EMPLOYEE}/${id}`
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }

    const result = await apiRequest(reqUrl, updateOptions);
    if (result) return setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listItems = items.filter(item => item.id !== id);
    setItems(listItems);

    const reqUrl = `${API_EMPLOYEE}/${id}`;
    const deleteOoptions = {
      method: 'DELETE'
    };

    const result = await apiRequest(reqUrl, deleteOoptions);
    if (result) return setFetchError(result);
  }

  const clearStorage = () => {
    localStorage.removeItem('shoppinglist');
    setItems([]);
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
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                handleChange={handleChange}
                isLoading={isLoading}
                fetchError={fetchError}
                items={items}
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
