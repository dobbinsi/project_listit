import './App.css';
import React from 'react';
import { Router } from '@reach/router';
import DisplayAll from './components/DisplayAll';
import Login from './components/Login';
import Register from './components/Register';
import CreateProduct from './components/CreateProduct';
import DisplayOne from './components/DisplayOne';
import EditProduct from './components/EditProduct';
import Profile from './components/Profile';


function App() {
  return (
    <div className='wrapper'>
      <Router>
        <Login path="/" />
        <Register path="/register" />
        <DisplayAll path="/products/home" />
        <CreateProduct path="/products/new" />
        <DisplayOne path="/product/:id"/>
        <EditProduct path="/product/edit/:id"/>
        <Profile path="/users/:userId"/>
      </Router>
      <h1>Need cash? Listit!</h1>
    </div>
  );
}

export default App;
