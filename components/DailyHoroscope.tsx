import React, { useState } from 'react';
import { ZodiacSign, HoroscopeData } from '../types';
import { getDailyHoroscope } from '../services/geminiService';
import { Loader2, Star, Heart, Briefcase, Sparkles } from 'lucide-react';

const signs = Object.values(ZodiacSign);

const DailyHoroscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [data, setData] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectSign = async (sign: ZodiacSign) => {
    setSelectedSign(sign);
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await getDailyHoroscope(sign);
      setData(result);
    } catch (err) {
      setError("The stars are clouded right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4 drop-shadow-sm">Daily Rashifal</h2>
        <p className="text-rose-800/80 font-medium">Choose your Rashi to reveal today's cosmic forecast.</p>
      </div>

      {!data && !loading && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {signs.map((sign) => (
            <button
              key={sign}
              onClick={() => handleSelectSign(sign)}
              className={`p-4 rounded-xl glass-panel bg-white/50 hover:bg-white transition-all border border-rose-100 hover:border-amber-300 flex flex-col items-center gap-3 group shadow-sm hover:shadow-lg ${selectedSign === sign ? 'ring-2 ring-amber-400 bg-amber-50' : ''}`}
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner group-hover:bg-amber-100">
                <span className="text-2xl font-serif text-rose-800">{sign[0]}</span>
              </div>
              <span className="text-sm font-bold text-rose-900">{sign}</span>
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
          <p className="text-rose-800 font-medium animate-pulse">Consulting the Planets...</p>
        </div>
      )}

      {data && (
        <div className="animate-fade-in glass-panel p-6 md:p-10 rounded-2xl border-white bg-white/80 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Star className="w-64 h-64 text-rose-900" />
          </div>
          
          <button 
            onClick={() => { setData(null); setSelectedSign(null); }}
            className="mb-6 text-sm text-rose-600 hover:text-rose-900 flex items-center gap-1 transition-colors font-bold"
          >
            ← Choose another sign
          </button>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-rose-100 pb-6">
              <div>
                <h3 className="text-4xl font-serif text-rose-900 mb-2">{data.sign}</h3>
                <p className="text-rose-600 flex items-center gap-2 font-medium">
                  <span className="opacity-75">{data.date}</span>
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4 text-sm">
                <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-100 text-rose-800 font-semibold shadow-sm">
                  Mood: <span className="text-rose-900">{data.mood}</span>
                </div>
                <div className="bg-amber-50 px-4 py-2 rounded-full border border-amber-100 text-amber-800 font-semibold shadow-sm">
                  Lucky #: <span className="text-amber-600 font-bold">{data.luckyNumber}</span>
                </div>
              </div>
            </div>

            <p className="text-xl text-rose-900 leading-relaxed mb-10 italic font-light border-l-4 border-amber-400 pl-4 bg-amber-50/50 py-4 rounded-r-lg">
              "{data.general}"
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3 text-rose-600">
                  <Heart className="w-5 h-5 fill-rose-200" />
                  <h4 className="font-bold uppercase tracking-wide text-xs">Love</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{data.love}</p>
              </div>
              
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3 text-emerald-600">
                  <Briefcase className="w-5 h-5 fill-emerald-200" />
                  <h4 className="font-bold uppercase tracking-wide text-xs">Career</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{data.career}</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3 text-blue-600">
                  <Sparkles className="w-5 h-5 fill-blue-200" />
                  <h4 className="font-bold uppercase tracking-wide text-xs">Well-being</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{data.health}</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
                <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Power Color: <span className="text-rose-900 text-lg ml-1" style={{color: data.luckyColor.toLowerCase()}}>{data.luckyColor}</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyHoroscope;