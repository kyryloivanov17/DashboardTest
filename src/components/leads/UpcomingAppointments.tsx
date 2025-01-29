import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Mail, Search, ChevronLeft, ChevronRight, X, Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchAppointments } from '../../store/slices/appointmentsSlice';
import type { Appointment } from '../../types/appointment';

const ITEMS_PER_PAGE = 10;

interface Filters {
  status: Appointment['status'][];
  dateRange: {
    start: string;
    end: string;
  };
  timeRange: {
    start: string;
    end: string;
  };
}

const getStatusColor = (status: Appointment['status']) => {
  switch (status) {
    case 'Scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'Confirmed':
      return 'bg-green-100 text-green-800';
    case 'Completed':
      return 'bg-purple-100 text-purple-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function UpcomingAppointments() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: appointments, status, error } = useSelector((state: RootState) => state.appointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: [],
    dateRange: {
      start: '',
      end: ''
    },
    timeRange: {
      start: '',
      end: ''
    }
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  const handleFilterChange = (type: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1);
  };

  const toggleFilter = (type: keyof Omit<Filters, 'dateRange' | 'timeRange'>, value: string) => {
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
      dateRange: {
        start: '',
        end: ''
      },
      timeRange: {
        start: '',
        end: ''
      }
    });
    setCurrentPage(1);
  };

  const filteredAppointments = appointments.filter(appointment => {
    // Text search
    const searchNormalized = searchTerm.toLowerCase();
    const matchesSearch = 
      appointment.name.toLowerCase().includes(searchNormalized) ||
      appointment.phone.toLowerCase().includes(searchNormalized) ||
      appointment.date.includes(searchNormalized) ||
      appointment.time.toLowerCase().includes(searchNormalized) ||
      appointment.address.toLowerCase().includes(searchNormalized) ||
      appointment.status.toLowerCase().includes(searchNormalized);

    if (!matchesSearch) return false;

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(appointment.status)) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const appointmentDate = new Date(appointment.date);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (appointmentDate < startDate || appointmentDate > endDate) {
        return false;
      }
    }

    // Time range filter
    if (filters.timeRange.start && filters.timeRange.end) {
      const appointmentTime = appointment.time.toLowerCase();
      if (appointmentTime < filters.timeRange.start || appointmentTime > filters.timeRange.end) {
        return false;
      }
    }

    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const renderFiltersPanel = () => (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <div className="space-y-4">
        {/* Status Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
          <div className="flex flex-wrap gap-2">
            {['Scheduled', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => toggleFilter('status', status)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.status.includes(status as Appointment['status'])
                    ? getStatusColor(status as Appointment['status'])
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Date Range</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* Time Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Time Range</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Start Time</label>
              <input
                type="time"
                value={filters.timeRange.start}
                onChange={(e) => handleFilterChange('timeRange', { ...filters.timeRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">End Time</label>
              <input
                type="time"
                value={filters.timeRange.end}
                onChange={(e) => handleFilterChange('timeRange', { ...filters.timeRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(filters.status.length > 0 || filters.dateRange.start || filters.dateRange.end || filters.timeRange.start || filters.timeRange.end) && (
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-500">
              {filteredAppointments.length} results found
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

  const renderMobileCard = (appointment: Appointment) => (
    <div key={appointment.id} className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{appointment.name}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Add to Calendar">
            <Calendar className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Call">
            <Phone className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Email">
            <Mail className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Date</p>
          <p className="font-medium text-gray-900">{appointment.date}</p>
        </div>
        <div>
          <p className="text-gray-500">Time</p>
          <p className="font-medium text-gray-900">{appointment.time}</p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          <p className="font-medium text-gray-900">{appointment.phone}</p>
        </div>
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium text-gray-900">{appointment.email}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Address</p>
        <p className="text-sm font-medium text-gray-900 mt-1">{appointment.address}</p>
      </div>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading appointments...</span>
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
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
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
                {(filters.status.length > 0 || filters.dateRange.start || filters.dateRange.end || filters.timeRange.start || filters.timeRange.end) && (
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                    {filters.status.length + (filters.dateRange.start ? 1 : 0) + (filters.timeRange.start ? 1 : 0)}
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
              placeholder="Search appointments..."
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
          {paginatedAppointments.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No appointments found matching your search criteria
            </div>
          ) : (
            <div className="p-4 grid gap-4">
              {paginatedAppointments.map(renderMobileCard)}
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
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Time</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Phone</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Address</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No appointments found matching your search criteria
                </td>
              </tr>
            ) : (
              paginatedAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{appointment.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{appointment.date}</td>
                  <td className="px-6 py-4 text-gray-500">{appointment.time}</td>
                  <td className="px-6 py-4 text-gray-500">{appointment.phone}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500 max-w-xs truncate block">
                      {appointment.address}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="p-1 hover:bg-gray-100 rounded-lg" title="Add to Calendar">
                        <Calendar className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg" title="Call">
                        <Phone className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg" title="Email">
                        <Mail className="w-4 h-4 text-gray-500" />
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
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredAppointments.length)} of{' '}
            {filteredAppointments.length} results
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
    </div>
  );
}