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
    <div className="bg-gradient-to-r from-[#407734] to-[#2B4A11] text-white p-6 rounded-lg mb-6">
      <h1 className="text-3xl font-bold mb-2">{title || "New Session"}</h1>
      <div className="flex items-center gap-6">
        <div>
          <span className="text-sm opacity-90">Focus:</span>
          <span className="ml-2 font-semibold">{focus || "Not set"}</span>
        </div>
        <div>
          <span className="text-sm opacity-90">Total Duration:</span>
          <span className="ml-2 font-semibold">{totalDuration} minutes</span>
        </div>
      </div>
    </div>
  );
};

export default SessionSummaryHeader;
