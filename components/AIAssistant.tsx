import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Interface simplificada para mensagens
interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsActive(false);
  }, []);

  const startSession = async () => {
    try {
      setError(null);
      
      const apiKey = import.meta.env.VITE_GOOGLE_AI_KEY || process.env.API_KEY;
      if (!apiKey) {
        setError("Chave de API não configurada");
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Versão simplificada - apenas texto por enquanto
      const session = await ai.live.connect({
        model: 'gemini-2.0-flash-exp',
        config: {
          systemInstruction: {
            role: 'system',
            parts: [{ text: AI_SYSTEM_INSTRUCTION }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048
          }
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
          },
          onmessage: (message: any) => {
            // Processar mensagem de forma simplificada
            if (message?.serverContent?.modelTurn?.parts) {
              const parts = message.serverContent.modelTurn.parts;
              for (const part of parts) {
                if (part.text) {
                  setMessages(prev => [...prev, { 
                    text: part.text, 
                    sender: 'ai' 
                  }]);
                }
              }
            }
          },
          onerror: (e: any) => {
            console.error('Gemini Error:', e);
            setError("Erro na conexão. Tente novamente.");
            stopSession();
          },
          onclose: () => {
            stopSession();
          }
        }
      });

      sessionRef.current = session;

    } catch (err) {
      console.error('Failed to start AI Assistant:', err);
      setError("Erro ao iniciar. Verifique sua conexão.");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !sessionRef.current || !isActive) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputText('');
    setIsLoading(true);

    try {
      // Enviar mensagem para o modelo
      await sessionRef.current.sendRealtimeInput({
        media: {
          data: btoa(userMessage),
          mimeType: 'text/plain'
        }
      });
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setError("Erro ao enviar mensagem.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAssistant = () => {
    if (isOpen) {
      stopSession();
      setIsOpen(false);
      setMessages([]);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden pointer-events-auto animate-slideUp">
          <div className="bg-dexBlue p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <h3 className="font-black uppercase tracking-widest text-xs">DEX Smart Assistant</h3>
            </div>
            <button onClick={toggleAssistant} className="text-white/50 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto bg-gray-50/50 flex flex-col">
            {!isActive ? (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-sm">Clique em "INICIAR CONVERSA" para começar.</p>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-dexOrange text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {error && (
              <div className="text-red-500 text-sm text-center p-3">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {isActive ? (
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dexOrange text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="bg-dexOrange text-white px-4 py-2 rounded-xl hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-bold"
                >
                  Enviar
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={startSession}
                className="w-full bg-dexOrange text-white font-black py-3 px-4 rounded-xl hover:bg-opacity-90 transition-all text-sm tracking-widest uppercase"
              >
                INICIAR CONVERSA
              </button>
            </div>
          )}
        </div>
      )}

      <button
        onClick={toggleAssistant}
        className={`pointer-events-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${
          isOpen ? 'bg-dexDarkBlue rotate-90' : 'bg-dexBlue hover:bg-dexOrange'
        } group relative overflow-hidden`}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;
