import React from 'react';
// import './StatisticsPage.css';

const StatisticsPage = ({ urls }) => (
  <div className="stats-container">
    <h2>URL Statistics</h2>
    {urls.map((url, i) => (
      <div key={i} className="card">
        <p><strong>Original:</strong> {url.original}</p>
        <p><strong>Short:</strong> http://localhost:3000/{url.short}</p>
        <p><strong>Created:</strong> {url.createdAt}</p>
        <p><strong>Expires:</strong> {url.expiresAt}</p>
        <p><strong>Clicks:</strong> {url.clicks.length}</p>
      </div>
    ))}
  </div>
);

export default StatisticsPage;
