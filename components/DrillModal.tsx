import React, { useEffect } from "react";

interface Drill {
  title: string;
  description: string;
  images: string[];
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
        <p className="text-gray-700 leading-relaxed">{drill.description}</p>
      </div>
    </div>
  );
};

export default DrillModal;
