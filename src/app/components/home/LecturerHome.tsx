"use client";

import { useSession } from "next-auth/react";
import { useGetAuth } from "../../lib/api/useAuth";
import ConsentModal from "../consent-modal/ConsentModal";
import RecentCourses from "./RecentCourses";
import RecentKuesioner from "./RecentKuesioner";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function LecturerHome() {
  const { data: session, status } = useSession();
  const [consentSubmitted, setConsentSubmitted] = useState(false);

  const { data: consentStatus, isLoading: consentLoading } = useGetAuth(
    "/api/auth/consent/status",
    "consent_status",
    false,
    status === "authenticated",
  );

  const showModal =
    !consentLoading &&
    consentStatus !== undefined &&
    !consentStatus.has_consented &&
    !consentSubmitted;

  const handleConsentConfirm = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/consent/status`,
      { consent_id: 1 },
      { headers: { Authorization: `Bearer ${session?.access}` } },
    );
    setConsentSubmitted(true);
  };

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <ConsentModal
        isOpen={showModal}
        onConfirm={handleConsentConfirm}
        onCancel={() => setConsentSubmitted(true)}
      />

      {/* ── Top section: Hero + Profile ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 pb-0">
        {/* Hero banner */}
        <div className="lg:col-span-2 relative bg-blue-900 rounded-2xl overflow-hidden min-h-[240px] flex flex-col justify-end p-6">
          {/* date badge */}
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
            {today}
          </div>
          {/* lecturer illustration */}
          <div className="absolute right-0 bottom-0 w-64 h-full flex items-end justify-center">
            <img
              src="/dosen_1.png"
              alt=""
              className="h-full w-auto object-contain object-bottom"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          {/* greeting */}
          <div className="relative z-10">
            <p className="text-white/80 text-base mb-1">Selamat Datang,</p>
            <h1 className="text-white text-2xl font-bold leading-tight">
              {session?.userinfo?.name || "Dosen"}
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Semoga Harimu Menyenangkan
            </p>
          </div>
        </div>

        {/* Profile + Quick access */}
        <div className="flex flex-col gap-3">
          {/* Profile card */}
          <div className="bg-blue-900 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/80">Your Profile</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">
                Role : Dosen
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-700 overflow-hidden shrink-0">
                <img
                  src="/dosen_2.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">
                  {session?.userinfo?.name || "Dosen"}
                </p>
                <p className="text-white/60 text-xs">Universitas Indonesia</p>
                <p className="text-white/60 text-xs">
                  {session?.userinfo?.role_pk || ""}
                </p>
              </div>
            </div>
          </div>

          {/* Quick access */}
          <div className="bg-white rounded-2xl p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📖</span>
              <h2 className="text-blue-900 font-bold text-base">
                Quick access
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  href: "/courses",
                  img: "/main_button/lala-course.png",
                  label: "My Courses",
                },
                {
                  href: "/kuesioner",
                  img: "/main_button/wawa-course.png",
                  label: "My Kuesioner",
                },
                {
                  href: "/faq",
                  img: "/main_button/koko-faq.png",
                  label: "FAQ",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-semibold text-blue-900 text-center leading-tight group-hover:text-blue-700">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Courses + Recent Kuesioner ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <RecentCourses />
        <RecentKuesioner />
      </div>
    </main>
  );
}
