"use client";

import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useLogoutConfirmation from "@/app/hooks/useLogoutConfirmation";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";

const PageMenuBar = () => {
  const { data: session } = useSession();
  const logoutConfirmation = useLogoutConfirmation();
  const [showMenu, setShowMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleLogoutClick = () => {
    logoutConfirmation.open(handleLogout);
    setShowMenu(false);
  };

  const menuGroups = [
    {
      name: "Informasi",
      items: [
        { name: "Tentang", href: "/about" },
        { name: "Fitur", href: "/feature" },
      ]
    },
    {
      name: "Sumber Daya",
      items: [
        { name: "Dataset", href: "/dataset" },
        { name: "Publikasi", href: "/publikasi" },
        { name: "User Manual", href: "/user-manual" },
        { name: "Skenario Penggunaan", href: "/skenario-penggunaan" },
      ]
    },
    {
      name: "Lainnya",
      items: [
        { name: "Kolaborasi", href: "/kolaborasi" },
        { name: "Term & Condition", href: "/term-condition" },
        { name: "Roadmap", href: "/roadmap" },
        { name: "Kontak", href: "/contact" },
      ]
    }
  ];

  const isActivePage = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const isGroupActive = (items: { href: string }[]) => {
    return items.some(item => isActivePage(item.href));
  };

  const toggleDropdown = (groupName: string) => {
    setActiveDropdown(activeDropdown === groupName ? null : groupName);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full fixed top-0 py-3 px-6 bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="K-Owl logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-blue-800 font-bold text-xl ml-3">K-Owl</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div ref={menuRef} className="hidden md:flex items-center space-x-6">
          {menuGroups.map((group) => (
            <div key={group.name} className="relative">
              <button
                onClick={() => toggleDropdown(group.name)}
                className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                  isGroupActive(group.items)
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:text-blue-800 hover:bg-blue-50"
                }`}
              >
                {group.name}
                <HiChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    activeDropdown === group.name ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === group.name && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActivePage(item.href)
                          ? "bg-blue-100 text-blue-800"
                          : "text-gray-600 hover:text-blue-800 hover:bg-blue-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <Link
                href={
                  session.userinfo.role === "student"
                    ? "/peserta/courses"
                    : "/courses"
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                All Courses
              </Link>
              <button
                onClick={handleLogoutClick}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <HiX className="text-gray-600" size={24} />
          ) : (
            <HiMenuAlt3 className="text-gray-600" size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <div className="container mx-auto py-4">
            <div className="flex flex-col space-y-3 p-4">
              {menuGroups.map((group) => (
                <div key={group.name} className="space-y-1">
                  <div className="text-sm font-semibold text-gray-500 px-2 py-1">
                    {group.name}
                  </div>
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setShowMenu(false)}
                      className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                        isActivePage(item.href)
                          ? "bg-blue-100 text-blue-800"
                          : "text-gray-600 hover:text-blue-800 hover:bg-blue-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                {session ? (
                  <>
                    <Link
                      href={
                        session.userinfo.role === "student"
                          ? "/peserta/courses"
                          : "/courses"
                      }
                      onClick={() => setShowMenu(false)}
                      className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-2"
                    >
                      All Courses
                    </Link>
                    <button
                      onClick={handleLogoutClick}
                      className="block w-full text-center bg-gray-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    onClick={() => setShowMenu(false)}
                    className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PageMenuBar;