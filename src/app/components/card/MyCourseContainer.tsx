"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Pagination from "../ui/Pagination";

const ITEMS_PER_PAGE = 6;

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <img
        src="/empty_mahasiswa.png"
        alt="No courses"
        className="w-64 h-auto mb-6 object-contain"
      />
      <p className="text-gray-500 font-semibold text-lg mb-1">
        Belum ada course yang dibuat.
      </p>
      <p className="text-gray-400 text-sm">
        Mulai dengan membuat course baru.
      </p>
    </div>
  );
}

const MyCourseContainer = ({ data }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { setCurrentPage(1); }, [data]);

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        {currentData.map((course: any) => (
          <CourseCard
            key={course["id"]}
            id={course["id"]}
            courseLong={course["full_name"]}
            courseShort={course["short_name"]}
            color={course["color_theme"]}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        showInfo={true}
        totalItems={data.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};

export default MyCourseContainer;
