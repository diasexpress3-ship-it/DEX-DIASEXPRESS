import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  BRAND_NAME, 
  COMPANY_EMAIL, 
  COMPANY_WHATSAPP,
  SERVICES 
} from '../constants';

// Declaração de tipos para o SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Initialize the Google AI client
const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;
const genAI = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
}

// Função para obter lista de serviços formatada
const getServicesList = (): string => {
  return SERVICES.map(s => `• **${s.title}**: ${s.description}`).join('\n');
};

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: `👋 Olá! Sou o assistente virtual da ${BRAND_NAME}. Represento o fundador **Vicente Dias**. Como posso simplificar o seu dia hoje?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Inicializar reconhecimento de voz
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-PT';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de voz. Tente Chrome, Edge ou Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInputMessage('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Função para detectar o tipo de pergunta
  const detectQuestionType = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes('serviço') || q.includes('serviços') || q.includes('oferece') || q.includes('faz')) {
      return 'services';
    }
    if (q.includes('ceo') || q.includes('fundador') || q.includes('vicente') || q.includes('dias')) {
      return 'ceo';
    }
    if (q.includes('contato') || q.includes('contacto') || q.includes('whatsapp') || q.includes('email')) {
      return 'contact';
    }
    if (q.includes('preço') || q.includes('precos') || q.includes('custo') || q.includes('valor')) {
      return 'pricing';
    }
    return 'general';
  };

  // Respostas rápidas para perguntas comuns (fallback)
  const getQuickResponse = (question: string): string => {
    const type = detectQuestionType(question);
    
    switch(type) {
      case 'services':
        return `📋 **Nossos Serviços:**

${getServicesList()}

Todos os nossos serviços operam em Moçambique com a qualidade e inovação DEX. Posso dar mais detalhes sobre algum específico?`;
      
      case 'ceo':
        return `👔 **Sobre a Liderança:**

O **Vicente Dias** é o CEO e Fundador da ${BRAND_NAME}, liderando a inovação digital em Moçambique desde a fundação da empresa.

📍 **Localização:** Maputo, Moçambique
💼 **Missão:** Digitalizar serviços e processos em Moçambique

Posso ajudar com mais informações sobre a empresa?`;
      
      case 'contact':
        return `📱 **Canais de Contato:**

**WhatsApp:** ${COMPANY_WHATSAPP}
**Email:** ${COMPANY_EMAIL}

👔 **CEO & Founder:** Vicente Dias
📍 **Localização:** Maputo, Moçambique

Estamos prontos para atender você!`;
      
      case 'pricing':
        return `💰 **Informações de Preços:**

Os preços dos nossos serviços são personalizados de acordo com cada necessidade. Para um orçamento específico, entre em contato:

📱 **WhatsApp:** ${COMPANY_WHATSAPP}
📧 **Email:** ${COMPANY_EMAIL}

Um representante DEX responderá em breve!`;
      
      default:
        return `Olá! Sou o assistente da DEX. Aqui estão as principais informações:

👔 **CEO & Founder:** Vicente Dias
📍 **Localização:** Maputo, Moçambique

📋 **Serviços:**
${getServicesList().split('\n').slice(0, 2).join('\n')}...

📱 **Contato:** ${COMPANY_WHATSAPP} | ${COMPANY_EMAIL}

Sobre o que gostaria de saber mais?`;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: loadingId,
      text: '...',
      sender: 'ai',
      timestamp: new Date(),
      isLoading: true
    }]);

    try {
      // Se não tem API Key ou se queremos usar respostas rápidas para testes
      if (!genAI) {
        // Usar respostas rápidas
        setTimeout(() => {
          setMessages(prev => prev.filter(msg => msg.id !== loadingId));
          
          const response = getQuickResponse(inputMessage);
          
          setMessages(prev => [...prev, {
            id: (Date.now() + 2).toString(),
            text: response,
            sender: 'ai',
            timestamp: new Date()
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Informações completas sobre a empresa
      const companyInfo = `
EMPRESA: ${BRAND_NAME}
FUNDADOR E CEO: Vicente Dias
LOCALIZAÇÃO: Maputo, Moçambique
EMAIL: ${COMPANY_EMAIL}
WHATSAPP: ${COMPANY_WHATSAPP}

