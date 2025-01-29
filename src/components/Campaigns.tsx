import React, { useState, useEffect } from "react";
import { Edit2, Save, Users, Calendar, Clock, TrendingUp } from "lucide-react";
import TimeSelect from "./modals/TimeSelect";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchCampaigns } from "../store/slices/campaignsSlice";
import type { Campaign } from "../types/campaign";

interface CampaignDetails extends Campaign {
  timezone: string;
  campaignPhone: string;
  adminPhone: string;
  afterHoursMessage: string;
  workingHours: {
    monday: { closed: boolean; opens: string; closes: string };
    tuesday: { closed: boolean; opens: string; closes: string };
    wednesday: { closed: boolean; opens: string; closes: string };
    thursday: { closed: boolean; opens: string; closes: string };
    friday: { closed: boolean; opens: string; closes: string };
    saturday: { closed: boolean; opens: string; closes: string };
    sunday: { closed: boolean; opens: string; closes: string };
  };
}

const defaultWorkingHours = {
  monday: { closed: false, opens: "09:00", closes: "17:00" },
  tuesday: { closed: false, opens: "09:00", closes: "17:00" },
  wednesday: { closed: false, opens: "09:00", closes: "17:00" },
  thursday: { closed: false, opens: "09:00", closes: "17:00" },
  friday: { closed: false, opens: "09:00", closes: "17:00" },
  saturday: { closed: true, opens: "09:00", closes: "17:00" },
  sunday: { closed: true, opens: "09:00", closes: "17:00" },
};

const defaultCampaignDetails = (campaign: Campaign): CampaignDetails => ({
  ...campaign,
  timezone: "Pacific Time",
  campaignPhone: "",
  adminPhone: "",
  afterHoursMessage:
    "Thank you for reaching out! Our office is currently closed. We will get back to you during business hours.",
  workingHours: defaultWorkingHours,
});

