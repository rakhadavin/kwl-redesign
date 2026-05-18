import React from "react";

interface IconCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  iconBgColor?: string;
  iconTextColor?: string;
  className?: string;
  variant?: "simple" | "shadow" | "gradient";
}

export default function IconCard({
  title,
  description,
  icon: Icon,
  iconBgColor = "bg-gradient-to-br from-blue-500 to-purple-600",
  iconTextColor = "text-white",
  className = "",
  variant = "simple",
}: IconCardProps) {
  const baseClasses = "text-center";
  const variantClasses = {
    simple: "",
    shadow: "bg-white p-6 rounded-xl shadow-lg",
    gradient: "bg-white p-8 rounded-xl shadow-lg",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div
        className={`${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
      >
        {Icon ? (
          <Icon className={`w-8 h-8 ${iconTextColor}`} />
        ) : (
          <div
            className={`w-8 h-8 ${iconTextColor} flex items-center justify-center text-2xl`}
          >
            📊
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
