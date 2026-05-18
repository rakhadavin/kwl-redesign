"use client";
import React from "react";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import CallToActionSection from "@/components/ui/CallToActionSection";
import Footer from "@/components/ui/Footer";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Roadmap K-Owl"
        description="Lihat perkembangan dan rencana pengembangan platform K-Owl untuk masa depan. Kami berkomitmen untuk terus berinovasi dan meningkatkan pengalaman pembelajaran digital."
        logoSrc="/logo.png"
        logoAlt="K-Owl Roadmap"
        logoSize={120}
        primaryButton={{ text: "Mulai Belajar", href: "/auth/signin" }}
        secondaryButton={{ text: "Tentang K-Owl", href: "/about" }}
      />

      <SectionContainer
        className="py-16 bg-white"
        title="Peta Jalan Pengembangan K-Owl 2025"
        subtitle="Ikuti perjalanan pengembangan K-Owl dan rencana fitur-fitur inovatif yang akan hadir untuk meningkatkan kualitas pembelajaran digital."
        centered
      >
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingTop: "56.2500%",
              paddingBottom: 0,
              boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
              marginTop: "1.6em",
              marginBottom: "0.9em",
              overflow: "hidden",
              borderRadius: "8px",
              willChange: "transform",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "none",
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGdBgODn2s/XmQvPCndksxi85bZdrbJ3A/view?embed"
              allowFullScreen
              allow="fullscreen"
              title="K-Owl Roadmap 2025"
            />
          </div>

          <div className="text-center mt-4">
            <a
              href="https://www.canva.com/design/DAGdBgODn2s/XmQvPCndksxi85bZdrbJ3A/view?utm_content=DAGdBgODn2s&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors duration-200"
            >
              KOWL Roadmap 2025
            </a>
          </div>
        </div>
      </SectionContainer>

      <CallToActionSection
        title="Tertarik dengan Perkembangan K-Owl?"
        description="Bergabunglah dengan komunitas K-Owl dan dapatkan update terbaru tentang fitur-fitur baru yang akan segera hadir untuk mendukung pembelajaran Anda."
        primaryButton={{ text: "Mulai Sekarang", href: "/auth/signin" }}
        secondaryButton={{ text: "Lihat Fitur", href: "/feature" }}
        buttonSize="large"
      />

      <Footer />
    </div>
  );
}
