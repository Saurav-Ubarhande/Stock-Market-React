import React from 'react'

import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  
import './App.css';
import Search from './components/search'
import Watchlist from './components/Watchlist';
import Portfolio from './components/portfolio'
import home from './components/home';
import {BrowserRouter, Route, Switch, Link, Routes, Navigate} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavBar from './components/NavBar';

const App = () => {


  return(
    
    <BrowserRouter>
{/* <Navbar expand="lg" className="navbar navbar-expand-lg navbar-light">
      <Container fluid>
        <Navbar.Brand>Stock Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
         
            <Nav.Link className="nav-link" as={Link} to="/search">Search</Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/watchlist">Watchlist</Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/portfolio">Portfolio</Nav.Link>
         
        </Navbar.Collapse>
      </Container>
    </Navbar> */}
  
  <div style={{ marginBottom: '60px' }}>
    <NavBar/>
     <Routes>

    {/* <Route exact path="/" Component={search}/>  
    <Route exact path="/search/:ticker" Component={search}/>  
    <Route exact path="/search/home" Component={search}/>
    <Route exact path="/watchlist" Component={Watchlist}/>
    <Route exact path="/portfolio" Component={portfolio}/> */}
    
          <Route path="/" element={<Navigate to="/search/home" />} /> {/* Use Navigate for redirection */}
          <Route path="/search/home" element={<Search />} />
          <Route path="/search/:ticker" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/portfolio" element={<Portfolio />} />

    </Routes> 
    </div>
    <div className='fixed-bottom text-center p-3' style={{ backgroundColor: 'rgba(220, 220, 220, 1)' }}>
        <span className='fw-bold footer'>Powered by </span>
        <a className='fw-bold text-primary footer' href='https://finnhub.io'>
          Finnhub.io
        </a>
        
      </div>

    </BrowserRouter>
  )
}

let container = null;

document.addEventListener('DOMContentLoaded', function(event) {
  if (!container) {
    container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
});



export default App;
