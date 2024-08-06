import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SyncButton from './components/SyncButton';
import RepositoriesList from './components/RepositoriesList';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <SyncButton onSuccessSync={() => window.location.reload()} />
        <hr />
        <Navigation />
        <Routes>
          <Route path="/repositories" element={<RepositoriesList />} />
        </Routes>
      </div>
    </Router>
  );
}

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/repositories">Список репозиториев</Link>
      </li>
    </ul>
  </nav>
);


export default App;
