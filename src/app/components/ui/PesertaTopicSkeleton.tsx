import React from "react";

interface PesertaTopicSkeletonProps {
  count?: number;
}

const PesertaTopicSkeleton: React.FC<PesertaTopicSkeletonProps> = ({
  count = 4,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white rounded-lg border border-gray-200 p-4 mx-2 shadow-sm"
        >
          {/* Medium Card skeleton structure */}
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-6 w-6 bg-gray-200 rounded flex-shrink-0"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PesertaTopicSkeleton;
