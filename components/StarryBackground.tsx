import React from 'react';

const StarryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-orange-50">
      {/* Rich Warm Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-100 via-orange-50 to-rose-50 opacity-80"></div>
      
      {/* Decorative Mandala Circles (CSS Simulated) */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] border-[40px] border-orange-200/20 rounded-full mandala-spin opacity-40"></div>
      <div className="absolute top-[-10%] left-[0%] w-[600px] h-[600px] border-[2px] border-dashed border-amber-400/20 rounded-full mandala-spin opacity-30" style={{ animationDirection: 'reverse' }}></div>
      
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] border-[40px] border-rose-200/20 rounded-full mandala-spin opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[0%] w-[600px] h-[600px] border-[2px] border-dashed border-rose-400/20 rounded-full mandala-spin opacity-30" style={{ animationDirection: 'reverse' }}></div>

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: 'radial-gradient(#f59e0b 2px, transparent 2px)', 
             backgroundSize: '80px 80px',
             backgroundPosition: '0 0'
           }}>
      </div>
      
      {/* Warm Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default StarryBackground;