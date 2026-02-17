import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Interfaces para tipagem correta
interface LiveServerMessage {
  serverContent?: {
    outputTranscription?: {
      text: string;
    };
    turnComplete?: boolean;
    modelTurn?: {
      parts?: Array<{
        inlineData?: {
          data: string;
          mimeType: string;
        };
        text?: string;
      }>;
    };
    interrupted?: boolean;
  };
}

interface Blob {
  data: string;
  mimeType: string;
}

// Manual Base64 decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Manual Base64 encoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Manual PCM decoding
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const currentOutputTranscriptionRef = useRef('');

  const stopSession = useCallback(() => {
    if (sessionPromiseRef.current) {
      sessionPromiseRef.current.then(session => {
        session.close();
      });
      sessionPromiseRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    setIsActive(false);
    setTranscription('');
    currentOutputTranscriptionRef.current = '';
  }, []);

  const startSession = async () => {
    try {
      setError(null);
      
      // Verificar se a API key existe
      const apiKey = import.meta.env.VITE_GOOGLE_AI_KEY || process.env.API_KEY;
      if (!apiKey) {
        setError("Chave de API não configurada");
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }
      if (!outputAudioContextRef.current) {
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const sessionPromise = ai.live.connect({
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
        }
      });

      const session = await sessionPromise;
      sessionPromiseRef.current = sessionPromise;

      // Configurar callbacks após conexão
      if (session) {
        // @ts-ignore - Lidando com tipos complexos da API
        session.on('open', () => {
          setIsActive(true);
          
          if (audioContextRef.current && micStreamRef.current) {
            const source = audioContextRef.current.createMediaStreamSource(micStreamRef.current);
            const scriptProcessor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              // @ts-ignore
              session.sendRealtimeInput({ media: pcmBlob });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current.destination);
          }
        });

        // @ts-ignore
        session.on('message', async (message: LiveServerMessage) => {
          // Extrair transcrição
          if (message.serverContent?.outputTranscription?.text) {
            const text = message.serverContent.outputTranscription.text;
            currentOutputTranscriptionRef.current += text;
            setTranscription(currentOutputTranscriptionRef.current);
          }
          
          if (message.serverContent?.turnComplete) {
            currentOutputTranscriptionRef.current = '';
          }

          // Processar áudio
          const base64EncodedAudioString = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (base64EncodedAudioString && outputAudioContextRef.current) {
            const ctx = outputAudioContextRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            
            try {
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                ctx,
                24000,
                1,
              );
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            } catch (audioErr) {
              console.error('Erro ao processar áudio:', audioErr);
            }
          }

          // Interrupção
          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(source => {
              try {
                source.stop();
              } catch (e) {}
            });
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
            currentOutputTranscriptionRef.current = '';
            setTranscription('');
          }
        });

        // @ts-ignore
        session.on('error', (e: any) => {
          console.error('Gemini Live Error:', e);
          setError("Conexão interrompida. Tente novamente.");
          stopSession();
        });

        // @ts-ignore
        session.on('close', () => {
          stopSession();
        });
      }

    } catch (err) {
      console.error('Failed to start AI Assistant:', err);
      setError("Permissão de microfone negada ou erro de rede.");
    }
  };

  const toggleAssistant = () => {
    if (isOpen) {
      stopSession();
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, [stopSession]);

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
          
          <div className="p-8 h-64 overflow-y-auto bg-gray-50/50 flex flex-col justify-center text-center">
            {isActive ? (
              <div className="space-y-6">
                <div className="flex justify-center items-center gap-1 h-8">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-dexBlue rounded-full animate-bounce" 
                      style={{ 
                        height: '60%', 
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0.7
                      }}
                    />
                  ))}
                </div>
                <p className="text-gray-600 font-medium italic animate-pulse">Assistente ouvindo...</p>
                {transcription && (
                  <div className="text-xs text-gray-400 line-clamp-4 px-4 bg-white/50 p-3 rounded-xl">
                    {transcription}
                  </div>
                )}
              </div>
            ) : error ? (
              <div className="text-red-500 font-bold text-sm">
                <p className="mb-4">{error}</p>
                <button 
                  onClick={startSession} 
                  className="bg-dexBlue text-white px-6 py-2 rounded-xl text-xs hover:bg-opacity-90 transition-all"
                >
                  Tentar Novamente
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-gray-500 font-light leading-relaxed">
                  "Olá! Sou a Inteligência DEX. Posso explicar nossos serviços ou ajudar com orçamentos via voz."
                </p>
                <button 
                  onClick={startSession}
                  className="bg-dexOrange text-white font-black py-4 px-8 rounded-2xl shadow-xl hover:scale-105 transition-all text-xs tracking-widest uppercase"
                >
                  INICIAR CONVERSA
                </button>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-100 text-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
            Powered by DEX Intelligence
          </div>
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
