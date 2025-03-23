import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PasswordListProps {
  passwords: string[];
  onCopy: () => void;
}

export const PasswordList: React.FC<PasswordListProps> = ({ passwords, onCopy }) => {
  const [copied, setCopied] = useState(false);

  if (passwords.length === 0) return null;

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-theme-900 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Generated Passwords</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-md hover:bg-theme-600 focus:ring-2 focus:ring-accent/50"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Passwords Copied' : 'Copy All'}
        </button>
      </div>
      <ul className="space-y-2">
        {passwords.map((password, index) => (
          <li
            key={index}
            className="font-mono text-lg p-2 bg-theme-50 dark:bg-theme-800 rounded"
          >
            {password}
          </li>
        ))}
      </ul>
    </div>
  );
}