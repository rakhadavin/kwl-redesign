"use client";

import React, { useState, useEffect, useMemo } from "react";
import CourseCard from "./CourseCard";
import Pagination from "../ui/Pagination";
import CourseSkeleton from "../ui/CourseSkeleton";
import SearchCourse from "../ui/SearchCourse";

interface AllCourseContainerProps {
  data: any[];
  lecturer_pk: string | number;
  isLoading?: boolean;
  showSearch?: boolean;
  showAddButton?: boolean;
  onAddCourse?: () => void;
}

function EmptyState({ onAddCourse }: { onAddCourse?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <img
        src="/error_state_dosen.png"
        alt="No courses"
        className="w-72 h-auto mb-6 object-contain"
      />
      <p className="text-gray-500 font-semibold text-lg mb-1">
        Belum ada course yang tersedia.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Mulai dengan membuat course baru.
      </p>
      {onAddCourse && (
        <button
          onClick={onAddCourse}
          className="flex items-center gap-2 px-8 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add Course
        </button>
      )}
    </div>
  );
}

function SearchEmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No courses match your search</h3>
      <p className="text-gray-500">
        No courses found for &quot;<span className="font-medium">{searchTerm}</span>&quot;. Try different keywords or clear the search.
      </p>
    </div>
  );
}

const AllCourseContainer: React.FC<AllCourseContainerProps> = ({
  data,
  lecturer_pk,
  isLoading = false,
  showSearch = true,
  showAddButton = false,
  onAddCourse,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    if (!searchTerm || !data) return data || [];
    return data.filter((course) => {
      const fullName = course["full_name"]?.toLowerCase() || "";
      const shortName = course["short_name"]?.toLowerCase() || "";
      const description = course["description"]?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      return fullName.includes(search) || shortName.includes(search) || description.includes(search);
    });
  }, [data, searchTerm]);

  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData?.slice(startIndex, startIndex + itemsPerPage) || [];

  useEffect(() => { setCurrentPage(1); }, [data, searchTerm]);

  if (isLoading) return <CourseSkeleton count={itemsPerPage} />;

  if (!data || data.length === 0) return <EmptyState onAddCourse={showAddButton ? onAddCourse : undefined} />;

  return (
    <div className="flex flex-col">
      {showSearch && (
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-4 w-full max-w-lg">
            <div className="flex-1">
              <SearchCourse
                onSearchChange={setSearchTerm}
                placeholder="Search courses by title or description..."
                size="full"
              />
            </div>
            {showAddButton && onAddCourse && (
              <button
                onClick={onAddCourse}
                className="bg-dark-accent hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap transition"
              >
                <span className="text-xl leading-none">+</span> Add Course
              </button>
            )}
          </div>
        </div>
      )}

      {searchTerm && filteredData.length > 0 && (
        <div className="flex justify-center mt-5">
          <p className="mb-4 text-sm text-gray-600">
            Found <span className="font-medium text-gray-900">{filteredData.length}</span> course(s) matching &quot;<span className="font-medium text-gray-900">{searchTerm}</span>&quot;
          </p>
        </div>
      )}

      {searchTerm && currentData.length === 0 ? (
        <SearchEmptyState searchTerm={searchTerm} />
      ) : (
        <div className="grid gap-4 mb-6">
          {currentData.map((course: any) => (
            <CourseCard
              key={course["id"]}
              id={course["id"]}
              courseLong={course["full_name"]}
              courseShort={course["short_name"]}
              color={course["color_theme"]}
              disabled={!course["lecturer_team"].includes(lecturer_pk)}
            />
          ))}
        </div>
      )}

      {filteredData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          showInfo={true}
          totalItems={filteredData?.length || 0}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default AllCourseContainer;