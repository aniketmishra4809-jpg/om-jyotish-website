import React from 'react';
import { AppView } from '../types';
import { ArrowRight, Star, Compass, Users, Sparkles, Sun, Phone, MapPin, Clock, User, MessageCircle } from 'lucide-react';
import { Footer, ShopTeaser } from './PageSections';

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

const Home: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full text-rose-950">
      {/* SECTION 1: HERO */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
        <div className="animate-fade-in-up z-10 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/60 border border-amber-500/30 mb-8 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <Sun className="w-5 h-5 text-amber-500 animate-spin-slow" />
            <span className="text-sm font-bold text-amber-800 tracking-wide uppercase">Om Jyotish Kendra</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-700 via-amber-600 to-rose-700 mb-8 drop-shadow-sm leading-[1.1] tracking-tight">
            Discover Your <br/>Vedic Destiny
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-rose-900/80 mb-12 leading-relaxed font-medium">
            Unlock the secrets of the cosmos with professional Indian Astrology. Accurate Janam Kundli, Gun Milan, and daily guidance powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate(AppView.FreeKundli)}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold hover:shadow-xl hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-orange-400"
            >
              Get Free Kundli <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate(AppView.Horoscope)}
              className="px-8 py-4 bg-white text-rose-900 border border-rose-200 rounded-full font-bold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Daily Horoscope
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES */}
      <section className="py-24 px-4 bg-white/40 relative border-t border-rose-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-rose-900 mb-4 drop-shadow-sm">Divine Services</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-rose-500 to-amber-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div onClick={() => onNavigate(AppView.Horoscope)} className="group cursor-pointer glass-panel p-8 rounded-2xl border-white/60 bg-white hover:border-amber-400 transition-all hover:-translate-y-2 shadow-lg">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-inner">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif text-rose-900 mb-3 font-bold">Rashifal</h3>
              <p className="text-rose-800/70 text-sm leading-relaxed">Daily planetary guidance. Personalized insights for love, wealth, and health based on your Rashi.</p>
            </div>

            <div onClick={() => onNavigate(AppView.KundliMatching)} className="group cursor-pointer glass-panel p-8 rounded-2xl border-white/60 bg-white hover:border-rose-400 transition-all hover:-translate-y-2 shadow-lg">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-6 text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors shadow-inner">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif text-rose-900 mb-3 font-bold">Gun Milan</h3>
              <p className="text-rose-800/70 text-sm leading-relaxed">Detailed Vedic compatibility analysis for marriage. Check Manglik Dosha and Guna score.</p>
            </div>

            <div onClick={() => onNavigate(AppView.FreeKundli)} className="group cursor-pointer glass-panel p-8 rounded-2xl border-white/60 bg-white hover:border-orange-400 transition-all hover:-translate-y-2 shadow-lg">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-inner">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif text-rose-900 mb-3 font-bold">Janam Kundli</h3>
              <p className="text-rose-800/70 text-sm leading-relaxed">Your Vedic birth chart. Discover your Lagna, Nakshatra, and the planetary positions at birth.</p>
            </div>

            <div onClick={() => onNavigate(AppView.AIChat)} className="group cursor-pointer glass-panel p-8 rounded-2xl border-white/60 bg-white hover:border-purple-400 transition-all hover:-translate-y-2 shadow-lg">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-colors shadow-inner">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif text-rose-900 mb-3 font-bold">Astrologer AI</h3>
              <p className="text-rose-800/70 text-sm leading-relaxed">Chat with our AI Pandit Ji. Get instant spiritual answers to your life's deepest questions.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION 3: ASTROLOGER DETAILS */}
      <section className="py-20 px-4">
         <div className="max-w-5xl mx-auto glass-panel p-8 md:p-12 rounded-2xl bg-gradient-to-b from-white to-rose-50/50 shadow-xl border border-rose-100">
             <div className="text-center mb-10">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Connect Directly</span>
                <h2 className="text-3xl md:text-4xl font-serif text-rose-900 mb-4">Consult Pundit Vijay Mishra</h2>
                <p className="text-gray-600">30+ Years of Experience in Vedic Astrology</p>
             </div>

             <div className="grid md:grid-cols-3 gap-8">
                 {/* Address */}
                 <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
                       <MapPin className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-rose-900 mb-2 font-serif">Visit Office</h3>
                    <p className="text-sm text-gray-600 leading-relaxed px-4">
                       262, 2nd Floor, CD Block,<br/>
                       Agarwal Complex, Pitampura,<br/>
                       Delhi - 110034
                    </p>
                 </div>

                 {/* Phone */}
                 <div className="flex flex-col items-center text-center group relative">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                       <Phone className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-rose-900 mb-2 font-serif">Call Now</h3>
                    <p className="text-lg font-bold text-rose-800 font-mono mb-1">9910216477</p>
                    <p className="text-lg font-bold text-rose-800 font-mono">9213343971</p>
                 </div>

                 {/* Timings */}
                 <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                       <Clock className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-rose-900 mb-2 font-serif">Opening Hours</h3>
                    <p className="text-sm text-gray-600 mb-1">
                       12:00 PM - 06:00 PM
                    </p>
                    <span className="text-xs text-rose-400 font-medium italic">Book appointment before visiting</span>
                 </div>
             </div>
             
             <div className="mt-10 text-center">
                 <a 
                   href="https://wa.me/919910216477"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-green-600/30"
                 >
                    <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                 </a>
             </div>
         </div>
      </section>

      <ShopTeaser onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Home;