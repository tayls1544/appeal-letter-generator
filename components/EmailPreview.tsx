"use client";

import { useState } from "react";

interface EmailPreviewProps {
  email: string;
  onNewAppeal: () => void;
}

export default function EmailPreview({ email, onNewAppeal }: EmailPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <h2 className="text-white text-xl font-bold">Your Appeal Letter</h2>
        <p className="text-blue-100 text-sm mt-1">
          Review before sending or copy to your email client
        </p>
      </div>

      {/* Email Content */}
      <div className="p-8 border-b border-gray-200">
        <div className="bg-gray-50 rounded-lg p-6 font-serif text-gray-800 whitespace-pre-wrap leading-relaxed text-sm max-h-96 overflow-y-auto">
          {email}
        </div>
      </div>

      {/* Actions */}
      <div className="px-8 py-6 bg-gray-50 space-y-3 sm:space-y-0 sm:flex sm:gap-3">
        <button
          onClick={handleCopy}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            copied
              ? "bg-green-500 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {copied ? (
            <>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy to Clipboard
            </>
          )}
        </button>

        <button
          onClick={onNewAppeal}
          className="flex-1 py-3 px-4 rounded-lg font-semibold bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors duration-200"
        >
          Create New Appeal
        </button>
      </div>

      {/* Tips */}
      <div className="px-8 py-6 bg-blue-50 border-t border-blue-100">
        <h3 className="text-blue-900 font-semibold text-sm mb-2">Tips for sending:</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Paste into your email client (Gmail, Outlook, etc.)</li>
          <li>• Add a professional subject line if needed</li>
          <li>• Review carefully before sending</li>
          <li>• Keep a copy for your records</li>
        </ul>
      </div>
    </div>
  );
}
