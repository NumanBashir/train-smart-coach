import React, { useEffect } from "react";

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

interface DrillModalProps {
  drill: Drill;
  onClose: () => void;
}

const DrillModal: React.FC<DrillModalProps> = ({ drill, onClose }) => {
  if (!drill) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg w-full max-w-[700px] max-h-[90vh] overflow-y-auto p-6 relative shadow-lg scrollbar-hide">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{drill.title}</h2>
        {drill.images?.[0] && (
          <img
            src={drill.images[0]}
            alt={drill.title}
            className="w-full h-auto rounded mb-4"
          />
        )}
        <div className="text-gray-700 font-bold">
          Age Group:{" "}
          <span className="font-normal">{drill.ageGroup.join(", ")}</span>
        </div>
        {drill.category.technical.length > 0 && (
          <p className="text-gray-700 font-bold">
            Technical:{" "}
            <span className="font-normal">
              {drill.category.technical.join(", ")}
            </span>
          </p>
        )}
        {drill.category.tactical.length > 0 && (
          <p className="text-gray-700 font-bold">
            Tactical:{" "}
            <span className="font-normal">
              {drill.category.tactical.join(", ")}
            </span>
          </p>
        )}
        {drill.category.physical.length > 0 && (
          <p className="text-gray-700 font-bold">
            Physical:{" "}
            <span className="font-normal">
              {drill.category.physical.join(", ")}
            </span>
          </p>
        )}
        {drill.category.gameSituations.length > 0 && (
          <p className="text-gray-700 font-bold">
            Game Situations:{" "}
            <span className="font-normal">
              {drill.category.gameSituations.join(", ")}
            </span>
          </p>
        )}
        <p className="text-gray-700 font-bold">
          Min Players: <span className="font-normal">{drill.minPlayers}</span>
        </p>
        <p className="text-gray-700 font-bold">
          Max Players: <span className="font-normal">{drill.maxPlayers}</span>
        </p>
        <p className="text-gray-700 font-bold">
          Duration:{" "}
          <span className="font-normal">{drill.duration} minutes</span>
        </p>
        {drill.equipment.length > 0 && (
          <p className="text-gray-700 font-bold">
            Equipment:{" "}
            <span className="font-normal">
              {drill.equipment
                .map((equipment) => {
                  return `${equipment.quantity}x ${equipment.name}`;
                })
                .join(", ")}
            </span>
          </p>
        )}
        <hr className="my-4" />
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
          {drill.description}
        </p>
      </div>
    </div>
  );
};

export default DrillModal;