export default function Campaigns() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: campaigns,
    status,
    error,
  } = useSelector((state: RootState) => state.campaigns);
  const [selectedCampaign, setSelectedCampaign] =
    useState<CampaignDetails | null>(null);
  const [formData, setFormData] = useState<CampaignDetails | null>(null);
  const [editableFields, setEditableFields] = useState<Record<string, boolean>>(
    {}
  );
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCampaigns());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (campaigns.length > 0 && !selectedCampaign) {
      const initialCampaign = defaultCampaignDetails(campaigns[0]);
      setSelectedCampaign(initialCampaign);
      setFormData(initialCampaign);
    }
  }, [campaigns, selectedCampaign]);

  const handleSave = () => {
    if (formData) {
      setSelectedCampaign(formData);
      setEditableFields({});
    }
  };

  const renderTabs = () => (
    <div className="flex space-x-4 border-b border-gray-200 mb-6">
      <button
        onClick={() => setActiveTab("details")}
        className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === "details"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }`}
      >
        Details
      </button>
      <button
        onClick={() => setActiveTab("working-hours")}
        className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === "working-hours"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }`}
      >
        Working Hours
      </button>
      <button
        onClick={() => setActiveTab("knowledge-base")}
        className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
          activeTab === "knowledge-base"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }`}
      >
        Knowledge Base
      </button>
    </div>
  );

  const renderEditableField = (
    label: string,
    field: keyof CampaignDetails,
    value: string,
    options?: string[]
  ) => (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button
          onClick={() =>
            setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }))
          }
          className="p-1 hover:bg-gray-100 rounded-lg"
        >
          <Edit2 className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      {options ? (
        <select
          value={editableFields[field] ? formData?.[field] : value}
          onChange={(e) =>
            formData && setFormData({ ...formData, [field]: e.target.value })
          }
          disabled={!editableFields[field]}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white disabled:bg-gray-50"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={editableFields[field] ? formData?.[field] : value}
          onChange={(e) =>
            formData && setFormData({ ...formData, [field]: e.target.value })
          }
          disabled={!editableFields[field]}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white disabled:bg-gray-50"
        />
      )}
    </div>
  );

  const renderWorkingHours = () => {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ] as const;

    return (
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Working Hours</h3>
        <div className="space-y-2">
          {days.map((day) => {
            const hours = formData?.workingHours[day];
            if (!hours) return null;

            return (
              <div
                key={day}
                className="flex items-center space-x-4 py-3 border-b border-gray-200 last:border-0"
              >
                <div className="w-32 capitalize">{day}</div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={hours.closed}
                    onChange={(e) => {
                      if (formData) {
                        setFormData({
                          ...formData,
                          workingHours: {
                            ...formData.workingHours,
                            [day]: {
                              ...formData.workingHours[day],
                              closed: e.target.checked,
                            },
                          },
                        });
                      }
                    }}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Closed</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Opens at
                    </label>
                    <TimeSelect
                      value={hours.opens}
                      onChange={(value) => {
                        if (formData) {
                          setFormData({
                            ...formData,
                            workingHours: {
                              ...formData.workingHours,
                              [day]: {
                                ...formData.workingHours[day],
                                opens: value,
                              },
                            },
                          });
                        }
                      }}
                      disabled={hours.closed}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Closes at
                    </label>
                    <TimeSelect
                      value={hours.closes}
                      onChange={(value) => {
                        if (formData) {
                          setFormData({
                            ...formData,
                            workingHours: {
                              ...formData.workingHours,
                              [day]: {
                                ...formData.workingHours[day],
                                closes: value,
                              },
                            },
                          });
                        }
                      }}
                      disabled={hours.closed}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCampaignDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderEditableField(
          "Campaign Name",
          "name",
          selectedCampaign?.name || ""
        )}
        {renderEditableField(
          "Campaign Type",
          "type",
          selectedCampaign?.type || "",
          ["Inbound", "Outbound", "Mixed"]
        )}
        {renderEditableField(
          "Campaign Status",
          "status",
          selectedCampaign?.status || "",
          ["Active", "Schedule", "Ongoing"]
        )}
        {renderEditableField(
          "Campaign Timezone",
          "timezone",
          selectedCampaign?.timezone || "",
          ["Pacific Time", "Mountain Time", "Central Time", "Eastern Time"]
        )}
        {renderEditableField(
          "Campaign Phone Number",
          "campaignPhone",
          selectedCampaign?.campaignPhone || ""
        )}
        {renderEditableField(
          "Admin Phone Number",
          "adminPhone",
          selectedCampaign?.adminPhone || ""
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-700">
            After Hours Message
          </label>
          <button
            onClick={() =>
              setEditableFields((prev) => ({
                ...prev,
                afterHoursMessage: !prev.afterHoursMessage,
              }))
            }
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <textarea
          value={
            editableFields.afterHoursMessage
              ? formData?.afterHoursMessage
              : selectedCampaign?.afterHoursMessage
          }
          onChange={(e) =>
            formData &&
            setFormData({ ...formData, afterHoursMessage: e.target.value })
          }
          disabled={!editableFields.afterHoursMessage}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg disabled:bg-gray-50"
        />
      </div>
    </div>
  );

  const renderKnowledgeBase = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Primary Goal</h3>
        <textarea
          className="w-full h-24 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Describe the primary goal"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Knowledge Base</h3>
        <textarea
          className="w-full h-24 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Provide product details"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Communication Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Use Emoji on Responses
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-blue-500">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Communication Tone
            </label>
            <select className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-blue-500">
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === "failed") {
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  }

  if (!selectedCampaign || !formData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Campaign Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-2xl font-semibold mt-1 text-gray-900">
                {selectedCampaign.totalLeads?.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Schedule</p>
              <p className="text-2xl font-semibold mt-1 text-gray-900">
                {selectedCampaign.scheduledLeads?.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Ongoing</p>
              <p className="text-2xl font-semibold mt-1 text-gray-900">
                {selectedCampaign.ongoingLeads?.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Conversion</p>
              <p className="text-2xl font-semibold mt-1 text-gray-900">
                {selectedCampaign.conversion}%
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6">
          {renderTabs()}

          {activeTab === "details" && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Campaign Details
              </h2>
              {renderCampaignDetails()}
            </>
          )}

          {activeTab === "working-hours" && renderWorkingHours()}

          {activeTab === "knowledge-base" && renderKnowledgeBase()}
        </div>

        {/* Save Button */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
