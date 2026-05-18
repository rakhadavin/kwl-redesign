import React from "react";
import Image from "next/image";

interface FooterProps {
  logoSrc?: string;
  logoAlt?: string;
  logoSize?: number;
  text?: string;
  className?: string;
}

export default function Footer({
  logoSrc = "/logo.png",
  logoAlt = "K-Owl Logo",
  logoSize = 48,
  text = "© 2024 K-Owl. Platform pembelajaran KWL yang inovatif untuk pendidikan modern.",
  className = "",
}: FooterProps) {
  return (
    <footer className={`bg-gray-900 text-gray-300 py-8 ${className}`}>
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-4">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={logoSize}
            height={logoSize}
            className="rounded-full bg-white p-2"
          />
        </div>
        <p>{text}</p>
      </div>
    </footer>
  );
}