import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import RegisterPage from './pages/RegisterPage';
import TransferPage from './pages/TransferPage';
import UserAccountPage from './pages/UserAccountPage';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/edit-profile">
          <EditProfile />
        </Route>
      <Route path="/profile">
          <UserAccountPage />
        </Route>
      <Route path="/transfer">
            <TransferPage />
        </Route>
        <Route path="/account">
          <AccountPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
