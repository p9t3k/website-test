import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hi! I\'m NexusBot. Ask me about P9 Nodes, Octopus Mode, or technical specs.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg shadow-blue-500/20 dark:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 hover:scale-110 border border-white/10 ${
          isOpen ? 'bg-slate-800 dark:bg-navy-800 rotate-90' : 'bg-gradient-to-r from-blue-600 to-blue-400'
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 h-[500px] bg-white/95 dark:bg-[#050A14]/95 backdrop-blur-xl rounded-3xl flex flex-col shadow-2xl border border-slate-200 dark:border-blue-500/30 overflow-hidden animate-float">
          
          {/* Header */}
          <div className="p-4 bg-slate-100 dark:bg-gradient-to-r dark:from-blue-900/50 dark:to-navy-900 border-b border-slate-200 dark:border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">NexusBot AI</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-white dark:bg-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 text-sm border shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600/10 dark:bg-blue-600/20 border-blue-200 dark:border-blue-500/50 text-slate-800 dark:text-white rounded-2xl rounded-tr-sm'
                      : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2 border border-slate-200 dark:border-white/10">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500 dark:text-blue-400" />
                  <span className="text-xs text-slate-500 dark:text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about nodes..."
                className="flex-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-400 transition-colors placeholder-slate-400 dark:placeholder-gray-600"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/50 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30 disabled:opacity-50 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-gray-600 mt-2 text-center font-mono">
              Powered by Gemini 2.5 Flash
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportChat;