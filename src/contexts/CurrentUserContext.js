import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()


// As you probably remember, we’re  consuming the context in two places:  
// SignInForm and Navbar. In order to make accessing  currentUser and setCurrentUser less cumbersome,  
// by not having to import the useContext alongside  Context Objects, we’ll create two custom hooks.
// Back in the CurrentUserContext.js file,  
// I’ll export them and name them  useCurrentUser and useSetCurrentUser.
export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)



//CurrentUserProvider component name is not same as file name
export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)

    // request current user during component mounts
    const handleMount = async () => {
      try {
        const {data} = await axios.get('dj-rest-auth/user/')
        setCurrentUser(data)
      } catch(err){
        console.log(err)
      }
    }
  
    useEffect(() => {
      handleMount()
    },[])

    return(
    // very Context Object comes with  a Provider component that allows child  
    // components to subscribe to context changes.
    // A Provider accepts a value prop to be passed to  child components that need to consume that value.  
    // In our case, the values being  passed will be the currentUser,  
    // and setCurrentUser, which is the  function to update the currentUser value.
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}