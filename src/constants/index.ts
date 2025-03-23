import { PrefillOption, PresetOption } from '../types';

export const DEFAULT_POOLS = [
  { characters: 'abcdefghijklmnopqrstuvwxyz', count: 4 },
  { characters: '0123456789', count: 4 },
  { characters: '!@#$%^&*()', count: 2 },
];

export const PREFILL_OPTIONS: PrefillOption[] = [
  { id: 1, label: 'abcde...', value: 'abcdefghijklmnopqrstuvwxyz', title: 'Click to copy' },
  { id: 2, label: 'ABCDE...', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', title: 'Click to copy' },
  { id: 3, label: 'abcde...\nABCDE...', value: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', title: 'Click to copy' },
  { id: 4, label: '0123456789', value: '0123456789', title: 'Click to copy' },
  { id: 5, label: '!@#$%^&*()', value: '!@#$%^&*()', title: 'Click to copy' },
  { id: 6, label: 'Special Characters', value: '!@#$%^&*()_-+={}[]:;"\'<>,.?/|\\', title: 'Click to copy' },
];

export const PRESET_OPTIONS: PresetOption[] = [
  {
    id: 1,
    label: 'Letters Uppercase',
    title: 'Example: ABCDEFGHIJ',
    pools: [{ characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', count: 10 }],
  },
  {
    id: 2,
    label: 'Letters Lowercase',
    title: 'Example: abcdefghij',
    pools: [{ characters: 'abcdefghijklmnopqrstuvwxyz', count: 10 }],
  },
  {
    id: 3,
    label: 'All Letters',
    title: 'Example: AbcDeFGHIj',
    pools: [{ characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', count: 10 }],
  },
  {
    id: 4,
    label: 'Numbers',
    title: 'Example: 0123456789',
    pools: [{ characters: '0123456789', count: 10 }],
  },
  {
    id: 5,
    label: 'Letters + Numbers',
    title: 'Example: aBCde12345',
    pools: [
      { characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', count: 5 },
      { characters: '0123456789', count: 5 },
    ],
  },
  {
    id: 6,
    label: 'Letters + Numbers + Specials',
    title: 'Example: AbcD1234!@',
    pools: [
      { characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', count: 4 },
      { characters: '0123456789', count: 4 },
      { characters: '!@#$%^&*()', count: 2 },
    ],
  },
];