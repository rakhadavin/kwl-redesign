import React from "react";

interface MediumCardProps {
  title: string;
  subtitle: string;
  onClick: () => void;
  isSelected?: boolean;
}

const MediumCard: React.FC<MediumCardProps> = ({ title, subtitle, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`mb-4 h-auto w-full relative rounded-lg shadow pb-4 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer text-left border-2 ${
        isSelected
          ? "bg-blue-50 border-blue-400"
          : "bg-white border-transparent hover:bg-gray-50"
      }`}
    >
      <div className="pt-5 mt-4 pl-5">
        <span className={`text-base font-bold ${isSelected ? "text-blue-700" : "text-black"}`}>
          {title}
          <br />
        </span>
        <span className="text-black text-xs font-normal">{subtitle}</span>
      </div>
    </div>
  );
};

export default MediumCard;
