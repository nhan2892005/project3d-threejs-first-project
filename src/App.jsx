import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Earthmoon from './components/Templates/Earthmoon.jsx';
import BigDataClub from './components/Templates/BigDataClub.jsx';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <HashRouter>
        <Routes>
          <Route path="/" exact element={<Home />} /> 
          <Route path="/earth-and-moon" exact element={<Earthmoon />} />
        </Routes>
    </HashRouter>
  );
};

export default App;