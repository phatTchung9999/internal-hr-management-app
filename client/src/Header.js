import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {

  return (
    <header className='App-header'>

      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px'
      }}>
        <Link to='/home' className='headerLogo'>
          {title}
        </Link>
      </nav>

    </header>
  )
}

export default Header

