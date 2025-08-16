import React from 'react';

export const MagicalBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating magical particles */}
      <div className="absolute top-20 left-[10%] w-2 h-2 bg-accent rounded-full animate-sparkleflow opacity-60" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-primary rounded-full animate-sparkleflow opacity-40" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 left-[20%] w-1 h-1 bg-accent-glow rounded-full animate-sparkleflow opacity-50" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-60 left-[60%] w-2.5 h-2.5 bg-primary-glow rounded-full animate-sparkleflow opacity-30" style={{ animationDelay: '6s' }}></div>
      <div className="absolute bottom-20 right-[30%] w-1.5 h-1.5 bg-accent rounded-full animate-sparkleflow opacity-45" style={{ animationDelay: '1s' }}></div>
      
      {/* Twinkling stars */}
      <div className="absolute top-[15%] left-[25%] text-2xl animate-startwinkle opacity-50" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute top-[40%] right-[10%] text-xl animate-startwinkle opacity-40" style={{ animationDelay: '1.5s' }}>⭐</div>
      <div className="absolute bottom-[30%] left-[15%] text-lg animate-startwinkle opacity-35" style={{ animationDelay: '2.5s' }}>✨</div>
      <div className="absolute top-[70%] left-[70%] text-2xl animate-startwinkle opacity-45" style={{ animationDelay: '3.5s' }}>🌟</div>
      <div className="absolute bottom-[15%] right-[20%] text-xl animate-startwinkle opacity-40" style={{ animationDelay: '4.5s' }}>✨</div>
      
      {/* Dreamy clouds/mist effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-gradient-to-r from-accent/10 to-transparent blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[30%] right-[-10%] w-80 h-80 rounded-full bg-gradient-to-l from-primary/8 to-transparent blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[60%] left-[20%] w-64 h-64 rounded-full bg-gradient-to-br from-accent-glow/12 to-transparent blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};