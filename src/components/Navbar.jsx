import React from "react";
import Logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";
import "../stylesheets/Navbar.css";

function Navbar() {
  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "text-danger" : "text-dark"}`;

  return (
  <nav className="navbar-custom">
    <div className="navbar-left">
      <img
        src={Logo}
        alt="Logo"
        className="navbar-logo"
      />
      <span className="navbar-title">STOCKS SCREENER</span>
    </div>

    <ul className="navbar-links">
      <li>
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/watchlist" className={getNavLinkClass}>
          Watchlist
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={getNavLinkClass}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={getNavLinkClass}>
          Contact
        </NavLink>
      </li>
    </ul>
  </nav>
);

}

export default Navbar;
