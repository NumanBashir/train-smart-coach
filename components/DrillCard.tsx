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
    <div className="card bg-base-100 w-64 shadow-sm mb-6">
      <figure>
        <img src={imageUrl} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
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
