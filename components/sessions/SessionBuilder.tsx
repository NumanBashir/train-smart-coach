"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddDrillModal from "./AddDrillModal";
import DraggableList from "./DraggableList";
import SessionSummaryHeader from "./SessionSummaryHeader";
import { Drill, SessionDrill } from "./types";

interface SessionBuilderProps {
  initialData?: {
    title: string;
    focus: string;
    notes: string;
    dateTime: string;
    drills: SessionDrill[];
    totalDuration: number;
  };
  sessionId?: string;
}

const SessionBuilder: React.FC<SessionBuilderProps> = ({
  initialData,
  sessionId,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [focus, setFocus] = useState(initialData?.focus || "");
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [dateTime, setDateTime] = useState(initialData?.dateTime || "");
  const [drills, setDrills] = useState<SessionDrill[]>(
    initialData?.drills || []
  );
  const [totalDuration, setTotalDuration] = useState(
    initialData?.totalDuration || 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Recalculate total duration when drills change
  useEffect(() => {
    const total = drills.reduce((sum, drill) => sum + (drill.duration || 0), 0);
    setTotalDuration(total);
  }, [drills]);

  const handleAddDrills = (newDrills: Drill[]) => {
    const nextOrder = drills.length;
    const sessionDrills: SessionDrill[] = newDrills.map((drill, index) => ({
      drillId: drill._id,
      duration: 0,
      order: nextOrder + index,
    }));
    setDrills([...drills, ...sessionDrills]);
  };

  const handleDurationChange = (index: number, duration: number) => {
    if (duration < 0) return;
    const updatedDrills = [...drills];
    updatedDrills[index].duration = duration;
    // Reorder drills to maintain order property
    updatedDrills.forEach((drill, idx) => {
      drill.order = idx;
    });
    setDrills(updatedDrills);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updatedDrills = [...drills];
    [updatedDrills[index - 1], updatedDrills[index]] = [
      updatedDrills[index],
      updatedDrills[index - 1],
    ];
    // Reorder drills to maintain order property
    updatedDrills.forEach((drill, idx) => {
      drill.order = idx;
    });
    setDrills(updatedDrills);
  };

  const handleMoveDown = (index: number) => {
    if (index === drills.length - 1) return;
    const updatedDrills = [...drills];
    [updatedDrills[index], updatedDrills[index + 1]] = [
      updatedDrills[index + 1],
      updatedDrills[index],
    ];
    // Reorder drills to maintain order property
    updatedDrills.forEach((drill, idx) => {
      drill.order = idx;
    });
    setDrills(updatedDrills);
  };

  const handleRemove = (index: number) => {
    const updatedDrills = drills.filter((_, idx) => idx !== index);
    // Reorder drills to maintain order property
    updatedDrills.forEach((drill, idx) => {
      drill.order = idx;
    });
    setDrills(updatedDrills);
  };

  const handleSave = async () => {
    // Validation
    if (!title.trim() || !focus.trim()) {
      alert("Title and focus are required");
      return;
    }

    // Check all drills have duration > 0
    const invalidDrill = drills.find((d) => !d.duration || d.duration <= 0);
    if (invalidDrill) {
      alert("All drills must have a duration greater than 0");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        title,
        focus,
        notes,
        dateTime: dateTime || undefined,
        drills: drills.map((d) => ({
          drillId: typeof d.drillId === "string" ? d.drillId : d.drillId._id,
          duration: d.duration,
          order: d.order,
        })),
        totalDuration,
      };

      const url = sessionId ? `/api/sessions/${sessionId}` : "/api/sessions";
      const method = sessionId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save session");
      }

      const data = await response.json();
      const sessionIdToUse = data.session?._id || sessionId;
      if (sessionIdToUse) {
        router.push(`/sessions/${sessionIdToUse}`);
      } else {
        router.push("/sessions");
      }
    } catch (error: any) {
      console.error("Error saving session:", error);
      alert(error.message || "Failed to save session");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="w-full max-w-3xl">
        <SessionSummaryHeader
          title={title || "New Session"}
          focus={focus || "Not set"}
          totalDuration={totalDuration}
        />

        <form className="space-y-4">
          {/* Title - Required */}
          <div>
            <label className="label">
              <span className="label-text font-medium">
                Title <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter session title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Focus - Required */}
          <div>
            <label className="label">
              <span className="label-text font-medium">
                Focus <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter focus area"
              className="input input-bordered w-full"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              required
            />
          </div>

          {/* Notes - Optional */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Notes</span>
            </label>
            <textarea
              placeholder="Add any notes (optional)"
              className="textarea textarea-bordered w-full"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Date/Time - Optional */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Date & Time</span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered w-full"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>

          {/* Drills Section */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#2B4A11]">Drills</h2>
              <button
                type="button"
                className="btn btn_primary"
                onClick={() => setIsModalOpen(true)}
              >
                Add Drill
              </button>
            </div>

            <DraggableList
              drills={drills}
              onDurationChange={handleDurationChange}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onRemove={handleRemove}
            />
          </div>

          {/* Total Duration Display */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold">
              Total Duration:{" "}
              <span className="text-[#407734]">{totalDuration}</span> minutes
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="button"
              className="btn btn_primary w-full"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : sessionId
                ? "Update Session"
                : "Save Session"}
            </button>
          </div>
        </form>
      </div>

      <AddDrillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddDrills={handleAddDrills}
      />
    </div>
  );
};

export default SessionBuilder;
