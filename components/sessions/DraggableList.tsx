"use client";

import React from "react";
import DrillItemEditable from "./DrillItemEditable";
import { SessionDrill } from "./types";

interface DraggableListProps {
  drills: SessionDrill[];
  onDurationChange: (index: number, duration: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({
  drills,
  onDurationChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}) => {
  return (
    <div className="space-y-2">
      {drills.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No drills added yet. Click "Add Drill" to get started.
        </p>
      ) : (
        drills.map((drill, index) => (
          <DrillItemEditable
            key={`${drill.drillId}-${index}`}
            drill={drill}
            index={index}
            totalDrills={drills.length}
            onDurationChange={onDurationChange}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onRemove={onRemove}
          />
        ))
      )}
    </div>
  );
};

export default DraggableList;

