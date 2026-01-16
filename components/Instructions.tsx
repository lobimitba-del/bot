
import React from 'react';
import { Terminal, CheckCircle, Play, Smartphone, ShieldAlert, Trash2, Zap, Clock, AlertTriangle, Coffee, Timer, Briefcase, UserCheck } from 'lucide-react';

interface InstructionsProps {
  onGoToCode?: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onGoToCode }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-20 text-slate-200">
      
      {/* SEÇÃO WHATSAPP BUSINESS */}
      <div className="bg-emerald-900/20 border border-emerald-500/50 p-6 rounded-2xl space-y-4 shadow-xl border-l-4">
        <div className="flex items-center gap-3 text-emerald-400">
          <Briefcase size={32} />
          <h2 className="text-xl font-bold italic">Atenção: Você usa WhatsApp Business!</h2>
        </div>
        <p className="text-sm text-slate-300">
          Contas comerciais são o alvo principal dos filtros de segurança da Meta. Como seu número caiu várias vezes ontem, o "Robô Anti-Spam" deles está de olho em você.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          <div className="bg-black/40 p-4 rounded-xl border border-emerald-800/30">
            <h4 className="text-emerald-400 text-sm font-bold flex items-center gap-2 mb-2"><UserCheck size={16}/> Recomendações Business:</h4>
            <ul className="text-[11px] text-slate-400 space-y-2">
              <li>• Não mande mensagens para listas de contatos frias agora.</li>
              <li>• Peça para 2 ou 3 amigos mandarem mensagem para você e <b>responda manualmente</b>.</li>
              <li>• Isso "aquece" a conta e mostra que há um humano por trás do Business.</li>
            </ul>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-emerald-800/30">
            <h4 className="text-emerald-400 text-sm font-bold flex items-center gap-2 mb-2"><Clock size={16}/> Por que esperar?</h4>
            <ul className="text-[11px] text-slate-400 space-y-2">
              <li>• O servidor da Meta reseta as "flags" de erro a cada 24h de estabilidade.</li>
              <li>• Se você forçar agora, pode tomar um banimento de 24h ou 72h.</li>
              <li>• <b>Paciência é lucro no Business.</b></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Timer size={20} /> Protocolo v2.4
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Esta versão foi ajustada para parecer um usuário de Windows usando Chrome. É o perfil que menos desperta alertas em contas Business recém-recuperadas.
          </p>
        </section>

        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-green-400 flex items-center gap-2">
            <CheckCircle size={20} /> Passo Final (Amanhã)
          </h3>
          <ol className="text-xs text-slate-400 space-y-2 list-decimal pl-4">
            <li>Apague a pasta <code className="text-white">auth_info_baileys</code>.</li>
            <li>Use o código da <b>Versão 2.4</b>.</li>
            <li>Escaneie o QR Code e <b>não envie mensagens por 5 minutos</b>.</li>
            <li>Deixe o bot "respirar" antes do primeiro atendimento.</li>
          </ol>
        </section>
      </div>

      <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl text-[11px] text-slate-500 text-center italic">
        "O WhatsApp Business é uma ferramenta de confiança. Recupere a confiança do servidor antes de automatizar."
      </div>
    </div>
  );
};

export default Instructions;
