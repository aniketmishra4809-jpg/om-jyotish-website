import React from 'react';
import { AppView } from '../types';
import { Footer, ShopTeaser } from './PageSections';
import { User, Award, MapPin, Phone, Clock, Star } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: AppView) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  // Using the raw GitHub link for the astrologer's photo as requested
  const astrologerPhotoUrl = "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/PAPA-Image.jpg";

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-12 px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6 drop-shadow-sm">About Om Jyotish Kendra</h2>
          <p className="text-rose-800/80 font-medium max-w-2xl mx-auto">
            Illuminating paths with ancient Vedic wisdom for over three decades. Trusted by thousands for accurate predictions and effective remedies.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-20 items-start">
          
          {/* Profile Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-3 rounded-2xl bg-white border-2 border-amber-200 shadow-2xl relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden">
               <div className="rounded-xl aspect-[4/5] flex items-center justify-center relative overflow-hidden bg-rose-50">
                  <img 
                    src={astrologerPhotoUrl} 
                    alt="Pundit Vijay Mishra" 
                    className="absolute inset-0 w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599408162449-628624195152?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-rose-950/80"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                     <h3 className="text-3xl font-serif font-bold text-amber-50">Pundit Vijay Mishra</h3>
                     <p className="text-amber-200 font-medium flex items-center gap-2">
                       <Award className="w-4 h-4 text-amber-400" /> Vedic Astrologer & Spiritual Guide
                     </p>
                  </div>
               </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute top-10 -right-4 w-full h-full bg-amber-500/10 rounded-2xl -z-10 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-500/5 rounded-full -z-10 blur-2xl"></div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel p-8 rounded-2xl bg-white/70">
               <h3 className="text-2xl font-serif text-rose-900 mb-4 flex items-center gap-2">
                 <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                 30+ Years of Experience
               </h3>
               <p className="text-gray-700 leading-relaxed text-lg font-light mb-6">
                 Pundit Vijay Mishra is a renowned name in the field of Vedic Astrology. With over 30 years of dedicated practice, he has guided countless individuals through life's toughest phases—be it career, marriage, health, or spiritual growth. His approach combines traditional Shastra knowledge with modern practical solutions.
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                    <span className="block text-2xl font-bold text-rose-900">10k+</span>
                    <span className="text-sm text-rose-700">Kundlis Analyzed</span>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                    <span className="block text-2xl font-bold text-rose-900">98%</span>
                    <span className="text-sm text-rose-700">Client Satisfaction</span>
                  </div>
               </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl bg-white/70 border-l-4 border-amber-500">
               <h3 className="text-xl font-serif text-rose-900 mb-6">Contact Information</h3>
               
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-rose-900 text-sm uppercase tracking-wide mb-1">Mobile Numbers</h4>
                      <p className="text-gray-700 font-medium font-mono text-lg">9910216477</p>
                      <p className="text-gray-700 font-medium font-mono text-lg">9213343971</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-rose-900 text-sm uppercase tracking-wide mb-1">Office Address</h4>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        262, 2nd Floor, CD Block,<br/>
                        Agarwal Complex, Pitampura,<br/>
                        Delhi - 110034
                      </p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-rose-900 text-sm uppercase tracking-wide mb-1">Timings</h4>
                      <p className="text-gray-700">
                        12:00 PM - 06:00 PM (Everyday)<br/>
                        <span className="text-sm text-rose-500 italic">*Please book appointment before visiting</span>
                      </p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="glass-panel p-4 rounded-2xl bg-white mb-12">
           <div className="bg-rose-50 w-full h-64 rounded-xl flex items-center justify-center border border-rose-100 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              <div className="text-center z-10">
                 <MapPin className="w-12 h-12 text-rose-400 mx-auto mb-2" />
                 <p className="text-rose-900 font-bold">Pitampura, Delhi</p>
                 <a 
                   href="https://www.google.com/maps/search/?api=1&query=262+CD+Block+Agarwal+Complex+Pitampura+Delhi" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-amber-600 underline text-sm hover:text-amber-700"
                 >
                   View on Google Maps
                 </a>
              </div>
           </div>
        </div>

      </div>
      <ShopTeaser onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AboutPage;