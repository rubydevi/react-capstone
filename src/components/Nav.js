import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaChevronLeft } from 'react-icons/fa';
import '../assets/styles/Nav.css';

const Nav = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/');
  };

  return (
    <ul className="menu">
      <li className="logo">
        <button type="button" className="back-button" onClick={handleBackButtonClick}>
          <FaChevronLeft />
        </button>

      </li>
      <li className="logo">
        <h3 className="logo-text">Pokemon</h3>
      </li>
      <li className="icons">
        <FaUser />
      </li>
    </ul>
  );
};

export default Nav;
