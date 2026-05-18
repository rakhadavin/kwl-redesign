import React, { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";

interface DropdownItem {
  nama: string;
  buttonIcon?: React.ReactNode;
  warna?: 'default' | 'danger';
  onClick: () => void;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  disabled?: boolean;
  buttonClassName?: string;
  menuClassName?: string;
  triggerIcon?: React.ReactNode;
}

const DropdownMenuButton: React.FC<DropdownMenuProps> = ({
  items,
  disabled = false,
  buttonClassName = "",
  menuClassName = "",
  triggerIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: DropdownItem) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    item.onClick();
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div ref={dropdownRef}>
      <button 
        className={`h-5 w-5 text-gray-600 hover:text-gray-800 transition-colors ${buttonClassName}`}
        onClick={handleToggleDropdown}
        disabled={disabled}
      >
        {triggerIcon || <HiDotsVertical />}
      </button>
      
      {isOpen && (
        <div className={`absolute right-0 top-6 min-w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${menuClassName}`}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={handleItemClick(item)}
              className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md transition-colors ${
                item.warna === 'danger' 
                  ? 'text-red-600 hover:bg-red-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.buttonIcon && <span className="w-4 h-4">{item.buttonIcon}</span>}
              {item.nama}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenuButton;
export type { DropdownItem };