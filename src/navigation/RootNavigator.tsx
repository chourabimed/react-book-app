import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cart from "../screens/Cart";
import Dashboard from "../screens/Dashboard";

const RootNavigator = () => {
  return (
    <Router>
      <Fragment>
        <div className="container-fluid navigation">
          <nav className="navbar">
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link to="/">Accueil</Link>
              </li>
              <li className="nav-item">
                <Link to="/cart">Panier</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default RootNavigator;
