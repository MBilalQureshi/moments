import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route,Switch } from 'react-router-dom';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from './pages/posts/PostEditForm';
import ProfilePage from './pages/profiles/ProfilePage';

import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";

function App() {
  // we’ll create our routes  for our Feed and Liked pages.  
  // But before we create these routes we’ll  need to know who the currentUser is  
  // so we can return the posts they liked,  and the ones by profiles they follow.
  // So, let's set the currentUser value by calling and  auto-importing the useCurrentUser hook. We’ll need  
  // their profile_id, to know whose profile_id to  filter the posts by. In case the currentUser’s  
  // details are still being fetched in the  background, it will default to an empty string.
  const currentUser = useCurrentUser();
  // learn this below thing
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* as the home page is actually going to show list of posts */}
          <Route exact path='/' render={() => <PostsPage message="No results found. Ajdust the search keyword." />} />
          <Route exact path='/feed' render={() => <PostsPage message="No results found. Ajdust the search keyword or follow a user." filter={`owner__followed__owner__profile=${profile_id}&`} />} />
          <Route exact path='/liked' render={() => <PostsPage message="No results found. Ajdust the search keyword or like a post." filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} />} />
          <Route exact path='/signin' render={() => <SignInForm/>} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/posts/create' render={() => <PostCreateForm />} />
          <Route exact path='/posts/:id' render={() => <PostPage />} />
          <Route exact path='/posts/:id/edit' render = {() => <PostEditForm />} />
          <Route exact path='/profiles/:id' render= {() => <ProfilePage />}></Route>
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />}/>
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />}/>
          <Route render={() => <p>Page not found</p>}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;