import { useEffect, useRef, useState } from 'react'

const useClickOutsideToggle = () => {
    // false telling our burger menu is initially collapsed
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
  return {expanded, setExpanded, ref}
}

export default useClickOutsideToggle