import React from "react";
import Logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";

function Navbar() {
  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "text-danger fw-semibold" : "text-dark text-decoration-none fw-semibold" }`;
  return (
    <nav className="d-flex align-items-center px-3 py-2 shadow-sm bg-white">
      <img
        src={Logo}
        className="m-3"
        style={{ width: "40px", height: "40px" }}
        alt="Logo"
      />

      <ul className="d-flex list-unstyled ms-auto gap-4 mb-0 fs-5">
        <li>
          <NavLink to="/" className={getNavLinkClass}>
            Home
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
