import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/register" element={<Register/>}></Route>
          <Route exact path="/products/home" element={<DisplayAll/>}></Route>
          <Route exact path="/products/new" element={<CreateProduct/>}></Route>
          <Route exact path="/product/:id" element={<DisplayOne/>}></Route>
          <Route exact path="/product/edit/:id" element={<EditProduct/>}></Route>
          <Route exact path="/users/:userId" element={<Profile/>}></Route>
        </Routes>
      </Router>
      <h1>Need cash? Listit!</h1>
    </div>
  );
}

export default App;
