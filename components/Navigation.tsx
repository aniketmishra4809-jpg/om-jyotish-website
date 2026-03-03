import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Home, ShoppingBag, FileText, Calculator, Users, MessageCircle, Briefcase, Info, Menu, X, ChevronRight } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
const location = useLocation();

  // Reordered navItems: 'About' is now second in the list
  const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/about', label: 'About', icon: Info },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/kundli', label: 'Kundli', icon: FileText },
  { path: '/matching', label: 'Matching', icon: Users },
  { path: '/tools', label: 'Tools', icon: Calculator },
  { path: '/shop', label: 'Shop', icon: ShoppingBag },
  { path: '/chat', label: 'Chat', icon: MessageCircle },
];

  const handleNavClick = (path: string) => {
  navigate(path);
  setIsMenuOpen(false);
};

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-amber-200 bg-white/95 backdrop-blur-md shadow-sm h-20 transition-all duration-300">
        {/* Container adjusted to max-w-full to push items to absolute corners */}
        <div className="max-w-full mx-auto px-6 md:px-10 h-full flex justify-between items-center">
          {/* Logo Section - Top Left */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('/')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-600 to-rose-700 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-amber-500/30">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold font-serif tracking-widest text-rose-900 leading-none group-hover:text-amber-700 transition-colors">OM JYOTISH</span>
                <span className="text-xs text-amber-600 tracking-[0.3em] font-semibold">KENDRA</span>
            </div>
          </div>

          {/* Hamburger Menu Button - Top Right */}
          <button 
            className="p-2 -mr-2 text-rose-900 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none flex items-center gap-2 group"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
          >
            <span className="hidden md:block text-sm font-bold uppercase tracking-wider text-rose-800 group-hover:text-rose-900">Menu</span>
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Side Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in" 
             onClick={() => setIsMenuOpen(false)}
           ></div>

           {/* Menu Panel */}
           <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col animate-slide-in-right border-l border-amber-100">
             
             {/* Header */}
             <div className="flex justify-between items-center p-6 border-b border-rose-50">
                <span className="text-lg font-serif font-bold text-rose-900">Navigation</span>
                <button 
                  className="p-2 text-rose-400 hover:text-rose-900 hover:bg-rose-50 rounded-full transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
             </div>

             {/* Links */}
             <div className="flex-1 overflow-y-auto py-4">
               {navItems.map((item) => {
                 const isActive = location.pathname === item.path;
                 const Icon = item.icon;
                 return (
                   <button
                     key={item.path}
                     onClick={() => handleNavClick(item.path)}
                     className={`w-full flex items-center justify-between px-6 py-4 transition-all border-l-4 ${
                       isActive 
                         ? 'bg-rose-50 border-amber-500 text-rose-900' 
                         : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-rose-800'
                     }`}
                   >
                     <div className="flex items-center gap-4">
                       <Icon className={`w-5 h-5 ${isActive ? 'text-amber-600' : 'text-gray-400'}`} />
                       <span className={`text-base font-medium ${isActive ? 'font-bold' : ''}`}>
                         {item.label}
                       </span>
                     </div>
                     {isActive && <ChevronRight className="w-4 h-4 text-amber-500" />}
                   </button>
                 );
               })}
             </div>

             {/* Footer Info */}
             <div className="p-6 bg-rose-50 border-t border-rose-100 text-center">
                <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Om Jyotish Kendra</p>
                <p className="text-[10px] text-rose-800 opacity-60">
                  © {new Date().getFullYear()} All Rights Reserved.
                </p>
             </div>
           </div>
        </div>
      )}
    </>
  );
};

export default Navigation;