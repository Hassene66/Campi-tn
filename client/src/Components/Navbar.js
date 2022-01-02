import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Navbar = ({ className }) => {
  const [closeBtn, setCloseBtn] = useState(false);

  const authLinks = (
    <ul className="menu-nav">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Acceuil
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Déconnexion{" "}
          <i style={{ fontSize: "1.8rem" }} className="fas fa-sign-out-alt" />
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className={closeBtn ? "menu-nav show" : "menu-nav"}>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Acceuil
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Se connecter
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          S'inscrire
        </Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav className={className}>
        <Link to="/">
          <img src={logo} style={{ width: 220, height: 55 }} />
        </Link>

        {/* {!loading ? (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        ) : null} */}

        <Fragment>{guestLinks}</Fragment>

        <div
          className={closeBtn ? "menu-btn close" : "menu-btn"}
          onClick={() => {
            setCloseBtn(!closeBtn);
          }}
        >
          <div className="btn-line" />
          <div className="btn-line" />
          <div className="btn-line" />
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
