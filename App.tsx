import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StarryBackground from './components/StarryBackground';
import Navigation from './components/Navigation';
import Home from './components/Hero';
import DailyHoroscope from './components/DailyHoroscope';
import FreeKundli from './components/FreeKundli';
import KundliMatching from './components/KundliMatching';
import Calculators from './components/Calculators';
import NatalChart from './components/NatalChart';
import Compatibility from './components/Compatibility';
import AIChat from './components/AIChat';
import Shop from './components/Shop';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import LeadPopup from './components/LeadPopup';
import { AppView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.Home);

  // Scroll to top when view changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case AppView.Home:
        return <Home onNavigate={setCurrentView} />;
      case AppView.Services:
        return <ServicesPage onNavigate={setCurrentView} />;
      case AppView.Horoscope:
        return <DailyHoroscope />;
      case AppView.FreeKundli:
        return <FreeKundli onNavigate={setCurrentView} />;
      case AppView.KundliMatching:
        return <KundliMatching onNavigate={setCurrentView} />;
      case AppView.Calculators:
        return <Calculators onNavigate={setCurrentView} />;
      case AppView.NatalChart:
        return <NatalChart />; 
      case AppView.Compatibility:
        return <Compatibility />;
      case AppView.AIChat:
        return <AIChat />;
      case AppView.Shop:
        return <Shop onNavigate={setCurrentView} />;
      case AppView.About:
        return <AboutPage onNavigate={setCurrentView} />;
      case AppView.PrivacyPolicy:
        return <PrivacyPolicy />;
      case AppView.TermsConditions:
        return <TermsConditions />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
  <BrowserRouter>
    <div className="min-h-screen text-slate-200 relative selection:bg-indigo-500 selection:text-white">
      
      <StarryBackground />
      <LeadPopup />

      <main className="relative z-10 pt-24 pb-6">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/services" element={<ServicesPage />} />
  <Route path="/kundli" element={<FreeKundli />} />
  <Route path="/matching" element={<KundliMatching />} />
  <Route path="/tools" element={<Calculators />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/chat" element={<AIChat />} />
</Routes>
      </main>

      <Navigation />
      
    </div>
  </BrowserRouter>
);
}
export default App;