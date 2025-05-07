import { useState, useEffect } from 'react';
import './App.css'
import { GraduationCap, Users, Building, BookOpen, Star, Sparkles } from 'lucide-react';

export default function UltraDynamicSchoolAnimation() {
  const [animationPhase, setAnimationPhase] = useState(0);
  
  useEffect(() => {
    // Sequential animation timeline
    const timeline = [
      { phase: 1, delay: 1000 },  // Initial logo appear
      { phase: 2, delay: 2000 },  // Logo animation
      { phase: 3, delay: 1500 },  // Logo moves to header
      { phase: 4, delay: 500 },   // First card appears
      { phase: 5, delay: 400 },   // Second card appears
      { phase: 6, delay: 400 }    // Third card appears
    ];
    
    let currentDelay = 0;
    const timers = timeline.map(({ phase, delay }) => {
      currentDelay += delay;
      return setTimeout(() => setAnimationPhase(phase), currentDelay);
    });
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 min-h-screen relative w-full first-look">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Animated stars */}
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Blue cloud effects */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute rounded-full animate-pulse opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)',
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className={`transform transition-all duration-1000 ease-out ${
            animationPhase === 0 ? 'opacity-0 scale-50' :
            animationPhase === 1 ? 'opacity-100 scale-100' :
            animationPhase === 2 ? 'opacity-100 scale-110' : 
            'opacity-0 scale-150'
          }`}
        >
          {/* Logo */}
          <div className="relative h-64 w-64">
            {/* Building icon */}
            <div className={`absolute inset-0 transition-all duration-1000 ${animationPhase >= 2 ? 'scale-110' : 'scale-100'}`}>
              <Building size={220} className="text-blue-500/80" />
            </div>
            
            {/* Book icon overlay */}
            <div className={`absolute inset-0 transition-all duration-1000 ${animationPhase >= 2 ? 'opacity-80 scale-105' : 'opacity-0 scale-90'}`}>
              <BookOpen size={220} className="text-indigo-400/80" />
            </div>
            
            {/* Sparkling effects */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className={`absolute transition-all duration-500 ${animationPhase >= 2 ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 1}s`
                }}
              >
                <Star 
                  size={Math.random() * 15 + 10} 
                  className="text-yellow-300 animate-pulse" 
                  style={{animationDuration: `${Math.random() * 2 + 1}s`}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header Logo (after animation) */}
      <div 
        className={`absolute top-6 left-0 w-full flex justify-center transition-all duration-1000 ${
          animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
        }`}
      >
        <div className="flex items-center bg-indigo-800/30 px-6 py-2 rounded-full backdrop-blur-md shadow-lg border border-indigo-500/20">
          <Building size={32} className="text-blue-400" />
          <h1 className="text-2xl font-bold text-white ml-2">
            <span className="text-blue-300">SMART</span>
            <span className="text-white">SCHOOL</span>
          </h1>
          <Sparkles size={18} className="text-yellow-300 ml-2" />
        </div>
      </div>

      {/* Cards Container */}
      <div className="absolute inset-0 flex items-center justify-center mt-16">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Management Card */}
          <div 
            className={`w-72 h-96 relative transition-all duration-700 transform ${
              animationPhase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'
            }`}
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-900 shadow-lg shadow-blue-900/50 group">
              {/* Card background effects */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-white/5"></div>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-300/30 animate-pulse"></div>
                <div className="absolute bottom-40 right-10 w-16 h-16 rounded-full bg-blue-400/20 animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
                <div className="absolute top-40 right-20 w-10 h-10 rounded-full bg-blue-300/20 animate-pulse" style={{animationDuration: '2.5s'}}></div>
              </div>
              
              {/* Card content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="relative mb-6">
                  <Building 
                    size={90} 
                    className="text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building 
                      size={110} 
                      className="text-blue-200/30 animate-ping opacity-0 group-hover:opacity-70" 
                      style={{animationDuration: '2s'}} 
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-wider drop-shadow-lg">Management</h2>
                
                {/* Animated underline */}
                <div className="mt-3 h-1 bg-blue-400/50 w-0 group-hover:w-40 transition-all duration-700"></div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Teachers Card */}
          <div 
            className={`w-72 h-96 relative transition-all duration-700 transform ${
              animationPhase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'
            }`}
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-900 shadow-lg shadow-emerald-900/50 group">
              {/* Card background effects */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-white/5"></div>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-emerald-300/30 animate-pulse"></div>
                <div className="absolute bottom-40 right-10 w-16 h-16 rounded-full bg-emerald-400/20 animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
                <div className="absolute top-40 right-20 w-10 h-10 rounded-full bg-emerald-300/20 animate-pulse" style={{animationDuration: '2.5s'}}></div>
              </div>
              
              {/* Card content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="relative mb-6">
                  <Users 
                    size={90} 
                    className="text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users 
                      size={110} 
                      className="text-emerald-200/30 animate-ping opacity-0 group-hover:opacity-70" 
                      style={{animationDuration: '2s'}} 
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-wider drop-shadow-lg">Teachers</h2>
                
                {/* Animated underline */}
                <div className="mt-3 h-1 bg-emerald-400/50 w-0 group-hover:w-40 transition-all duration-700"></div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Students Card */}
          <div 
            className={`w-72 h-96 relative transition-all duration-700 transform ${
              animationPhase >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'
            }`}
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-purple-900 shadow-lg shadow-purple-900/50 group">
              {/* Card background effects */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-white/5"></div>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple-300/30 animate-pulse"></div>
                <div className="absolute bottom-40 right-10 w-16 h-16 rounded-full bg-purple-400/20 animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
                <div className="absolute top-40 right-20 w-10 h-10 rounded-full bg-purple-300/20 animate-pulse" style={{animationDuration: '2.5s'}}></div>
              </div>
              
              {/* Card content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="relative mb-6">
                  <GraduationCap 
                    size={90} 
                    className="text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap 
                      size={110} 
                      className="text-purple-200/30 animate-ping opacity-0 group-hover:opacity-70" 
                      style={{animationDuration: '2s'}} 
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-wider drop-shadow-lg">Students</h2>
                
                {/* Animated underline */}
                <div className="mt-3 h-1 bg-purple-400/50 w-0 group-hover:w-40 transition-all duration-700"></div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}