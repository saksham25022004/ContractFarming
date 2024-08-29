import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Farmer from './Farmer';
import Buyer from './Buyer';

const Body = () => {
  return (
    <div>
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/signup" element={<Signup  />} />
          <Route path="/farmer-dashboard" element={ <Farmer />} />
          <Route path="/buyer-dashboard" element={<Buyer />} />
        </Routes>
      </Router>
    </div>
  )
}

export default Body;