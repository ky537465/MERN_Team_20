import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" element={<LoginPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
