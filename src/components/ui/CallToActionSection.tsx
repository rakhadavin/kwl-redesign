import React from "react";
import Link from "next/link";

interface CallToActionSectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
  className?: string;
  buttonSize?: "default" | "large";
}

export default function CallToActionSection({
  title,
  description,
  primaryButton,
  secondaryButton,
  className = "",
  buttonSize = "default",
}: CallToActionSectionProps) {
  const buttonClasses = buttonSize === "large"
    ? "px-8 py-4 text-lg"
    : "px-8 py-3";

  return (
    <section className={`py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white ${className}`}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">{description}</p>
        <div className="flex justify-center space-x-6">
          <Link
            href={primaryButton.href}
            className={`bg-white text-blue-900 ${buttonClasses} rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg`}
          >
            {primaryButton.text}
          </Link>
          <Link
            href={secondaryButton.href}
            className={`bg-transparent border-2 border-white text-white ${buttonClasses} rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors`}
          >
            {secondaryButton.text}
          </Link>
        </div>
      </div>
    </section>
  );
}