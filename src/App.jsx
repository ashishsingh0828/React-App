import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import College from './Component/College.jsx';

import './App.css';

// Simple HomePage component
function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Education Hub</h1>
      <p>This is the home page</p>
      <div className="link-container">
        <Link to="/college" className="nav-link">
          Go to College
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/college/*" element={<College />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;