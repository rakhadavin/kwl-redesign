import React from "react";
import Link from "next/link";

interface CourseCardProps {
  id: number;
  courseLong: string;
  courseShort: string;
  color: string;
}

const PesertaMyCourseCard: React.FC<CourseCardProps> = ({
  id,
  color,
  courseLong,
  courseShort,
}) => {
  return (
    <Link href={`/peserta/courses/${id}`}>
      <div className="pb-5 flex items-center justify-center">
        <div className="h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <div className="flex">
            <div className={`w-20 h-auto p-3 rounded-l-lg bg-${color}`} />
            <div className="w-6 h-6 relative" />
            <div className="py-4 text-left">
              <span className="text-black text-base font-bold">
                {courseShort}
                <br />
              </span>
              <span className="text-black text-xs font-normal">
                {courseLong}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PesertaMyCourseCard;
