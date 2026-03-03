import React, { useState } from 'react';
import { MatchMakingData, AppView } from '../types';
import { getKundliMatching } from '../services/geminiService';
import { Loader2, Users, Heart, AlertTriangle, CheckCircle, Flame, MessageCircle, Link, Shield, Star } from 'lucide-react';
import { Footer, ShopTeaser } from './PageSections';

interface KundliMatchingProps {
  onNavigate?: (view: AppView) => void;
}

interface PersonDetails {
  name: string;
  date: string;
  time: string;
  place: string;
}

const PersonInput = ({ 
  title, 
  data, 
  onChange 
}: { 
  title: string, 
  data: PersonDetails, 
  onChange: (field: keyof PersonDetails, value: string) => void 
}) => (
  <div className="space-y-4 bg-white/50 p-6 rounded-xl border border-rose-100 shadow-sm h-full">
    <h3 className="text-xl font-serif text-rose-800 border-b-2 border-amber-200 pb-2 flex items-center gap-2">
      <Flame className="w-5 h-5 text-amber-500" /> {title}
    </h3>
    <div>
      <label className="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-1">Name</label>
      <input 
        type="text" 
        className="w-full bg-white border border-rose-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
        value={data.name} 
        onChange={e => onChange('name', e.target.value)} 
        placeholder="Enter full name" 
      />
    </div>
    <div className="grid grid-cols-2 gap-3">
        <div>
        <label className="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-1">Date</label>
        <input 
            type="date" 
            className="w-full bg-white border border-rose-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-rose-500" 
            value={data.date} 
            onChange={e => onChange('date', e.target.value)} 
        />
        </div>
        <div>
        <label className="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-1">Time</label>
        <input 
            type="time" 
            className="w-full bg-white border border-rose-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-rose-500" 
            value={data.time} 
            onChange={e => onChange('time', e.target.value)} 
        />
        </div>
    </div>
    <div>
      <label className="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-1">Place of Birth</label>
      <input 
        type="text" 
        className="w-full bg-white border border-rose-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-rose-500" 
        value={data.place} 
        onChange={e => onChange('place', e.target.value)} 
        placeholder="City, Country" 
      />
    </div>
  </div>
);

