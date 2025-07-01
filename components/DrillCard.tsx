import React from "react";

interface DrillCardProps {
  title: string;
  desc: string;
  imageUrl: string;
  onClick?: () => void;
}

const DrillCard: React.FC<DrillCardProps> = ({
  title = "Default Title",
  desc = "No description available",
  imageUrl = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  onClick = () => console.log("Button clicked"),
}) => {
  return (
    <div
      className="card group bg-base-100 w-64 shadow-sm mb-6 cursor-pointer"
      onClick={onClick}
    >
      <figure className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="mb-2">
          {desc.length > 150 ? `${desc.slice(0, 150)}...` : desc}
        </p>
        <div className="card-actions flex-center">
          <button className="btn btn_primary group-hover:bg-[#2B4A11]">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrillCard;
