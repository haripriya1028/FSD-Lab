import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">F</span>
          <span>foundly</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/browse">Browse</NavLink>
          <NavLink to="/report">Report an item</NavLink>
          <NavLink to="/my-reports">My reports</NavLink>
        </nav>

        <NavLink to="/report" className="nav-action">+ Report item</NavLink>
      </div>
    </header>
  );
}