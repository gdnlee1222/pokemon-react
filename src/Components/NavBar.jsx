import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/pokedex-logo.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Pokedex Logo" className="navbar-logo" />
      </Link>
    </nav>
  );
};

export default Navbar;
