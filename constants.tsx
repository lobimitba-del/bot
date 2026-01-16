
import React from 'react';

export const SIM = ['1', 'sim', 's', 'ss', 'ok', 'quero', 'continuar', 'pode', 'manda', 'enviar', 'envia', 'claro', '👍'];
export const NAO = ['2', 'nao', 'não', 'n', 'nn', 'depois', 'agora não', 'agora nao', 'prefiro não', 'sair', 'cancelar', '👎'];

export const BAILEYS_CODE = `/**
 * CÓDIGO ESTABILIZADO - VERSÃO 2.4 (BUSINESS OPTIMIZED)
 * ⚠️ PROTOCOLO PARA WHATSAPP BUSINESS
 * Focado em evitar bloqueios em contas comerciais que sofreram instabilidade.
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

// Atraso humano BUSINESS (Mais lento e aleatório)
const humanDelay = async (min = 3000, max = 7000) => {
  const time = Math.floor(Math.random() * (max - min + 1) + min);
  await delay(time);
};

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const { version } = await fetchLatestBaileysVersion();
  
  console.log('🏢 Iniciando Conexão Business v2.4...');

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
    },
    msgRetryCounterCache,
    logger: pino({ level: 'silent' }),
    // Identidade de Chrome no Windows (Padrão para Business Web)
    browser: ['Windows', 'Chrome', '114.0.5735.199'],
    syncFullHistory: false,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) console.log('💠 QR Code Business pronto. Escaneie pelo App Business.');

    if (connection === 'close') {
      const statusCode = (lastDisconnect.error instanceof Boom)?.output?.statusCode;
      if (statusCode === 401) {
        console.log('❌ Sessão expirada. Delete a pasta auth_info_baileys e tente novamente.');
      } else if (statusCode !== DisconnectReason.loggedOut) {
        setTimeout(() => connectToWhatsApp(), 10000);
      }
    } else if (connection === 'open') {
      console.log('\\n✅ BUSINESS CONECTADO! Reputação da conta sendo monitorada...\\n');
    }
  });

  sock.ev.on('messages.upsert', async m => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const jid = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const textoNormalizado = text.toLowerCase().trim();

    const sendText = async (txt) => {
      // 1. Simula o tempo de "olhar o celular"
      await delay(2000);
      await sock.readMessages([msg.key]);
      
      // 2. Simula o tempo de "começar a digitar"
      await humanDelay(1000, 3000);
      await sock.sendPresenceUpdate('composing', jid);
      
      // 3. Simula a digitação real (tempo maior para Business)
      await humanDelay(4000, 8000);
      await sock.sendMessage(jid, { text: txt });
    };

    if (!estado[jid]) {
      estado[jid] = 'INICIO';
      await sendText('⚠️ Olá! Bem-vindo ao atendimento comercial José do Egito.\\n\\n1️⃣ Continuar\\n2️⃣ Sair');
      return;
    }

    if (estado[jid] === 'INICIO' && tem(textoNormalizado, SIM)) {
      estado[jid] = 'PERMISSAO';
      await sendText('📲 Entendido. Vou te enviar o link do App de estudos.\\n\\nPosso enviar?\\n1️⃣ Sim\\n2️⃣ Não');
    }
  });
}

connectToWhatsApp().catch(err => console.error("Erro:", err));
`;
