import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Earthmoon from './components/Templates/Earthmoon.jsx';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/earth-and-moon" element={<Earthmoon />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;