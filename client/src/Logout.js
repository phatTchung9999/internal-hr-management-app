import React from 'react'

const Logout = () => {
    return (
        <div>
            <a style={{
                textDecoration: 'none',
                color: 'white'
            }} href='/'
            onClick={() => {
                localStorage.removeItem('accessToken');
            }}
            >Logout</a>
        </div>
    )
}

export default Logout
