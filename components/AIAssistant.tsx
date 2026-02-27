import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  AI_SYSTEM_INSTRUCTION, 
  BRAND_NAME, 
  COMPANY_EMAIL, 
  COMPANY_WHATSAPP,
  SERVICES,
  SERVICE_IMAGES,
  PARTNERS 
} from '../constants';

// Initialize the Google AI client with your API key
const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;
const genAI = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
}

// Função para buscar informações contextuais dos serviços
const getServiceInfo = (query: string): string => {
  const serviceInfo = SERVICES.map(s => 
    `- ${s.title}: ${s.description} (Mais informações: ${s.link})`
  ).join('\n');
  
  const partnerInfo = PARTNERS.map(p => 
    `- ${p.name}: ${p.description}`
  ).join('\n');
  
  return `
Informações disponíveis sobre a DEX:

SERVIÇOS:
${serviceInfo}

PARCEIROS ESTRATÉGICOS:
${partnerInfo}

CONTATOS:
- Email: ${COMPANY_EMAIL}
- WhatsApp: ${COMPANY_WHATSAPP}
`;
};

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: `Olá! Sou o assistente virtual da ${BRAND_NAME}. Como posso simplificar o seu dia hoje? Posso ajudar com informações sobre nossos serviços, parcerias, orçamentos ou qualquer outra dúvida.`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || !genAI) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Adicionar mensagem de loading
    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: loadingId,
      text: '...',
      sender: 'ai',
      timestamp: new Date(),
      isLoading: true
    }]);

    try {
      // Construir contexto com informações da empresa
      const contextInfo = getServiceInfo(inputMessage);
      
      // Preparar o prompt com contexto
      const fullPrompt = `${AI_SYSTEM_INSTRUCTION}

CONTEXTO ATUAL DA EMPRESA:
${contextInfo}

HISTÓRICO DA CONVERSA:
${messages.map(msg => `${msg.sender === 'user' ? 'Cliente' : 'Assistente'}: ${msg.text}`).join('\n')}

PERGUNTA DO CLIENTE: ${inputMessage}

INSTRUÇÕES ADICIONAIS:
- Se perguntarem sobre preços, informe que são personalizados e peça para entrar em contato via WhatsApp
- Se perguntarem sobre parcerias, ofereça informações sobre nosso programa de parceiros
- Se perguntarem sobre serviços específicos, forneça detalhes e o link para mais informações
- Sempre mantenha um tom profissional, amigável e focado em soluções
- Se não souber responder, encaminhe para o email ou WhatsApp

RESPOSTA DO ASSISTENTE (seja conciso e direto, máximo 3 parágrafos):`;

      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: fullPrompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 300,
        }
      });

      // Remover mensagem de loading
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));

      const aiResponse = response.text || "Desculpe, não consegui processar sua solicitação. Por favor, tente novamente ou entre em contato pelo WhatsApp.";

      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Se a pergunta for sobre contato, oferecer opções rápidas
      if (inputMessage.toLowerCase().includes('whatsapp') || 
          inputMessage.toLowerCase().includes('contato') ||
          inputMessage.toLowerCase().includes('email')) {
        
        setTimeout(() => {
          const contactMessage: Message = {
            id: (Date.now() + 3).toString(),
            text: `📱 WhatsApp: ${COMPANY_WHATSAPP}\n📧 Email: ${COMPANY_EMAIL}\n\nClique no número para copiar ou enviar mensagem!`,
            sender: 'ai',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, contactMessage]);
        }, 500);
      }

    } catch (error) {
      console.error('Error calling AI:', error);
      
      // Remover mensagem de loading
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: `Desculpe, estou com dificuldades técnicas no momento. Por favor, entre em contato diretamente:\n\n📱 WhatsApp: ${COMPANY_WHATSAPP}\n📧 Email: ${COMPANY_EMAIL}`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    const actions: Record<string, string> = {
      servicos: "Quais são os serviços oferecidos pela DEX?",
      precos: "Gostaria de saber sobre os preços dos serviços",
      parcerias: "Como posso me tornar um parceiro DEX?",
      contato: "Quais são os canais de contato?",
      aquamanager: "Me fale mais sobre o AquaManager",
      gastromanager: "Como funciona o GastroManager?",
      inviteexpress: "O que é o InviteExpress?",
      diasexpress: "Como funciona o serviço de soluções domésticas?"
    };
    
    setInputMessage(actions[action] || action);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden pointer-events-auto animate-slideUp">
          {/* Header */}
          <div className="bg-dexBlue p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${genAI ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
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
            <p className="text-xs text-blue-100 mt-2">Powered by Gemini AI • Online</p>
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
          <div className="px-4 py-2 bg-white border-t border-gray-100">
            <p className="text-[10px] text-gray-400 mb-2 font-medium uppercase tracking-wider">Perguntas rápidas:</p>
            <div className="flex flex-wrap gap-2">
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
              <button 
                onClick={() => handleQuickAction('parcerias')}
                className="text-xs bg-gray-100 hover:bg-dexBlue hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                🤝 Parcerias
              </button>
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dexBlue focus:border-transparent"
                disabled={isLoading || !genAI}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim() || !genAI}
                className="px-4 py-3 bg-dexOrange text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-3 text-center">
              ou envie um email para <a href={`mailto:${COMPANY_EMAIL}`} className="text-dexBlue underline">{COMPANY_EMAIL}</a>
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
