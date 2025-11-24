"use client";

import React from "react";
import { SessionDrill, Drill } from "./types";

interface DrillItemEditableProps {
  drill: SessionDrill;
  index: number;
  totalDrills: number;
  onDurationChange: (index: number, duration: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
}

const DrillItemEditable: React.FC<DrillItemEditableProps> = ({
  drill,
  index,
  totalDrills,
  onDurationChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}) => {
  const drillData = typeof drill.drillId === "string" ? null : drill.drillId;

  return (
    <div className="card bg-base-100 shadow-sm border border-gray-200 mb-4">
      <div className="card-body p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#2B4A11] mb-2">
              {index + 1}. {drillData?.title || "Drill"}
            </h3>
            {drillData?.description && (
              <p className="text-sm text-gray-600 mb-3">
                {drillData.description.length > 100
                  ? `${drillData.description.slice(0, 100)}...`
                  : drillData.description}
              </p>
            )}
            <div className="flex items-center gap-4">
              <label className="label">
                <span className="label-text font-medium">
                  Duration (minutes)
                </span>
              </label>
              <input
                type="number"
                min="1"
                step="1"
                className="input input-bordered w-24"
                value={drill.duration || 0}
                onChange={(e) =>
                  onDurationChange(index, parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
            >
              ↑
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => onMoveDown(index)}
              disabled={index === totalDrills - 1}
            >
              ↓
            </button>
            <button
              type="button"
              className="btn btn-sm btn-error"
              onClick={() => onRemove(index)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillItemEditable;
