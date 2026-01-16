
export enum BotState {
  INICIO = 'INICIO',
  CONTEUDO = 'CONTEUDO',
  PERMISSAO = 'PERMISSAO',
  ENTREGA = 'ENTREGA',
  FIM = 'FIM'
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export interface ConversionConfig {
  delay: number;
  sessionPath: string;
  bonusPath: string;
}
