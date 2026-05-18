"use client";

import React, { useState, useEffect, useMemo } from "react";
import PesertaCourseCard from "./PesertaCourseCard";
import Pagination from "../ui/Pagination";
import CourseSkeleton from "../ui/CourseSkeleton";
import Link from "next/link";

interface Course {
  id: number;
  short_name: string;
  full_name: string;
  color_theme: string;
  enrolled: boolean;
  has_enrollment_key?: boolean;
}

interface AllPesertaCourseContainerProps {
  data: Course[];
  isLoading?: boolean;
  showSearch?: boolean;
}

type SortField = "course_name" | "created_at" | "dosen";
type SortDir = "asc" | "desc";

// ── Sort panel ────────────────────────────────────────────────────────────────
function SortPanel({
  sortField,
  sortDir,
  onFieldChange,
  onDirChange,
}: {
  sortField: SortField;
  sortDir: SortDir;
  onFieldChange: (f: SortField) => void;
  onDirChange: (d: SortDir) => void;
}) {
  const fields: { value: SortField; label: string }[] = [
    { value: "course_name", label: "Course Name" },
    { value: "created_at", label: "Created At" },
    { value: "dosen", label: "Dosen" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md px-5 py-4 w-48 shrink-0 self-start">
      <p className="text-sm text-gray-400 mb-3">Sort by</p>
      <div className="space-y-2 mb-4">
        {fields.map((f) => (
          <label
            key={f.value}
            className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
          >
            <input
              type="radio"
              name="sortField"
              value={f.value}
              checked={sortField === f.value}
              onChange={() => onFieldChange(f.value)}
              className="accent-blue-900"
            />
            {f.label}
          </label>
        ))}
      </div>
      <hr className="border-gray-200 mb-3" />
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
          <input
            type="radio"
            name="sortDir"
            value="asc"
            checked={sortDir === "asc"}
            onChange={() => onDirChange("asc")}
            className="accent-blue-900"
          />
          <span>↑ Ascending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
          <input
            type="radio"
            name="sortDir"
            value="desc"
            checked={sortDir === "desc"}
            onChange={() => onDirChange("desc")}
            className="accent-blue-900"
          />
          <span>↓ Descending</span>
        </label>
      </div>
    </div>
  );
}

// ── Search bar with Find button ───────────────────────────────────────────────
function SearchBar({
  value,
  onChange,
  onFind,
  onToggleSort,
  showSort,
}: {
  value: string;
  onChange: (v: string) => void;
  onFind: () => void;
  onToggleSort: () => void;
  showSort: boolean;
}) {
  return (
    <div className="flex items-center gap-2 w-full">
      {/* Sort toggle */}
      <button
        onClick={onToggleSort}
        className={`flex items-center justify-center w-11 h-11 rounded-xl border transition-colors shrink-0 ${
          showSort
            ? "border-blue-900 bg-blue-50 text-blue-900"
            : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
        }`}
        title="Sort"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="5 12 12 5 19 12" />
          <line
            x1="12"
            y1="19"
            x2="12"
            y2="5"
            transform="translate(0,14) scale(1,-1) translate(0,-14)"
          />
          <path d="M5 12 12 19 19 12" />
        </svg>
      </button>

      {/* Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onFind()}
          placeholder="Search Courses by title or description"
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Find button */}
      <button
        onClick={onFind}
        className="px-6 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-xl hover:bg-blue-800 transition-colors shrink-0"
      >
        Find
      </button>
    </div>
  );
}

// ── Empty states ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <img
        src="/error_state_mahasiswa.png"
        alt="No courses"
        className="w-72 h-auto mb-6 object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <p className="text-gray-500 font-semibold text-lg mb-1">
        Belum ada course tersedia saat ini.
      </p>
      <p className="text-gray-400 text-sm mb-8">Silakan cek kembali nanti</p>
      <Link href="/peserta">
        <button className="px-8 py-2.5 bg-gray-500 text-white text-sm font-semibold rounded-lg hover:bg-gray-600 transition-colors">
          Kembali ke Home
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
        Tidak ditemukan kursus yang sesuai dengan pencarian &quot;{searchTerm}
        &quot;.
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const AllPesertaCourseContainer: React.FC<AllPesertaCourseContainerProps> = ({
  data,
  isLoading = false,
  showSearch = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [sortField, setSortField] = useState<SortField>("course_name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const itemsPerPage = 6;

  // Only search when Find is clicked or Enter pressed
  const handleFind = () => setSearchTerm(inputValue);

  const filteredData = useMemo(() => {
    let result = data || [];
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.full_name?.toLowerCase().includes(s) ||
          c.short_name?.toLowerCase().includes(s),
      );
    }
    // Sort
    result = [...result].sort((a, b) => {
      let valA = "",
        valB = "";
      if (sortField === "course_name") {
        valA = a.full_name || "";
        valB = b.full_name || "";
      } else if (sortField === "dosen") {
        valA = a.short_name || "";
        valB = b.short_name || "";
      }
      const cmp = valA.localeCompare(valB);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [data, searchTerm, sortField, sortDir]);

  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData =
    filteredData?.slice(startIndex, startIndex + itemsPerPage) || [];

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortField, sortDir]);

  if (isLoading) return <CourseSkeleton count={itemsPerPage} />;
  if (!data || data.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Top row: sort toggle + search + find */}
      {showSearch && (
        <div className="flex items-start gap-3 w-full max-w-[600px] lg:max-w-[700px]">
          {/* Sort toggle + dropdown panel beside it */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowSort((s) => !s)}
              className={`flex items-center justify-center w-11 h-11 rounded-xl border-2 transition-colors ${
                showSort
                  ? "border-blue-900 bg-blue-50 text-blue-900"
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
              title="Sort"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 16V4m0 0L3 8m4-4 4 4" />
                <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
              </svg>
            </button>
            {/* Sort panel appears beside the toggle button as overlay */}
            {showSort && (
              <div className="absolute right-full top-0 mr-2 z-10">
                <SortPanel
                  sortField={sortField}
                  sortDir={sortDir}
                  onFieldChange={setSortField}
                  onDirChange={setSortDir}
                />
              </div>
            )}
          </div>

          {/* Search input + Find button */}
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFind()}
                placeholder="Search Courses by title or description"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleFind}
              className="px-6 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-xl hover:bg-blue-800 transition-colors shrink-0"
            >
              Find
            </button>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="flex flex-col items-center w-full gap-4">
        {searchTerm && currentData.length === 0 ? (
          <SearchEmptyState searchTerm={searchTerm} />
        ) : (
          <div className="space-y-4 w-full max-w-[400px] md:max-w-[400px] lg:max-w-[500px]">
            {currentData.map((course) => (
              <PesertaCourseCard
                key={course.id}
                id={course.id}
                courseShort={course.short_name}
                courseLong={course.full_name}
                color={course.color_theme}
                isEnrolled={course.enrolled}
                hasEnrollmentKey={course.has_enrollment_key}
              />
            ))}
          </div>
        )}
      </div>

      {filteredData.length > itemsPerPage && (
        <div className="w-full max-w-[400px] md:max-w-[400px] lg:max-w-[500px]">
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

export default AllPesertaCourseContainer;
