import React from "react";

interface DrillCardProps {
  title: string;
  desc: string;
  imageUrl: string;
  onButtonClick?: () => void;
}

const DrillCard: React.FC<DrillCardProps> = ({
  title = "Default Title",
  desc = "No description available",
  imageUrl = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  onButtonClick = () => console.log("Button clicked"),
}) => {
  return (
    <div className="card group bg-base-100 w-64 shadow-sm mb-6">
      <figure className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-350 ease-in-out group-hover:scale-105"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc.length > 150 ? `${desc.slice(0, 150)}...` : desc}</p>
        <div className="card-actions justify-end">
          <button className="btn btn_primary" onClick={onButtonClick}>
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrillCard;
