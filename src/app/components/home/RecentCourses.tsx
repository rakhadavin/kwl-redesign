"use client";

import { useSession } from "next-auth/react";
import { useGetAuth } from "../../lib/api/useAuth";
import Link from "next/link";

export default function RecentCourses() {
  const { data: session, status } = useSession();

  const { data: courses, isLoading } = useGetAuth(
    "/api/course/lecturer",
    "recent-courses-lecturer",
    false,
    status === "authenticated",
  );

  const recentCourses = courses?.slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="bg-indigo-50 rounded-2xl p-6">
        <h2 className="text-xl font-extrabold text-center mb-6 tracking-wide">5 RECENT COURSES</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex gap-3 bg-white rounded-2xl overflow-hidden h-20">
              <div className="w-28 bg-gray-200 shrink-0" />
              <div className="flex-1 p-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50 rounded-2xl p-6">
      <h2 className="text-xl font-extrabold text-center mb-6 tracking-wide text-gray-800">
        {recentCourses.length} RECENT COURSES
      </h2>

      {recentCourses.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="font-medium">Belum ada course yang dibuat</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentCourses.map((course: any) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="block group">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex items-stretch">
                {/* color block */}
                <div
                  className="w-28 shrink-0"
                  style={{ backgroundColor: course.color_theme || "#e5e7eb" }}
                />
                {/* info */}
                <div className="flex-1 px-4 py-3 min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5 truncate">
                    {course.institusi} | {course.prodi}
                  </p>
                  <h3 className="font-bold text-sm text-gray-900 truncate">
                    {course.short_name || course.full_name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">{course.full_name}</p>
                </div>
                {/* peserta + arrow */}
                <div className="flex items-center gap-2 pr-4 shrink-0">
                  <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                    {course.students?.length ?? 0} Peserta
                  </span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/courses" className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold text-sm transition-colors">
          Lihat Courses Saya
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}