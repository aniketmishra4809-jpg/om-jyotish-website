import { GoogleGenAI, Type, Chat } from "@google/genai";
import { HoroscopeData, CompatibilityData, BirthChartData, ZodiacSign, VedicKundliData, MatchMakingData, CalculatorResult } from "../types";

// Fix: Always use new GoogleGenAI({ apiKey: process.env.API_KEY });
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = "gemini-3-flash-preview";

// Fix: Define schemas as objects to avoid using SchemaType (deprecated) or undefined Schema type.
// --- Schemas ---

const horoscopeSchema = {
  type: Type.OBJECT,
  properties: {
    sign: { type: Type.STRING },
    date: { type: Type.STRING },
    general: { type: Type.STRING, description: "A concise, engaging, and positive daily outlook." },
    love: { type: Type.STRING, description: "Positive and helpful love advice." },
    career: { type: Type.STRING, description: "Encouraging career and finance guidance." },
    health: { type: Type.STRING, description: "Tips for general well-being and self-care." },
    luckyNumber: { type: Type.INTEGER },
    luckyColor: { type: Type.STRING },
    mood: { type: Type.STRING, description: "Current cosmic mood word." }
  },
  required: ["sign", "general", "love", "career", "health", "luckyNumber", "luckyColor", "mood"],
};

const compatibilitySchema = {
  type: Type.OBJECT,
  properties: {
    sign1: { type: Type.STRING },
    sign2: { type: Type.STRING },
    compatibilityScore: { type: Type.INTEGER, description: "Overall score out of 100" },
    summary: { type: Type.STRING },
    emotional: { type: Type.STRING, description: "Emotional connection analysis" },
    communication: { type: Type.STRING, description: "Communication style analysis" },
    challenges: { type: Type.STRING, description: "Potential friction points" },
  },
  required: ["compatibilityScore", "summary", "emotional", "communication", "challenges"],
};

const birthChartSchema = {
  type: Type.OBJECT,
  properties: {
    sunSign: { type: Type.STRING },
    moonSign: { type: Type.STRING },
    risingSign: { type: Type.STRING },
    analysis: { type: Type.STRING, description: "Deep personality analysis based on the big three." },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    element: { type: Type.STRING, description: "Dominant element (Fire, Earth, Air, Water)" },
  },
  required: ["sunSign", "moonSign", "risingSign", "analysis", "strengths", "weaknesses", "element"],
};

const vedicKundliSchema = {
  type: Type.OBJECT,
  properties: {
    rashi: { type: Type.STRING, description: "Moon Sign (Vedic)" },
    nakshatra: { type: Type.STRING, description: "Birth Star" },
    lagna: { type: Type.STRING, description: "Ascendant Sign" },
    planetaryPositions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key planetary placements e.g. 'Sun in Aries'" },
    lifePrediction: { type: Type.STRING, description: "A summary of life path based on Kundli" }
  },
  required: ["rashi", "nakshatra", "lagna", "planetaryPositions", "lifePrediction"]
};

const matchMakingSchema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.INTEGER, description: "Score out of 36" },
    verdict: { type: Type.STRING, description: "e.g., Excellent Match, Average Match, Not Recommended" },
    manglikAnalysis: { type: Type.STRING, description: "Analysis of Mangal Dosha for both" },
    gunaDosha: { type: Type.STRING, description: "Details about Nadi, Bhakoot, Gana doshas if any" },
    analysis: { type: Type.STRING, description: "Detailed marriage compatibility analysis" }
  },
  required: ["score", "verdict", "manglikAnalysis", "gunaDosha", "analysis"]
};

const calculatorSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    result: { type: Type.STRING },
    details: { type: Type.STRING }
  },
  required: ["title", "result", "details"]
};

// --- API Functions ---

// Fix: Always use ai.models.generateContent for querying the model with prompt and model name.
export const getDailyHoroscope = async (sign: ZodiacSign): Promise<HoroscopeData> => {
  const prompt = `Generate a daily horoscope for ${sign} for today, ${new Date().toLocaleDateString()}.
  Requirements:
  1. Tone: Positive, uplifting, and encouraging.
  2. Style: Concise and engaging.
  3. Content Coverage: General, Love, Career, Well-being.
  Ensure the response feels like a professional astrological reading.`;
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: horoscopeSchema,
        temperature: 0.7,
      },
    });
    
    // Fix: Access the extracted string output via .text property (not a method).
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text.trim()) as HoroscopeData;
  } catch (error) {
    console.error("Horoscope Error:", error);
    throw error;
  }
};

export const getCompatibility = async (sign1: ZodiacSign, sign2: ZodiacSign): Promise<CompatibilityData> => {
  const prompt = `Analyze the astrological compatibility between ${sign1} and ${sign2}. Be honest, nuanced, and helpful.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: compatibilitySchema,
        temperature: 0.6,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return { ...JSON.parse(text.trim()), sign1, sign2 } as CompatibilityData;
  } catch (error) {
    console.error("Compatibility Error:", error);
    throw error;
  }
};

export const getBirthChartAnalysis = async (date: string, time: string, place: string): Promise<BirthChartData> => {
  const prompt = `Calculate (approximate) and analyze the Natal Chart for a person born on ${date} at ${time} in ${place}. Identify likely Sun, Moon, and Rising signs based on this data and provide a spiritual personality analysis.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: birthChartSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text.trim()) as BirthChartData;
  } catch (error) {
    console.error("Birth Chart Error:", error);
    throw error;
  }
};

export const getVedicKundli = async (name: string, date: string, time: string, place: string): Promise<VedicKundliData> => {
  const prompt = `Generate a Vedic Kundli analysis for ${name}, born on ${date} at ${time} in ${place}. 
  Calculate the likely Rashi (Moon Sign), Nakshatra (Constellation), and Lagna (Ascendant). 
  Provide a list of key planetary positions and a general life prediction based on Vedic principles.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: vedicKundliSchema,
        temperature: 0.5,
      }
    });
    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text.trim()) as VedicKundliData;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getKundliMatching = async (boy: any, girl: any): Promise<MatchMakingData> => {
  const prompt = `Perform a Vedic Kundli Matching (Gun Milan) for a marriage.
  Boy: ${boy.name}, ${boy.date}, ${boy.time}, ${boy.place}.
  Girl: ${girl.name}, ${girl.date}, ${girl.time}, ${girl.place}.
  
  Provide:
  1. A compatibility score out of 36.
  2. A verdict (e.g. Good match).
  3. Analysis of Manglik Dosha for both.
  4. Note on Guna/Dosha (Nadi, Bhakoot etc).
  5. Detailed analysis.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: matchMakingSchema,
        temperature: 0.5,
      }
    });
    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text.trim()) as MatchMakingData;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getCalculatorResult = async (type: string, data: any): Promise<CalculatorResult> => {
  const prompt = `Perform a Vedic astrology calculation.
  Type: ${type}
  Details: Born on ${data.date} at ${data.time} in ${data.place}.
  
  Return the result (e.g. the Name of the Rashi, or the status of Sade Sati) and a detailed explanation.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: calculatorSchema,
        temperature: 0.5,
      }
    });
    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text.trim()) as CalculatorResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const createAstrologerChat = (): Chat => {
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: "You are Om Jyotish Kendra AI, a wise, empathetic, and professional astrologer. You provide guidance based on planetary movements, zodiac wisdom, and spiritual intuition. Keep responses concise, mystical yet grounded, and very helpful. Do not mention that you are an AI, pretend to be a cosmic guide from Om Jyotish Kendra.",
    }
  });
};
