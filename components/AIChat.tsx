import React, { useState, useRef, useEffect } from 'react';
import { createAstrologerChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Sparkles, User, Loader2 } from 'lucide-react';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Namaste. I am the AI spiritual guide for Om Jyotish Kendra. I can answer your questions about astrology, spirituality, and planetary movements. How may I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Use a ref to keep the chat instance across renders
  const chatSession = useRef(createAstrologerChat());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Corrected call to sendMessage with object parameter
      const result = await chatSession.current.sendMessage({ message: userMsg.text });
      
      // Corrected access to response text as a property
      const responseText = result.text;
      
      if (responseText) {
        const botMsg: ChatMessage = {
          role: 'model',
          text: responseText,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: ChatMessage = {
        role: 'model',
        text: "The cosmic connection is weak. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-64px-32px)] md:h-[85vh] py-6 px-4 mb-20 md:mb-0">
      <div className="glass-panel border border-white/50 bg-white/70 rounded-2xl h-full flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-rose-900 p-4 border-b border-rose-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-serif font-bold">Om Jyotish Kendra AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-rose-200">Online & Connected to Cosmos</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-gray-200' : 'bg-rose-100'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-gray-600" /> : <Sparkles className="w-4 h-4 text-rose-600" />}
                </div>

                <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-white text-gray-800 rounded-tr-sm border border-gray-100' : 'bg-rose-50 text-rose-900 border border-rose-100 rounded-tl-sm'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <span className="text-[10px] opacity-50 block mt-2 text-right font-medium">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-rose-50 p-3 rounded-2xl rounded-tl-sm ml-11 flex items-center gap-2 border border-rose-100">
                 <Loader2 className="w-4 h-4 text-rose-400 animate-spin" />
                 <span className="text-xs text-rose-500">Consulting stars...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-rose-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask the stars..."
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIChat;