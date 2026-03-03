
export enum ZodiacSign {
  Aries = "Aries",
  Taurus = "Taurus",
  Gemini = "Gemini",
  Cancer = "Cancer",
  Leo = "Leo",
  Virgo = "Virgo",
  Libra = "Libra",
  Scorpio = "Scorpio",
  Sagittarius = "Sagittarius",
  Capricorn = "Capricorn",
  Aquarius = "Aquarius",
  Pisces = "Pisces"
}

export interface HoroscopeData {
  sign: string;
  date: string;
  general: string;
  love: string;
  career: string;
  health: string;
  luckyNumber: number;
  luckyColor: string;
  mood: string;
}

export interface CompatibilityData {
  sign1: string;
  sign2: string;
  compatibilityScore: number; // 0-100
  summary: string;
  emotional: string;
  communication: string;
  challenges: string;
}

export interface BirthChartData {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  analysis: string;
  strengths: string[];
  weaknesses: string[];
  element: string;
}

export interface VedicKundliData {
  rashi: string;
  nakshatra: string;
  lagna: string;
  planetaryPositions: string[];
  lifePrediction: string;
}

export interface MatchMakingData {
  score: number; // out of 36
  verdict: string;
  manglikAnalysis: string;
  gunaDosha: string;
  analysis: string;
}

export interface CalculatorResult {
  title: string;
  result: string;
  details: string;
}

export enum AppView {
  Home = "HOME",
  Horoscope = "HOROSCOPE",
  FreeKundli = "FREE_KUNDLI",
  KundliMatching = "KUNDLI_MATCHING",
  Calculators = "CALCULATORS",
  NatalChart = "NATAL_CHART", // Keeping for Western style
  Compatibility = "COMPATIBILITY", // Keeping for Western style
  AIChat = "AI_CHAT",
  Shop = "SHOP",
  Services = "SERVICES",
  About = "ABOUT",
  PrivacyPolicy = "PRIVACY_POLICY",
  TermsConditions = "TERMS_CONDITIONS"
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface StoneProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  zodiacs: ZodiacSign[];
}