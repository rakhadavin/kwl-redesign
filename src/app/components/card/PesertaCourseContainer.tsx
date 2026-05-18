"use client";

import React, { useState, useEffect, useMemo } from "react";
import PesertaMyCourseCard from "./PesertaCourseCardWithoutIsEnrolled";
import Pagination from "../ui/Pagination";
import CourseSkeleton from "../ui/CourseSkeleton";
import SearchCourse from "../ui/SearchCourse";
import Link from "next/link";

interface Course {
  id: number;
  full_name: string;
  short_name: string;
  color_theme: string;
}

interface PesertaCourseContainerProps {
  data: Course[];
  isLoading?: boolean;
  showSearch?: boolean;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <img
        src="/error_state_mahasiswa.png"
        alt="No courses"
        className="w-72 h-auto mb-6 object-contain"
        onError={(e) => {
          // fallback kalau gambar belum ada
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      <p className="text-gray-500 font-semibold text-lg mb-1">
        Belum ada course yang diikuti.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Yuk mulai belajar dengan memilih course.
      </p>

      <Link href="/peserta/courses">
        <button className="px-8 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors">
          All Courses
        </button>
      </Link>
    </div>
  );
}

function SearchEmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold mb-2">Tidak Ada Hasil</h3>
      <p className="text-center text-gray-400">
        Tidak ditemukan kursus yang sesuai dengan pencarian &quot;
        {searchTerm}&quot;.
      </p>
    </div>
  );
}

const PesertaCourseContainer: React.FC<PesertaCourseContainerProps> = ({
  data,
  isLoading = false,
  showSearch = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    if (!searchTerm || !data) return data || [];
    return data.filter((course) => {
      const fullName = course.full_name?.toLowerCase() || "";
      const shortName = course.short_name?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      return fullName.includes(search) || shortName.includes(search);
    });
  }, [data, searchTerm]);

  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData?.slice(startIndex, endIndex) || [];

  useEffect(() => { setCurrentPage(1); }, [data]);
  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  if (isLoading) {
    return <CourseSkeleton count={itemsPerPage} />;
  }

  // Empty — belum enroll course apapun
  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <div className="flex-1">
        {showSearch && (
          <div className="flex justify-center mb-6">
            <SearchCourse
              onSearchChange={setSearchTerm}
              placeholder="Cari kursus berdasarkan nama kursus..."
              size="lg"
            />
          </div>
        )}

        {searchTerm && currentData.length === 0 ? (
          <SearchEmptyState searchTerm={searchTerm} />
        ) : (
          <div className="mt-10 p-4">
            <div className="space-y-4 mb-6">
              {currentData.map((course: Course) => (
                <PesertaMyCourseCard
                  key={course.id}
                  id={course.id}
                  courseLong={course.full_name}
                  courseShort={course.short_name}
                  color={course.color_theme}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredData && filteredData.length > itemsPerPage && (
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            showInfo={true}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default PesertaCourseContainer;