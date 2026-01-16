
import React, { useState, useRef, useEffect } from 'react';
// Added MessageSquare to the imported icons from lucide-react to resolve the reference error
import { Send, User, Bot, RefreshCw, MessageSquare } from 'lucide-react';
import { BotState, ChatMessage } from '../types';
import { SIM, NAO } from '../constants';

const BotSimulator: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [state, setState] = useState<BotState | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (sender: 'bot' | 'user', text: string) => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      text,
      timestamp: new Date()
    }]);
  };

  const handleUserMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const text = inputText.trim();
    const normalized = text.toLowerCase();
    addMessage('user', text);
    setInputText('');
    processBotLogic(normalized);
  };

  const processBotLogic = async (text: string) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulating network/delay

    if (!state) {
      setState(BotState.INICIO);
      addMessage('bot', '⚠️ Leia antes de continuar.\n\nEste material é um ensinamento espiritual aplicado à vida real.\nBaseado na história de José do Egito.\n\nDigite:\n1️⃣ Quero continuar\n2️⃣ Não é pra mim');
    } else if (text === 'liberar') {
      addMessage('bot', '🙏 Gratidão pela contribuição!\nVou te enviar agora todos os bônus prometidos.');
      await new Promise(r => setTimeout(r, 1000));
      addMessage('bot', '📄 [PDF] 40 ESBOÇOS EM ATOS DOS APÓSTOLOS.pdf');
      await new Promise(r => setTimeout(r, 500));
      addMessage('bot', '📄 [PDF] 50 - JEREMIAS_otimizado.pdf');
      addMessage('bot', '🙏 Que Deus te abençoe. Use com sabedoria.');
    } else if (state === BotState.INICIO) {
      if (SIM.includes(text) || SIM.some(s => text.includes(s))) {
        setState(BotState.PERMISSAO);
        addMessage('bot', '📲 Você vai receber acesso a um APLICATIVO DE ESTUDO com:\n• Estudo completo de José do Egito\n• Aplicações espirituais, emocionais, profissionais e financeiras.');
        await new Promise(r => setTimeout(r, 1000));
        addMessage('bot', 'Aqui funciona no modelo conta-entrega.\n\nVocê recebe primeiro.\nDepois, se fizer sentido, contribui via Pix.\n\nPosso te enviar o link agora?\n\n1️⃣ Pode enviar\n2️⃣ Prefiro não receber');
      } else if (NAO.includes(text) || NAO.some(n => text.includes(n))) {
        setState(BotState.FIM);
        addMessage('bot', 'Tudo bem 🙏 Que Deus te abençoe.');
      } else {
        addMessage('bot', 'Responda apenas:\n1️⃣ para continuar\n2️⃣ para sair');
      }
    } else if (state === BotState.PERMISSAO) {
      if (SIM.includes(text) || SIM.some(s => text.includes(s))) {
        setState(BotState.ENTREGA);
        addMessage('bot', '📲 Acesso ao estudo:\n👉 https://jose-delta.vercel.app/\n\nExplore com calma 🙏');
      } else if (NAO.includes(text) || NAO.some(n => text.includes(n))) {
        setState(BotState.FIM);
        addMessage('bot', 'Tudo bem 🙏 Fique com Deus.');
      } else {
        addMessage('bot', 'Responda:\n1️⃣ para receber o link\n2️⃣ para encerrar');
      }
    } else {
      addMessage('bot', 'Olá! Se quiser os bônus após sua contribuição, digite "liberar".');
    }
    
    setIsTyping(false);
  };

  const resetChat = () => {
    setMessages([]);
    setState(null);
    setInputText('');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Simulador de Chat <span className="text-sm font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Lógica Baileys</span>
          </h2>
          <p className="text-slate-400 text-sm">Teste a máquina de estados (INICIO -> CONTEUDO -> PERMISSAO...)</p>
        </div>
        <button 
          onClick={resetChat}
          className="p-2 hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-white"
          title="Resetar"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* State Visualizer */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {[BotState.INICIO, BotState.CONTEUDO, BotState.PERMISSAO, BotState.ENTREGA, BotState.FIM].map((s) => (
          <div 
            key={s}
            className={`text-[10px] text-center py-1 rounded border ${
              state === s 
                ? 'bg-blue-600 border-blue-400 text-white font-bold animate-pulse' 
                : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-2xl">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700"
        >
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center flex-col text-slate-600 gap-3">
              <MessageSquare size={48} className="opacity-20" />
              <p className="text-sm">Envie "Oi" ou qualquer mensagem para começar.</p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === 'user' ? 'bg-indigo-600' : 'bg-green-600'
                }`}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleUserMessage} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua resposta (ex: 1 ou sim)..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 p-2 rounded-lg text-white transition disabled:opacity-50"
            disabled={isTyping || !inputText.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">
          Nota: Experimente responder com <code className="bg-slate-800 px-1 py-0.5 rounded">1</code> ou <code className="bg-slate-800 px-1 py-0.5 rounded">liberar</code>
        </p>
      </div>
    </div>
  );
};

export default BotSimulator;
