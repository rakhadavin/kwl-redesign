import React from "react";

interface BenefitsListProps {
  benefits: string[];
  title?: string;
  titleClassName?: string;
  className?: string;
  iconColor?: string;
}

export default function BenefitsList({
  benefits,
  title = "Keunggulan:",
  titleClassName = "text-xl font-semibold text-gray-900 mb-4",
  className = "",
  iconColor = "bg-green-500",
}: BenefitsListProps) {
  return (
    <div className={className}>
      {title && <h4 className={titleClassName}>{title}</h4>}
      <ul className="space-y-3">
        {benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-start">
            <div className={`w-6 h-6 ${iconColor} rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SimpleListProps {
  items: string[];
  dotColor?: string;
  className?: string;
}

export function SimpleList({ items, dotColor = "bg-blue-500", className = "" }: SimpleListProps) {
  return (
    <ul className={`space-y-3 text-gray-600 ${className}`}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start">
          <div className={`w-2 h-2 ${dotColor} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
          {item}
        </li>
      ))}
    </ul>
  );
}