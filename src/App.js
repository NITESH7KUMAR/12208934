import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import URLShortener from './components/URLShortener';
import StatisticsPage from './components/StatisticsPage';
import RedirectPage from './components/RedirectHandler';
import './App.css';

const App = () => {
  const [urls, setUrls] = useState([]);

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Shorten URLs</Link>
        <Link to="/stats" className="nav-link">Statistics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<URLShortener urls={urls} setUrls={setUrls} />} />
        <Route path="/stats" element={<StatisticsPage urls={urls} />} />
        <Route path="/:shortcode" element={<RedirectPage urls={urls} />} />
      </Routes>
    </Router>
  );
};

export default App;
