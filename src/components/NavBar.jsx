import React, { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate, Link } from 'react-router-dom'

import { Container, Nav, Navbar } from 'react-bootstrap';
import '../styles/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const NavBar = () => {

  const cookies = new Cookies()
  const navigate = useNavigate()
  const cerrarSesion = () => {
    cookies.remove('id', { path: '/' })
    cookies.remove('nombre', { path: '/' })
    cookies.remove('email', { path: '/' })
    cookies.remove('cedula', { path: '/' })
    navigate('/login')
  }

  useEffect(() => {
    if (!cookies.get('nombre')) {
      navigate('/login')
    }
  }, [])


  return (
    <div>
      <Navbar  className='nav' expand="lg">
        <Container>
          <Navbar.Brand href='/home/'>App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/home">Home</Link>
              <Link className="nav-link" to="/contact">Contact</Link>
              
            </Nav>
            <Nav>
              <button className='boton-cerrar-sesion' onClick={cerrarSesion}>Cerrar Sesion</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  )
}

export default NavBar