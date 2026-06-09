import React, { useState, useEffect } from 'react';
import { 
  Settings, Megaphone, ChevronDown, Check, Zap, Globe, Cpu, 
  Menu, X, ArrowRight, Search, Sparkles, Send, ArrowLeft, 
  Briefcase, PenTool, Hammer, Target, Code, ExternalLink
} from 'lucide-react';

export default function App() {
  const [isConsultantOpen, setIsConsultantOpen] = useState(true);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Сетка логотипов партнеров */}
          <div className="grid grid-cols-2 gap-8 items-center justify-items-center max-w-lg mx-auto py-8">
            <img src="/logos/google-gemini.png" alt="Google Gemini" className="h-10 object-contain" />
            <img src="/logos/chatgpt.png" alt="ChatGPT" className="h-10 object-contain" />
            <img src="/logos/apple.png" alt="Apple" className="h-10 object-contain" />
            <img src="/logos/microsoft-copilot.png" alt="Copilot" className="h-10 object-contain" />
          </div>

          {/* Блок консультанта */}
          {isConsultantOpen && (
            <div className="container mx-auto mt-10">
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setIsConsultantOpen(false)}
                  className="bg-yellow-600 px-6 py-2 rounded-lg text-black font-bold"
                >
                  Закрыть консультанта
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}