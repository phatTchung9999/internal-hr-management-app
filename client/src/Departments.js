import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Departments = () => {
    const navigate = useNavigate()
    const [navBar, setNavBar] = useState(true)

    return (

        <main className='departmentPage'>
            <nav className={navBar ? 'open' : 'closed'}>
                <button>Executive</button>
                <button>Production</button>
                <button>Research & Development</button>
                <button>Marketing</button>
                <button>Sales</button>
                <button>Finance</button>
                <button onClick={() => { navigate('/home') }}>Back to home</button>
                <div
                    onClick={() => {
                        setNavBar(!navBar);
                    }}>...</div>
            </nav>
            <section className='departmentContent'>
                <div className='box1'>
                    <h1>Departments</h1>
                </div>
                <div className='box2'>
                    
                </div>
            </section>


        </main>

    )
}

export default Departments
