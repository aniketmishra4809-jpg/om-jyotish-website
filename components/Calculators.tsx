import React, { useState } from 'react';
import { CalculatorResult, AppView } from '../types';
import { getCalculatorResult } from '../services/geminiService';
import { Loader2, Moon, Calendar, AlertOctagon, X, MessageCircle, ArrowRight, Zap, Database } from 'lucide-react';
import { Footer, ShopTeaser } from './PageSections';

interface CalculatorsProps {
  onNavigate?: (view: AppView) => void;
}

const Calculators: React.FC<CalculatorsProps> = ({ onNavigate = () => {} }) => {
  const [activeCalc, setActiveCalc] = useState<string | null>(null);
  const [formData, setFormData] = useState({ date: '', time: '', place: '' });
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculators = [
    { id: 'Rashi', title: 'Rashi Calculator', icon: Moon, desc: 'Find your accurate Moon Sign.' },
    { id: 'Nakshatra', title: 'Nakshatra Calculator', icon: Calendar, desc: 'Calculate accurate Janam Nakshatra.' },
    { id: 'SadeSati', title: 'Shani Sade Sati', icon: AlertOctagon, desc: 'Check Sade Sati predictions.' },
    { id: 'Navamsa', title: 'Navamsa Calculator', icon: Calendar, desc: 'Create D9 Chart and get analysis.' }
  ];

  const handleCalculate = async () => {
    if (!formData.date || !formData.time || !formData.place || !activeCalc) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await getCalculatorResult(activeCalc, formData);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setActiveCalc(null);
    setResult(null);
    setFormData({ date: '', time: '', place: '' });
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-rose-900 mb-4">Astrology Tools</h2>
          <p className="text-rose-800/80 font-medium">Free Vedic calculators for instant cosmic insights.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {calculators.map(calc => (
            <div key={calc.id} className="glass-panel p-8 rounded-xl border border-white/60 bg-white hover:border-amber-400 transition-all group relative overflow-hidden shadow-md flex flex-col h-full">
               <div className="flex items-start justify-between mb-4 relative z-10">
                 <div>
                   <h3 className="text-2xl font-serif text-rose-900 mb-2">{calc.title}</h3>
                   <p className="text-gray-600 text-sm">{calc.desc}</p>
                 </div>
                 <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors flex-shrink-0">
                   <calc.icon className="w-6 h-6" />
                 </div>
               </div>
               
               <div className="mt-auto space-y-3">
                  <button 
                    onClick={() => setActiveCalc(calc.id)}
                    className="w-full px-6 py-3 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-lg font-bold text-sm transition-colors"
                  >
                    Use Tool
                  </button>
                   <a 
                      href={`https://wa.me/919910216477?text=Namaste, I want a personalised report for ${calc.title}.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
                   >
                      <MessageCircle className="w-4 h-4" /> Personalised Report
                   </a>
               </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-white/50 border border-rose-100 rounded-2xl p-8 md:p-12 mb-12">
           <div className="text-center max-w-3xl mx-auto mb-12">
             <h3 className="text-3xl font-serif text-rose-900 mb-4">Why Vedic Calculations Matter</h3>
             <p className="text-rose-800 leading-relaxed">
               Unlike Western astrology which often relies on the Sun sign, Vedic Astrology (Jyotish) uses the Sidereal Zodiac which is astronomically accurate. These micro-calculations determine the exact influence of stars on your psyche and destiny.
             </p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center text-amber-500 mb-4">
                    <Database className="w-8 h-8" />
                 </div>
                 <h4 className="font-bold text-rose-900 mb-2">Precision Data</h4>
                 <p className="text-sm text-gray-600">Calculated using precise latitude, longitude, and time zone data.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center text-amber-500 mb-4">
                    <Zap className="w-8 h-8" />
                 </div>
                 <h4 className="font-bold text-rose-900 mb-2">Instant Insight</h4>
                 <p className="text-sm text-gray-600">Get immediate answers about your Nakshatra, Rashi, and Doshas.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center text-amber-500 mb-4">
                    <ArrowRight className="w-8 h-8" />
                 </div>
                 <h4 className="font-bold text-rose-900 mb-2">Actionable Advice</h4>
                 <p className="text-sm text-gray-600">Simple remedies and guidance based on complex calculations.</p>
              </div>
           </div>
        </div>

        {/* Modal / Overlay for Calculation */}
        {activeCalc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rose-950/40 backdrop-blur-sm">
             <div className="bg-white border border-rose-200 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-rose-900">
                  <X className="w-6 h-6" />
                </button>
                
                <h3 className="text-2xl font-serif text-rose-900 mb-6">
                  {calculators.find(c => c.id === activeCalc)?.title}
                </h3>

                {!result ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Date of Birth</label>
                      <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900"
                        value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Time of Birth</label>
                      <input type="time" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900"
                        value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Place of Birth</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900"
                        value={formData.place} onChange={e => setFormData({...formData, place: e.target.value})} />
                    </div>
                    <button onClick={handleCalculate} disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-bold mt-4 flex justify-center items-center gap-2 shadow-lg">
                       {loading ? <Loader2 className="animate-spin" /> : 'Calculate Result'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center">
                      <div className="text-sm text-amber-700 uppercase tracking-widest mb-1 font-bold">Result</div>
                      <div className="text-3xl font-serif text-rose-900">{result.result}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-gray-700 leading-relaxed text-sm">{result.details}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setResult(null)} className="flex-1 text-rose-600 text-sm hover:text-rose-900 font-bold py-2 border border-rose-200 rounded-lg">Calculate Again</button>
                        <a 
                          href={`https://wa.me/919910216477?text=Namaste, I want a detailed analysis for my ${calculators.find(c => c.id === activeCalc)?.title} result: ${result.result}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-1"
                        >
                           <MessageCircle className="w-3 h-3" /> Get Detail
                        </a>
                    </div>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>

      <ShopTeaser onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Calculators;