import { useParams } from "next/navigation";
import { useWebSocket } from "@/app/hooks/Websocket/useWebsocket";
import { useState, useMemo, useEffect, useRef } from "react";
import { HiChevronLeft, HiChevronRight, HiUsers } from "react-icons/hi";

interface Student {
  studentId: number;
  studentName?: string;
  student_name?: string; // Add this for WebSocket data
  student_id?: number; // Add this for WebSocket data
  currentTopicId?: number | null;
  currentTopicName?: string | null;
  topic_name?: string; // Add this for WebSocket data
  topic_id?: number; // Add this for WebSocket data
  lastActivity: string;
  last_activity?: string; // Add this for WebSocket data
  isNew?: boolean;
  isLeaving?: boolean;
}

export default function TableProgressParticipant() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Changed to 8 to have 4 cards per row with 2 rows
  const [previousStudents, setPreviousStudents] = useState<Student[]>([]);
  const [studentsWithAnimations, setStudentsWithAnimations] = useState<
    Student[]
  >([]);
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const courseId = params?.id_course
    ? parseInt(params.id_course as string, 10)
    : undefined;
  const topicId = params?.id_topic
    ? parseInt(params.id_topic as string, 10)
    : undefined;

  const { activeStudents } = useWebSocket(courseId, topicId);

  // Handle real-time student updates with animations
  useEffect(() => {
    if (!activeStudents) return;

    const currentStudentIds = new Set(activeStudents.map((s) => s.studentId));
    const previousStudentIds = new Set(
      previousStudents.map((s) => s.studentId)
    );

    // Find new students
    const newStudents = activeStudents
      .filter((student) => !previousStudentIds.has(student.studentId))
      .map((student) => ({ ...student, isNew: true }));

    // Find leaving students
    const leavingStudents = previousStudents
      .filter((student) => !currentStudentIds.has(student.studentId))
      .map((student) => ({ ...student, isLeaving: true }));

    // Existing students (no animation)
    const existingStudents = activeStudents.filter((student) =>
      previousStudentIds.has(student.studentId)
    );

    // Combine all students for display
    const allStudentsForDisplay = [
      ...existingStudents,
      ...newStudents,
      ...leavingStudents,
    ];
    setStudentsWithAnimations(allStudentsForDisplay);

    // Remove new animation after 2 seconds
    newStudents.forEach((student) => {
      const existingTimeout = timeoutRefs.current.get(student.studentId);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      const timeoutId = setTimeout(() => {
        setStudentsWithAnimations((prev) =>
          prev.map((s) =>
            s.studentId === student.studentId ? { ...s, isNew: false } : s
          )
        );
      }, 2000);

      timeoutRefs.current.set(student.studentId, timeoutId);
    });

    // Remove leaving students after animation
    if (leavingStudents.length > 0) {
      setTimeout(() => {
        setStudentsWithAnimations((prev) => prev.filter((s) => !s.isLeaving));
      }, 1000);
    }

    setPreviousStudents(activeStudents);

    // Cleanup timeouts on unmount
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, [activeStudents]);

  const { paginatedStudents, totalPages, startIndex, endIndex, totalStudents } =
    useMemo(() => {
      const students = studentsWithAnimations || [];
      const total = students.length;
      const pages = Math.ceil(total / itemsPerPage);
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginated = students.slice(start, end);

      return {
        paginatedStudents: paginated,
        totalPages: pages,
        startIndex: start + 1,
        endIndex: Math.min(end, total),
        totalStudents: total,
      };
    }, [studentsWithAnimations, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const formatLastActivity = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  if (!studentsWithAnimations || studentsWithAnimations.length === 0) {
    return (
      <div className="py-5 flex flex-row justify-center items-center flex-wrap">
        <div className="my-8 w-full md:w-4/5 lg:w-5/6">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <HiUsers className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No Active Students
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                No students are currently active in this topic. Students will
                appear here when they join the session.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log(paginatedStudents);

  return (
    <div className="py-5 flex flex-row justify-center items-center flex-wrap">
      <div className="mb-8 w-full md:w-4/5 lg:w-5/6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <HiUsers className="w-5 h-5 mr-2" />
                Active Students ({totalStudents})
              </h3>
              {totalPages > 1 && (
                <span className="text-blue-100 text-sm">
                  Showing {startIndex}-{endIndex} of {totalStudents}
                </span>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedStudents.map((student: Student, index: number) => (
                <div
                  key={student.studentId}
                  className={`
                    relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-4
                    transition-all duration-500 hover:shadow-lg hover:-translate-y-1
                    ${
                      student.isNew
                        ? "animate-bounce border-green-400 bg-green-50 shadow-green-200"
                        : ""
                    }
                    ${student.isLeaving ? "animate-pulse opacity-50" : ""}
                  `}
                >
                  {/* Student Avatar */}
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {(student.studentName || student.student_name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    {/* Status bubble */}
                    {student.isNew && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-ping">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Student Name */}
                  <div className="text-center mb-2">
                    <h4
                      className="font-semibold text-gray-900 text-sm truncate"
                      title={
                        student.studentName || student.student_name || "Unknown"
                      }
                    >
                      {student.studentName || student.student_name || "Unknown"}
                    </h4>
                  </div>

                  {/* Status and Last Activity */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <span
                        className={`
                        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        ${
                          student.isLeaving
                            ? "bg-red-100 text-red-800"
                            : student.isNew
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      `}
                      >
                        <div
                          className={`
                          w-1.5 h-1.5 rounded-full mr-1.5
                          ${
                            student.isLeaving
                              ? "bg-red-500"
                              : student.isNew
                              ? "bg-green-500 animate-pulse"
                              : "bg-blue-500"
                          }
                        `}
                        ></div>
                        {student.isLeaving
                          ? "Leaving"
                          : student.isNew
                          ? "Just Joined!"
                          : "Online"}
                      </span>
                    </div>

                    {/* Last Activity */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        {formatLastActivity(
                          student.lastActivity ||
                            student.last_activity ||
                            new Date().toISOString()
                        )}
                      </p>
                    </div>
                  </div>

                  {/* New student bubble notification */}
                  {student.isNew && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                        New!
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-700">
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <HiChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page numbers */}
                  <div className="flex space-x-1">
                    {getPageNumbers().map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-3 py-2 text-sm font-medium border transition-colors ${
                          currentPage === pageNum
                            ? "z-10 bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <HiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