const KundliMatching: React.FC<KundliMatchingProps> = ({ onNavigate = () => {} }) => {
  const [boy, setBoy] = useState<PersonDetails>({ name: '', date: '', time: '', place: '' });
  const [girl, setGirl] = useState<PersonDetails>({ name: '', date: '', time: '', place: '' });
  const [result, setResult] = useState<MatchMakingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBoyChange = (field: keyof PersonDetails, value: string) => {
    setBoy(prev => ({ ...prev, [field]: value }));
  };

  const handleGirlChange = (field: keyof PersonDetails, value: string) => {
    setGirl(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!boy.name || !boy.date || !boy.time || !boy.place || !girl.name || !girl.date || !girl.time || !girl.place) {
      setError("Please fill in ALL details for both the bride and groom.");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await getKundliMatching(boy, girl);
      setResult(data);
    } catch (e) {
      console.error(e);
      setError("Could not analyze kundlis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-4 border border-rose-200">
             VEDIC MARRIAGE ASTROLOGY
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4 drop-shadow-sm">Gun Milan</h2>
          <p className="text-rose-700/80 font-medium">Sacred Marriage Compatibility Analysis</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mb-20">
            <div className={`glass-panel p-8 rounded-2xl border-white/50 shadow-xl bg-gradient-to-br from-white/80 to-rose-50/50 lg:col-span-${result ? '5' : '12'} transition-all`}>
              <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                 <PersonInput title="Groom (Boy)" data={boy} onChange={handleBoyChange} />
                 <PersonInput title="Bride (Girl)" data={girl} onChange={handleGirlChange} />
              </div>
              
              {error && (
                <div className="mt-6 p-4 bg-red-100 border border-red-200 text-red-800 rounded-lg text-center font-medium">
                  {error}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-rose-100 space-y-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-serif font-bold py-4 rounded-xl shadow-lg shadow-rose-900/20 transition-all disabled:opacity-50 flex justify-center items-center gap-2 transform hover:scale-[1.01]"
                >
                  {loading ? <><Loader2 className="animate-spin" /> Consulting the Stars...</> : 'Calculate Compatibility'}
                </button>
                
                 <a 
                   href="https://wa.me/919910216477?text=Namaste, I want to get a personalized Marriage Matching (Gun Milan) report."
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                 >
                   <MessageCircle className="w-4 h-4" /> Personalised Matching
                 </a>
              </div>
            </div>

            {result && (
              <div className="lg:col-span-7 animate-fade-in glass-panel border-2 border-amber-400/30 rounded-2xl overflow-hidden shadow-2xl h-fit">
                 <div className="bg-gradient-to-r from-rose-900 to-rose-800 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-4 py-1 rounded-full text-amber-200 text-sm font-bold border border-amber-500/30 backdrop-blur-sm">
                        {result.verdict}
                      </div>
                      <div className="text-7xl font-bold text-white mb-2 drop-shadow-lg">{result.score}<span className="text-3xl text-rose-200 font-serif">/36</span></div>
                      <div className="text-amber-300 uppercase tracking-[0.2em] text-sm font-semibold">Gunas Matched</div>
                    </div>
                 </div>

                 <div className="p-8 grid md:grid-cols-2 gap-8 bg-white/50">
                    <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-sm">
                      <h3 className="text-xl font-serif text-rose-900 mb-4 flex items-center gap-2">
                         <AlertTriangle className="w-5 h-5 text-amber-600" /> Mangal Dosha
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {result.manglikAnalysis}
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-sm">
                      <h3 className="text-xl font-serif text-rose-900 mb-4 flex items-center gap-2">
                         <CheckCircle className="w-5 h-5 text-emerald-600" /> Guna & Dosha
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {result.gunaDosha}
                      </p>
                    </div>
                 </div>
                 
                 <div className="px-8 pb-10 bg-white/50">
                   <h3 className="text-xl font-serif text-rose-900 mb-4 border-b border-rose-200 pb-2">Detailed Vedic Analysis</h3>
                   <p className="text-gray-700 leading-relaxed text-lg font-light">{result.analysis}</p>
                 </div>
              </div>
            )}
        </div>

        {/* Content Below */}
        <div className="glass-panel p-8 md:p-12 rounded-2xl bg-white/60 mb-12 relative overflow-hidden">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h3 className="text-3xl font-serif text-rose-900 mb-6">Marriage is a Sacred Union</h3>
               <p className="text-rose-800 leading-relaxed mb-6">
                 In Vedic tradition, marriage is not just a social contract but a spiritual bond between two souls. Gun Milan analyzes 8 critical aspects (Ashtakoot) of compatibility to ensure harmony, longevity, and prosperity.
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-rose-100">
                     <Heart className="text-rose-500 w-5 h-5" />
                     <span className="text-sm font-bold text-rose-900">Emotional Bond</span>
                  </div>
                   <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-rose-100">
                     <Shield className="text-amber-500 w-5 h-5" />
                     <span className="text-sm font-bold text-rose-900">Family Lineage</span>
                  </div>
                   <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-rose-100">
                     <Star className="text-purple-500 w-5 h-5" />
                     <span className="text-sm font-bold text-rose-900">Destiny Synergy</span>
                  </div>
                   <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-rose-100">
                     <Link className="text-blue-500 w-5 h-5" />
                     <span className="text-sm font-bold text-rose-900">Physical Nature</span>
                  </div>
               </div>
             </div>
             <div className="bg-rose-900 text-white p-8 rounded-xl relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Flame className="w-32 h-32" />
                </div>
                <h4 className="text-xl font-serif font-bold text-amber-300 mb-4">Understanding Mangal Dosha</h4>
                <p className="text-rose-100 text-sm leading-relaxed mb-4">
                  Mangal Dosha occurs when Mars is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house. It is often misunderstood as strictly negative.
                </p>
                <p className="text-rose-100 text-sm leading-relaxed">
                  While it can indicate delays or conflicts, a Manglik marrying another Manglik cancels the effect (Dosha Bhang). Remedies like Kumbh Vivah and specific gemstone recommendations can also mitigate its influence.
                </p>
             </div>
           </div>
        </div>

      </div>

      <ShopTeaser onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default KundliMatching;