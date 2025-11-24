"use client";

import React, { useState, useEffect } from "react";
import DrillCard from "@/components/DrillCard";
import { Drill } from "./types";

interface AddDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDrills: (drills: Drill[]) => void;
}

const AddDrillModal: React.FC<AddDrillModalProps> = ({
  isOpen,
  onClose,
  onAddDrills,
}) => {
  const [allDrills, setAllDrills] = useState<Drill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedDrillIds, setSelectedDrillIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    if (isOpen) {
      const fetchDrills = async () => {
        const response = await fetch("/api/drill");
        const data = await response.json();
        setAllDrills(data);
      };
      fetchDrills();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setSelectedDrillIds(new Set());
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
    onAddDrills(selectedDrills);
    setSelectedDrillIds(new Set());
    onClose();
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={() => {
        setSelectedDrillIds(new Set());
        onClose();
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
            onClose();
          }}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#2B4A11] mb-4">Add Drills</h2>

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
            <span className="label-text font-medium">Filter by Category</span>
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleDrillSelection(drill._id);
                }}
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
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleToggleDrillSelection(drill._id);
                  }}
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
  );
};

export default AddDrillModal;
