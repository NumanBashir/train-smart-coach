"use client";

import React, { useState, useEffect } from "react";
import DrillCard from "@/components/DrillCard";

interface Category {
  technical: string[];
  tactical: string[];
  physical: string[];
  gameSituations: string[];
}

interface Equipment {
  name: string;
  quantity: number;
  bibColorQuantities: number[];
}

interface Drill {
  _id: string;
  title: string;
  description: string;
  images: string[];
  ageGroup: string[];
  category: Category;
  minPlayers: number;
  maxPlayers: number;
  equipment: Equipment[];
  duration: number;
}

interface SessionDrill {
  drillId: string;
  duration: number | null;
  order: number;
}

const CreateSessionPage = () => {
  const [title, setTitle] = useState("");
  const [focus, setFocus] = useState("");
  const [notes, setNotes] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [sessionDrills, setSessionDrills] = useState<SessionDrill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allDrills, setAllDrills] = useState<Drill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedDrillIds, setSelectedDrillIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchDrills = async () => {
      const response = await fetch("/api/drill");
      const data = await response.json();
      setAllDrills(data);
    };
    fetchDrills();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleToggleDrillSelection = (drillId: string) => {
    setSelectedDrillIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(drillId)) {
        newSet.delete(drillId);
      } else {
        newSet.add(drillId);
      }
      return newSet;
    });
  };

  const handleAddSelectedDrills = () => {
    const selectedDrills = allDrills.filter((drill) =>
      selectedDrillIds.has(drill._id)
    );
    const nextOrder = sessionDrills.length + 1;
    const newDrills: SessionDrill[] = selectedDrills.map((drill, index) => ({
      drillId: drill._id,
      duration: null,
      order: nextOrder + index,
    }));
    setSessionDrills([...sessionDrills, ...newDrills]);
    setSelectedDrillIds(new Set());
    setIsModalOpen(false);
  };

  const handleAddDrill = (drill: Drill) => {
    const nextOrder = sessionDrills.length + 1;
    const newDrill: SessionDrill = {
      drillId: drill._id,
      duration: null,
      order: nextOrder,
    };
    setSessionDrills([...sessionDrills, newDrill]);
  };

  const filteredDrills = allDrills.filter((drill) => {
    const matchesSearch =
      drill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drill.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterCategory === "all" ||
      drill.category.technical.includes(filterCategory) ||
      drill.category.tactical.includes(filterCategory) ||
      drill.category.physical.includes(filterCategory) ||
      drill.category.gameSituations.includes(filterCategory);

    return matchesSearch && matchesFilter;
  });

  const getUniqueCategories = () => {
    const categories = new Set<string>();
    allDrills.forEach((drill) => {
      drill.category.technical.forEach((cat) => categories.add(cat));
      drill.category.tactical.forEach((cat) => categories.add(cat));
      drill.category.physical.forEach((cat) => categories.add(cat));
      drill.category.gameSituations.forEach((cat) => categories.add(cat));
    });
    return Array.from(categories).sort();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#2B4A11] mb-6">
          Create New Session
        </h1>

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

          {/* Added Drills Display */}
          {sessionDrills.length > 0 && (
            <div className="pt-2">
              <p className="text-sm text-gray-600 mb-2">
                Added Drills: {sessionDrills.length}
              </p>
            </div>
          )}

          {/* Add Drill Button */}
          <div className="pt-2">
            <button
              type="button"
              className="btn btn_primary w-full"
              onClick={() => {
                setSelectedDrillIds(new Set());
                setIsModalOpen(true);
              }}
            >
              Add Drills
            </button>
          </div>
        </form>
      </div>

      {/* Add Drill Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => {
            setSelectedDrillIds(new Set());
            setIsModalOpen(false);
          }}
        >
          <div
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative shadow-lg scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => {
                setSelectedDrillIds(new Set());
                setIsModalOpen(false);
              }}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-[#2B4A11] mb-4">
              Add Drills
            </h2>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search drills..."
                className="input input-bordered w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-medium">
                  Filter by Category
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {getUniqueCategories().map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Count and Add Button */}
            {selectedDrillIds.size > 0 && (
              <div className="mb-4 flex items-center justify-between p-3 bg-[#f3df76] rounded-lg">
                <span className="font-medium text-[#2B4A11]">
                  {selectedDrillIds.size} drill
                  {selectedDrillIds.size > 1 ? "s" : ""} selected
                </span>
                <button
                  type="button"
                  className="btn btn_primary"
                  onClick={handleAddSelectedDrills}
                >
                  Add Selected
                </button>
              </div>
            )}

            {/* Drills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredDrills.map((drill) => {
                const isSelected = selectedDrillIds.has(drill._id);
                return (
                  <div
                    key={drill._id}
                    className={`relative cursor-pointer transition-all ${
                      isSelected ? "ring-4 ring-[#407734] rounded-lg" : ""
                    }`}
                    onClick={() => handleToggleDrillSelection(drill._id)}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 z-10 bg-[#407734] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        ✓
                      </div>
                    )}
                    <DrillCard
                      title={drill.title}
                      desc={drill.description}
                      imageUrl={
                        drill.images.length > 0
                          ? drill.images[0]
                          : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                      }
                      onClick={() => handleToggleDrillSelection(drill._id)}
                    />
                  </div>
                );
              })}
            </div>

            {filteredDrills.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No drills found matching your search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSessionPage;
