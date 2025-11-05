"use client";

import { useState } from "react";
import AppealForm from "@/components/AppealForm";
import EmailPreview from "@/components/EmailPreview";

export default function Home() {
  const [generatedEmail, setGeneratedEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAppeal = async (formData: {
    referenceNumber: string;
    userName: string;
    company: string;
    fineAmount: string;
    reason: string;
    keyFacts: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setGeneratedEmail(null);

    try {
      const response = await fetch("/api/generate-appeal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate appeal letter");
      }

      const data = await response.json();
      setGeneratedEmail(data.email);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedEmail(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Appeal Letter Generator
          </h1>
          <p className="text-xl text-gray-600">
            Generate professional appeal letters for parking tickets and train fines
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <AppealForm
              onSubmit={handleGenerateAppeal}
              isLoading={isLoading}
              onReset={handleReset}
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            )}

            {generatedEmail && (
              <EmailPreview email={generatedEmail} onNewAppeal={handleReset} />
            )}

            {!generatedEmail && !error && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-gray-400 mb-3">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">
                  Fill out the form to generate your appeal letter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
