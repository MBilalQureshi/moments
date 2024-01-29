import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import Avatar from './Avatar'


const NavBar = () => {
    // const currentUser = useContext(CurrentUserContext)
    //we'll change above code to below as its now defined already in CurrentUserContext.js
    const currentUser = useCurrentUser();

    const addPostIcon = (
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/posts/create'><i className="far fa-plus-square"></i>Add Post</NavLink>
    )

    const loggedOutIcons = (<>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signin'><i className="fa-solid fa-right-to-bracket"></i>Sign in</NavLink>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signup'><i className="fa-solid fa-user-plus"></i>Sign up</NavLink>
    </>);
    // we'll put only current users names for now
    // const loggedInIcons = <>{currentUser?.username}</>
    const loggedInIcons = <>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/feed'><i className="fas fa-stream"></i>Feed</NavLink>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/liked'><i className="fas fa-heart"></i>Liked</NavLink>
        <NavLink className={styles.NavLink} to='/' onClick={()=>{}}><i className="fas fa-sign-out-alt"></i>Sign out</NavLink>
        <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}><Avatar src={currentUser?.profile_image} text="Profile" height={40} /></NavLink>
    </>
  return (
    // in normal bootstart fixed-top but in react its fixed=top
    <Navbar className={styles.NavBar} expand="md" fixed='top'>
        <Container>
            <NavLink to='/'>
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="45" />
                </Navbar.Brand>
            </NavLink>

            {currentUser && addPostIcon}

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