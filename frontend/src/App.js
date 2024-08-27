import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import Farmer from './component/Farmer';
import Buyer from './component/Buyer';

const App=()=>{
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/signup" element={<Signup  />} />
          <Route path="/farmer-dashboard" element={ <Farmer />} />
          <Route path="/buyer-dashboard" element={<Buyer />} />
        </Routes>
      </Router>
  );
}

export default App;
