import React, { useState } from 'react';
import ResponsesSection from './triggers/ResponsesSection';
import TriggerTypesSection from './triggers/TriggerTypesSection';

export default function Triggers() {
  const [followupTimes, setFollowupTimes] = useState<string[]>(['', '', '', '', '']);
  const [responseDelay, setResponseDelay] = useState('After 2 min');
  const [afterHoursDelay, setAfterHoursDelay] = useState('After 2 min');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

  const handleFollowupChange = (index: number, value: string) => {
    const newTimes = [...followupTimes];
    newTimes[index] = value;
    setFollowupTimes(newTimes);
  };

  const handleTriggerChange = (trigger: string) => {
    setSelectedTriggers(prev => 
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSave = () => {
    console.log({
      followupTimes,
      responseDelay,
      afterHoursDelay,
      selectedTriggers
    });
  };

  return (
    <div className="space-y-8">
      <ResponsesSection
        followupTimes={followupTimes}
        responseDelay={responseDelay}
        afterHoursDelay={afterHoursDelay}
        onFollowupChange={handleFollowupChange}
        onResponseDelayChange={setResponseDelay}
        onAfterHoursDelayChange={setAfterHoursDelay}
      />

      <TriggerTypesSection
        selectedTriggers={selectedTriggers}
        onTriggerChange={handleTriggerChange}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}