
import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  MessageSquare, 
  Play, 
  FileJson, 
  CheckCircle2, 
  Copy, 
  Info,
  ExternalLink,
  Download
} from 'lucide-react';
import { BAILEYS_CODE } from './constants';
import BotSimulator from './components/BotSimulator';
import Instructions from './components/Instructions';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'simulate' | 'setup'>('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BAILEYS_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([BAILEYS_CODE], {type: 'text/javascript'});
    element.href = URL.createObjectURL(file);
    element.download = "index.js";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-green-500/20 p-2 rounded-lg border border-green-500/30">
            <MessageSquare className="text-green-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Bot José do Egito <span className="text-slate-400 text-sm font-normal ml-2">v2.0 Baileys</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Conversor de whatsapp-web.js para Baileys</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => window.open('https://github.com/WhiskeySockets/Baileys', '_blank')}
            className="flex items-center gap-2 text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md transition border border-slate-600"
          >
            Docs Baileys <ExternalLink size={14} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shadow-xl z-10">
          <nav className="flex-1 p-4 space-y-2">
            <SidebarItem 
              icon={<Terminal size={20} />} 
              label="1. Setup Inicial" 
              active={activeTab === 'setup'} 
              onClick={() => setActiveTab('setup')}
            />
            <SidebarItem 
              icon={<Code2 size={20} />} 
              label="2. Pegar Código" 
              active={activeTab === 'code'} 
              onClick={() => setActiveTab('code')}
            />
            <SidebarItem 
              icon={<Play size={20} />} 
              label="3. Testar Lógica" 
              active={activeTab === 'simulate'} 
              onClick={() => setActiveTab('simulate')}
            />
          </nav>
          
          <div className="p-4 bg-slate-900/50 border-t border-slate-700">
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <Info className="shrink-0 w-4 h-4 text-blue-400" />
              <p>O Baileys não requer Chrome, resolvendo seus erros de "Browser path not found".</p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 overflow-auto bg-slate-950 relative">
          {activeTab === 'code' && (
            <div className="p-6 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-200">
                    <FileJson className="text-yellow-400" /> index.js
                  </h2>
                  <p className="text-sm text-slate-500">Este é o seu arquivo principal. Salve-o na raiz da sua pasta.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md font-medium transition border border-slate-600"
                  >
                    <Download size={18} />
                    Baixar .js
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium transition shadow-lg shadow-blue-900/20"
                  >
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto shadow-2xl relative group">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-500">Javascript / Baileys</div>
                <pre><code>{BAILEYS_CODE}</code></pre>
              </div>
            </div>
          )}

          {activeTab === 'simulate' && <BotSimulator />}
          
          {activeTab === 'setup' && <Instructions onGoToCode={() => setActiveTab('code')} />}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 px-6 py-2 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Engine: Baileys Sockets</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Auth: MultiFileState</span>
        </div>
        <div className="font-mono">Ready to Deploy v2.0</div>
      </footer>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default App;
