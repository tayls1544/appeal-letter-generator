"use client";

import { useState } from "react";

interface AppealFormProps {
  onSubmit: (data: {
    referenceNumber: string;
    userName: string;
    company: string;
    fineAmount: string;
    reason: string;
    keyFacts: string;
  }) => Promise<void>;
  isLoading: boolean;
}

export default function AppealForm({
  onSubmit,
  isLoading,
}: AppealFormProps) {
  const [formData, setFormData] = useState({
    referenceNumber: "",
    userName: "",
    company: "",
    fineAmount: "",
    reason: "",
    keyFacts: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.referenceNumber.trim()) {
      errors.referenceNumber = "Reference number is required";
    }
    if (!formData.userName.trim()) {
      errors.userName = "Your name is required";
    }
    if (!formData.company.trim()) {
      errors.company = "Company name is required";
    }
    if (!formData.fineAmount.trim()) {
      errors.fineAmount = "Fine amount is required";
    }
    if (!formData.reason.trim()) {
      errors.reason = "Reason for appeal is required";
    }
    if (!formData.keyFacts.trim()) {
      errors.keyFacts = "Key facts/context is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Reference Number *
        </label>
        <input
          type="text"
          id="referenceNumber"
          name="referenceNumber"
          value={formData.referenceNumber}
          onChange={handleChange}
          placeholder="e.g., PCN123456789"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.referenceNumber ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isLoading}
        />
        {formErrors.referenceNumber && (
          <p className="text-red-500 text-sm mt-1">{formErrors.referenceNumber}</p>
        )}
      </div>

      <div>
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name *
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="John Smith"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.userName ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isLoading}
        />
        {formErrors.userName && (
          <p className="text-red-500 text-sm mt-1">{formErrors.userName}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company Being Appealed To *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="e.g., National Parking Enforcement"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.company ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isLoading}
        />
        {formErrors.company && (
          <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>
        )}
      </div>

      <div>
        <label htmlFor="fineAmount" className="block text-sm font-medium text-gray-700 mb-1">
          Fine Amount (£) *
        </label>
        <input
          type="text"
          id="fineAmount"
          name="fineAmount"
          value={formData.fineAmount}
          onChange={handleChange}
          placeholder="e.g., 130"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formErrors.fineAmount ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isLoading}
        />
        {formErrors.fineAmount && (
          <p className="text-red-500 text-sm mt-1">{formErrors.fineAmount}</p>
        )}
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
          Reason for Appeal *
        </label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="e.g., Unclear signage, medical emergency, payment already made..."
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            formErrors.reason ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isLoading}
        />
        {formErrors.reason && (
          <p className="text-red-500 text-sm mt-1">{formErrors.reason}</p>
        )}
      </div>

      <div>
        <label htmlFor="keyFacts" className="block text-sm font-medium text-gray-700 mb-1">
          Key Facts / Additional Context *
        </label>
        <textarea
          id="keyFacts"
          name="keyFacts"
          value={formData.keyFacts}
          onChange={handleChange}
          placeholder="Provide supporting details, dates, circumstances, evidence..."
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            formErrors.keyFacts ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isLoading}
        />
        {formErrors.keyFacts && (
          <p className="text-red-500 text-sm mt-1">{formErrors.keyFacts}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </span>
        ) : (
          "Generate Appeal Letter"
        )}
      </button>
    </form>
  );
}
