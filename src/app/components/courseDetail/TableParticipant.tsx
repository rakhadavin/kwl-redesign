"use client";

import React, { useState } from "react";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import useCreateCourse2Forms from "@/app/hooks/useCreateCourse2Forms";
import Link from "next/link";
import SearchBar from "../button/SearchBar";

interface TableParticipantProps {
  isButtonActive: boolean;
}

function EmptyParticipantState() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <img
        src="/empty_mahasiswa.png"
        alt="No participants"
        className="w-72 h-auto mb-6 object-contain"
      />

      <p className="text-gray-400 font-semibold text-lg mb-1">
        Belum ada mahasiswa yang terdaftar pada course ini.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Mulai dengan membuat course baru.
      </p>

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Kembali ke Detail Course
      </button>
    </div>
  );
}

const TableParticipant: React.FC<TableParticipantProps> = ({ isButtonActive }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const params = useParams();
  const pathname = usePathname();

  const { data } = useGetAuth(
    `/api/course/${params.id_course}/students`,
    "list student"
  );

  const filteredData = data?.filter((participant: any) =>
    participant["user"]["nama_lengkap"]
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Empty state — no participants at all
  if (data && data.length === 0) {
    return <EmptyParticipantState />;
  }

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="py-10 flex flex-col items-center justify-center overflow-y-scroll scrollbar-none">
        {filteredData && filteredData.length === 0 ? (
          <p className="text-gray-400 text-sm mt-4">
            Tidak ditemukan peserta dengan nama &quot;{searchQuery}&quot;.
          </p>
        ) : (
          <table className="table-fixed text-center">
            <thead className="bg-main text-white h-12">
              <tr>
                <th className="w-12">No</th>
                <th className="w-72">Nama</th>
                {isButtonActive && <th className="w-52">Hasil</th>}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData?.map((participant: any, index: number) => (
                <tr className="h-12" key={participant["id"]}>
                  <td className="font-bold">{index + 1}</td>
                  <td>{participant["user"]["nama_lengkap"]}</td>
                  {isButtonActive && (
                    <td>
                      <Link href={`${pathname}/${participant["id"]}`}>
                        <button className="mb-2 w-28 h-8 bg-main border-2 border-white hover:bg-white hover:text-main hover:border-main text-white font-bold text-xs py-2 px-2 rounded-xl">
                          Lihat
                        </button>
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TableParticipant;