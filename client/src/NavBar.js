import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const NavBar = ({navBar, setNavBar, department, setDepartment}) => {
    const navigate = useNavigate();
    return (
        <>
            <nav className={navBar ? 'open' : 'closed'}>
                <button onClick={() => {
                    setNavBar(false); 
                    setDepartment('executive');
                    navigate('/departments/executive');
                }}>Executive</button>
                <button>Production</button>
                <button>Research & Development</button>
                <button>Marketing</button>
                <button>Sales</button>
                <button>Finance</button>
                <button onClick={() => {
                    setNavBar(false); 
                    navigate('/home');
                }}>Back to home</button>
                <div
                    onClick={() => {
                        setNavBar(!navBar);
                    }}>
                    {!navBar ?
                        <SlArrowRight /> :
                        <SlArrowLeft />
                    }
                </div>
            </nav>
        </>
    )
}

export default NavBar
