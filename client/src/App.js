import './App.css';
import React from 'react';
import { Router } from '@reach/router';
import DisplayAll from './components/DisplayAll';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className='wrapper'>
      <Router>
        <Login path="/" />
        <Register path="/register" />
        {/* <DisplayAll /> */}
      </Router>
      <h1>Need cash? Listit!</h1>
    </div>
  );
}

export default App;
