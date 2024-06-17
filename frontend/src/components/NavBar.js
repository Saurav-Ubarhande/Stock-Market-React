import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = ({ ticker }) => {
  const location = useLocation();

  return (
<Navbar expand="lg" className="bg-blue">
<div className="container-fluid">
  <Navbar.Brand href="#" className="navbar-brand mb-0 h1">Stock Search</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarNav" />
  <Navbar.Collapse id="navbarNav" className="justify-content-end">
    <Nav className="nav nav-pills">
      <Nav.Item>
      <NavLink className="nav-link" activeclassname="active" to={ticker ? `/search/${ticker}` : "/search/home"} isactive={() => ["/search", "/search/home"].includes(location.pathname)}>Search</NavLink>
      </Nav.Item>
      <Nav.Item>
      <NavLink className="nav-link" activeclassname="active" to="/watchlist" isactive={() => location.pathname === "/watchlist"}>Watchlist</NavLink>
      </Nav.Item>
      <Nav.Item>
      <NavLink className="nav-link" activeclassname="active" to="/portfolio" isactive={() => location.pathname === "/portfolio"}>Portfolio</NavLink>
      </Nav.Item>
    </Nav>
  </Navbar.Collapse>
</div>
</Navbar>
  );
};

// style={{fontSize: '13px', paddingLeft: '10px', paddingRight: '10px' }}
export default NavBar;