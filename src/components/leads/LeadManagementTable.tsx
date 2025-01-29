import React, { useState, useEffect } from 'react';
import { MessageSquare, MoreVertical, Search, ChevronLeft, ChevronRight, X, Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchLeads } from '../../store/slices/leadsSlice';
import type { Lead, LeadStatus, TriggerType } from '../../types/lead';
import ChatHistoryModal from '../modals/ChatHistoryModal';

const ITEMS_PER_PAGE = 10;

interface Filters {
  status: LeadStatus[];
  triggerType: TriggerType[];
  campaign: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

const getStatusColor = (status: LeadStatus) => {
  switch (status) {
    case 'Qualified':
      return 'bg-green-100 text-green-800';
    case 'Lead':
      return 'bg-blue-100 text-blue-800';
    case 'Interested':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTriggerTypeColor = (type: TriggerType) => {
  switch (type) {
    case 'Facebook':
      return 'bg-blue-100 text-blue-800';
    case 'Website':
      return 'bg-purple-100 text-purple-800';
    case 'Text Message':
      return 'bg-green-100 text-green-800';
    case 'Instagram':
      return 'bg-pink-100 text-pink-800';
    case 'Out reach':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function LeadManagementTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: leads, status, error } = useSelector((state: RootState) => state.leads);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: [],
    triggerType: [],
    campaign: [],
    dateRange: {
      start: '',
      end: ''
    }
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLeads());
    }
  }, [status, dispatch]);

  const handleFilterChange = (type: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1);
  };

  const toggleFilter = (type: keyof Omit<Filters, 'dateRange'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      triggerType: [],
      campaign: [],
      dateRange: {
        start: '',
        end: ''
      }
    });
    setCurrentPage(1);
  };

  // Get unique campaigns from leads for the filter
  const uniqueCampaigns = Array.from(new Set(leads.map(lead => lead.campaign.id))).map(id => {
    const campaign = leads.find(lead => lead.campaign.id === id)?.campaign;
    return campaign!;
  });

  const filteredLeads = leads.filter(lead => {
    // Text search
    const searchNormalized = searchTerm.toLowerCase();
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchNormalized) ||
      lead.email.toLowerCase().includes(searchNormalized) ||
      lead.phone.toLowerCase().includes(searchNormalized) ||
      lead.status.toLowerCase().includes(searchNormalized) ||
      lead.triggerType.toLowerCase().includes(searchNormalized) ||
      lead.campaign.name.toLowerCase().includes(searchNormalized);

    if (!matchesSearch) return false;

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(lead.status)) {
      return false;
    }

    // Trigger type filter
    if (filters.triggerType.length > 0 && !filters.triggerType.includes(lead.triggerType)) {
      return false;
    }

    // Campaign filter
    if (filters.campaign.length > 0 && !filters.campaign.includes(lead.campaign.id)) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const leadDate = new Date(lead.createdAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (leadDate < startDate || leadDate > endDate) {
        return false;
      }
    }

    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const renderFiltersPanel = () => (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <div className="space-y-4">
        {/* Status Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
          <div className="flex flex-wrap gap-2">
            {['Qualified', 'Lead', 'Interested'].map((status) => (
              <button
                key={status}
                onClick={() => toggleFilter('status', status as LeadStatus)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.status.includes(status as LeadStatus)
                    ? getStatusColor(status as LeadStatus)
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Campaign</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueCampaigns.map((campaign) => (
              <button
                key={campaign.id}
                onClick={() => toggleFilter('campaign', campaign.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.campaign.includes(campaign.id)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {campaign.name}
              </button>
            ))}
          </div>
        </div>

        {/* Trigger Type Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Trigger Type</h3>
          <div className="flex flex-wrap gap-2">
            {['Facebook', 'Website', 'Text Message', 'Instagram', 'Out reach'].map((type) => (
              <button
                key={type}
                onClick={() => toggleFilter('triggerType', type as TriggerType)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.triggerType.includes(type as TriggerType)
                    ? getTriggerTypeColor(type as TriggerType)
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Date Range</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">End Date</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(filters.status.length > 0 || filters.triggerType.length > 0 || filters.campaign.length > 0 || filters.dateRange.start || filters.dateRange.end) && (
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-500">
              {filteredLeads.length} results found
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderMobileCard = (lead: Lead) => (
    <div key={lead.id} className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{lead.name}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
              {lead.status}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTriggerTypeColor(lead.triggerType)}`}>
              {lead.triggerType}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              setSelectedLead(lead);
              setIsChatHistoryOpen(true);
            }}
          >
            <MessageSquare className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium text-gray-900">{lead.email}</p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          <p className="font-medium text-gray-900">{lead.phone}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Campaign</p>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
          {lead.campaign.name}
        </span>
      </div>

      <div className="text-sm text-gray-500">
        Created on {new Date(lead.createdAt).toLocaleDateString()}
      </div>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading leads...</span>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 mb-6">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Lead Management</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors ${
                  isFiltersOpen 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {(filters.status.length > 0 || filters.triggerType.length > 0 || filters.campaign.length > 0 || filters.dateRange.start || filters.dateRange.end) && (
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                    {filters.status.length + filters.triggerType.length + filters.campaign.length + (filters.dateRange.start ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {isFiltersOpen && renderFiltersPanel()}
      
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200">
          {paginatedLeads.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No leads found matching your search criteria
            </div>
          ) : (
            <div className="p-4 grid gap-4">
              {paginatedLeads.map(renderMobileCard)}
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Email</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Phone</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Campaign</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Trigger Type</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No leads found matching your search criteria
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-200">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{lead.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{lead.email}</td>
                  <td className="px-6 py-4 text-gray-500">{lead.phone}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {lead.campaign.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTriggerTypeColor(lead.triggerType)}`}>
                      {lead.triggerType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded-lg"
                        onClick={() => {
                          setSelectedLead(lead);
                          setIsChatHistoryOpen(true);
                        }}
                      >
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredLeads.length)} of{' '}
            {filteredLeads.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <div className="sm:hidden">
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {selectedLead && (
        <ChatHistoryModal
          isOpen={isChatHistoryOpen}
          onClose={() => {
            setIsChatHistoryOpen(false);
            setSelectedLead(null);
          }}
          lead={selectedLead}
        />
      )}
    </div>
  );
}