
import React from 'react';

export const SIM = ['1', 'sim', 's', 'ss', 'ok', 'quero', 'continuar', 'pode', 'manda', 'enviar', 'envia', 'claro', '👍'];
export const NAO = ['2', 'nao', 'não', 'n', 'nn', 'depois', 'agora não', 'agora nao', 'prefiro não', 'sair', 'cancelar', '👎'];

export const BAILEYS_CODE = `/**
 * CÓDIGO ESTABILIZADO - VERSÃO 2.3 (PROTOCOLO DE RECUPERAÇÃO)
 * ⚠️ IMPORTANTE: Só use este código após o descanso de 2 a 24 horas do número.
 */

if (!global.crypto) {
  try {
    global.crypto = require('crypto');
  } catch (e) {
    console.error("Erro ao carregar crypto:", e);
  }
}

const { 
  default: makeWASocket, 
  useMultiFileAuthState, 
  DisconnectReason, 
  fetchLatestBaileysVersion, 
  makeCacheableSignalKeyStore,
  delay 
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');

// Módulo de cache para evitar sobrecarga no banco de dados da sessão
let msgRetryCounterCache;
try {
  const NodeCache = require('node-cache');
  msgRetryCounterCache = new NodeCache();
} catch (e) {
  msgRetryCounterCache = { get: () => null, set: () => null };
}

let estado = {};
const SIM = ['1','sim','s','ss','ok','quero','continuar','pode','manda','enviar','envia','claro','👍'];
const NAO = ['2','nao','não','n','nn','depois','agora não','agora nao','prefiro não','sair','cancelar','👎'];

function tem(palavra, lista) {
  return lista.some(p => palavra.toLowerCase().includes(p));
}

// Atraso humano para não parecer automação pesada
const humanDelay = async (min = 2000, max = 5000) => {
  const time = Math.floor(Math.random() * (max - min + 1) + min);
  await delay(time);
};

async function connectToWhatsApp() {
  console.log('🧹 Limpando buffers antigos...');
  
  // O segredo para números marcados é o MultiFileAuthState limpo
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const { version } = await fetchLatestBaileysVersion();
  
  console.log('🔄 Iniciando Conexão v2.3 (Recuperação de Reputação)');

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
    },
    msgRetryCounterCache,
    logger: pino({ level: 'silent' }),
    // Identidade de Navegador estável (Safari no Mac é o mais seguro)
    browser: ['Mac OS', 'Safari', '10.15.7'],
    syncFullHistory: false,
    markOnlineOnConnect: false, // Não entrar como online logo de cara ajuda a evitar flag
    connectTimeoutMs: 120000,   // Timeout longo para o servidor processar a volta do número
    keepAliveIntervalMs: 30000,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    
    if (qr) {
      console.log('✨ Novo QR Code gerado. Escaneie apenas uma vez!');
    }

    if (connection === 'close') {
      const statusCode = (lastDisconnect.error instanceof Boom)?.output?.statusCode;
      console.log('⚠️ Conexão fechada. Motivo:', statusCode);
      
      if (statusCode !== DisconnectReason.loggedOut) {
        console.log('🔄 Tentando reconexão lenta em 10 segundos...');
        setTimeout(() => connectToWhatsApp(), 10000);
      }
    } else if (connection === 'open') {
      console.log('\\n✅ SUCESSO! Número reconectado e estável.\\n');
    }
  });

  sock.ev.on('messages.upsert', async m => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const jid = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const textoNormalizado = text.toLowerCase().trim();

    const sendText = async (txt) => {
      await sock.readMessages([msg.key]);
      await humanDelay(1000, 2000);
      await sock.sendPresenceUpdate('composing', jid);
      await humanDelay(3000, 6000);
      await sock.sendMessage(jid, { text: txt });
    };

    // Lógica de atendimento
    if (!estado[jid]) {
      estado[jid] = 'INICIO';
      await sendText('⚠️ Olá! Bem-vindo ao estudo de José do Egito.\\n\\n1️⃣ Continuar\\n2️⃣ Sair');
      return;
    }

    if (estado[jid] === 'INICIO' && tem(textoNormalizado, SIM)) {
      estado[jid] = 'PERMISSAO';
      await sendText('📲 Vou te enviar o link do App de estudos.\\n\\nPosso enviar?\\n1️⃣ Sim\\n2️⃣ Não');
    }
  });
}

connectToWhatsApp().catch(err => console.error("Erro:", err));
`;
