"use client";

import { FC, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiPencil, HiTrash, HiPlay, HiChartBar } from "react-icons/hi";
import useCreateKuesionerForms from "@/app/hooks/useCreateKuesionerForms";

interface KuesionerCardProps {
  id: string;
  title: string;
  description: string;
}

const KuesionerCard: FC<KuesionerCardProps> = ({ id, title, description }) => {
  const createKuesionerForms = useCreateKuesionerForms();
  // const createKuesionerQuestionForms = useCreateKuesionerQuestionForms();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStart = () => {
    window.location.href = `/kuesioner/${id}`;
  };

  const handleEdit = () => {
    createKuesionerForms.open(id);
    setShowDropdown(false);
  };

  const handleRekap = () => {
    window.location.href = `/kuesioner/${id}/rekap`;
    setShowDropdown(false);
  };

  const handleDelete = () => {
    setShowDropdown(false);
  };

  return (
    <div className={`pb-2 flex items-center justify-center`}>
      <div
        className="h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative bg-white rounded-lg shadow"
        // onClick={(e) => {
        //   e.stopPropagation();
        //   e.preventDefault();
        //   handleEdit();
        // }}
      >
        <div className="flex">
          <div className="w-6 h-6 relative"></div>
          <div className="py-4 text-left flex-1">
            <span className="text-black text-base font-bold">
              {title}
              <br />
            </span>
            <span className="text-black text-xs font-normal">
              {description}
            </span>
          </div>
          <div className="flex flex-col items-end p-2 gap-2" ref={dropdownRef}>
            <button
              className="w-5 h-5 hover:bg-gray-100 rounded p-1 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowDropdown(!showDropdown);
              }}
            >
              <BsThreeDotsVertical />
            </button>
            {showDropdown && (
              <div className="absolute top-8 right-4 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleEdit();
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                >
                  <HiPencil className="w-4 h-4" />
                  Sunting
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleRekap();
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2 transition-colors"
                >
                  <HiChartBar className="w-4 h-4" />
                  Rekap Sesi
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDelete();
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleStart();
              }}
              className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded flex items-center gap-2 transition-colors"
            >
              <HiPlay className="w-4 h-4" />
              Mulai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KuesionerCard;
