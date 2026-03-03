import React from 'react';
import { AppView } from '../types';
import { Sparkles } from 'lucide-react';

interface SectionProps {
  onNavigate: (view: AppView) => void;
}

export const ShopTeaser: React.FC<SectionProps> = ({ onNavigate }) => (
  <section className="py-24 px-4 relative overflow-hidden bg-rose-900 mt-12">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
    <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <h2 className="text-4xl md:text-5xl font-serif text-amber-50">Powerful Ratnas for <br/> <span className="text-amber-400">Graha Shanti</span></h2>
        <p className="text-rose-100 text-lg leading-relaxed font-light opacity-90 max-w-2xl mx-auto">
          Enhance your aura with our curated collection of energized gemstones. 
          Find the perfect crystal to balance your chakras and appease the planets.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => onNavigate(AppView.Shop)}
            className="px-8 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-400 transition-colors shadow-lg hover:shadow-amber-500/50"
          >
            Visit Gem Store
          </button>
        </div>
    </div>
  </section>
);

export const Footer: React.FC<SectionProps> = ({ onNavigate }) => (
  <footer className="bg-rose-950 text-rose-100 py-12 px-4 border-t border-rose-900/50">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-4">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-rose-600 rounded-full flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-serif tracking-wider text-amber-100">OM JYOTISH KENDRA</span>
          </div>
          <p className="text-rose-300 text-sm">Illuminating your path with the light of Vedic wisdom.</p>
          <p className="text-rose-400 text-xs">Pitampura, Delhi - 110034</p>
      </div>
      
      <div>
        <h4 className="text-amber-400 font-bold mb-4 font-serif">Quick Links</h4>
        <ul className="space-y-2 text-sm text-rose-200">
          <li onClick={() => onNavigate(AppView.Horoscope)} className="hover:text-white cursor-pointer transition-colors">Rashifal</li>
          <li onClick={() => onNavigate(AppView.FreeKundli)} className="hover:text-white cursor-pointer transition-colors">Janam Kundli</li>
          <li onClick={() => onNavigate(AppView.KundliMatching)} className="hover:text-white cursor-pointer transition-colors">Match Making</li>
          <li onClick={() => onNavigate(AppView.Shop)} className="hover:text-white cursor-pointer transition-colors">Gem Store</li>
        </ul>
      </div>

      <div>
        <h4 className="text-amber-400 font-bold mb-4 font-serif">Legal</h4>
        <ul className="space-y-2 text-sm text-rose-200">
          <li onClick={() => onNavigate(AppView.About)} className="hover:text-white cursor-pointer transition-colors">About Us</li>
          <li onClick={() => onNavigate(AppView.PrivacyPolicy)} className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
          <li onClick={() => onNavigate(AppView.TermsConditions)} className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-rose-900 text-center text-rose-400 text-xs">
      © {new Date().getFullYear()} Om Jyotish Kendra. All Rights Reserved.
    </div>
  </footer>
);