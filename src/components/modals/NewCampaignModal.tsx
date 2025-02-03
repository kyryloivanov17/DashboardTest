import React from "react";
import { useState, useEffect } from "react";
import { X, Sparkles, Link2, FileText } from "lucide-react";
import TimeSelect from "./TimeSelect";
import { useDispatch } from "react-redux";
import { setValue } from "../../store/slices/campaignsSlice";
import { AppDispatch } from "../../store/store";

interface NewCampaignModalProps {
  onClose: () => void;
  currentToken?: String | null;
}

interface CampaignForm {
  details: {
    name: string;
    type: string;
    status: string;
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
  };
  knowledgeBase: {
    primaryGoal: string;
    productDetails: string;
  };
  communications: {
    useEmoji: boolean;
    tone: string;
  };
}

const TIMEZONES = [
  "Pacific Time",
  "Mountain Time",
  "Central Time",
  "Eastern Time",
];

const CAMPAIGN_STATUSES = ["Active", "Not Active"];

const CAMPAIGN_TYPES = ["Inbound", "Outbound", "Mixed"];

const COMMUNICATION_TONES = ["Friendly", "Professional", "Casual"];

const DEFAULT_WORKING_HOURS = {
  monday: { closed: false, opens: "09:00", closes: "17:00" },
  tuesday: { closed: false, opens: "09:00", closes: "17:00" },
  wednesday: { closed: false, opens: "09:00", closes: "17:00" },
  thursday: { closed: false, opens: "09:00", closes: "17:00" },
  friday: { closed: false, opens: "09:00", closes: "17:00" },
  saturday: { closed: true, opens: "09:00", closes: "17:00" },
  sunday: { closed: true, opens: "09:00", closes: "17:00" },
};

