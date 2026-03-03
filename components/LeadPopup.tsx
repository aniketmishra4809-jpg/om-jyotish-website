import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, User, Calendar, Clock, MapPin, Phone } from 'lucide-react';

const LeadPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '',
    pob: '',
    phone: '',
    query: ''
  });

  useEffect(() => {
    // Show popup after 2 seconds if not already closed for this session
    const hasClosed = sessionStorage.getItem('lead_popup_closed');
    if (!hasClosed) {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('lead_popup_closed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Namaste Om Jyotish Kendra,%0A%0A*New Consultation Lead*%0A*Name:* ${formData.name}%0A*DOB:* ${formData.dob}%0A*TOB:* ${formData.tob}%0A*POB:* ${formData.pob}%0A*Phone:* ${formData.phone}%0A*Query:* ${formData.query || 'General Consultation'}`;
    
    const whatsappUrl = `https://wa.me/919910216477?text=${message}`;
    window.open(whatsappUrl, '_blank');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-rose-950/40 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-rose-100 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row">
        {/* Left Side Decor (Desktop Only) */}
        <div className="hidden md:flex md:w-1/3 bg-rose-900 p-8 flex-col justify-center items-center text-center">
           <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
             <Sparkles className="text-white w-8 h-8" />
           </div>
           <h3 className="text-white font-serif text-xl font-bold leading-tight">Divine Guidance Awaits</h3>
           <p className="text-rose-200 text-xs mt-4 opacity-80 italic">Consult Pundit Vijay Mishra for accurate Vedic insights.</p>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 p-6 md:p-8">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-rose-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-serif font-bold text-rose-950 mb-1">Consult Pundit Ji</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your details for a personalized reading.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
              <input 
                type="text" 
                required 
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-950 focus:outline-none focus:border-amber-500 transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                <input 
                  type="date" 
                  required 
                  className="w-full pl-10 pr-2 py-2 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-950 focus:outline-none focus:border-amber-500 transition-colors"
                  value={formData.dob}
                  onChange={e => setFormData({...formData, dob: e.target.value})}
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
                <input 
                  type="time" 
                  required 
                  className="w-full pl-10 pr-2 py-2 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-950 focus:outline-none focus:border-amber-500 transition-colors"
                  value={formData.tob}
                  onChange={e => setFormData({...formData, tob: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
              <input 
                type="text" 
                required 
                placeholder="Place of Birth"
                className="w-full pl-10 pr-4 py-2 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-950 focus:outline-none focus:border-amber-500 transition-colors"
                value={formData.pob}
                onChange={e => setFormData({...formData, pob: e.target.value})}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
              <input 
                type="tel" 
                required 
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-2 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-950 focus:outline-none focus:border-amber-500 transition-colors"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <textarea 
              placeholder="Your Question (Optional)"
              rows={2}
              className="w-full p-4 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-950 focus:outline-none focus:border-amber-500 transition-colors resize-none"
              value={formData.query}
              onChange={e => setFormData({...formData, query: e.target.value})}
            />

            <button 
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/30"
            >
              Consult on WhatsApp <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadPopup;