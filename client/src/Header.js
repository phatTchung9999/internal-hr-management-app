import React from 'react';
import Logout from './Logout';

const Header = ({auth, setAuth, title, clearStorage, search, setSearch }) => {

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
          { auth &&
            <Logout 
              auth={auth}
              setAuth={setAuth}
            />
          }
      </nav>

    </header>
  )
}

export default Header

