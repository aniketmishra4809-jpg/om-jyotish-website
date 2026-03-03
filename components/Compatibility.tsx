import React, { useState } from 'react';
import { ZodiacSign, CompatibilityData } from '../types';
import { getCompatibility } from '../services/geminiService';
import { Loader2, HeartHandshake } from 'lucide-react';

const signs = Object.values(ZodiacSign);

const Compatibility: React.FC = () => {
  const [sign1, setSign1] = useState<ZodiacSign | ''>('');
  const [sign2, setSign2] = useState<ZodiacSign | ''>('');
  const [result, setResult] = useState<CompatibilityData | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateCompatibility = async () => {
    if (!sign1 || !sign2) return;
    setLoading(true);
    try {
      const data = await getCompatibility(sign1, sign2);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 mb-20">
       <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-rose-900 mb-4">Western Compatibility</h2>
        <p className="text-rose-800/80 font-medium">Explore the synergy between two zodiac signs.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-white/60 bg-white/70 shadow-xl mb-8 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <select 
            className="bg-white border border-rose-200 text-gray-900 rounded-lg p-3 w-full md:w-48 focus:ring-amber-500 focus:border-amber-500"
            value={sign1}
            onChange={(e) => setSign1(e.target.value as ZodiacSign)}
          >
            <option value="">Select Sign 1</option>
            {signs.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <div className="text-rose-400 font-serif text-2xl">+</div>

          <select 
            className="bg-white border border-rose-200 text-gray-900 rounded-lg p-3 w-full md:w-48 focus:ring-amber-500 focus:border-amber-500"
            value={sign2}
            onChange={(e) => setSign2(e.target.value as ZodiacSign)}
          >
            <option value="">Select Sign 2</option>
            {signs.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <button 
          onClick={calculateCompatibility}
          disabled={!sign1 || !sign2 || loading}
          className="mt-8 w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Analyze Connection'}
        </button>
      </div>

      {result && (
        <div className="animate-fade-in glass-panel rounded-2xl border border-rose-200 bg-white shadow-xl overflow-hidden">
            <div className="bg-rose-50 p-8 text-center border-b border-rose-100">
                <div className="flex justify-center items-center gap-4 mb-4">
                    <span className="text-3xl font-serif text-rose-900">{result.sign1}</span>
                    <HeartHandshake className="w-8 h-8 text-rose-500" />
                    <span className="text-3xl font-serif text-rose-900">{result.sign2}</span>
                </div>
                <div className="text-5xl font-bold text-rose-600 mb-2">{result.compatibilityScore}%</div>
                <div className="text-rose-400 uppercase tracking-widest text-sm font-bold">Match Score</div>
            </div>
            
            <div className="p-8">
                <p className="text-lg text-rose-900 text-center mb-8 italic">"{result.summary}"</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-rose-50 p-6 rounded-lg border border-rose-100">
                        <h4 className="text-rose-700 font-bold mb-2 uppercase text-xs tracking-wider">Emotional</h4>
                        <p className="text-sm text-gray-700">{result.emotional}</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h4 className="text-blue-700 font-bold mb-2 uppercase text-xs tracking-wider">Communication</h4>
                        <p className="text-sm text-gray-700">{result.communication}</p>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                        <h4 className="text-amber-700 font-bold mb-2 uppercase text-xs tracking-wider">Challenges</h4>
                        <p className="text-sm text-gray-700">{result.challenges}</p>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Compatibility;