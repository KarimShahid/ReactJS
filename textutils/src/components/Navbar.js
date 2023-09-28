import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  {props.about}
                </Link>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form> */}
            <div className="d-flex">
              <div
                className="bg-primary rounder mx-2"
                style={{ height: "30px", width: "30px", cursor: "pointer" }}
                onClick={() => {
                  props.toggleMode("primary");
                }}
              ></div>
              <div
                className="bg-danger rounder mx-2"
                style={{ height: "30px", width: "30px", cursor: "pointer" }}
                onClick={() => {
                  props.toggleMode("danger");
                }}
              ></div>
              <div
                className="bg-warning rounder mx-2"
                style={{ height: "30px", width: "30px", cursor: "pointer" }}
                onClick={() => {
                  props.toggleMode("warning");
                }}
              ></div>
            </div>
            &nbsp; &nbsp;
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={() => {
                  props.toggleMode(null);
                }}
              />
              <label
                className={`form-check-label text-${
                  props.mode === "light" ? "dark" : "light"
                }`}
                htmlFor="flexSwitchCheckDefault"
              >
                Dark Mode
              </label>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// setting the types of props
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};
export default Navbar;

// defaul value of props
Navbar.defaultProps = {
  title: "Set Title Here",
  about: "Set About text here",
};
