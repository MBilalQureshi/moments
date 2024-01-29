import React, { useEffect, useRef, useState } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import Avatar from './Avatar'
import axios from 'axios'


const NavBar = () => {
    // const currentUser = useContext(CurrentUserContext)
    //we'll change above code to below as its now defined already in CurrentUserContext.js
    const currentUser = useCurrentUser();


    // to set the current user to null when logged out
    const setCurrentUser = useSetCurrentUser()

    // false teslling our burger menu is initially collapsed
    const [expanded, setExpanded] = useState(false)
    // we ref to burger icon, useRef so that value persist and set initial value to null
    const ref = useRef(null)
    useEffect(()=>{
        const handleClickOutside = (event) =>{
            // Because we called the useRef hook,  the Navbar.Toggle is saved in the ref  
            // variable’s current attribute. We’ll first  check the element has been assigned to it.  
            // We need this because its initial value is  set to null. And then we’ll check if the  
            // user has clicked away from the referenced button.  
            // If they have, we’ll call setExpanded with  false, which will close our dropdown menu.
            if(ref.current && !ref.current.contains(event.target)){
                setExpanded(false)
            }
        }

        document.addEventListener('mouseup',handleClickOutside)
        //return statement clean-up funtion to remove ent listner, good practice
        return () =>{
            document.removeEventListener('mouseup',handleClickOutside)
        }
    },[ref])
    const handleSignOut = async (event) => {
        try{
            await axios.post('dj-rest-auth/logout/')
            setCurrentUser(null)
        }catch(err){
            console.log(err)
        }
    }

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
        <NavLink className={styles.NavLink} to='/' onClick={handleSignOut}><i className="fas fa-sign-out-alt"></i>Sign out</NavLink>
        <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}><Avatar src={currentUser?.profile_image} text="Profile" height={40} /></NavLink>
    </>
  return (
    // in normal bootstart fixed-top but in react its fixed=top
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed='top'>
        <Container>
            <NavLink to='/'>
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="45" />
                </Navbar.Brand>
            </NavLink>

            {currentUser && addPostIcon}

            <Navbar.Toggle
                // to ref this Navbar toggle element to detect user clicked inside or outside
                ref={ref}
                onClick={()=> setExpanded(!expanded)} 
                aria-controls="basic-navbar-nav" />
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