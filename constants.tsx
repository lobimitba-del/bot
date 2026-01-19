
import React from 'react';

export const SIM = ['1', 'sim', 's', 'ss', 'ok', 'quero', 'continuar', 'pode', 'manda', 'enviar', 'envia', 'claro', '👍'];
export const NAO = ['2', 'nao', 'não', 'n', 'nn', 'depois', 'agora não', 'agora nao', 'prefiro não', 'sair', 'cancelar', '👎'];

export const BAILEYS_CODE = `/**
 * CÓDIGO FINAL - VERSÃO 3.5 (ADMIN TRIGGER & MULTI-PDF)
 * 🚀 Agora o Admin pode digitar "confirmado" para liberar o bônus.
 * ⚠️ Caso receba "Bad MAC", delete a pasta 'auth_info_baileys' e reinicie.
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
const pino = require('pino');
const fs = require('fs');

let userState = {};

// CONFIGURAÇÃO DOS ARQUIVOS DE BÔNUS - ORGANIZAÇÃO FINAL
const bonusFiles = {
  '1': [
    { file: 'Romanos-Completo.pdf', title: '1.1 - Romanos' },
    { file: 'Corintios-Completo.pdf', title: '1.2 - Coríntios' },
    { file: 'Galatas-Completo.pdf', title: '1.3 - Gálatas' },
    { file: 'Efesios-Completo.pdf', title: '1.4 - Efésios' },
    { file: 'Filipenses-Completo.pdf', title: '1.5 - Filipenses' }
  ],
  '2': [
    { file: 'Colossenses-Completo.pdf', title: '2.1 - Colossenses' },
    { file: 'Tessalonicenses-Completo.pdf', title: '2.2 - Tessalonicenses' },
    { file: 'Timoteo-Completo.pdf', title: '2.3 - Timóteo' },
    { file: 'Tito-Completo.pdf', title: '2.4 - Tito' },
    { file: 'Filemom-Completo.pdf', title: '2.5 - Filemom' }
  ],
  '3': [
    { file: '100_ESBOCOS_otimizado.pdf', title: '3.1 - 100 Esboços' },
    { file: 'Estudo-Completo-Sobre-o-Livro-do-Apocalipse.pdf', title: '3.2 - Apocalipse' },
    { file: '40 ESBOÇOS EM ATOS DOS APÓSTOLOS_otimizado-1.pdf', title: '3.3 - Atos' },
    { file: '50 - JEREMIAS_otimizado.pdf', title: '3.4 - Jeremias' },
    { file: '50 ESBOÇOS EM JOÃO_Corrigido.pdf', title: '3.5 - João' },
    { file: 'Devocional-365-Dias.pdf', title: '3.6 - Devocional' }
  ]
};

const messages = {
  start: \`⚠️ Leia antes de continuar.

Este material é um ensinamento espiritual aplicado à vida real.

• Mentalidade financeira
• Decisões profissionais
• Maturidade emocional
• Processos espirituais com Deus

Baseado na história de José do Egito.

❌ Não é devocional
❌ Não é motivação
❌ Não é promessa fácil

Deseja continuar?
Responda SIM ou NÃO.\`,

  entrega1: \`Perfeito. Vou ser totalmente transparente com você.

📲 O que você vai receber ao continuar:

✔ Acesso imediato a um APLICATIVO DE ESTUDO exclusivo
✔ Estudo profundo e estruturado sobre José do Egito
✔ Ensinamentos espirituais aplicados à vida real.\`,

  entrega2: \`Não é leitura rasa.
Não é conteúdo comum.
É um estudo que conecta fé + vida real.

🎁 Além do aplicativo principal, você também recebe:

• Estudos completos das Cartas de Paulo (Epístolas)
• Mais de 100 esboços bíblicos
• Materiais prontos para estudo, ensino e pregação\`,

  entrega3: \`⚠️ Como funciona a entrega (baseada em confiança):

✅ Você recebe PRIMEIRO o acesso ao aplicativo
✅ Confere todo o conteúdo com calma
✅ Depois, se fizer sentido para você, realiza a contribuição

Aqui não existe pressão.
Trabalhamos no modelo de confiança, transparência e honra.

Posso te enviar agora o acesso ao aplicativo?
Responda SIM ou NÃO.\`,

  link: \`Perfeito 🙏
Aqui está o acesso ao estudo 👇
https://jose-delta.vercel.app/

Explore com calma.\`,

  contribuicao: \`A contribuição sugerida é de R$ 10,00.

Muitas pessoas contribuem com:
R$ 10 • R$ 15 • R$ 20

❌ Não é mensalidade
❌ Não é assinatura

Após contribuir, envie o comprovante.\`,

  pix: \`💰 Chave Pix:
[SUA CHAVE PIX AQUI]\`,

  pedirBonus: \`Pagamento identificado 🙏
(Acesso liberado com sucesso)

Escolha seu bônus digitando apenas o número:
1 - Cartas de Paulo (Parte 1)
2 - Cartas de Paulo (Parte 2)
3 - Esboços e Estudos Gerais (Atos, João, Jeremias e Devocional)\`
};

function normalize(text) {
  if (!text) return 'OUTRO';
  const raw = text.toLowerCase().trim();
  if (raw.includes('confirmado')) return 'CONFIRMADO';
  if (raw === '1') return '1';
  if (raw === '2') return '2';
  if (raw === '3') return '3';
  if (['sim','s','ok','quero','aceito','continuar'].includes(raw)) return 'SIM';
  if (['nao','não','n'].includes(raw)) return 'NAO';
  return 'OUTRO';
}

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const { version } = await fetchLatestBaileysVersion();
  
  const sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
    },
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) connectToWhatsApp();
    } else if (connection === 'open') {
      console.log('✅ BOT v3.5 ONLINE - TRIGGER ADMIN ATIVADO');
    }
  });

  sock.ev.on('messages.upsert', async m => {
    try {
      const msg = m.messages[0];
      if (!msg.message) return;

      const jid = msg.key.remoteJid;
      const fromMe = msg.key.fromMe;
      const text = msg.message.conversation || 
                   msg.message.extendedTextMessage?.text || 
                   msg.message.imageMessage?.caption || '';
                   
      const input = normalize(text);

      const sendText = async (txt) => {
        await sock.sendPresenceUpdate('composing', jid);
        await delay(2000);
        await sock.sendMessage(jid, { text: txt });
      };

      const sendPDF = async (fileName, caption) => {
        const path = \`./bonus/\${fileName}\`;
        if (fs.existsSync(path)) {
          await sock.sendMessage(jid, {
            document: fs.readFileSync(path),
            fileName: fileName,
            mimetype: 'application/pdf',
            caption: caption
          });
          await delay(2000);
        }
      };

      // ⚠️ GATILHO MESTRE (Aceita do Admin ou do Cliente)
      if (input === 'CONFIRMADO') {
        userState[jid] = { step: 3 };
        await sock.sendMessage(jid, { react: { text: '✅', key: msg.key } });
        await sendText(messages.pedirBonus);
        return;
      }

      // Se a mensagem for "FromMe" (enviada por você) e não for o comando confirmado, ignoramos o resto da lógica automática
      if (fromMe) return;

      if (!userState[jid]) {
        userState[jid] = { step: 0 };
        await sendText(messages.start);
        return;
      }

      const uState = userState[jid];

      if (uState.step === 0) {
        if (input === 'SIM' || input === '1') {
          uState.step = 1;
          await sendText(messages.entrega1);
          await sendText(messages.entrega2);
          await sendText(messages.entrega3);
        }
      } 
      
      else if (uState.step === 1) {
        if (input === 'SIM' || input === '1') {
          uState.step = 2; 
          await sendText(messages.link);
          await sendText(messages.contribuicao);
          await sendText(messages.pix);
        }
      }

      else if (uState.step === 3) {
        const selectedBonus = bonusFiles[input];
        if (selectedBonus) {
          await sendText(\`Preparando seu pacote \${input}. Enviando arquivos, por favor aguarde...\`);
          for (const item of selectedBonus) {
            await sendPDF(item.file, item.title);
          }
          await sendText('Todos os arquivos foram entregues com sucesso! 🙏 Boa leitura.');
        } else {
          await sendText('Escolha o bônus digitando apenas 1, 2 ou 3.');
        }
      }
      
    } catch (err) {
      console.log('Erro no bot:', err.message);
    }
  });
}

connectToWhatsApp().catch(err => console.error(err));
`;
