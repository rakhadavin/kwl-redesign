"use client";

import React, { useState, useEffect } from "react";

interface SearchCourseProps {
  onSearchChange: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
  width?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const SearchCourse: React.FC<SearchCourseProps> = ({ 
  onSearchChange, 
  placeholder = "Search courses...",
  className = "",
  width,
  size = "full"
}) => {
  // Size presets
  const sizeClasses = {
    sm: "w-64 md:w-72 lg:w-80",
    md: "w-80 md:w-96 lg:w-[400px]", 
    lg: "w-96 md:w-[400px] lg:w-[500px]",
    xl: "w-[400px] md:w-[500px] lg:w-[600px]",
    full: "w-full"
  };

  const finalWidth = width || sizeClasses[size];
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search to avoid too many calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearchChange]);

  const handleClear = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  return (
    <div className={`relative ${finalWidth} ${className}`}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className={`h-5 w-5 transition-colors duration-200 ${
              isFocused ? 'text-blue-500' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label="Search courses"
          className={`
            block w-full pl-10 py-3 
            border border-gray-300 rounded-lg
            bg-white text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${searchTerm ? 'pr-10' : 'pr-4'}
          `}
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700 transition-colors duration-200"
            aria-label="Clear search"
            title="Clear search"
          >
            <svg 
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 text-sm text-gray-600 bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm z-10">
          Searching for: <span className="font-medium text-gray-900">"{searchTerm}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchCourse;