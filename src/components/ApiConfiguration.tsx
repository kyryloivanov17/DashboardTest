import React, { useState } from 'react';

interface ApiSettings {
  signalWire: {
    spaceUrl: string;
    projectId: string;
    token: string;
  };
  openAI: {
    spaceUrl: string;
    projectId: string;
    token: string;
  };
  makeCom: {
    spaceUrl: string;
    projectId: string;
    token: string;
  };
  calendly: {
    spaceUrl: string;
    projectId: string;
    token: string;
  };
}

export default function ApiConfiguration() {
  const [settings, setSettings] = useState<ApiSettings>({
    signalWire: { spaceUrl: '', projectId: '', token: '' },
    openAI: { spaceUrl: '', projectId: '', token: '' },
    makeCom: { spaceUrl: '', projectId: '', token: '' },
    calendly: { spaceUrl: '', projectId: '', token: '' }
  });

  const handleChange = (
    service: keyof ApiSettings,
    field: keyof ApiSettings[keyof ApiSettings],
    value: string
  ) => {
    setSettings(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('API Settings:', settings);
    // Handle form submission
  };

  const renderServiceFields = (
    service: keyof ApiSettings,
    title: string
  ) => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {title} Space URL
          </label>
          <input
            type="text"
            value={settings[service].spaceUrl}
            onChange={(e) => handleChange(service, 'spaceUrl', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${title} Space URL`}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {title} Project ID
            </label>
            <input
              type="text"
              value={settings[service].projectId}
              onChange={(e) => handleChange(service, 'projectId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${title} Project ID`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {title} Token
            </label>
            <input
              type="password"
              value={settings[service].token}
              onChange={(e) => handleChange(service, 'token', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${title} Token`}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">API Configuration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {renderServiceFields('signalWire', 'SignalWire')}
          {renderServiceFields('openAI', 'Open AI')}
          {renderServiceFields('makeCom', 'Make.com')}
          {renderServiceFields('calendly', 'Calendly')}
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}