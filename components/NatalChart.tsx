import React, { useState } from 'react';
import { BirthChartData } from '../types';
import { getBirthChartAnalysis } from '../services/geminiService';
import { Loader2, Moon, Sun, ArrowUpCircle } from 'lucide-react';

const NatalChart: React.FC = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    place: ''
  });
  const [result, setResult] = useState<BirthChartData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.place) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await getBirthChartAnalysis(formData.date, formData.time, formData.place);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-rose-900 mb-4">Western Birth Chart</h2>
        <p className="text-rose-800/80 font-medium">Unveil your celestial blueprint. Enter your birth details.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-white/60 bg-white/70 shadow-xl mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">Date of Birth</label>
              <input
                type="date"
                required
                className="w-full bg-white border border-rose-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">Time of Birth</label>
              <input
                type="time"
                required
                className="w-full bg-white border border-rose-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">Place of Birth (City, Country)</label>
            <input
              type="text"
              required
              placeholder="e.g., Tokyo, Japan"
              className="w-full bg-white border border-rose-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500"
              value={formData.place}
              onChange={e => setFormData({...formData, place: e.target.value})}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-900 hover:bg-rose-800 text-white font-serif font-bold py-4 rounded-lg shadow-lg shadow-rose-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? <><Loader2 className="animate-spin" /> Analyzing Stars...</> : 'Reveal My Chart'}
          </button>
        </form>
      </div>

      {result && (
        <div className="glass-panel border border-rose-200 bg-white rounded-2xl overflow-hidden animate-fade-in shadow-xl">
          {/* The Big Three Visuals */}
          <div className="grid grid-cols-3 divide-x divide-rose-100 bg-rose-50">
            <div className="p-6 text-center">
              <Sun className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <div className="text-xs text-rose-600 font-bold uppercase tracking-widest mb-1">Sun Sign</div>
              <div className="text-xl font-serif text-rose-900">{result.sunSign}</div>
            </div>
            <div className="p-6 text-center">
              <Moon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-xs text-rose-600 font-bold uppercase tracking-widest mb-1">Moon Sign</div>
              <div className="text-xl font-serif text-rose-900">{result.moonSign}</div>
            </div>
            <div className="p-6 text-center">
              <ArrowUpCircle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
              <div className="text-xs text-rose-600 font-bold uppercase tracking-widest mb-1">Rising</div>
              <div className="text-xl font-serif text-rose-900">{result.risingSign}</div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-serif text-rose-900 mb-4">Personality Analysis</h3>
              <p className="text-gray-700 leading-relaxed text-lg font-light">
                {result.analysis}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-3 border-b border-emerald-100 pb-2">Strengths</h4>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-emerald-500">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-red-600 mb-3 border-b border-red-100 pb-2">Challenges</h4>
                <ul className="space-y-2">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500">•</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center pt-6 border-t border-rose-50">
                <span className="text-gray-500">Dominant Element:</span> <span className="text-rose-900 font-bold ml-2">{result.element}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NatalChart;