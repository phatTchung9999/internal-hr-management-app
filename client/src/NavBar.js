import React, { useEffect, useRef } from 'react';
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
  const navRef = useRef(null);

  useEffect(() => {
    if (!navBar) return;

    const focusableElements = navRef.current?.querySelectorAll(
      'button, [role="button"]'
    );
    focusableElements?.[0]?.focus();

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setNavBar(false);
        return;
      }

      if (event.key !== 'Tab' || !focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navBar, setNavBar]);


  return (
    <>
    {navBar && (
      <div
        className='navBackdrop'
        aria-hidden='true'
        onClick={() => setNavBar(false)}
      />
    )}
    <nav
      ref={navRef}
      className={navBar ? 'open' : 'closed'}
      aria-label='Main navigation'
    >
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
        role='button'
        tabIndex='0'
        aria-label={navBar ? 'Close navigation' : 'Open navigation'}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setNavBar(!navBar);
          }
        }}
        onClick={() => setNavBar(!navBar)}
      >
        {!navBar ? <SlArrowRight /> : <SlArrowLeft />}
      </div>
    </nav>
    </>
  );
};

export default NavBar;
