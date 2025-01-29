import React, { useState } from 'react';
import ApiConfiguration from '../components/ApiConfiguration';
import Triggers from '../components/Triggers';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('apis');

  const renderTabs = () => (
    <div className="flex space-x-4 border-b border-gray-200 mb-6">
      <button
        onClick={() => setActiveTab('apis')}
        className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'apis'
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        APIs
      </button>
      <button
        onClick={() => setActiveTab('triggers')}
        className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'triggers'
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        Triggers
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
          {renderTabs()}
          
          {activeTab === 'apis' && <ApiConfiguration />}
          {activeTab === 'triggers' && <Triggers />}
        </div>
      </div>
    </div>
  );
}