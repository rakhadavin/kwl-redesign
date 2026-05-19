"use client";

import React from "react";
import CourseCard from "./CourseCard";

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
  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {data.map((course: any) => (
        <CourseCard
          key={course["id"]}
          id={course["id"]}
          courseLong={course["full_name"]}
          courseShort={course["short_name"]}
          color={course["color_theme"]}
        />
      ))}
    </div>
  );
};

export default MyCourseContainer;
