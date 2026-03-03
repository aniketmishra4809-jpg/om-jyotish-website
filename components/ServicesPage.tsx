import React from 'react';
import { AppView } from '../types';
import { Footer, ShopTeaser } from './PageSections';
import { 
  FileText, Search, AlertOctagon, Baby, Plane, Skull, Music, BookOpen, Scroll, Heart, MessageCircle 
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (view: AppView) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const services = [
    {
      title: "Janam Kundali",
      desc: "Complete Vedic Birth Chart creation with planetary positions.",
      icon: FileText,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Janam Kundali Vishleshan",
      desc: "In-depth analysis of your horoscope to predict future events.",
      icon: Search,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Kaal Sarp Yog",
      desc: "Identification and remedies for Kaal Sarp Dosha in your chart.",
      icon: AlertOctagon,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Santan Yog",
      desc: "Predictions and remedies regarding child conception and progeny.",
      icon: Baby,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Videsh Yog",
      desc: "Analysis of foreign travel and settlement opportunities.",
      icon: Plane,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Pitra Dosh",
      desc: "Solutions for ancestral curses affecting family peace and growth.",
      icon: Skull,
      color: "bg-gray-100 text-gray-600"
    },
    {
      title: "Sangeet Samaye Bhagvat Katha",
      desc: "Organizing musical Shrimad Bhagvat Katha for spiritual bliss.",
      icon: Music,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Sundarkand Path",
      desc: "Recitation of Sundarkand for strength, courage, and success.",
      icon: BookOpen,
      color: "bg-rose-100 text-rose-600"
    },
    {
      title: "Ramayan Path",
      desc: "Complete Akhand Ramayan Path for auspicious occasions.",
      icon: Scroll,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Prem Vivah",
      desc: "Astrological guidance and remedies for Love Marriage success.",
      icon: Heart,
      color: "bg-pink-100 text-pink-600"
    }
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-4 border border-rose-200">
             EXPERT VEDIC SOLUTIONS
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6 drop-shadow-sm">Our Spiritual Services</h2>
          <p className="text-rose-800/80 font-medium max-w-2xl mx-auto">
            Pundit Vijay Mishra offers a wide range of astrological and spiritual services to guide you through life's challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, idx) => (
            <div key={idx} className="group glass-panel p-8 rounded-2xl border border-white/60 bg-white hover:border-amber-400/50 transition-all hover:-translate-y-2 hover:shadow-xl flex flex-col h-full">
               <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color} transition-transform group-hover:scale-110 shadow-inner`}>
                 <service.icon className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-serif font-bold text-rose-900 mb-3">{service.title}</h3>
               <p className="text-rose-700/80 text-sm leading-relaxed mb-6 flex-1">
                 {service.desc}
               </p>
               <a 
                 href={`https://wa.me/919910216477?text=Namaste Pandit Ji, I am interested in knowing more about ${service.title}.`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors mt-auto"
               >
                 <MessageCircle className="w-4 h-4" /> Book Consultation
               </a>
            </div>
          ))}
        </div>
        
        {/* Additional Banner */}
        <div className="glass-panel p-8 md:p-12 rounded-2xl bg-gradient-to-r from-rose-900 to-rose-800 text-white relative overflow-hidden text-center">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
             <div className="relative z-10 max-w-3xl mx-auto">
                <h3 className="text-3xl font-serif font-bold mb-4">Need Personalized Guidance?</h3>
                <p className="text-rose-100 mb-8 text-lg">
                  Every individual's chart is unique. Contact us directly to discuss your specific problems and get customized Vedic remedies.
                </p>
                <a 
                   href="https://wa.me/919910216477"
                   className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-rose-950 font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </a>
             </div>
        </div>

      </div>
      <ShopTeaser onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default ServicesPage;