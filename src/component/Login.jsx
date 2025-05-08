import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Building, Users, GraduationCap, ArrowLeft } from 'lucide-react';
import '../assets/css/login.css';

const AuthPage = () => {
  // States
  const [isAnimating, setIsAnimating] = useState(false);
  const [role, setRole] = useState('student');
  
  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Animation effect when component mounts
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

  // Form submission handler
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
    
    const loginDetails = loginType === 'email' 
      ? `Email: ${email}` 
      : `${username ? 'Username: ' + username : ''}${username && email ? ' / ' : ''}${email ? 'Email: ' + email : ''}`;
    
    alert(`Login attempted as ${role}\n${loginDetails}\nPassword: ${password.replace(/./g, '*')}`);
  };

  // Back button handler
  const handleBack = () => {
    alert("Going back to main page");
  };

  // Dynamic input field based on role
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
          
       
        </>
      );
    }
  };

  return (
    <div className={`login-container ${isAnimating ? 'animate' : ''}`}>
      {/* Back button */}
      <button onClick={handleBack} className="back-button">
      <ArrowLeft size={16} />
      <span>Back</span>
    </button>
      
      {/* Star background */}
      <div className="star-background">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>
      
      {/* Main container */}
      <div className={`card-container ${isAnimating ? 'animate' : ''}`}>
        
        {/* Card */}
        <div className={`login-card ${role}`}>
          
          {/* Header */}
          <div className={`card-header ${role}`}>
            <div className="icon-container">
              <RoleIcon size={32} />
            </div>
            <h2>{title}</h2>
          </div>
          
          {/* Role selector */}
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
          
          {/* Login Form */}
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
              className={`sign-in-button ${role}`}
            >
              Sign In
            </button>
          </div>
          
          {/* Footer */}
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