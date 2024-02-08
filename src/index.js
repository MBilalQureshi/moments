import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { ProfileDataProvider } from './contexts/ProfileDataContext';

ReactDOM.render(
    <Router>
      {/* 6 . Note: Your ProfileDataProvider will need to be placed within the CurrentUserProvider, as the ProfileDataProvider needs to access the setCurrentUser Context. */}
      <CurrentUserProvider>
        {/* 6.1 Add your newly created ProfileDataProvider around the App component (within the CurrentUserProvider). */}
        <ProfileDataProvider>
          <App />
        </ProfileDataProvider>
      </CurrentUserProvider>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
