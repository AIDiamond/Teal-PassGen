import { PoolConfig, GenerationOrder } from '../types';

export const generatePassword = (pools: PoolConfig[], order: GenerationOrder = 'random'): string => {
  if (order === 'sequential') {
    return pools.reduce((password, pool) => {
      for (let i = 0; i < pool.count; i++) {
        password += pool.characters.charAt(Math.floor(Math.random() * pool.characters.length));
      }
      return password;
    }, '');
  }

  // For random order, first create all characters then shuffle
  const characters = pools.flatMap(pool => 
    Array.from({ length: pool.count }, () => 
      pool.characters.charAt(Math.floor(Math.random() * pool.characters.length))
    )
  );
  
  // Fisher-Yates shuffle
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }
  
  return characters.join('');
};