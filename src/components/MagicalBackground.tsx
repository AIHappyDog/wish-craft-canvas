import React from 'react';

export const MagicalBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Main dreamy background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50"></div>
      
      {/* Disney "Wish" inspired dreamy layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/30 via-blue-200/20 to-indigo-300/25"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-100/40 via-purple-100/30 to-indigo-200/35"></div>
      
      {/* Floating magical particles with Disney "Wish" colors */}
      <div className="absolute top-20 left-[10%] w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-sparkleflow opacity-70" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-sparkleflow opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 left-[20%] w-1 h-1 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full animate-sparkleflow opacity-80" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-60 left-[60%] w-2.5 h-2.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-sparkleflow opacity-50" style={{ animationDelay: '6s' }}></div>
      <div className="absolute bottom-20 right-[30%] w-1.5 h-1.5 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full animate-sparkleflow opacity-65" style={{ animationDelay: '1s' }}></div>
      
      {/* Enhanced twinkling stars with Disney "Wish" magic */}
      <div className="absolute top-[15%] left-[25%] text-3xl animate-startwinkle opacity-80" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute top-[40%] right-[10%] text-2xl animate-startwinkle opacity-70" style={{ animationDelay: '1.5s' }}>⭐</div>
      <div className="absolute bottom-[30%] left-[15%] text-xl animate-startwinkle opacity-75" style={{ animationDelay: '2.5s' }}>✨</div>
      <div className="absolute top-[70%] left-[70%] text-3xl animate-startwinkle opacity-65" style={{ animationDelay: '3.5s' }}>🌟</div>
      <div className="absolute bottom-[15%] right-[20%] text-2xl animate-startwinkle opacity-70" style={{ animationDelay: '4.5s' }}>✨</div>
      
      {/* Additional magical stars for more Disney "Wish" feeling */}
      <div className="absolute top-[25%] left-[45%] text-lg animate-startwinkle opacity-60" style={{ animationDelay: '0.8s' }}>💫</div>
      <div className="absolute top-[55%] left-[80%] text-xl animate-startwinkle opacity-55" style={{ animationDelay: '2.8s' }}>✨</div>
      <div className="absolute bottom-[45%] right-[45%] text-lg animate-startwinkle opacity-65" style={{ animationDelay: '3.8s' }}>⭐</div>
      
      {/* Dreamy clouds/mist effect with Disney "Wish" colors */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-gradient-to-r from-purple-200/20 via-blue-200/15 to-indigo-200/10 blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[30%] right-[-10%] w-80 h-80 rounded-full bg-gradient-to-l from-blue-200/18 via-purple-200/12 to-indigo-200/15 blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[60%] left-[20%] w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200/20 via-purple-200/15 to-blue-200/12 blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Additional dreamy layers */}
        <div className="absolute top-[10%] right-[30%] w-72 h-72 rounded-full bg-gradient-to-bl from-purple-200/15 via-blue-200/10 to-indigo-200/18 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[20%] left-[60%] w-56 h-56 rounded-full bg-gradient-to-tr from-blue-200/12 via-indigo-200/15 to-purple-200/10 blur-2xl animate-float" style={{ animationDelay: '4.5s' }}></div>
      </div>
      
      {/* Subtle aurora-like effect for extra dreaminess */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-[15%] left-0 w-full h-32 bg-gradient-to-r from-transparent via-purple-200/10 to-transparent blur-xl"></div>
        <div className="absolute top-[45%] left-0 w-full h-24 bg-gradient-to-r from-transparent via-blue-200/8 to-transparent blur-xl"></div>
        <div className="absolute top-[75%] left-0 w-full h-28 bg-gradient-to-r from-transparent via-indigo-200/12 to-transparent blur-xl"></div>
      </div>
    </div>
  );
};