import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { PoolConfig as PoolConfigType, GenerationOrder } from './types';
import { DEFAULT_POOLS } from './constants';
import { generatePassword } from './utils/password';
import { PoolConfig } from './components/PoolConfig';
import { PasswordList } from './components/PasswordList';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null 
      ? JSON.parse(saved) 
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [pools, setPools] = useState<PoolConfigType[]>(() => {
    const savedPools = localStorage.getItem('characterPools');
    return savedPools ? JSON.parse(savedPools) : DEFAULT_POOLS;
  });
  
  const [passwordCount, setPasswordCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [generationOrder, setGenerationOrder] = useState<GenerationOrder>('random');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('characterPools', JSON.stringify(pools));
  }, [pools]);

  const generatePasswords = () => {
    const newPasswords = Array.from(
      { length: passwordCount },
      () => generatePassword(pools, generationOrder)
    );
    setPasswords(newPasswords);
  };

  const copyPasswords = () => {
    navigator.clipboard.writeText(passwords.join('\n'));
  };

  return (
    <div className="min-h-screen bg-theme-50 dark:bg-theme-950 text-theme-950 dark:text-theme-50 p-8">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-theme-200 dark:bg-theme-800 hover:bg-theme-300 dark:hover:bg-theme-700"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Password Generator</h1>
        
        <div className="bg-white dark:bg-theme-900 p-6 rounded-lg shadow-lg space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">
                Number of passwords:
                <input
                  type="number"
                  value={passwordCount}
                  onChange={(e) => setPasswordCount(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="ml-2 p-2 border rounded-md w-20 dark:bg-theme-800 dark:border-theme-700 focus:ring-2 focus:ring-accent dark:focus:ring-accent/70"
                />
              </label>
              
              <select
                value={generationOrder}
                onChange={(e) => setGenerationOrder(e.target.value as GenerationOrder)}
                className="p-2 border rounded-md dark:bg-theme-800 dark:border-theme-700 focus:ring-2 focus:ring-accent dark:focus:ring-accent/70"
              >
                <option value="random">Random Order</option>
                <option value="sequential">Sequential Order</option>
              </select>
              
              <button
                onClick={generatePasswords}
                className="px-6 py-2 bg-theme text-white rounded-md hover:bg-theme-600 focus:ring-2 focus:ring-accent/50"
              >
                Generate
              </button>
            </div>
          </div>

          <PoolConfig pools={pools} onChange={setPools} />
        </div>

        <PasswordList passwords={passwords} onCopy={copyPasswords} />
      </div>
    </div>
  );
}

export default App