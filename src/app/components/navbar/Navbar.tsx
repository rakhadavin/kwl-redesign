"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import useLogoutConfirmation from "@/app/hooks/useLogoutConfirmation";
import useCustomLogout from "@/app/hooks/useCustomLogout";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const { data: session } = useSession();
  const logoutConfirmation = useLogoutConfirmation();
  const { logout } = useCustomLogout();
  const [showMenu, setShowMenu] = useState(false);

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

        <div className="flex justify-end gap-x-4">
          <HiMenuAlt3
            className="text-dark-accent cursor-pointer"
            size={24}
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div className="absolute mt-8 w-32 p-3 bg-white shadow-md rounded-md text-center">
              {session ? (
                <>
                  {session?.userinfo?.role === "student" && (
                    <>
                      <Link href="/peserta/courses">
                        <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                          all courses
                        </p>
                      </Link>
                      <Link href="/peserta/faq">
                        <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                          faq
                        </p>
                      </Link>
                      <Link href="/profile/student">
                        <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                          profile
                        </p>
                      </Link>
                      <Link href="/peserta/mycourses">
                        <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                          my courses
                        </p>
                      </Link>
                      <Link href="/">
                        <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                          home
                        </p>
                      </Link>
                    </>
                  )}
                  {session?.userinfo?.role === "lecturer" && (
                    <>
                      <Link href="/kuesioner">
                        <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                          kuesioner
                        </p>
                      </Link>
                      <Link href="/courses">
                        <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                          all courses
                        </p>
                      </Link>
                      <Link href="/mycourses">
                        <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                          My Courses
                        </p>
                      </Link>
                      <Link href="/profile/lecturer">
                        <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                          profile
                        </p>
                      </Link>
                    </>
                  )}
                  <p
                    onClick={handleLogout}
                    className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl"
                  >
                    logout
                  </p>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                      login
                    </p>
                  </Link>
                  <Link href="/auth/transition">
                    <p className="text-center text-dark-accent font-bold text-xs hover:bg-gray-200 transition cursor-pointer rounded-xl">
                      signup
                    </p>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
