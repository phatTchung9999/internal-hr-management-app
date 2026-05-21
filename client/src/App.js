import './index.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Footer from './Footer';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

import { useState, useEffect } from 'react';
import { SiEraser } from 'react-icons/si';
import { Routes, Route } from 'react-router-dom';

function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
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
    
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 500)


  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    };

    const result = await apiRequest(API_URL, postOptions);
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
    const reqUrl = `${API_URL}/${id}`
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

    const reqUrl = `${API_URL}/${id}`;
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
  return (
    <div className='App'>
      <Header
        title="HRmanager"
        clearStorage={clearStorage}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Login 
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          fetchError={fetchError}
          setFetchError={setFetchError}
        />}/>
        <Route path="/home" element={<Home 
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

        />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
