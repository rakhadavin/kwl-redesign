import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
  logoSize?: number;
  icon?: React.ElementType;
  iconSize?: number;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
  className?: string;
}

export default function HeroSection({
  title,
  description,
  logoSrc,
  logoAlt,
  logoSize = 120,
  icon: Icon,
  iconSize = 16,
  primaryButton,
  secondaryButton,
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 ${className}`}>
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={logoAlt || "Logo"}
              width={logoSize}
              height={logoSize}
              className="rounded-full shadow-xl bg-white p-4"
            />
          ) : Icon ? (
            <div className="bg-white p-6 rounded-full">
              <Icon className={`w-${iconSize} h-${iconSize} text-blue-900`} />
            </div>
          ) : null}
        </div>

        <h1 className="text-5xl font-bold mb-6">{title}</h1>

        <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex justify-center space-x-6">
          <Link
            href={primaryButton.href}
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            {primaryButton.text}
          </Link>
          <Link
            href={secondaryButton.href}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
          >
            {secondaryButton.text}
          </Link>
        </div>
      </div>
    </section>
  );
}