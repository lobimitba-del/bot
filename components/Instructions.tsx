
import React from 'react';
import { Terminal, CheckCircle, Play, Smartphone, ShieldAlert, Zap, Clock, AlertTriangle, Coffee, Timer, UserCheck, Power, XCircle, Bug, UserPlus, RefreshCcw, Mic, FileText, Smile } from 'lucide-react';

const Instructions: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-20 text-slate-200">
      
      {/* HEADER DE RECURSOS */}
      <div className="bg-emerald-900/20 border border-emerald-500/50 p-6 rounded-2xl space-y-4 shadow-xl border-l-4">
        <div className="flex items-center gap-3 text-emerald-400">
          <Zap size={32} />
          <h2 className="text-xl font-bold">Super Poderes do Baileys (v3.1)</h2>
        </div>
        <p className="text-sm text-slate-300">
          Diferente do whatsapp-web.js, o Baileys permite interações ricas que convertem muito mais.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-black/30 p-4 rounded-xl border border-emerald-800/30 text-center">
            <Mic className="mx-auto text-emerald-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Áudio PTT</h4>
            <p className="text-[10px] text-slate-400">Envia áudio como se estivesse gravando na hora.</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-emerald-800/30 text-center">
            <Smile className="mx-auto text-emerald-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Reações</h4>
            <p className="text-[10px] text-slate-400">Reage com emojis (✅, ❤️) às mensagens do cliente.</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-emerald-800/30 text-center">
            <FileText className="mx-auto text-emerald-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Docs Pro</h4>
            <p className="text-[10px] text-slate-400">Suporte a PDF, Word e Excel com legenda personalizada.</p>
          </div>
        </div>
      </div>

      {/* INSTALAÇÃO RÁPIDA */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
          <Terminal size={20} /> Como Instalar (Node.js)
        </h3>
        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-blue-300 space-y-2">
          <p># 1. Crie sua pasta e entre nela</p>
          <p>mkdir bot-jose && cd bot-jose</p>
          <p># 2. Inicie o projeto e instale as dependências</p>
          <p>npm init -y</p>
          <p>npm install @whiskeysockets/baileys pino</p>
          <p># 3. Crie o arquivo index.js, cole o código e rode</p>
          <p>node index.js</p>
        </div>
      </div>

      {/* DICA DE OURO */}
      <div className="bg-amber-900/20 border border-amber-500/50 p-6 rounded-2xl flex gap-4 items-start shadow-xl border-l-4">
        <AlertTriangle className="text-amber-400 shrink-0" size={24} />
        <div>
          <h4 className="font-bold text-amber-400 text-sm">Dica Anti-Ban:</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Sempre que conectar um número novo, peça para 5 amigos mandarem mensagem primeiro e responda-os manualmente. Isso "aquece" o número no servidor do WhatsApp antes do bot assumir 100%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
