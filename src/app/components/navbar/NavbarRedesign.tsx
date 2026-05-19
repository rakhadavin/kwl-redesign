"use client";

import useCustomLogout from "@/app/hooks/useCustomLogout";
import useLogoutConfirmation from "@/app/hooks/useLogoutConfirmation";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NavbarRedesign = () => {
  const { data: session } = useSession();
  const logoutConfirmation = useLogoutConfirmation();
  const { logout } = useCustomLogout();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const profilePath =
    session?.userinfo?.role === "student"
      ? "/api/auth/student"
      : "/api/auth/lecturer";
  const { data: profileData } = useGetAuth(
    profilePath,
    "navbar-profile",
    false,
    !!session,
  );

  const profilePhoto = profileData?.user?.profile_photo
    ? profileData.user.profile_photo.startsWith("http")
      ? profileData.user.profile_photo
      : `${BASE_URL}${profileData.user.profile_photo}`
    : "/empty_profile_pic.png";

  const profileLink =
    session?.userinfo?.role === "student"
      ? "/profile/student"
      : "/profile/lecturer";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNext = async () => {
    await logout("/");
  };

  const handleLogout = () => {
    logoutConfirmation.open(handleNext);
  };
  return (
    <nav className="w-full fixed top-0 py-2 px-4 border-b bg-white z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="KWL logo"
              width={30}
              height={30}
            ></Image>
          </Link>
          <p className="text-dark-accent font-bold text-xs ml-2 cursor-pointer">
            K-Owl
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {session?.userinfo?.role === "student" && (
            <>
              <Link
                href="/"
                className="text-dark-accent font-bold text-xs hover:opacity-70 transition"
              >
                Home
              </Link>
              <Link
                href="/peserta/courses"
                className="text-dark-accent font-bold text-xs hover:opacity-70 transition"
              >
                All Courses
              </Link>
              <Link
                href="/peserta/faq"
                className="text-dark-accent font-bold text-xs hover:opacity-70 transition"
              >
                FAQ
              </Link>
              <Link
                href="/peserta/mycourses"
                className="text-dark-accent font-bold text-xs hover:opacity-70 transition"
              >
                My Courses
              </Link>
            </>
          )}
          {session?.userinfo?.role === "lecturer" && (
            <>
              <Link
                href="/"
                className="text-dark-accent font-bold text-xs hover:opacity-70 transition"
              >
                Home
              </Link>

              <Link
                href="/mycourses"
                className="text-dark-accent font-bold text-xs hover:opacity-70 transition"
              >
                My Courses
              </Link>
              <Link
                href="/kuesioner"
                className="text-dark-accent font-bold text-xs hover:opacity-70 transition"
              >
                My Kuesioner
              </Link>
              <Link
                href="/faq"
                className="text-dark-accent font-bold text-xs hover:opacity-70 transition"
              >
                FAQ
              </Link>
            </>
          )}
        </div>
        <div>
          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-x-2 border rounded-full px-3 py-1.5 shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={profilePhoto}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-dark-accent font-bold text-xs">
                  {session.userinfo?.username || "User"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-3 h-3 text-dark-accent transition-transform ${showDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border py-1 z-50">
                  <Link
                    href={profileLink}
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-xs text-dark-accent font-semibold hover:bg-gray-100 transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-500 font-semibold hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-dark-accent font-bold text-xs border rounded-full px-4 py-1.5 hover:bg-gray-100 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarRedesign;
