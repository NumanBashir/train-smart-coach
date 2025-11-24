"use client";

import React from "react";

interface SessionSummaryHeaderProps {
  title: string;
  focus: string;
  totalDuration: number;
}

const SessionSummaryHeader: React.FC<SessionSummaryHeaderProps> = ({
  title,
  focus,
  totalDuration,
}) => {
  return (
    <div
      className="bg-gradient-to-r from-[#407734] to-[#2B4A11] text-white p-6 rounded-lg mb-6 w-full"
      style={{ maxWidth: "100%", boxSizing: "border-box" }}
    >
      <h1
        className="text-3xl font-bold mb-2 break-words"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
        }}
      >
        {title || "New Session"}
      </h1>
      <div className="flex items-center gap-6 flex-wrap">
        <div
          className="min-w-0 flex-1 break-words"
          style={{ maxWidth: "100%" }}
        >
          <span className="text-sm opacity-90">Focus:</span>
          <span
            className="ml-2 font-semibold break-words"
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              display: "inline-block",
              maxWidth: "100%",
            }}
          >
            {focus || "Not set"}
          </span>
        </div>
        <div className="flex-shrink-0">
          <span className="text-sm opacity-90">Total Duration:</span>
          <span className="ml-2 font-semibold">{totalDuration} minutes</span>
        </div>
      </div>
    </div>
  );
};

export default SessionSummaryHeader;
