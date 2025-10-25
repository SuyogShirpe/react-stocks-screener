import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="d-flex align-items-center px-3 py-2 shadow-sm bg-white">
      <img
        src={Logo}
        className="m-3"
        style={{ width: "40px", height: "40px" }}
        alt="Logo"
      />
      <div className="flex-grow-1 d-flex justify-content-center mx-3">
        <div className="position-relative" style={{ maxWidth: "500px", width: "100%" }}>
          <i
            className="bi bi-search position-absolute"
            style={{
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#6c757d",
              pointerEvents: "none",
            }}
          ></i>
          <input
            type="text"
            className="form-control ps-5 shadow-sm bg-white"
            placeholder="Search Stock"
            style={{ borderRadius: "50px" }}
          />
        </div>
      </div>

      

      <ul className="d-flex list-unstyled ms-auto gap-4 mb-0 fs-5">
        <li >
          <Link to="/" className="text-decoration-none text-dark">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-decoration-none text-dark">About</Link>
        </li>
        <li>
          <Link to="/contact" className="text-decoration-none text-dark">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
