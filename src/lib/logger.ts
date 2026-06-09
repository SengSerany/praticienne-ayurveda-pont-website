type Niveau = 'info' | 'warn' | 'error';

function ecrire(niveau: Niveau, message: string, contexte: Record<string, unknown> = {}): void {
  const ligne = JSON.stringify({ level: niveau, message, ...contexte });
  if (niveau === 'error') console.error(ligne);
  else if (niveau === 'warn') console.warn(ligne);
  else console.info(ligne);
}

export const logger = {
  info: (message: string, contexte?: Record<string, unknown>) => ecrire('info', message, contexte),
  warn: (message: string, contexte?: Record<string, unknown>) => ecrire('warn', message, contexte),
  error: (message: string, contexte?: Record<string, unknown>) =>
    ecrire('error', message, contexte),
};
