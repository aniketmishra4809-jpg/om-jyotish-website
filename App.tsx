import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import StarryBackground from "./components/StarryBackground";
import Navigation from "./components/Navigation";
import Home from "./components/Hero";
import DailyHoroscope from "./components/DailyHoroscope";
import FreeKundli from "./components/FreeKundli";
import KundliMatching from "./components/KundliMatching";
import Calculators from "./components/Calculators";
import NatalChart from "./components/NatalChart";
import Compatibility from "./components/Compatibility";
import AIChat from "./components/AIChat";
import Shop from "./components/Shop";
import ServicesPage from "./components/ServicesPage";
import AboutPage from "./components/AboutPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import LeadPopup from "./components/LeadPopup";
import { AppView } from "./types";

function AppContent() {
  const navigate = useNavigate();

  // This function keeps old buttons working
  const handleNavigate = (view: AppView) => {
    switch (view) {
      case AppView.Home:
        navigate("/");
        break;
      case AppView.Services:
        navigate("/services");
        break;
      case AppView.Horoscope:
        navigate("/horoscope");
        break;
      case AppView.FreeKundli:
        navigate("/kundli");
        break;
      case AppView.KundliMatching:
        navigate("/matching");
        break;
      case AppView.Calculators:
        navigate("/tools");
        break;
      case AppView.NatalChart:
        navigate("/natal-chart");
        break;
      case AppView.Compatibility:
        navigate("/compatibility");
        break;
      case AppView.AIChat:
        navigate("/chat");
        break;
      case AppView.Shop:
        navigate("/shop");
        break;
      case AppView.About:
        navigate("/about");
        break;
      case AppView.PrivacyPolicy:
        navigate("/privacy");
        break;
      case AppView.TermsConditions:
        navigate("/terms");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="min-h-screen text-slate-200 relative selection:bg-indigo-500 selection:text-white">

      <StarryBackground />
      <LeadPopup />
      <Navigation onNavigate={handleNavigate} />

      <main className="relative z-10 pt-24 pb-6">

        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
          <Route path="/services" element={<ServicesPage onNavigate={handleNavigate} />} />

          <Route path="/horoscope" element={<DailyHoroscope />} />
          <Route path="/kundli" element={<FreeKundli onNavigate={handleNavigate} />} />
          <Route path="/matching" element={<KundliMatching onNavigate={handleNavigate} />} />
          <Route path="/tools" element={<Calculators onNavigate={handleNavigate} />} />

          <Route path="/natal-chart" element={<NatalChart />} />
          <Route path="/compatibility" element={<Compatibility />} />

          <Route path="/shop" element={<Shop onNavigate={handleNavigate} />} />
          <Route path="/chat" element={<AIChat />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Routes>

      </main>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;