import React from 'react';
import TimeSelect from './TimeSelect';

const followupTimeOptions = [
  'After 30 min',
  'After 1 hour',
  'After 2 hours',
  'After 24 hours',
  'After 48 hours'
];

const delayTimeOptions = [
  'After 1 min',
  'After 2 min',
  'After 3 min',
  'After 5 min',
  'After 10 min'
];

interface ResponsesSectionProps {
  followupTimes: string[];
  responseDelay: string;
  afterHoursDelay: string;
  onFollowupChange: (index: number, value: string) => void;
  onResponseDelayChange: (value: string) => void;
  onAfterHoursDelayChange: (value: string) => void;
}

export default function ResponsesSection({
  followupTimes,
  responseDelay,
  afterHoursDelay,
  onFollowupChange,
  onResponseDelayChange,
  onAfterHoursDelayChange
}: ResponsesSectionProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Responses</h2>
      
      <div className="space-y-6">
        {/* Follow-up Messages */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Followup messages without response
          </label>
          <div className="flex flex-wrap gap-3">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="w-48">
                <TimeSelect
                  value={followupTimes[index] || ''}
                  onChange={(value) => onFollowupChange(index, value)}
                  options={followupTimeOptions}
                  placeholder={`Select time ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Message Response Delay */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Message response Delay
          </label>
          <div className="w-48">
            <TimeSelect
              value={responseDelay}
              onChange={onResponseDelayChange}
              options={delayTimeOptions}
            />
          </div>
        </div>

        {/* After Hours Message */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            After hours message
          </label>
          <div className="w-48">
            <TimeSelect
              value={afterHoursDelay}
              onChange={onAfterHoursDelayChange}
              options={delayTimeOptions}
            />
          </div>
        </div>
      </div>
    </section>
  );
}