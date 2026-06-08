import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const NavBar = ({navBar, setNavBar, departments, setDepartments, activeDepartment, setActiveDepartment}) => {

    const navigate = useNavigate();
    return (
        <>
            <nav className={navBar ? 'open' : 'closed'}>
                {
                    departments?.map(departement => (
                        <button key={departement.id} onClick={() => {
                            setNavBar(false);
                            setActiveDepartment(departement);
                            navigate(`/departments/${departement.name.toLowerCase()}`);
                        }}>
                            {departement.name}
                        </button>
                    ))
                }
                <button onClick={() => {
                    setNavBar(false); 
                    navigate('/home');
                    setActiveDepartment('');
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
