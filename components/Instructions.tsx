
import React from 'react';
import { Terminal, CheckCircle, Play, Smartphone, ShieldAlert, Trash2, Zap, Clock, AlertTriangle, Coffee, Timer } from 'lucide-react';

interface InstructionsProps {
  onGoToCode?: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onGoToCode }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-20 text-slate-200">
      
      {/* PROTOCOLO DE RECUPERAÇÃO */}
      <div className="bg-blue-900/20 border border-blue-500/50 p-6 rounded-2xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Timer size={120} />
        </div>
        
        <div className="flex items-center gap-3 text-blue-400">
          <Coffee size={32} />
          <h2 className="text-xl font-bold italic">Protocolo de Descanso (Recomendado)</h2>
        </div>

        <p className="text-sm text-slate-300 max-w-2xl">
          Como você tentou muitas vezes desde ontem, os servidores da Meta colocaram seu número em uma "quarentena de conexão". Para sair dela, siga este cronograma:
        </p>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">1</div>
            <div>
              <h4 className="font-bold text-sm">Agora até +2 horas: Silêncio Total</h4>
              <p className="text-[11px] text-slate-400">Deslogue o WhatsApp Web do celular. Não tente rodar o script. Apague a pasta <code className="text-white">auth_info_baileys</code> do seu PC agora.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-slate-700 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">2</div>
            <div>
              <h4 className="font-bold text-sm">Uso Manual: Volte a ser "Humano"</h4>
              <p className="text-[11px] text-slate-400">Mande algumas mensagens manuais para amigos ou familiares pelo celular. Isso mostra ao servidor que o número é real e está ativo normalmente.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-slate-700 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">3</div>
            <div>
              <h4 className="font-bold text-sm">Amanhã de manhã: Nova Tentativa</h4>
              <p className="text-[11px] text-slate-400">Use o código da <b>Versão 2.3</b>. Ele tem um processo de entrada mais lento para não disparar os alarmes da Meta.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
            <AlertTriangle size={20} /> O que evitar?
          </h3>
          <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
            <li>Não tente conectar e desconectar várias vezes seguidas.</li>
            <li>Não use o bot para mandar mensagens em massa para quem não tem seu contato.</li>
            <li>Se o QR Code demorar para ler, <b>não cancele</b>. Espere até 2 minutos.</li>
          </ul>
        </section>

        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-green-400 flex items-center gap-2">
            <CheckCircle size={20} /> Checklist da Vitória
          </h3>
          <ul className="text-xs text-slate-400 space-y-2 list-none">
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Pasta de sessão deletada? ✅</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Outros aparelhos desconectados? ✅</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Node-cache instalado? ✅</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Paciência no máximo? ✅</li>
          </ul>
        </section>
      </div>

      <div className="bg-orange-600/10 border border-orange-500/20 p-4 rounded-xl text-[11px] text-orange-400/80 text-center italic">
        "O algoritmo da Meta esquece erros em 24 horas. Se você der esse tempo a ele, seu bot voltará a voar."
      </div>
    </div>
  );
};

export default Instructions;
