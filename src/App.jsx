import { useState, useEffect } from 'react';
import { GraduationCap, Users, Building, BookOpen, Star, Sparkles } from 'lucide-react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from 'c:/Ashish/my-react-app/src/component/login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

// HomePage component (extracted from original App component)
function HomePage() {
  const [animationPhase, setAnimationPhase] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timeline = [
      { phase: 1, delay: 1000 },
      { phase: 2, delay: 2000 },
      { phase: 3, delay: 1500 },
      { phase: 4, delay: 500 },
      { phase: 5, delay: 400 },
      { phase: 6, delay: 400 }
    ];

    let currentDelay = 0;
    const timers = timeline.map(({ phase, delay }) => {
      currentDelay += delay;
      return setTimeout(() => setAnimationPhase(phase), currentDelay);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Handler for card clicks - directs to login page
  const handleCardClick = () => {
    navigate('/login');
  };

  return (
    <div className="app-container">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="animated-background">
        {/* Animated stars */}
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              width: `${Math.random() * 20 + 1}px`,
              height: `${Math.random() * 20 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 50 + 2}s`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}


        {/* Blue cloud effects */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="cloud"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 4}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Logo Animation */}
      <div className="logo-container">
        <div className={`main-logo ${animationPhase === 0 ? 'logo-hidden' :
            animationPhase === 1 ? 'logo-visible' :
              animationPhase === 2 ? 'logo-expanded' :
                'logo-disappeared'
          }`}>
          {/* Logo */}
          <div className="logo-wrapper">
            {/* Building icon */}
            <div className={`building-icon ${animationPhase >= 2 ? 'icon-expanded' : ''}`}>
              <Building size={220} className="text-blue-500/80" />
            </div>

            {/* Book icon overlay */}
            <div className={`book-icon ${animationPhase >= 2 ? 'book-visible' : ''}`}>
              <BookOpen size={220} className="text-indigo-400/80" />
            </div>

            {/* Sparkling effects */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className={`sparkle ${animationPhase >= 2 ? 'sparkle-visible' : ''}`}
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 1}s`
                }}
              >
                <Star
                  size={Math.random() * 15 + 10}
                  className="sparkle-star"
                  style={{ animationDuration: `${Math.random() * 2 + 1}s` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header Logo (after animation) */}
      <div className={`header-logo ${animationPhase >= 3 ? 'header-visible' : ''}`}>
        <div className="header-container">
          <Building size={32} className="header-icon" />
          <h1 className="header-title">
            <span className="header-smart">SMART</span>
            <span className="header-school">SCHOOL</span>
          </h1>
          <Sparkles size={18} className="header-sparkle" />
        </div>
      </div>

      {/* Cards Container */}
      <div className="cards-section">
        <div className="cards-container">
          {/* Management Card */}
          <div
            className={`card-wrapper ${animationPhase >= 4 ? 'card-visible' : ''}`}
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="card card-blue">

              <div className="card-highlight"></div>
              <div className="card-bubbles">
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
              </div>

              <div className="card-content">
                <div className="icon-container">
                  <Building size={90} className="card-icon" />
                  <div className="icon-effect">
                    <Building size={110} className="icon-ping" />
                  </div>
                </div>
                <h2 className="card-title">Management</h2>

                <div className="card-underline"></div>
              </div>


              <div className="card-overlay"></div>
            </div>
          </div>

          {/* Teachers Card */}
          <div
            className={`card-wrapper ${animationPhase >= 5 ? 'card-visible' : ''}`}
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="card card-green">
              <div className="card-highlight"></div>
              <div className="card-bubbles">
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
              </div>

              {/* Card content */}
              <div className="card-content">
                <div className="icon-container">
                  <Users size={90} className="card-icon" />
                  <div className="icon-effect">
                    <Users size={110} className="icon-ping icon-ping-green" />
                  </div>
                </div>
                <h2 className="card-title">Teachers</h2>

                <div className="card-underline card-underline-green"></div>
              </div>

              <div className="card-overlay card-overlay-green"></div>
            </div>
          </div>

          {/* Students Card */}
          <div
            className={`card-wrapper ${animationPhase >= 6 ? 'card-visible' : ''}`}
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="card card-purple">
              {/* Card background effects */}
              <div className="card-highlight"></div>
              <div className="card-bubbles">
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
              </div>

              {/* Card content */}
              <div className="card-content">
                <div className="icon-container">
                  <GraduationCap size={90} className="card-icon" />
                  <div className="icon-effect">
                    <GraduationCap size={110} className="icon-ping icon-ping-purple" />
                  </div>
                </div>
                <h2 className="card-title">Students</h2>

                <div className="card-underline card-underline-purple"></div>
              </div>

              <div className="card-overlay card-overlay-purple"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;