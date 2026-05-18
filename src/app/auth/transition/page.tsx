"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

interface RoleCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  imageSrc,
  title,
  description,
}) => (
  <div className="flex gap-2 mx-6 mt-3.5 bg-white rounded-lg shadow-md shadow-gray-400 max-md:mx-2.5">
    <div className="relative overflow-hidden rounded-lg shrink-0 w-[52px] h-[52px]">
      <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
    </div>
    <div className="flex flex-col my-auto">
      <div className="text-xs font-bold">{title}</div>
      <div className="mt-1.5 text-xs">{description}</div>
    </div>
  </div>
);

const roles = [
  {
    imageSrc: "/dosen.png",
    title: "Dosen",
    description: "Edit course, monitor peserta",
  },
  {
    imageSrc: "/mahasiswa.png",
    title: "Mahasiswa",
    description: "Ikut course, partisipasi KWL",
  },
];

const RegisterTransition: React.FC = () => {
  return (
    <div className="flex flex-col justify-center bg-blue-950">
      <div className="flex overflow-hidden relative flex-col pt-20 w-full min-h-[832px] max-md:max-w-full">
        <img
          loading="lazy"
          src="/transition-bg.png"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative justify-center items-center self-center px-16 py-7 mt-44 max-w-full text-black bg-white rounded-lg w-[488px] max-md:px-5 max-md:mt-10">
          <div className="flex flex-col max-w-full w-[281px]">
            <h1 className="self-center text-xl font-bold text-center text-blue-900">
              Role
            </h1>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <p className="self-center text-xs text-center">Pilih Peran Anda</p>
            {roles.map((role, index) => (
              <Link
                key={index}
                href={
                  role.title === "Dosen"
                    ? "/auth/signup/lecturer"
                    : "/auth/signup/student"
                }
              >
                <RoleCard key={index} {...role} />
              </Link>
            ))}
            <button className="justify-center items-center px-16 py-2 mt-6 text-sm font-bold text-center whitespace-nowrap bg-white rounded-lg border border-solid border-blue-950 text-blue-950 max-md:px-5">
              <Link href="/auth/signin">kembali</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTransition;
