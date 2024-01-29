import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom'
import { useCurrentUser } from '../contexts/CurrentUserContext'


const NavBar = () => {
    // const currentUser = useContext(CurrentUserContext)
    //we'll change above code to below as its now defined already in CurrentUserContext.js
    const currentUser = useCurrentUser();

    const loggedOutIcons = (<>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signin'><i className="fa-solid fa-right-to-bracket"></i>Sign in</NavLink>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signup'><i className="fa-solid fa-user-plus"></i>Sign up</NavLink>
    </>);
    // we'll put only current users names for now
    const loggedInIcons = <>{currentUser?.username}</>
  return (
    // in normal bootstart fixed-top but in react its fixed=top
    <Navbar className={styles.NavBar} expand="md" fixed='top'>
        <Container>
            <NavLink to='/'>
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="45" />
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to='/'><i className="fa-solid fa-house"></i>Home</NavLink>
                    {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar