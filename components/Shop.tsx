import React, { useState } from 'react';
import { ZodiacSign, StoneProduct, AppView } from '../types';
import { Search, MessageCircle, Filter, Star, Sparkles, Check, Gem, ShieldCheck, X, Maximize2 } from 'lucide-react';
import { Footer } from './PageSections';

// Fix: Added missing ShopProps interface
interface ShopProps {
  onNavigate?: (view: AppView) => void;
}

const stones: StoneProduct[] = [
  {
    id: 1,
    name: "Diamond (Heera)",
    price: 1250.00,
    description: "The stone of Venus (Shukra). Increases luxury, love, and artistic talents.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Diamond.png",
    zodiacs: [ZodiacSign.Libra, ZodiacSign.Taurus]
  },
  {
    id: 2,
    name: "Ruby (Manik)",
    price: 850.00,
    description: "The stone of the Sun (Surya). Brings power, name, fame, and vitality.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Ruby-Manik.png",
    zodiacs: [ZodiacSign.Leo]
  },
  {
    id: 3,
    name: "Blue Sapphire (Neelam)",
    price: 1500.00,
    description: "The stone of Saturn (Shani). Brings instant wealth, fame, and protection.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Blue-Saphhire-Neelam.png",
    zodiacs: [ZodiacSign.Capricorn, ZodiacSign.Aquarius]
  },
  {
    id: 4,
    name: "Yellow Sapphire (Pukhraj)",
    price: 950.00,
    description: "The stone of Jupiter (Brihaspati). Gives wisdom, wealth, and happy marriage.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Yellow-Saphhire-Pukhraj.png",
    zodiacs: [ZodiacSign.Sagittarius, ZodiacSign.Pisces]
  },
  {
    id: 5,
    name: "Emerald (Panna)",
    price: 800.00,
    description: "The stone of Mercury (Budh). Improves intelligence, communication, and business.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Emerald-Panna.png",
    zodiacs: [ZodiacSign.Gemini, ZodiacSign.Virgo]
  },
  {
    id: 6,
    name: "Red Coral (Moonga)",
    price: 450.00,
    description: "The stone of Mars (Mangal). Gives courage, energy, and victory over enemies.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Red-Coral-Moonga.png",
    zodiacs: [ZodiacSign.Aries, ZodiacSign.Scorpio]
  },
  {
    id: 7,
    name: "Pearl (Moti)",
    price: 250.00,
    description: "The stone of the Moon (Chandra). Gives mental peace, emotional balance, and calm.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Pearl-Moti.png",
    zodiacs: [ZodiacSign.Cancer]
  },
  {
    id: 8,
    name: "Hessonite (Gomed)",
    price: 350.00,
    description: "The stone of Rahu. Protects against sudden misfortunes and confusion.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Hessonite-Gomed.png",
    zodiacs: [ZodiacSign.Aquarius]
  },
  {
    id: 9,
    name: "Cat’s Eye (Lehsunia)",
    price: 400.00,
    description: "The stone of Ketu. Gives spiritual growth and protection from hidden enemies.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Cat's-Eye-Lehsunia.png",
    zodiacs: [ZodiacSign.Pisces]
  },
  {
    id: 10,
    name: "Amethyst (Jamunia)",
    price: 65.00,
    description: "Substitute for Blue Sapphire. Calms the mind and helps in meditation.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Amethyst-Jamunia.png",
    zodiacs: [ZodiacSign.Capricorn, ZodiacSign.Aquarius]
  },
  {
    id: 11,
    name: "Aquamarine (Beruj)",
    price: 120.00,
    description: "Soothing energy of the sea. Promotes clarity and calmness.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/AcquaMarine-beruj.png",
    zodiacs: [ZodiacSign.Pisces, ZodiacSign.Aquarius]
  },
  {
    id: 12,
    name: "Opal (Dudhiya Patthar)",
    price: 280.00,
    description: "Substitute for Diamond. brings creativity, passion, and luxury.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/opal.png",
    zodiacs: [ZodiacSign.Libra, ZodiacSign.Taurus]
  },
  {
    id: 13,
    name: "Peridot (Zabarjad)",
    price: 90.00,
    description: "Substitute for Emerald. Brings healing, renewal, and positive energy.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Peridot-Jabarjad.png",
    zodiacs: [ZodiacSign.Gemini, ZodiacSign.Virgo]
  },
  {
    id: 14,
    name: "Turquoise (Firoza)",
    price: 150.00,
    description: "A master healer stone. Offers protection and connection to spirit.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Turquoise-Firoza.png",
    zodiacs: [ZodiacSign.Sagittarius]
  },
  {
    id: 15,
    name: "Topaz (Sunela)",
    price: 110.00,
    description: "Substitute for Yellow Sapphire. Brings joy, generosity, and abundance.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Topaz-Sunela.png",
    zodiacs: [ZodiacSign.Sagittarius, ZodiacSign.Pisces]
  },
  {
    id: 16,
    name: "Garnet (Raktamani)",
    price: 75.00,
    description: "Substitute for Ruby. Energizes the system and brings passion.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Garnet-Raktamani.png",
    zodiacs: [ZodiacSign.Leo, ZodiacSign.Scorpio]
  },
  {
    id: 17,
    name: "Zircon (Jarkan)",
    price: 180.00,
    description: "High luster substitute for Diamond. Brings clarity and focus.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Zirkon-Jarkan.png",
    zodiacs: [ZodiacSign.Libra, ZodiacSign.Taurus]
  },
  {
    id: 18,
    name: "Moonstone (Chandrakant)",
    price: 55.00,
    description: "Substitute for Pearl. Enhances intuition and emotional balance.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Moonstone-Chandrakant.png",
    zodiacs: [ZodiacSign.Cancer]
  },
  {
    id: 19,
    name: "Onyx (Sulemani Hakik)",
    price: 40.00,
    description: "Protection stone. Absorbs and transforms negative energy.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Onyx-Sulemani-Hakik.png",
    zodiacs: [ZodiacSign.Capricorn]
  },
  {
    id: 20,
    name: "Lapis Lazuli (Lazvart)",
    price: 85.00,
    description: "Stone of truth and wisdom. Stimulates the third eye.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Lapis-Lazuli-Lazvart.png",
    zodiacs: [ZodiacSign.Sagittarius]
  },
  {
    id: 21,
    name: "Citrine (Golden)",
    price: 95.00,
    description: "Success stone. Powerful substitute for Yellow Sapphire.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Citrine-Golden.png",
    zodiacs: [ZodiacSign.Sagittarius, ZodiacSign.Pisces]
  },
  {
    id: 22,
    name: "White Sapphire",
    price: 600.00,
    description: "Safed Pukhraj. Excellent for luxury, art, and marital bliss.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/White-Sapphire.png",
    zodiacs: [ZodiacSign.Taurus, ZodiacSign.Libra]
  },
  {
    id: 23,
    name: "Tourmaline (Vaikrant)",
    price: 130.00,
    description: "Protective and grounding. Balances all chakras.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Tourmaline-Vaikrant.png",
    zodiacs: [ZodiacSign.Libra, ZodiacSign.Gemini]
  },
  {
    id: 24,
    name: "Jade (Harita)",
    price: 70.00,
    description: "Stone of luck and prosperity. Encourages wisdom and purity.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Jade-Harita.png",
    zodiacs: [ZodiacSign.Virgo, ZodiacSign.Gemini]
  },
  {
    id: 25,
    name: "Agate (Hakik)",
    price: 35.00,
    description: "Stabilizing stone. Strengthens intellect and harmonizes yin/yang.",
    image: "https://raw.githubusercontent.com/aniketmishra4809-jpg/om-jyotish-images/main/Agate-Hakik.png",
    zodiacs: [ZodiacSign.Gemini, ZodiacSign.Virgo]
  }
];

const Shop: React.FC<ShopProps> = ({ onNavigate = () => {} }) => {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredStones = stones.filter(stone => {
    const matchesSearch = stone.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZodiac = selectedZodiac ? stone.zodiacs.includes(selectedZodiac) : true;
    return matchesSearch && matchesZodiac;
  });

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4 drop-shadow-sm">Royal Ratna Collection</h2>
          <p className="text-rose-800/80 max-w-2xl mx-auto font-medium">
            Authentic, lab-certified Vedic Gemstones to amplify your planetary strength (Graha Bal).
          </p>
        </div>

        {/* Filter Bar */}
        <div className="glass-panel p-6 rounded-xl mb-12 flex flex-col md:flex-row gap-6 items-center justify-between sticky top-20 z-40 backdrop-blur-xl border border-white/40 shadow-xl bg-white/60">
          <div className="relative w-full md:w-auto text-gray-800">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400 w-4 h-4" />
             <input 
                type="text" 
                placeholder="Search gemstones..." 
                className="pl-10 pr-4 py-2 bg-white border border-rose-200 rounded-full text-rose-900 w-full focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 text-rose-800">
               <Filter className="w-4 h-4 text-amber-600" />
               <span className="text-sm font-bold uppercase tracking-wider">Rashi Filter:</span>
            </div>
            <select 
              className="bg-white border border-rose-200 text-rose-900 rounded-lg p-2 flex-1 md:w-48 focus:ring-amber-500 focus:border-amber-500 font-medium"
              value={selectedZodiac}
              onChange={(e) => setSelectedZodiac(e.target.value as ZodiacSign)}
            >
              <option value="">All Rashis</option>
              {Object.values(ZodiacSign).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Recommendation Banner */}
        {selectedZodiac && (
          <div className="mb-8 p-4 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-xl flex items-center gap-3 animate-fade-in shadow-md">
            <Sparkles className="text-amber-600 w-5 h-5" />
            <p className="text-rose-900 font-medium">
              Displaying auspicious stones for <span className="font-bold text-amber-700">{selectedZodiac}</span>.
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredStones.map(stone => (
            <div key={stone.id} className="group glass-panel rounded-2xl overflow-hidden border border-white/50 bg-white hover:border-amber-400/50 transition-all hover:transform hover:-translate-y-1 hover:shadow-xl flex flex-col p-6 h-full">
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif font-bold text-rose-900 group-hover:text-amber-700 transition-colors leading-tight">{stone.name}</h3>
                  {stone.zodiacs.includes(selectedZodiac as ZodiacSign) && (
                     <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                       <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Recommended
                     </span>
                   )}
                </div>
                
                {/* Image Display - Clickable to Open Lightbox */}
                <button 
                  onClick={() => setPreviewImage(stone.image)}
                  className="w-full h-48 overflow-hidden rounded-lg mb-4 bg-rose-50 border border-rose-100 relative group/img cursor-zoom-in"
                  title="Click to view full image"
                >
                  <img 
                    src={stone.image} 
                    alt={stone.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596349835747-f0c3dfc98099?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity w-8 h-8" />
                  </div>
                </button>

                <p className="text-gray-700 text-sm mb-6 leading-relaxed flex-1">{stone.description}</p>
                
                <div className="mb-6 bg-rose-50/50 p-3 rounded-lg border border-rose-100/50">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-2">Recommended for Rashis:</span>
                  <div className="flex flex-wrap gap-2">
                    {stone.zodiacs.map(z => (
                      <span key={z} className="text-xs bg-white text-rose-800 border border-rose-100 px-2 py-1 rounded-md font-medium shadow-sm">
                        {z}
                      </span>
                    ))}
                  </div>
                </div>

                <a 
                  href={`https://wa.me/919910216477?text=Hi, I am interested in knowing the price of ${stone.name}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-rose-900 hover:bg-rose-800 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-900/10 mt-auto group-hover:bg-amber-600"
                >
                  <MessageCircle className="w-4 h-4" /> Contact for Price
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredStones.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-rose-900 text-xl">No gems found matching your criteria.</p>
          </div>
        )}

        {/* Authenticity Promise Section */}
        <div className="glass-panel p-8 md:p-12 rounded-2xl bg-white/70">
           <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-serif text-rose-900 mb-8">Our Promise of Purity</h3>
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-4 border border-rose-200">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-rose-900">Lab Certified</h4>
                    <p className="text-sm text-gray-600">Every gemstone comes with a certificate of authenticity from reputed labs.</p>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4 border border-amber-200">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-rose-900">Energized (Prana Pratishta)</h4>
                    <p className="text-sm text-gray-600">Vedically activated by our Pandits before dispatch for maximum benefit.</p>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 border border-blue-200">
                      <Gem className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-rose-900">100% Natural</h4>
                    <p className="text-sm text-gray-600">We only sell untreated, unheated, natural gemstones of the highest quality.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-fade-in"
          style={{ backgroundColor: 'rgba(15, 0, 0, 0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setPreviewImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors bg-white/10 p-2 rounded-full border border-white/20"
            onClick={(e) => { e.stopPropagation(); setPreviewImage(null); }}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative max-w-full max-h-full overflow-hidden rounded-2xl shadow-2xl border-2 border-amber-400/20 bg-rose-950 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={previewImage} 
              alt="Gemstone Preview" 
              className="max-w-full max-h-[85vh] object-contain block select-none shadow-2xl"
            />
            
            {/* Corner Decorative Elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-xl opacity-60"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-xl opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-xl opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-xl opacity-60"></div>
          </div>
          
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-100/60 text-sm font-serif tracking-widest uppercase">
            Divine Artifact Preview
          </p>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Shop;