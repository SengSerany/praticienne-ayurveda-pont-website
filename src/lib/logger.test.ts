import { describe, it, expect, vi, afterEach } from 'vitest';
import { logger } from './logger';

afterEach(() => vi.restoreAllMocks());

describe('logger', () => {
  it('ecrit un log structure avec niveau et contexte', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    logger.info('contact cree', { endpoint: 'lettre' });
    expect(spy).toHaveBeenCalledOnce();
    const payload = JSON.parse(spy.mock.calls[0][0] as string);
    expect(payload.level).toBe('info');
    expect(payload.message).toBe('contact cree');
    expect(payload.endpoint).toBe('lettre');
  });

  it('route les erreurs vers console.error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('echec brevo', { status: 500 });
    expect(spy).toHaveBeenCalledOnce();
  });
});