export default function NewCampaignModal_2({
  onClose,
  currentToken,
}: NewCampaignModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorPopup, setErrorPopup] = useState<boolean>(false);

  const [currentStepContext, setCurrentStepContext] = useState<string>(
    "Step 1 of 3: Campaign Details"
  );

  const [formData, setFormData] = useState<CampaignForm>({
    details: {
      name: "",
      type: "",
      status: "Active",
      timezone: "Pacific Time",
      campaignPhone: "",
      adminPhone: "",
      afterHoursMessage:
        "Hi, thank you for reaching out. Our office is closed at the moment. We will contact you during business hours.",
      workingHours: DEFAULT_WORKING_HOURS,
    },
    knowledgeBase: {
      primaryGoal: "",
      productDetails: "",
    },
    communications: {
      useEmoji: true,
      tone: "Professional",
    },
  });

  useEffect(() => {
    if (
      formData?.details?.adminPhone !== "" &&
      formData?.details?.name !== "" &&
      formData?.details?.type !== "" &&
      formData?.details?.campaignPhone !== ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleInputChange = (
    step: keyof CampaignForm,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
    setErrorPopup(false);
  };

  const handleWorkingHoursChange = (
    day: keyof typeof DEFAULT_WORKING_HOURS,
    field: keyof typeof DEFAULT_WORKING_HOURS.monday,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        workingHours: {
          ...prev.details.workingHours,
          [day]: {
            ...prev.details.workingHours[day],
            [field]: value,
          },
        },
      },
    }));
  };

  const onBackHandler = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNextHandler = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getAllCampaigns = (token: String) => {
    const url =
      "http://ec2-52-23-205-94.compute-1.amazonaws.com:3000/api/campaigns";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setValue(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  interface NewCampI {
    token: String;
    formData: {
      name: string;
      type: string;
      status: string;
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
    };
  }

  const fetchCreateNewCamp = (data: NewCampI) => {
    const url =
      "http://ec2-52-23-205-94.compute-1.amazonaws.com:3000/api/campaigns"; // API endpoint

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.token}`,
      },
      body: JSON.stringify(data?.formData),
    })
      .then((response) => response.json())
      .then(() => {
        if (currentToken) {
          getAllCampaigns(currentToken);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onCreateCampaignHandler = () => {
    if (currentToken) {
      const data = {
        token: currentToken,
        formData: formData?.details,
      };
      fetchCreateNewCamp(data);
    }
    onClose();
  };

  useEffect(() => {
    if (currentStep === 1) {
      setCurrentStepContext("Step 1 of 3: Campaign Details");
    }

    if (currentStep === 2) {
      setCurrentStepContext("Step 2 of 3: Working Hours");
    }

    if (currentStep === 3) {
      setCurrentStepContext("Step 3 of 3: Knowledge Base & Communications");
    }
  }, [currentStep]);

  const renderStepIndicator = () => (
    <div className="flex justify-center space-x-2 py-4">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            step === currentStep
              ? "bg-blue-600"
              : step < currentStep
              ? "bg-blue-200"
              : "bg-gray-200"
          }`}
        />
      ))}
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
            const hours = formData.details.workingHours[day];
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
                    onChange={(e) =>
                      handleWorkingHoursChange(day, "closed", e.target.checked)
                    }
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
                      onChange={(value) =>
                        handleWorkingHoursChange(day, "opens", value)
                      }
                      disabled={hours.closed}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Closes at
                    </label>
                    <TimeSelect
                      value={hours.closes}
                      onChange={(value) =>
                        handleWorkingHoursChange(day, "closes", value)
                      }
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

  const renderWorkingHoursStep = () => (
    <div className="space-y-6">{renderWorkingHours()}</div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Campaign Name
        </label>
        <input
          type="text"
          value={formData.details.name}
          onChange={(e) => handleInputChange("details", "name", e.target.value)}
          className={`w-full px-4 py-2 border ${
            errorPopup === false || (errorPopup && formData.details.name !== "")
              ? "border-gray-200"
              : "border-red-200"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder={
            errorPopup === false || (errorPopup && formData.details.name !== "")
              ? "Enter campaign name"
              : "Required"
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Type
          </label>
          <select
            value={formData.details.type}
            onChange={(e) =>
              handleInputChange("details", "type", e.target.value)
            }
            className={`w-full px-4 py-2 border ${
              errorPopup === false ||
              (errorPopup && formData.details.type !== "")
                ? "border-gray-200"
                : "border-red-200"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select type</option>
            {CAMPAIGN_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Status
          </label>
          <select
            value={formData.details.status}
            onChange={(e) =>
              handleInputChange("details", "status", e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CAMPAIGN_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Phone Number
          </label>
          <input
            type="tel"
            value={formData.details.campaignPhone}
            onChange={(e) =>
              handleInputChange("details", "campaignPhone", e.target.value)
            }
            className={`w-full px-4 py-2 border ${
              errorPopup === false ||
              (errorPopup && formData.details.campaignPhone !== "")
                ? "border-gray-200"
                : "border-red-200"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={
              errorPopup === false ||
              (errorPopup && formData.details.campaignPhone !== "")
                ? "Enter phone number"
                : "Required"
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Phone Number
          </label>
          <input
            placeholder={
              errorPopup === false ||
              (errorPopup && formData.details.adminPhone !== "")
                ? "Enter admin phone"
                : "Required"
            }
            type="tel"
            value={formData.details.adminPhone}
            onChange={(e) =>
              handleInputChange("details", "adminPhone", e.target.value)
            }
            className={`w-full px-4 py-2 border ${
              errorPopup === false ||
              (errorPopup && formData.details.adminPhone !== "")
                ? "border-gray-200"
                : "border-red-200"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Timezone
        </label>
        <select
          value={formData.details.timezone}
          onChange={(e) =>
            handleInputChange("details", "timezone", e.target.value)
          }
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {TIMEZONES.map((timezone) => (
            <option key={timezone} value={timezone}>
              {timezone}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          After Hours Message
        </label>
        <textarea
          value={formData.details.afterHoursMessage}
          onChange={(e) =>
            handleInputChange("details", "afterHoursMessage", e.target.value)
          }
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderKnowledgeBaseStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Primary Goal</h3>
          <div className="flex gap-2">
            <button className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
              <Sparkles className="w-4 h-4 mr-1" />
              AI Generate
            </button>
            <button className="inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
              <FileText className="w-4 h-4 mr-1" />
              Add Text
            </button>
          </div>
        </div>
        <textarea
          value={formData.knowledgeBase.primaryGoal}
          onChange={(e) =>
            handleInputChange("knowledgeBase", "primaryGoal", e.target.value)
          }
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the primary goal of this campaign"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Knowledge Base</h3>
          <div className="flex gap-2">
            <button className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
              <Sparkles className="w-4 h-4 mr-1" />
              AI Generate
            </button>
            <button className="inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
              <Link2 className="w-4 h-4 mr-1" />
              Paste URL
            </button>
          </div>
        </div>
        <textarea
          value={formData.knowledgeBase.productDetails}
          onChange={(e) =>
            handleInputChange("knowledgeBase", "productDetails", e.target.value)
          }
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Provide product or service details"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Communications</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Use Emoji on Responses
            </label>
            <select
              value={formData.communications.useEmoji ? "yes" : "no"}
              onChange={(e) =>
                handleInputChange(
                  "communications",
                  "useEmoji",
                  e.target.value === "yes"
                )
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Communication Tone
            </label>
            <select
              value={formData.communications.tone}
              onChange={(e) =>
                handleInputChange("communications", "tone", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {COMMUNICATION_TONES.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Campaign
              </h2>
              <p className="text-sm text-gray-500 mt-1">{currentStepContext}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          {renderStepIndicator()}
          {/* Form Content */}
          <div className="p-6 h-[600px] overflow-y-auto">
            {currentStep === 1 && renderDetailsStep()}
            {currentStep === 2 && renderWorkingHoursStep()}
            {currentStep === 3 && renderKnowledgeBaseStep()}
          </div>
          {/* Footer */}
          <div className="flex justify-between px-6 py-4 border-t border-gray-200">
            <button
              className={`px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 ${
                currentStep === 1 ? "invisible" : ""
              }`}
              onClick={onBackHandler}
            >
              Back
            </button>

            <button
              className={`px-6 py-2 bg-blue-600 ${
                !((!currentToken && currentStep === 3) || errorPopup)
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-100 hover:bg-gray-200"
              } text-white rounded-lg `}
              onClick={
                currentStep === 3
                  ? () => {
                      if (currentToken) {
                        onCreateCampaignHandler();
                        setErrorPopup(false);
                      }
                    }
                  : () => {
                      if (isValid) {
                        onNextHandler();
                      } else {
                        setErrorPopup(true);
                      }
                    }
              }
            >
              {currentStep === 3 ? "Create Campaign" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