SERVIÇOS OFERECIDOS:
${SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n')}

LINKS DOS SERVIÇOS:
${SERVICES.map(s => `- ${s.title}: ${s.link}`).join('\n')}
`;

      const fullPrompt = `Você é o assistente virtual oficial da ${BRAND_NAME}, representando o fundador Vicente Dias.

INFORMAÇÕES OFICIAIS DA EMPRESA (USE SEMPRE ESTAS INFORMAÇÕES):
${companyInfo}

REGRAS IMPORTANTES:
1. SEMPRE inclua informações sobre os serviços quando perguntado
2. Se perguntarem sobre o CEO, diga que é Vicente Dias, fundador da empresa em Maputo
3. Se perguntarem sobre serviços, liste TODOS os serviços com suas descrições
4. Se perguntarem sobre preços, diga que são personalizados e peça contato via WhatsApp
5. Se perguntarem sobre contato, forneça email e WhatsApp
6. Responda em português de Moçambique, tom profissional e amigável

PERGUNTA DO CLIENTE: ${inputMessage}

SUA RESPOSTA (seja direto e útil, inclua emojis apropriados):`;

      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: fullPrompt,
        config: {
          temperature: 0.3,
          maxOutputTokens: 500,
        }
      });

      setMessages(prev => prev.filter(msg => msg.id !== loadingId));

      const aiResponse = response.text || getQuickResponse(inputMessage);

      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error('Error calling AI:', error);
      
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));
      
      // Fallback com respostas rápidas baseadas no tipo de pergunta
      const fallbackResponse = getQuickResponse(inputMessage);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        text: fallbackResponse,
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    const actions: Record<string, string> = {
      ceo: "Quem é o CEO da DEX?",
      servicos: "Quais são os serviços da DEX?",
      contato: "Como posso entrar em contato?",
      precos: "Quanto custam os serviços?"
    };
    
    setInputMessage(actions[action] || action);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden pointer-events-auto animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-dexBlue to-dexDarkBlue p-6 text-white">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${genAI ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                <h3 className="font-black uppercase tracking-widest text-sm">DEX ASSISTANT</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <p className="text-xs text-blue-100">Representante oficial • Vicente Dias, CEO</p>
          </div>
          
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.isLoading ? (
                  <div className="bg-white text-gray-800 p-4 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-dexBlue rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-dexBlue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-dexBlue rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-dexOrange text-white rounded-br-none' 
                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <p className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-orange-100' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            <p className="text-[10px] text-gray-400 mb-2 font-medium uppercase tracking-wider">Perguntas rápidas:</p>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleQuickAction('ceo')}
                className="text-xs bg-gray-100 hover:bg-dexBlue hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                👔 CEO
              </button>
              <button 
                onClick={() => handleQuickAction('servicos')}
                className="text-xs bg-gray-100 hover:bg-dexBlue hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                📋 Serviços
              </button>
              <button 
                onClick={() => handleQuickAction('precos')}
                className="text-xs bg-gray-100 hover:bg-dexBlue hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                💰 Preços
              </button>
              <button 
                onClick={() => handleQuickAction('contato')}
                className="text-xs bg-gray-100 hover:bg-dexBlue hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                📞 Contato
              </button>
            </div>
          </div>

          {/* Input with Voice */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="w-full px-4 py-3 pr-12 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dexBlue focus:border-transparent"
                  disabled={isLoading}
                />
                {recognitionRef.current && (
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                      isListening ? 'bg-dexOrange text-white animate-pulse' : 'text-gray-400 hover:text-dexBlue'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="px-4 py-3 bg-dexOrange text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-3 text-center">
              ou envie email para <a href={`mailto:${COMPANY_EMAIL}`} className="text-dexBlue underline">{COMPANY_EMAIL}</a>
            </p>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${
          isOpen ? 'bg-dexDarkBlue rotate-90' : 'bg-dexBlue hover:bg-dexOrange'
        } group relative overflow-hidden`}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
            </svg>
            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform"></div>
          </>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;
