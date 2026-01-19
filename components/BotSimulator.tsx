
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, RefreshCw, FileText, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '../types';

const BotSimulator: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (sender: 'bot' | 'user', text: string, type: 'text' | 'file' = 'text') => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      text,
      timestamp: new Date(),
      type
    }]);
  };

  const processBotLogic = async (text: string) => {
    setIsTyping(true);
    const input = text.toLowerCase().trim();
    
    // Simula o gatilho "Confirmado" (Admin ou Cliente)
    if (input.includes('confirmado')) {
      await new Promise(r => setTimeout(r, 600));
      setStep(3);
      addMessage('bot', '✅ Pagamento identificado!\n\nEscolha seu bônus:\n1 - Cartas de Paulo (Parte 1)\n2 - Cartas de Paulo (Parte 2)\n3 - Estudos e Esboços');
      setIsTyping(false);
      return;
    }

    await new Promise(r => setTimeout(r, 1000));

    if (messages.length === 0) {
      setStep(0);
      addMessage('bot', '⚠️ Leia antes de continuar...\nDeseja continuar? SIM ou NÃO.');
    } else if (step === 0) {
      if (['sim','1','s'].includes(input)) {
        setStep(1);
        addMessage('bot', '📲 O que você vai receber ao continuar:\n\n✔ Aplicativo de Estudo\n✔ Estudo José do Egito\n✔ Bônus de Cartas\n\nPosso enviar?');
      }
    } else if (step === 1) {
      if (['sim','1','s'].includes(input)) {
        setStep(2);
        addMessage('bot', 'Link: https://jose-delta.vercel.app/\n\nPix: [CHAVE]\n\nEnvie o comprovante.');
      }
    } else if (step === 3) {
      const files: any = {
        '1': ['Romanos.pdf', 'Corintios.pdf', 'Galatas.pdf', 'Efesios.pdf', 'Filipenses.pdf'],
        '2': ['Colossenses.pdf', 'Tessalonicenses.pdf', 'Timoteo.pdf', 'Tito.pdf', 'Filemom.pdf'],
        '3': ['100_ESBOCOS.pdf', 'Apocalipse.pdf', 'Atos.pdf', 'Jeremias.pdf', 'Joao.pdf', 'Devocional.pdf']
      };

      if (files[input]) {
        addMessage('bot', `Enviando pacote ${input} (${files[input].length} arquivos)...`);
        for (const fileName of files[input]) {
          await new Promise(r => setTimeout(r, 400));
          addMessage('bot', `📄 ${fileName}`, 'file');
        }
        addMessage('bot', 'Envio concluído! 🙏');
      }
    }
    
    setIsTyping(false);
  };

  const handleUserMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    const text = inputText.trim();
    addMessage('user', text);
    setInputText('');
    processBotLogic(text);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">Simulador v3.5 (Admin Trigger)</h2>
        <button onClick={() => {setMessages([]); setStep(0);}} className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg: any) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 max-w-[85%] rounded-2xl text-sm whitespace-pre-wrap flex items-start gap-2 ${msg.sender === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                {msg.type === 'file' && <FileText size={16} className="shrink-0 text-blue-400" />}
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-xs text-slate-500 animate-pulse">Bot processando...</div>}
        </div>
        
        <form onSubmit={handleUserMessage} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite 'confirmado' para testar o gatilho..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 p-2.5 rounded-xl text-white">
            <Send size={18} />
          </button>
        </form>
      </div>
      
      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-xl flex items-center gap-3">
        <ShieldCheck className="text-blue-400 shrink-0" size={20} />
        <p className="text-xs text-blue-200">
          <strong>TESTE ADMIN:</strong> Digite <b>confirmado</b> no campo acima. Agora o bot responderá mesmo que seja você enviando a mensagem no WhatsApp.
        </p>
      </div>
    </div>
  );
};

export default BotSimulator;
