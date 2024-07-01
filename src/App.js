import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import GameSelection from './components/gameSelection/GameSelection';
import PicasYFijas from './components/picasFijas/PicasYFijas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game-selection" element={<GameSelection />} />
        <Route path="/picas-y-fijas" element={<PicasYFijas />} />
      </Routes>
    </Router>
  );
};

export default App;



