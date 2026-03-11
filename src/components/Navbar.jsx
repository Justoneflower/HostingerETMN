import React, { useState } from "react";
import "./Navbar.css";
import RequestQuote from "./RequestQuote";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="nav-grid">

          {/* LOGO */}
          <div className="nav-left">
            <div className="logo-holder">
              <img src="/images/8.png" alt="ETMN Logo" />
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="nav-center">
            <ul className="nav-links">

              <li>Home</li>

              {/* PRODUCTS DROPDOWN */}
              <li className="dropdown">
                Products
                <ul className="dropdown-menu">
                  <li>Accessories</li>
                </ul>
              </li>

              {/* SERVICES DROPDOWN */}
              <li className="dropdown">
                Services
                <ul className="dropdown-menu">
                  <li>Authorised Training Centre</li>
                </ul>
              </li>

              <li>Software</li>
              <li>Learn</li>
              <li>Contact</li>

            </ul>
          </nav>

          {/* SEARCH BUTTON */}
          <div className="nav-right">
            <input
              type="text"
              placeholder="Search"
              className="nav-search"
            />

            <button
              className="quote-btn"
              onClick={() => setShowQuote(true)}
            >
              Request A Quote
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Accessories</li>
            <li>Services</li>
            <li>Authorised Training Centre</li>
            <li>Software</li>
            <li>Learn</li>
            <li>Contact</li>
          </ul>
        </div>
      </header>

      {/* QUOTE POPUP */}
      <RequestQuote
        open={showQuote}
        onClose={() => setShowQuote(false)}
      />
    </>
  );
};

export default Navbar;