import React from 'react';
import SearchItem from './SearchItem';
import Logout from './Logout';
import {Routes, Route} from 'react-router-dom';

const Header = ({ title, clearStorage, search, setSearch }) => {

  return (
    <header className='App-header'>

      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px'
      }}>
        <div
          onClick={clearStorage}
          style={
            {
              fontSize: '1.4rem',
              cursor: 'pointer',
            }
          }>
          <b>{title}</b>
        </div>
        <Routes>
          <Route path='/home' element={
              <Logout />
          }
          />
        </Routes>
      </nav>

    </header>
  )
}

export default Header

