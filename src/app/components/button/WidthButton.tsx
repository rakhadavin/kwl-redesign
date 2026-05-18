"use client";

import React from "react";

interface WidthButtonProps {
  label1?: string;
  label2?: string;
  handleBack?: () => void;
  handleNext?: () => void;
}

const WidthButton: React.FC<WidthButtonProps> = ({
  label1,
  label2,
  handleBack,
  handleNext,
}) => {
  return (
    <div className="btn-group flex flex-col">
      {label1 && (
        <button
          className="mb-1 w-full bg-dark-accent border-2 hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl"
          onClick={handleBack}
        >
          {label1}
        </button>
      )}

      {label2 && (
        <button
          className="mb-1 w-full bg-transparent border-2 border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent font-bold text-xs py-2 px-2 rounded-xl"
          onClick={handleNext}
        >
          {label2}
        </button>
      )}
    </div>
  );
};

export default WidthButton;
