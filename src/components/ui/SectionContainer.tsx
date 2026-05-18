import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  centered?: boolean;
  id?: string;
}

export default function SectionContainer({
  children,
  className = "py-16",
  containerClassName = "container mx-auto px-6",
  title,
  subtitle,
  titleClassName = "text-4xl font-bold text-gray-900 mb-6",
  subtitleClassName = "text-lg text-gray-600 max-w-3xl mx-auto",
  centered = false,
  id,
}: SectionContainerProps) {
  return (
    <section className={className} id={id}>
      <div className={containerClassName}>
        {(title || subtitle) && (
          <div className={`mb-16 ${centered ? "text-center" : ""}`}>
            {title && <h2 className={titleClassName}>{title}</h2>}
            {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}