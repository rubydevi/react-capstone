import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import React from 'react';
import HomePage from './components/HomePage';
import DetailsPage from './components/DetailsPage';
import Nav from './components/Nav';

const App = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:pokemonName" element={<DetailsPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
