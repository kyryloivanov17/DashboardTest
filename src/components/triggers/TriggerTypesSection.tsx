import React from 'react';

interface TriggerTypesSectionProps {
  selectedTriggers: string[];
  onTriggerChange: (trigger: string) => void;
}

const triggerTypes = [
  'Send message',
  'Alert admin to call lead',
  'Schedule an appointment with calendly',
  'Schedule a callback or future message in calendly'
];

export default function TriggerTypesSection({ selectedTriggers, onTriggerChange }: TriggerTypesSectionProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Trigger types</h2>
      
      <div className="space-y-3">
        {triggerTypes.map((trigger) => (
          <div
            key={trigger}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => onTriggerChange(trigger)}
          >
            <input
              type="checkbox"
              checked={selectedTriggers.includes(trigger)}
              onChange={() => onTriggerChange(trigger)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="ml-3 text-sm text-gray-700">{trigger}</label>
          </div>
        ))}
      </div>
    </section>
  );
}