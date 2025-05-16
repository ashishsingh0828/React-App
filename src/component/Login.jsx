import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Building, Users, GraduationCap, ArrowLeft } from 'lucide-react';
import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [role, setRole] = useState('student');
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getRoleInfo = () => {
    switch(role) {
      case 'management':
        return {
          icon: Building,
          title: 'Management Login',
          loginType: 'email'
        };
      case 'teacher':
        return {
          icon: Users,
          title: 'Teacher Login',
          loginType: 'both'
        };
      case 'student':
        return {
          icon: GraduationCap,
          title: 'Student Login',
          loginType: 'both'
        };
      default:
        return {
          icon: User,
          title: 'Login',
          loginType: 'both'
        };
    }
  };

  const { icon: RoleIcon, title, loginType } = getRoleInfo();

  const handleLogin = () => {
    if (loginType === 'email' && !email) {
      alert("Email is required for management login!");
      return;
    }
    
    if (loginType === 'both' && !username && !email) {
      alert("Either username or email is required!");
      return;
    }
    
    if (!password) {
      alert("Password is required!");
      return;
    }
    
    // In a real application, you would verify credentials here
    // For now, we'll just navigate to the appropriate dashboard
    
    // Navigate to the appropriate dashboard based on role
    switch(role) {
      case 'management':
        navigate('/management');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      case 'student':
        navigate('/student');
        break;
      default:
        navigate('/');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const renderIdentifierField = () => {
    if (loginType === 'email') {
      return (
        <div className="input-container">
          <div className="input-icon">
            <Mail size={18} />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      );
    } else {
      return (
        <>
          <div className="input-container">
            <div className="input-icon">
              <User size={18} />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="input-container">
            <div className="input-icon">
              <Mail size={18} />
            </div>
            <input
              type="email"
              placeholder="Email Address (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className={`login-container ${isAnimating ? 'animate' : ''}`}>
       <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
       {/* Animated stars */}
       <div className="night">
  {/* Shooting Stars */}
  {Array.from({ length: 20 }).map((_, i) => (
    <div key={`shooting-${i}`} className="shooting_star" />
  ))}

  {/* Twinkling Stars */}
  {Array.from({ length: 80 }).map((_, i) => {
    const size = Math.random() * 3 + 1;
    return (
      <div
        key={`star-${i}`}
        className="star"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 30 + 10}s`,
          animationDelay: `${Math.random() * 10}s`,
        }}
      />
    );
  })}
</div>

      
      <button onClick={handleBack} className="back-button " style={{position:'absolute'}}>
        <ArrowLeft size={16} />
        <span>Back </span>
      </button>
      
     
      
      <div className={`card-container ${isAnimating ? 'animate' : ''}`}>
        <div className={`login-card ${role}`}>
          <div className={`card-header ${role}`}>
            <div className="icon-container">
              <RoleIcon size={32} />
            </div>
            <h2>{title}</h2>
          </div>
          
          <div className="role-selector">
            <button 
              onClick={() => setRole('student')} 
              className={`role-button ${role === 'student' ? 'active' : ''}`}
            >
              <GraduationCap size={20} />
              <span>Student</span>
            </button>
            <button 
              onClick={() => setRole('teacher')} 
              className={`role-button ${role === 'teacher' ? 'active' : ''}`}
            >
              <Users size={20} />
              <span>Teacher</span>
            </button>
            <button 
              onClick={() => setRole('management')} 
              className={`role-button ${role === 'management' ? 'active' : ''}`}
            >
              <Building size={20} />
              <span>Management</span>
            </button>
          </div>
          
          <div className="login-form">
            {renderIdentifierField()}
            
            <div className="input-container">
              <div className="input-icon">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <button 
                className="forgot-password"
                onClick={() => alert("Password reset functionality")}
              >
                Forgot password?
              </button>
            </div>
            
            <button
              onClick={handleLogin}
              className={`sign-in-button text-white ${role}` }
            >
              Sign In
            </button>
          </div>
          
          <div className="card-footer">
            <p>
              © {new Date().getFullYear()} Education Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;