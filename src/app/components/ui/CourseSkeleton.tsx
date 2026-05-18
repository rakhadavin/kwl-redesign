import React from "react";

interface CourseSkeletonProps {
  count?: number;
}

const CourseSkeleton: React.FC<CourseSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid gap-4 mb-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
        >
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Footer skeleton */}
          <div className="flex items-center justify-between mt-6">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseSkeleton;
