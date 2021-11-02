import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo-top-bar.svg";

function TopBar() {
  return (
    <nav className="top-bar">
      <img src={logo} alt="" />
      <ul className="top-bar-links">
        <Link to="/">Accueil</Link>
        <Link to="/">Profil</Link>
        <Link to="/">Réglage</Link>
        <Link to="/">Communauté</Link>
      </ul>
    </nav>
  );
}

export default TopBar;
