import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <nav className="navbar navbar-primary navbar-expand-lg bg-primary border-bottom border-body">
        <div className="container-fluid">
          <Link className="navbar-brand mx-3 fw-bolder" to="/">
            E-Commerce
          </Link>

          <button
            className="navbar-toggler align-items-center justify-content-center me-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse container-fluid bg-primary"
            id="navbarSupportedContent"
          >
            {auth ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end fw-bolder ">
                <li className="nav-item mx-md-2 mb-2 mb-md-0">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item mx-md-2 mb-2 mb-md-0">
                  <Link className="nav-link" to="/add">
                    Add Product
                  </Link>
                </li>

                <li className="nav-item mx-md-2 mb-2 mb-md-0">
                  <Link className="nav-link" to="/update">
                    Update Product
                  </Link>
                </li>
                {/* 
                <li className="nav-item mx-md-2 mb-2 mb-md-0">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li> */}
                <li className="nav-item mx-md-2 mb-2 mb-md-0">
                  <Link className="nav-link" to="/signup" onClick={logout}>
                    Logout {JSON.parse(auth).name}
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end fw-bolder ">
                <li className="nav-item mx-md-2 mb-2 mb-md-0">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item mx-md-2 mb-2 mb-md-0">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
