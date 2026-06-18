import React from 'react';
import { useNavigate} from 'react-router-dom';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";


const NavBar = ({
  navBar,
  setNavBar,
  departments,
  activeDepartment,
  setActiveDepartment
}) => {
  const navigate = useNavigate();


  return (
    <nav className={navBar ? 'open' : 'closed'}>
      {departments?.map(department => (
        <button
          key={department._id}
          type="button"
          onClick={() => {
            setNavBar(false);
            setActiveDepartment(department.name);
            navigate(`/departments/${encodeURIComponent(department.name.toLowerCase())}`);
          }}
        >
          {department.name}
        </button>
      ))}

      <button
        type='button'
        onClick={() => {
          navigate('/home');
          setNavBar(false)
        }}

      >
        Back to Home
      </button>

      <button
        type='button'
        onClick={() => {
          navigate(-1);
          setNavBar(false)
        }}
      >
        Back
      </button>

      < div
        className="navToggle"
        onClick={() => setNavBar(!navBar)}
      >
        {!navBar ? <SlArrowRight /> : <SlArrowLeft />}
      </div>
    </nav>
  );
};

export default NavBar;
