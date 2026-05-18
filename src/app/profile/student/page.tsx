"use client";

import { signOut, useSession } from "next-auth/react";
import * as React from "react";
import { useGetAuth } from "../../lib/api/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileImageProps {
  src: string;
  alt: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="self-center max-w-full aspect-square w-[100px] rounded-full"
  />
);

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  handleClick?: () => void;
}

const onSignOut = async () => {
  await signOut({ callbackUrl: "/auth/signin" });
  fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  handleClick,
}) => (
  <button
    onClick={handleClick}
    className={`justify-center px-10 py-2.5 rounded-lg ${className}`}
  >
    {children}
  </button>
);

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const { data: session, status } = useSession();
  const { data, status: fetch_status } = useGetAuth(
    "/api/auth/student",
    "student",
  );
  if (fetch_status === "pending" || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center bg-white">
        <div className="flex overflow-hidden relative flex-col w-full min-h-[832px] max-md:max-w-full">
          <img
            loading="lazy"
            src="/bg2.png"
            alt=""
            className="object-cover absolute inset-0 size-full"
          />

          <main className="flex relative flex-col justify-center self-center mt-28 max-w-full w-[720px] max-md:mt-10">
            <section className="flex justify-center items-center px-16 py-10 bg-white rounded-lg shadow-sm max-md:px-5 max-md:max-w-full">
              <div className="max-w-full w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow font-bold max-md:mt-10">
                      <h2 className="self-center text-2xl text-center text-blue-900">
                        Profil
                      </h2>
                      <div className="flex flex-col px-9 mt-6 text-sm text-black max-md:px-5">
                        <ProfileImage
                          src={
                            data?.user?.profile_photo
                              ? data.user.profile_photo.startsWith("http")
                                ? data.user.profile_photo
                                : `${BASE_URL}${data.user.profile_photo}`
                              : "/empty_profile_pic.png"
                          }
                          alt="Profile"
                        />
                        <div className="mt-12 max-md:mt-10">Nama Lengkap</div>
                        <div className="mt-2.5 text-xs">
                          {data?.user.nama_lengkap}
                        </div>
                        <div className="mt-6">Domisili</div>
                        <div className="mt-3 text-xs">
                          {data?.user.domisili}
                        </div>
                        <div className="mt-6 max-sm:-ml-px">
                          Nomor Pokok Mahasiswa
                        </div>
                        <div className="mt-3 text-xs">{data?.student_id}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow mt-10 text-xs font-bold text-black max-md:mt-10 max-sm:pl-5 max-sm:mt-6">
                      <div className="text-sm">Jurusan</div>
                      <div className="mt-3">{data?.major}</div>
                      <div className="mt-6 text-sm">Fakultas</div>
                      <div className="mt-3">{data?.faculty}</div>
                      <div className="mt-6 text-sm">Semester</div>
                      <div className="mt-3">{data?.term}</div>
                      <div className="mt-6 text-sm">Institusi</div>
                      <div className="mt-3">{data?.institusi}</div>
                      <div className="mt-7 text-sm">Email Terdaftar</div>
                      <div className="mt-3">{data?.user.email}</div>
                      <div className="flex gap-2 mt-10 text-center text-white whitespace-nowrap max-md:mt-10">
                        <div className="flex flex-col flex-1 justify-center">
                          <Button
                            handleClick={() => {
                              router.push("/profile/student/edit");
                            }}
                            className="bg-green-400 max-md:px-5"
                          >
                            edit
                          </Button>
                        </div>
                        <div className="flex flex-col flex-1 justify-center">
                          <Button
                            handleClick={onSignOut}
                            className="bg-red-500 max-md:px-5"
                          >
                            logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
