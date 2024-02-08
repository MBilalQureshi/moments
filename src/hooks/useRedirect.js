import axios from "axios"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

export const useRedirect = (userAuthStatus) => {
    
    const history  = useHistory()


    useEffect(()=>{
        const handleMount = async () => {
            try{
                /*
                Inside the try block, we’ll make a post request to the dj-rest-auth/token/refresh
                endpoint with the default axios instance, which we’ll have to auto-import.
                We don’t need either of our axios interceptors here because
                this endpoint (/token/) will let us know if the user is authenticated or not.
                The post request will act like a check as to whether the user is currently logged in or not.
                If a user is logged in; the access token will be refreshed successfully,
                and any code left in the try block will be able to run. 
                */
                //if the user is logged in, the code below will run
                await axios.post('/dj-rest-auth/token/refresh/')
                if(userAuthStatus === 'loggedIn'){
                    history.push('/')
                }
            }catch(err){
                /*
                If they’re not logged in though,
                we’ll get a response with the 401 error, and then the code in our catch block will run.
                So, if our user is logged in, and our userAuthStatus is set to the “loggedIn” string,
                then we know we should redirect the user. So we’ll add an if statement to check for that,
                and then push them back to the home page.
                */
                //if the user is logged in, the code below will run
                if(userAuthStatus === 'loggedOut'){
                    history.push('/')
                }
            }
        }
        handleMount()
    },[history, userAuthStatus])
}