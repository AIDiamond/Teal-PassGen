export interface PoolConfig {
  characters: string;
  count: number;
}

export interface CustomPreset {
  name: string;
  pools: PoolConfig[];
}

export interface CustomPresets {
  [key: string]: CustomPreset;
}

export type PrefillOption = {
  id: number;
  label: string;
  value: string;
  title: string;
};

export type PresetOption = {
  id: number;
  label: string;
  title: string;
  pools: PoolConfig[];
};

export type GenerationOrder = 'sequential' | 'random';