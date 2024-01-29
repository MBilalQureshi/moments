import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route,Switch } from 'react-router-dom';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

function App() {

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

  return (
    // very Context Object comes with  a Provider component that allows child  
    // components to subscribe to context changes.
    // A Provider accepts a value prop to be passed to  child components that need to consume that value.  
    // In our case, the values being  passed will be the currentUser,  
    // and setCurrentUser, which is the  function to update the currentUser value.
    
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path='/' render={() => <h1>Home Page</h1>} />
              <Route exact path='/signin' render={() => <SignInForm/>} />
              <Route exact path='/signup' render={() => <SignUpForm />} />
              <Route render={() => <p>Page not found</p>}/>
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;