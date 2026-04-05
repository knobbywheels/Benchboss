import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GamePage } from './pages/GamePage';
import { RosterPage } from './pages/RosterPage';
import { StatsPage } from './pages/StatsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/roster" element={<RosterPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
