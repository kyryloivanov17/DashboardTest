import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 5; hour < 24; hour++) {
    for (let minute of ['00', '30']) {
      const hourStr = hour.toString().padStart(2, '0');
      options.push(`${hourStr}:${minute}`);
    }
  }
  return options;
};

const TIME_OPTIONS = generateTimeOptions();

export default function TimeSelect({ value, onChange, disabled = false }: TimeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-2 text-left border rounded-lg flex items-center justify-between
          ${disabled 
            ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
            : 'hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }
        `}
      >
        {value}
        <ChevronDown className={`w-4 h-4 text-gray-400 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {TIME_OPTIONS.map((time) => (
            <button
              key={time}
              onClick={() => {
                onChange(time);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-2 text-left hover:bg-gray-50
                ${value === time ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
              `}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}