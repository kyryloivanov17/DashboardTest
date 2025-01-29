import React from 'react';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';

export default function TableFilters() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left side - Title */}
        <h2 className="text-xl font-semibold text-gray-900">
          Active Campaigns
        </h2>

        {/* Right side - Search, Filters, New Campaign */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full sm:w-[280px] pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Filter Button */}
          <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </button>

          {/* New Campaign Button */}
          <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </button>
        </div>
      </div>
    </div>
  );
}