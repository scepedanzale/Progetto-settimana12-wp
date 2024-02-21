import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavbarComponent() {
  return (
    <Navbar expand="lg" data-bs-theme="dark" bg="primary">
      <Container fluid>
        <Link to="/" className='navbar-brand'>API Wordpress</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link to="/" className='nav-link'>Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/posts" className='nav-link'>Posts</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/users" className='nav-link'>Utenti</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

/* <Nav className='d-flex justify-content-between'>
      <Nav.Item>
        <Link to="/" className='nav-link'>Home</Link>
      </Nav.Item>
      <div className='d-flex'>
        <Nav.Item>
          <Link to="/" className='nav-link'>Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/posts" className='nav-link'>Posts</Link>
        </Nav.Item>
      </div>
    </Nav> */