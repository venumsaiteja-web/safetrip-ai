import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Globe,
  Sparkles,
  ShieldAlert,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Loader2,
} from 'lucide-react';
import { Language, ChatMessage, LocationData } from '../types';
import { askEmergencyAssistant } from '../services/aiAssistantService';

interface AIAssistantViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeLocation: LocationData;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  language,
  onLanguageChange,
  activeLocation,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text:
        language === 'hi'
          ? 'नमस्ते! मैं SafeTrip AI इमरजेंसी असिस्टेंट हूँ। आप मुझसे चक्रवात, भारी बारिश, बाढ़ सुरक्षा या आपातकालीन नंबरों के बारे में पूछ सकते हैं।'
          : language === 'te'
          ? 'నమస్కారం! నేను SafeTrip AI ఎమర్జెన్సీ అసిస్టెంట్‌ని. తుఫాను, వరదలు, భద్రతా సూచనలు లేదా అత్యవసర నెంబర్ల గురించి నన్ను అడగండి.'
          : language === 'ta'
          ? 'வணக்கம்! நான் SafeTrip AI அவசர உதவி உதவியாளர். புயல், வெள்ளம் அல்லது அவசர உதவி எண்கள் பற்றி என்னிடம் கேட்கலாம்.'
          : 'Hello! I am your SafeTrip AI Emergency Assistant. Ask me how to prepare for severe weather, understand alerts, find emergency hotlines, or pack an emergency kit.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
      isAiGenerated: false,
      source: 'offline_rules',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestedQuestions = [
    {
      en: 'What should I pack for a cyclone?',
      hi: 'चक्रवात के लिए क्या पैक करना चाहिए?',
      te: 'తుఫాను కోసం ఎమర్జెన్సీ బ్యాగ్‌లో ఏం సర్దుకోవాలి?',
      ta: 'புயலுக்கு என்ன பேக் செய்ய வேண்டும்?',
    },
    {
      en: 'What should I do if flooding begins?',
      hi: 'यदि होटल में बाढ़ का पानी घुस जाए तो क्या करें?',
      te: 'వరద నీరు వస్తుంటే ఏం చేయాలి?',
      ta: 'வெள்ளம் புகுந்தால் என்ன செய்ய வேண்டும்?',
    },
    {
      en: 'Official emergency numbers in India',
      hi: 'भारत में आधिकारिक आपातकालीन नंबर क्या हैं?',
      te: 'అధికారిక అత్యవసర హెల్ప్‌లైన్ నెంబర్లు తెలపండి',
      ta: 'இந்தியாவில் அதிகாரப்பூர்வ அவசர உதவி எண்கள்',
    },
    {
      en: 'Explain weather warning color codes',
      hi: 'मौसम चेतावनी के रंगों (रेड, ऑरेंज) का क्या मतलब है?',
      te: 'వాతావరణ హెచ్చరిక రంగుల అర్థం ఏమిటి?',
      ta: 'வானிலை எச்சரிக்கை வண்ணங்களின் விளக்கம்',
    },
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
      isAiGenerated: false,
      source: 'offline_rules',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await askEmergencyAssistant(textToSend.trim(), language, activeLocation);
      const assistantMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        isAiGenerated: response.isAiGenerated,
        source: response.source,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Assistant error:', err);
      const fallbackMsg: ChatMessage = {
        id: `reply-err-${Date.now()}`,
        sender: 'assistant',
        text: 'In an urgent crisis, immediately dial 112 (Universal Emergency). SafeTrip AI is currently operating in local safety mode.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        isAiGenerated: false,
        source: 'error_fallback',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-4 animate-fade-in max-w-4xl mx-auto">
      {/* Header card with language selection */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Bot className="w-5 h-5 text-teal-600" />
            <span>Multilingual Emergency Assistant</span>
          </h1>
          <p className="text-xs text-slate-500">
            Safety instructions calibrated for {activeLocation.name}
          </p>
        </div>

        {/* Language switch buttons */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-center">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 hidden sm:inline" />
          {(['en', 'hi', 'te', 'ta'] as Language[]).map((langCode) => {
            const labels: Record<Language, string> = {
              en: 'EN',
              hi: 'हिन्दी',
              te: 'తెలుగు',
              ta: 'தமிழ்',
            };
            return (
              <button
                key={langCode}
                onClick={() => onLanguageChange(langCode)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === langCode
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {labels[langCode]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggested question chips */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {suggestedQuestions.map((q, i) => {
          const chipText = q[language] || q.en;
          return (
            <button
              key={i}
              onClick={() => handleSendMessage(chipText)}
              className="flex-shrink-0 text-xs bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 hover:border-teal-300 px-3 py-1.5 rounded-full font-medium transition-colors shadow-xs"
            >
              &ldquo;{chipText}&rdquo;
            </button>
          );
        })}
      </div>

      {/* Chat Messages Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
        {/* Messages list */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm ${
                    isUser ? 'bg-navy-800' : 'bg-teal-600'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[75%] space-y-1`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-xs ${
                      isUser
                        ? 'bg-navy-900 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Metadata and action buttons */}
                  <div
                    className={`flex items-center space-x-2 text-[10px] text-slate-400 px-1 ${
                      isUser ? 'justify-end' : 'justify-between'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center space-x-1.5 font-medium">
                        {msg.isAiGenerated ? (
                          <span className="text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded flex items-center space-x-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Gemini AI</span>
                          </span>
                        ) : (
                          <span className="text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded flex items-center space-x-1">
                            <ShieldAlert className="w-2.5 h-2.5" />
                            <span>Offline Safety Rules</span>
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="hover:text-slate-600 p-0.5"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs italic p-2">
              <Bot className="w-4 h-4 text-teal-600" />
              <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
              <span>Analyzing safety guidance in your language...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'सुरक्षा, चक्रवात, या आपातकालीन नंबरों के बारे में पूछें...'
                  : language === 'te'
                  ? 'తుఫాను, వరదలు లేదా సహాయం గురించి ఇక్కడ టైప్ చేయండి...'
                  : language === 'ta'
                  ? 'பாதுகாப்பு அல்லது அவசர உதவி பற்றி இங்கே தட்டச்சு செய்யவும்...'
                  : 'Ask about cyclone safety, flood action, or emergency contacts...'
              }
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl shadow-sm transition-all transform active:scale-95 flex-shrink-0"
              title="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Safety Disclaimer Footer */}
          <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 text-slate-400" />
              <span>Does not substitute official emergency response. In life peril, dial 112.</span>
            </span>
            <span className="hidden sm:inline">Offline & Multilingual Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
