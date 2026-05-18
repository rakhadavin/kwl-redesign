import React from "react";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
  benefits?: string[];
  category?: string;
  categoryColor?: "teal" | "pink" | "orange" | "purple" | "green" | "blue" | "red" | "yellow";
  reversed?: boolean;
  showBenefits?: boolean;
  className?: string;
}

const categoryColors = {
  teal: "bg-teal-50 border-teal-100 text-teal-700",
  pink: "bg-pink-50 border-pink-100 text-pink-700",
  orange: "bg-orange-50 border-orange-100 text-orange-700",
  purple: "bg-purple-100 text-purple-800",
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
};

const iconColors = {
  teal: "bg-teal-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500",
  purple: "bg-purple-600",
  green: "bg-green-600",
  blue: "bg-blue-600",
  red: "bg-red-600",
  yellow: "bg-yellow-600",
};

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  image,
  benefits,
  category,
  categoryColor = "teal",
  reversed = false,
  showBenefits = true,
  className = "",
}: FeatureCardProps) {
  if (image && benefits) {
    return (
      <div className={`flex flex-col lg:flex-row items-center gap-12 ${reversed ? "lg:flex-row-reverse" : ""} ${className}`}>
        <div className="flex-1 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Icon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
              {category && (
                <div className="flex space-x-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[categoryColor]}`}>
                    {category}
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>

          {showBenefits && benefits && (
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Keunggulan:</h4>
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
              <Image
                src={image}
                alt={title}
                width={500}
                height={400}
                className="rounded-xl shadow-2xl mx-auto"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center p-8 rounded-xl border-2 ${categoryColors[categoryColor]} ${className}`}>
      <div className={`${iconColors[categoryColor]} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}