"use client";

import React from "react";

interface TopicListItemProps {
  id: number;
  name: string;
  description: string;
  learning_objective: string;
  enable_open_time: boolean;
  enable_close_time: boolean;
  open_time: string;
  close_time: string;
  is_hidden: boolean;
  is_archived: boolean;
  know: Array<{ id: number; type: string }>;
  wtk: Array<{ id: number; type: string }>;
  learned: Array<{ id: number; type: string }>;
  isSelected: boolean;
  onSelect: () => void;
}

const TopicListItem: React.FC<TopicListItemProps> = ({
  name, is_hidden, know, wtk, learned, isSelected, onSelect,
}) => {
  const questionCount =
    (know.length > 0 ? 1 : 0) +
    (wtk.length > 0 ? 1 : 0) +
    (learned.length > 0 ? 1 : 0);

  return (
    <div
      onClick={onSelect}
      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition-colors ${
        isSelected
          ? "bg-blue-50 border-blue-400"
          : "bg-white border-gray-200 hover:bg-gray-50"
      } ${is_hidden ? "opacity-60" : ""}`}
    >
      <span className={`font-bold text-sm ${isSelected ? "text-blue-700" : "text-black"}`}>
        {name}
      </span>
      <div className="flex items-center gap-1 text-gray-400 text-xs">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
        </svg>
        {questionCount > 0 ? `${questionCount} Pertanyaan` : "Belum ada pertanyaan"}
      </div>
    </div>
  );
};

export default TopicListItem;
