"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import TopicCard from "@/app/components/card/TopicCard";
import Pagination from "@/app/components/ui/Pagination";
import TopicSkeleton from "@/app/components/ui/TopicSkeleton";
import SearchCourse from "@/app/components/ui/SearchCourse";
import useEditPGKnowForms from "@/app/hooks/useEditPGknowForms";
import useEditEssayKnowForms from "@/app/hooks/useEditEssayKnowForms";
import useEditCheckboxWTKForms from "@/app/hooks/useEditCheckboxWTKForms";
import useEditEssayWTKForms from "@/app/hooks/useEditEssayWTKForms";
import useEditPGLearnedForms from "@/app/hooks/useEditPGLearnedForms";
import useEditEssayLearnedForms from "@/app/hooks/useEditEssayLearned";
import { useGetAuth } from "@/app/lib/api/useAuth";
import Link from "next/link";
import ArchiveTopicConfirmation from "@/app/components/message/ArchiveTopicConfirmation";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

interface Topic {
  id: number;
  name: string;
  description: string;
  learning_objective: string;
  enable_open_time: boolean;
  enable_close_time: boolean;
  open_time: string;
  close_time: string;
  updated: string;
  is_hidden: boolean;
  is_archived: boolean;
  know: Array<{ id: number; type: string }>;
  wtk: Array<{ id: number; type: string }>;
  learned: Array<{ id: number; type: string }>;
}

const ArchivedTopicsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5; // Jumlah topic per halaman

  const editPGKnowForms = useEditPGKnowForms();
  const editEssayKnowForms = useEditEssayKnowForms();
  const editCheckboxWTKForms = useEditCheckboxWTKForms();
  const editEssayWTKForms = useEditEssayWTKForms();
  const editPGLearnedForms = useEditPGLearnedForms();
  const editEssayLearnedForms = useEditEssayLearnedForms();

  const router = useRouter();
  const pathname = usePathname();

  const courseId = pathname.split("/")[2];

  const { data, isSuccess, status } = useGetAuth(
    `/api/course/topic/${courseId}/archived`,
    "archived topics"
  );

  // Filter data berdasarkan search term
  const filteredData = useMemo(() => {
    if (!searchTerm || !data?.topics) return data?.topics || [];

    return data.topics.filter((topic: Topic) => {
      const name = topic.name?.toLowerCase() || "";
      const description = topic.description?.toLowerCase() || "";
      const learning_objective = topic.learning_objective?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return (
        name.includes(search) ||
        description.includes(search) ||
        learning_objective.includes(search)
      );
    });
  }, [data?.topics, searchTerm]);

  // Hitung total halaman berdasarkan data yang sudah difilter
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

  // Hitung index untuk slice data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Data yang ditampilkan di halaman saat ini
  const currentData = filteredData?.slice(startIndex, endIndex) || [];

  // Reset ke halaman 1 jika data atau search term berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [data?.topics, searchTerm]);

  // Handler untuk navigasi halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handler untuk search
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Loading state
  if (status === "pending") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: "Kursus", href: `/courses/${courseId}` }, { label: "Archive" }]} variant="light" />
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link
              href={`/courses/${courseId}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Course
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Archived Topics
            </h1>
            <p className="text-gray-600 mt-2">
              Topics that have been archived for this course
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <SearchCourse
              onSearchChange={handleSearchChange}
              placeholder="Search archived topics by title or description..."
              size="lg"
            />
          </div>
          <TopicSkeleton count={itemsPerPage} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: "Kursus", href: `/courses/${courseId}` }, { label: "Archive" }]} variant="light" />
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/courses/${courseId}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Course
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Archived Topics</h1>
          <p className="text-gray-600 mt-2">
            {data?.total_archived_topics || 0} archived topic(s) for this course
          </p>
        </div>

        {/* Search Component */}
        <div className="flex justify-center mb-6">
          <SearchCourse
            onSearchChange={handleSearchChange}
            placeholder="Search archived topics by title or description..."
            size="lg"
          />
        </div>

        {/* Empty state untuk data kosong */}
        {(!data?.topics || data.topics.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Archived Topics
            </h3>
            <p className="text-gray-500">
              There are no archived topics for this course yet.
            </p>
          </div>
        )}

        {/* Empty state untuk hasil search kosong */}
        {searchTerm &&
          filteredData.length === 0 &&
          data?.topics &&
          data.topics.length > 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No topics match your search
              </h3>
              <p className="text-gray-500">
                No archived topics found for "
                <span className="font-medium">{searchTerm}</span>". Try
                different keywords or clear the search.
              </p>
            </div>
          )}

        {/* Search Results Info */}
        {searchTerm && filteredData.length > 0 && (
          <div className="flex justify-center mt-10">
            <div className="mb-4 text-sm text-gray-600">
              Found{" "}
              <span className="font-medium text-gray-900">
                {filteredData.length}
              </span>{" "}
              archived topic(s) matching "
              <span className="font-medium text-gray-900">{searchTerm}</span>"
            </div>
          </div>
        )}

        {/* Topic Cards */}
        {currentData.length > 0 && (
          <div className="space-y-4 mb-1">
            {currentData.map((topic: Topic) => (
              <TopicCard
                key={topic.id}
                id={topic.id}
                topic={topic.name}
                description={topic.description}
                learning_objective={topic.learning_objective}
                enable_open_time={topic.enable_open_time}
                enable_close_time={topic.enable_close_time}
                open_time={topic.open_time}
                close_time={topic.close_time}
                knowId={topic.know?.[0]?.id || 0}
                wtkId={topic.wtk?.[0]?.id || 0}
                learnedId={topic.learned?.[0]?.id || 0}
                updated={topic.updated}
                isHidden={topic.is_hidden}
                isArchived={topic.is_archived}
                knowType={
                  topic.know?.[0]?.type === "reflection" ? "essay" : "quiz"
                }
                wtkType={
                  topic.wtk?.[0]?.type === "reflection" ? "essay" : "checkbox"
                }
                learnedType={
                  topic.learned?.[0]?.type === "reflection" ? "essay" : "quiz"
                }
                handleKnow={() => {
                  if (topic.know[0]?.type === "reflection") {
                    editEssayKnowForms.open(topic.id, topic.know[0].id);
                  } else {
                    editPGKnowForms.open(topic.id, topic.know[0].id);
                  }
                }}
                handleWTK={() => {
                  if (topic.wtk[0]?.type === "reflection") {
                    editEssayWTKForms.open(topic.id, topic.wtk[0].id);
                  } else {
                    editCheckboxWTKForms.open(topic.id, topic.wtk[0].id);
                  }
                }}
                handleLearned={() => {
                  if (topic.learned[0]?.type === "reflection") {
                    editEssayLearnedForms.open(topic.id, topic.learned[0].id);
                  } else {
                    editPGLearnedForms.open(topic.id, topic.learned[0].id);
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredData.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showInfo={true}
            totalItems={filteredData?.length || 0}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
      <ArchiveTopicConfirmation />
    </div>
  );
};

export default ArchivedTopicsPage;
