import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom';

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

    const history = useHistory()

    // request current user during component mounts
    const handleMount = async () => {
      try {
        // let’s  update the axios instance in the handleMount function to the one that actually  uses the response interceptor, namely axiosRes.
        const {data} = await axiosRes.get('dj-rest-auth/user/')
        setCurrentUser(data)
      } catch(err){
        console.log(err)
      }
    }
  
    useEffect(() => {
      handleMount()
    },[])
    

    // useMemo is usually used to cache  complex values that take time to compute.  
    // The reason we’re using it here is that useMemo  runs before the children components are mounted.  
    // And we want to attach the interceptors  before the children mount,  
    // as that’s where we’ll be using  them and making the requests from.
    useMemo(()=> {
    // At the moment we don’t have any code  to use our request interceptor with,  
    // because we aren’t making any requests that need  it yet. But don’t worry, we will be using it soon.
      // request
      axiosReq.interceptors.request.use(
        async (config) => {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            return config;
          }
          return config;
        },
        (err) => {
          // incase error reject promise with it
          return Promise.reject(err);
        }
      );

      // response
      axiosRes.interceptors.response.use(
        // if no error return response
        (response) => response,
        // if there is error well check if its 401
        async(err) => {
          if(err.response?.status === 401){
            try{
              // now try to refresh the access token
              await axios.post('/dj-rest-auth/token/refresh/')
            } catch(err){
              // if above refresh fails we'll redirect user to sign in page
              setCurrentUser(prevCurrentUser => {
                if(prevCurrentUser){
                  history.push('/signin')
                }
                // and set data to null
                return null
              })
            }
            // If there’s no error refreshing the token, I’ll return an axios instance with the  error config to exit the interceptor.
            return axios(err.config)
          }
          // In case the error wasn’t 401, I’ll just reject the  Promise with the error to exit the interceptor.
          return Promise.reject(err)
        }
      )
    // we shouldn’t forget to add a dependency  
    // array for our useMemo hook with history  inside. We want useMemo to only run once,  
    // but the linter will throw a warning if  we provided an empty dependency array.
    },[history])

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