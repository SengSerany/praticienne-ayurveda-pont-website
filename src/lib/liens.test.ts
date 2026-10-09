import { describe, it, expect } from 'vitest';
import { liensVisibles } from './liens';

const liens = [
  { titre: 'Guide', avantLancement: true },
  { titre: 'Site', avantLancement: false },
];

describe('liensVisibles', () => {
  it('ne montre avant le lancement que les liens prevus pour', () => {
    expect(liensVisibles(liens, false).map((l) => l.titre)).toEqual(['Guide']);
  });

  it('montre tous les liens une fois le site lance', () => {
    expect(liensVisibles(liens, true).map((l) => l.titre)).toEqual(['Guide', 'Site']);
  });
});
