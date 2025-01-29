import React, { useState, useEffect } from "react";
import {
  Edit,
  Search,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchCampaigns } from "../store/slices/campaignsSlice";
import type { Campaign } from "../types/campaign";
import NewCampaignModal_2 from "./modals/NewCampaignModal";
import { fetchLogin } from "../api/login";
import { useMutation } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 10;

interface Filters {
  type: Campaign["type"][];
  status: Campaign["status"][];
  dateRange: {
    start: string;
    end: string;
  };
}

const getStatusColor = (status: Campaign["status"]) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Schedule":
      return "bg-blue-100 text-blue-800";
    case "Ongoing":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeColor = (type: Campaign["type"]) => {
  switch (type) {
    case "Inbound":
      return "bg-purple-100 text-purple-800";
    case "Outbound":
      return "bg-pink-100 text-pink-800";
    case "Mixed":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CampaignsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: campaigns,
    status,
    error,
  } = useSelector((state: RootState) => state.campaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewCampaign, setIsNewCampaign] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    type: [],
    status: [],
    dateRange: {
      start: "",
      end: "",
    },
  });

  const [currentToken, setCurrentToken] = useState(null);

  const loginMutation = useMutation({
    mutationFn: fetchLogin,
  });

  let t = true;
  useEffect(() => {
    if (!currentToken && t) {
      t = false;
      loginMutation.mutate();
    }
  }, [currentToken]);

  useEffect(() => {
    if (loginMutation.data?.access_token) {
      setCurrentToken(loginMutation.data?.access_token);
    }
  }, [loginMutation]);

  const onNewCampaignHandler = () => {
    setIsNewCampaign(true);
  };

  const onCloseCampaignHandler = () => {
    setIsNewCampaign(false);
  };

  useEffect(() => {
    console.log(isNewCampaign, "isNewCampaign");
  }, [isNewCampaign]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCampaigns());
    }
  }, [status, dispatch]);

  const handleFilterChange = (type: keyof Filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    setCurrentPage(1);
  };

  const toggleFilter = (
    type: keyof Omit<Filters, "dateRange">,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      status: [],
      dateRange: {
        start: "",
        end: "",
      },
    });
    setCurrentPage(1);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    // Text search
    const searchNormalized = searchTerm.toLowerCase();
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchNormalized) ||
      campaign.type.toLowerCase().includes(searchNormalized) ||
      campaign.status.toLowerCase().includes(searchNormalized);

    if (!matchesSearch) return false;

    // Type filter
    if (filters.type.length > 0 && !filters.type.includes(campaign.type)) {
      return false;
    }

    // Status filter
    if (
      filters.status.length > 0 &&
      !filters.status.includes(campaign.status)
    ) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const campaignDate = new Date(campaign.lastUpdated);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (campaignDate < startDate || campaignDate > endDate) {
        return false;
      }
    }

    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCampaigns = filteredCampaigns.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const renderFiltersPanel = () => (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <div className="space-y-4">
        {/* Type Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Campaign Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Inbound", "Outbound", "Mixed"].map((type) => (
              <button
                key={type}
                onClick={() => toggleFilter("type", type)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.type.includes(type as Campaign["type"])
                    ? getTypeColor(type as Campaign["type"])
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
          <div className="flex flex-wrap gap-2">
            {["Active", "Schedule", "Ongoing"].map((status) => (
              <button
                key={status}
                onClick={() => toggleFilter("status", status)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.status.includes(status as Campaign["status"])
                    ? getStatusColor(status as Campaign["status"])
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Last Updated
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) =>
                  handleFilterChange("dateRange", {
                    ...filters.dateRange,
                    start: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) =>
                  handleFilterChange("dateRange", {
                    ...filters.dateRange,
                    end: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(filters.type.length > 0 ||
          filters.status.length > 0 ||
          filters.dateRange.start ||
          filters.dateRange.end) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <div className="text-sm text-gray-500">
              {filteredCampaigns.length} results found
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

  const renderMobileCard = (campaign: Campaign) => (
    <div
      key={campaign.id}
      className="bg-white p-4 rounded-lg border border-gray-200 space-y-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{campaign.name}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                campaign.type
              )}`}
            >
              {campaign.type}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                campaign.status
              )}`}
            >
              {campaign.status}
            </span>
          </div>
        </div>
        <button
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Edit Campaign"
        >
          <Edit className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Total Leads</p>
          <p className="font-medium text-gray-900">
            {campaign.totalLeads?.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Scheduled</p>
          <p className="font-medium text-gray-900">
            {campaign.scheduledLeads?.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Ongoing</p>
          <p className="font-medium text-gray-900">
            {campaign.ongoingLeads?.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Last Updated</p>
          <p className="font-medium text-gray-900">{campaign.lastUpdated}</p>
        </div>
      </div>

      <div className="pt-2">
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${campaign.conversion}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900">
            {campaign.conversion}%
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Conversion Rate</p>
      </div>
    </div>
  );

  if (status === "loading") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading campaigns...</span>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Active Campaigns
            </h2>
            <button
              onClick={onNewCampaignHandler}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isFiltersOpen
                  ? "bg-blue-50 text-blue-600"
                  : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {(filters.type.length > 0 ||
                filters.status.length > 0 ||
                filters.dateRange.start ||
                filters.dateRange.end) && (
                <span className="ml-2 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                  {filters.type.length +
                    filters.status.length +
                    (filters.dateRange.start ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {isFiltersOpen && renderFiltersPanel()}

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200">
          {paginatedCampaigns.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No campaigns found matching your search criteria
            </div>
          ) : (
            <div className="p-4 grid gap-4">
              {paginatedCampaigns.map(renderMobileCard)}
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Campaign Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Type
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Total Leads
              </th>
              <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">
                Schedule
              </th>
              <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">
                Ongoing
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Conversion
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Last Updated
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedCampaigns.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                  No campaigns found matching your search criteria
                </td>
              </tr>
            ) : (
              paginatedCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-200">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {campaign.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                        campaign.type
                      )}`}
                    >
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {campaign.totalLeads?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-900">
                    {campaign.scheduledLeads?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-900">
                    {campaign.ongoingLeads?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${campaign.conversion}%` }}
                        />
                      </div>
                      <span className="text-gray-900">
                        {campaign.conversion}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {campaign.lastUpdated}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Edit Campaign"
                      >
                        <Edit className="w-4 h-4 text-gray-500" />
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
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredCampaigns.length)} of{" "}
            {filteredCampaigns.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <div className="sm:hidden">
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      {isNewCampaign && (
        <NewCampaignModal_2
          onClose={onCloseCampaignHandler}
          currentToken={currentToken}
        />
      )}
    </div>
  );
}
