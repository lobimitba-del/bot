
import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  MessageSquare, 
  Play, 
  FileJson, 
  CheckCircle2, 
  Copy, 
  AlertTriangle,
  RefreshCw,
  FolderX
} from 'lucide-react';
import { BAILEYS_CODE } from './constants';
import BotSimulator from './components/BotSimulator';
import Instructions from './components/Instructions';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'simulate' | 'setup' | 'errors'>('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BAILEYS_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-green-500/20 p-2 rounded-lg border border-green-500/30">
            <MessageSquare className="text-green-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Bot José do Egito <span className="text-slate-400 text-sm font-normal ml-2">v3.5</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Admin Trigger & Multi-PDF</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shadow-xl z-10">
          <nav className="flex-1 p-4 space-y-2">
            <SidebarItem icon={<Terminal size={20} />} label="1. Setup" active={activeTab === 'setup'} onClick={() => setActiveTab('setup')} />
            <SidebarItem icon={<AlertTriangle size={20} className="text-amber-500" />} label="⚠️ Erro 'Bad MAC'?" active={activeTab === 'errors'} onClick={() => setActiveTab('errors')} />
            <SidebarItem icon={<Code2 size={20} />} label="2. Pegar Código" active={activeTab === 'code'} onClick={() => setActiveTab('code')} />
            <SidebarItem icon={<Play size={20} />} label="3. Testar Chat" active={activeTab === 'simulate'} onClick={() => setActiveTab('simulate')} />
          </nav>
        </aside>

        <section className="flex-1 overflow-auto bg-slate-950">
          {activeTab === 'code' && (
            <div className="p-6 max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-200">
                  <FileJson className="text-yellow-400" /> index.js (v3.5 Final)
                </h2>
                <button onClick={handleCopy} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-md font-medium transition hover:bg-blue-500">
                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />} {copied ? 'Copiado!' : 'Copiar Código'}
                </button>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto shadow-2xl">
                <pre><code>{BAILEYS_CODE}</code></pre>
              </div>
            </div>
          )}

          {activeTab === 'simulate' && <BotSimulator />}
          {activeTab === 'setup' && <Instructions />}
          {activeTab === 'errors' && <ErrorSolution />}
        </section>
      </main>
    </div>
  );
};

const ErrorSolution = () => (
  <div className="p-8 max-w-3xl mx-auto space-y-8">
    <div className="bg-amber-900/20 border border-amber-500/50 p-8 rounded-3xl shadow-2xl">
      <div className="flex items-center gap-4 text-amber-500 mb-6">
        <AlertTriangle size={48} />
        <h2 className="text-3xl font-bold">Erro de 'Bad MAC' / Decriptação</h2>
      </div>
      <p className="text-slate-300 leading-relaxed mb-6">
        Solução definitiva: Deletar a pasta <b>auth_info_baileys</b> e rodar o bot novamente.
      </p>
      <div className="space-y-4">
        <div className="flex gap-4 items-start bg-black/40 p-4 rounded-xl border border-slate-800">
          <FolderX className="text-red-500 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-slate-100">PASSO 1: Deletar Sessão</h4>
            <p className="text-sm text-slate-400">Apague a pasta <b>auth_info_baileys</b>.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start bg-black/40 p-4 rounded-xl border border-slate-800">
          <RefreshCw className="text-blue-500 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-slate-100">PASSO 2: Reiniciar</h4>
            <p className="text-sm text-slate-400">Rode <code>node index.js</code> e leia o QR Code.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SidebarItem = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}>
    {icon} <span className="font-medium text-sm">{label}</span>
  </button>
);

export default App;
