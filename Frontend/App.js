import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import Dashboard from './Dashboard'; 
import Checkout from './Checkout'; 

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
