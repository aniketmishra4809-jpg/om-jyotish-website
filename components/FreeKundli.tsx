import React, { useState } from 'react';
import { VedicKundliData, AppView } from '../types';
import { getVedicKundli } from '../services/geminiService';
import { Loader2, FileText, Moon, Sun, MapPin, MessageCircle, Star, Compass, ShieldCheck } from 'lucide-react';
import { Footer, ShopTeaser } from './PageSections';

interface FreeKundliProps {
  onNavigate?: (view: AppView) => void;
}

const FreeKundli: React.FC<FreeKundliProps> = ({ onNavigate = () => {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    place: ''
  });
  const [result, setResult] = useState<VedicKundliData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time || !formData.place) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await getVedicKundli(formData.name, formData.date, formData.time, formData.place);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-rose-900 mb-4 drop-shadow-sm">Free Janam Kundli</h2>
          <p className="text-rose-800/80 font-medium max-w-2xl mx-auto">Generate your Vedic Birth Chart immediately. For a deep manual analysis by our experts, use the personalized service below.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          {/* Form Section */}
          <div className={`glass-panel p-8 rounded-2xl border-white/50 bg-white/70 shadow-xl lg:col-span-${result ? '4' : '12'} transition-all duration-500`}>
            <h3 className="text-xl font-serif text-rose-900 mb-6 border-b border-rose-100 pb-2">Enter Birth Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white border border-rose-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 shadow-sm"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-white border border-rose-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 shadow-sm"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">Time</label>
                  <input
                    type="time"
                    required
                    className="w-full bg-white border border-rose-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 shadow-sm"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">Place of Birth</label>
                <input
                  type="text"
                  required
                  placeholder="City, Country"
                  className="w-full bg-white border border-rose-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 shadow-sm"
                  value={formData.place}
                  onChange={e => setFormData({...formData, place: e.target.value})}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-900 hover:bg-rose-800 text-white font-serif font-bold py-4 rounded-lg shadow-lg shadow-rose-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? <><Loader2 className="animate-spin" /> Calculating...</> : 'Get Free AI Kundli'}
              </button>
            </form>

            {/* Personalized Service CTA */}
            <div className="mt-8 pt-6 border-t border-rose-200 text-center">
              <p className="text-sm text-rose-800 mb-4 font-medium">Need a detailed manual reading by Pandit Ji?</p>
              <a 
                href="https://wa.me/919910216477?text=Namaste, I am interested in getting a Personalized Kundli Analysis."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> Personalised Kundli
              </a>
            </div>
          </div>

          {/* Result Section */}
          {result && (
            <div className="lg:col-span-8 animate-fade-in space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-panel bg-white p-6 rounded-xl border-t-4 border-t-amber-500 text-center shadow-md">
                  <Moon className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-xs text-rose-500 font-bold uppercase tracking-widest">Rashi (Moon Sign)</div>
                  <div className="text-2xl font-serif text-rose-900 mt-1">{result.rashi}</div>
                </div>
                <div className="glass-panel bg-white p-6 rounded-xl border-t-4 border-t-rose-500 text-center shadow-md">
                  <Sun className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                  <div className="text-xs text-rose-500 font-bold uppercase tracking-widest">Nakshatra</div>
                  <div className="text-2xl font-serif text-rose-900 mt-1">{result.nakshatra}</div>
                </div>
                <div className="glass-panel bg-white p-6 rounded-xl border-t-4 border-t-purple-500 text-center shadow-md">
                  <MapPin className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-xs text-rose-500 font-bold uppercase tracking-widest">Lagna (Ascendant)</div>
                  <div className="text-2xl font-serif text-rose-900 mt-1">{result.lagna}</div>
                </div>
              </div>

              <div className="glass-panel bg-white/80 p-8 rounded-2xl border border-rose-100 shadow-lg">
                <h3 className="text-2xl font-serif text-rose-900 mb-6 border-b border-rose-100 pb-4">Planetary Positions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {result.planetaryPositions.map((pos, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100">
                      <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                      <span className="text-rose-900 font-medium text-sm">{pos}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel bg-white/80 p-8 rounded-2xl border border-rose-100 shadow-lg">
                <h3 className="text-2xl font-serif text-rose-900 mb-4">Life Prediction</h3>
                <p className="text-gray-700 leading-relaxed text-lg font-light">{result.lifePrediction}</p>
              </div>
            </div>
          )}
        </div>

        {/* --- Content Added Below Form --- */}

        {/* Features Row */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 text-center">
           <div className="glass-panel p-6 rounded-xl bg-white/60">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-rose-900 mb-2">Vedic Accuracy</h3>
              <p className="text-rose-800/70 text-sm">Calculations based on ancient Surya Siddhanta and Drik Ganita.</p>
           </div>
           <div className="glass-panel p-6 rounded-xl bg-white/60">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-rose-900 mb-2">100% Private</h3>
              <p className="text-rose-800/70 text-sm">Your birth data is processed securely and never shared with third parties.</p>
           </div>
           <div className="glass-panel p-6 rounded-xl bg-white/60">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-rose-900 mb-2">Life Guidance</h3>
              <p className="text-rose-800/70 text-sm">Understand your career path, relationship potential, and health.</p>
           </div>
        </div>

        {/* Detailed Explanation Section */}
        <div className="glass-panel rounded-2xl overflow-hidden shadow-xl mb-12">
           <div className="bg-rose-900 p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif text-amber-100 mb-6">Your Cosmic Blueprint</h2>
                <p className="text-rose-200 text-lg leading-relaxed max-w-3xl mx-auto">
                  A Janam Kundli (Birth Chart) is not just a chart; it is a map of the universe at the exact moment you took your first breath. It reveals the position of planets in the 12 houses of your life, influencing everything from your personality to your destiny.
                </p>
              </div>
           </div>
           <div className="bg-white/80 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div>
                    <h3 className="text-2xl font-serif text-rose-900 mb-4">Why Generate a Kundli?</h3>
                    <ul className="space-y-4">
                       {[
                         "Discover your true self and hidden talents.",
                         "Identify favorable times for career moves and investments.",
                         "Understand relationship dynamics and future marriage prospects.",
                         "Prepare for challenging periods like Sade Sati or Mangal Dosha."
                       ].map((item, i) => (
                         <li key={i} className="flex gap-3 text-rose-800">
                           <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                             <span className="font-bold text-xs">✓</span>
                           </div>
                           <span className="text-sm md:text-base">{item}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                    <h4 className="font-serif font-bold text-rose-900 mb-2">Did You Know?</h4>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      The ascendant (Lagna) changes approximately every 2 hours. This is why an accurate birth time is crucial for a precise prediction. Even twins born minutes apart can have significantly different charts!
                    </p>
                    <div className="text-center">
                       <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-amber-600 font-bold text-sm hover:underline">
                         Create Your Chart Now
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <ShopTeaser onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default FreeKundli;