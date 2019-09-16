import React from 'react';
import MarkdownWriter from './components/MarkdownOutput'
import './styles/styles.css'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
// import SignInPage from './components/SignIn';
// import PasswordForgetPage from './components/PasswordForget';
// import AccountPage from './components/Account';
import * as ROUTES from './constants/routes';

// import { BrowserRouter as Router } from 'react-router-dom';
// import LandingPage from './components/Landing';
// import SignUpPage from './components/SignUp';
// import SignInPage from './components/SignIn';
// import PasswordForgetPage from './components/PasswordForget';
// import AccountPage from './components/Account';
// import * as ROUTES from './constants/routes';
require('dotenv').config()


// <Router>
//   <Navbar />
//   <Route exact path={ROUTES.LANDING} component={LandingPage} />
//   <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
//   <Route path={ROUTES.SIGN_IN} component={SignInPage} />
//   <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
//   <Route path={ROUTES.ACCOUNT} component={AccountPage} />
// </Router>

function App() {
  // const handleLogin = () => {

  // }
  return (
    <div className="App">
<<<<<<< HEAD
  <Router>
    <Navbar />
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route exact path={ROUTES.WRITER} component={MarkdownWriter} />
  </Router>
  {/* 
        <Navbar />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.ABOUT} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
       */}

=======
      <Navbar />
      <p>Welcome to Resumake, this is an app to help you on your developer journey. Within this editor you can use a mix of HTML,CSS & Markdown to help your resume presentation.</p>
      <MarkdownWriter />
>>>>>>> master
    </div >
  );
}

export default App;
