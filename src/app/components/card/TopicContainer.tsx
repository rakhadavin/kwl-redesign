"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import TopicListItem from "./TopicListItem";
import Pagination from "../ui/Pagination";
import TopicSkeleton from "../ui/TopicSkeleton";
import SearchCourse from "../ui/SearchCourse";
import { useGetAuth } from "@/app/lib/api/useAuth";
import Link from "next/link";

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

interface TopicContainerProps {
  showAddButton?: boolean;
  onAddTopic?: () => void;
  selectedTopicId?: number;
  onSelectTopic?: (id: number) => void;
}

// ── Section header (TOPICS + subtitle + tombol Buat Topik) ──────────────────
function TopicSectionHeader({
  showAddButton,
  onAddTopic,
  onSearchChange,
}: {
  showAddButton?: boolean;
  onAddTopic?: () => void;
  onSearchChange: (term: string) => void;
}) {
  return (
    <div className="flex flex-col items-center mb-6">
      {/* Header row — lebar sama dengan SearchCourse size="lg" */}
      <div className="flex items-center justify-between w-full px-4" style={{ maxWidth: "var(--search-lg-width, 600px)" }}>
        <div>
          <h2 className="text-xl font-extrabold text-blue-900 tracking-wide">
            TOPICS
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Kelola Pertanyaan & Rekap</p>
        </div>
        {showAddButton && onAddTopic && (
          <button
            onClick={onAddTopic}
            className="flex items-center gap-2 px-5 py-2 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors"
          >
            <span className="text-base leading-none">+</span> Buat Topik
          </button>
        )}
      </div>
      {/* Search bar tepat di bawah, lebar sama */}
      <div className="mt-3 w-full flex justify-center">
        <SearchCourse
          onSearchChange={onSearchChange}
          placeholder="Search Topics by title or description"
          size="lg"
        />
      </div>
    </div>
  );
}

// ── (Search bar now merged into TopicSectionHeader) ──────────────────────────
function TopicSearchBar({
  onSearchChange,
}: {
  onSearchChange: (term: string) => void;
}) {
  return null; // kept for backward compat, not used
}

// ── Empty state ──────────────────────────────────────────────────────────────
function EmptyTopicState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Ilustrasi dokumen — pakai image kalau ada, fallback SVG */}
      <img
        src="/empty-topic.png"
        alt="No topics"
        className="w-48 h-auto mb-6 object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          const next = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
          if (next) next.style.display = "block";
        }}
      />
      {/* Fallback SVG — stacked documents illustration */}
      <svg
        style={{ display: "none" }}
        className="w-40 h-32 mb-6"
        viewBox="0 0 160 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* back document */}
        <rect x="30" y="20" width="85" height="100" rx="6" fill="#C8D8F8" transform="rotate(-8 30 20)" />
        {/* middle document */}
        <rect x="38" y="15" width="85" height="100" rx="6" fill="#D6E4FC" transform="rotate(-3 38 15)" />
        {/* front document */}
        <rect x="45" y="10" width="85" height="100" rx="6" fill="#EEF3FF" stroke="#B8CCF4" strokeWidth="1.5" />
        {/* lines on front doc */}
        <rect x="58" y="30" width="55" height="5" rx="2.5" fill="#B8CCF4" />
        <rect x="58" y="44" width="45" height="5" rx="2.5" fill="#B8CCF4" />
        <rect x="58" y="58" width="50" height="5" rx="2.5" fill="#B8CCF4" />
        <rect x="58" y="72" width="38" height="5" rx="2.5" fill="#B8CCF4" />
        {/* decorative dots */}
        <circle cx="22" cy="60" r="4" fill="#C8D8F8" opacity="0.7" />
        <circle cx="140" cy="40" r="5" fill="#C8D8F8" opacity="0.5" />
        <circle cx="135" cy="90" r="3" fill="#B8CCF4" opacity="0.6" />
        <circle cx="18" cy="95" r="3" fill="#C8D8F8" opacity="0.5" />
        {/* small dashes */}
        <rect x="10" y="55" width="8" height="2" rx="1" fill="#B8CCF4" opacity="0.5" transform="rotate(-30 10 55)" />
        <rect x="143" y="55" width="8" height="2" rx="1" fill="#B8CCF4" opacity="0.5" transform="rotate(30 143 55)" />
      </svg>

      <p className="text-gray-500 font-semibold text-lg mb-1">
        Belum ada topik yang tersedia.
      </p>
      <p className="text-gray-400 text-sm">
        Tambahkan topik untuk memulai pembelajaran.
      </p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
const TopicContainer: React.FC<TopicContainerProps> = ({
  showAddButton = false,
  onAddTopic,
  selectedTopicId,
  onSelectTopic,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const pathname = usePathname();
  const courseId = pathname.split("/")[2];

  const { data, status } = useGetAuth(
    `/api/course/topic/${courseId}/all`,
    "list topic",
  );

  const filteredData = useMemo(() => {
    if (!searchTerm || !data?.topics) return data?.topics || [];
    return data.topics.filter((topic: Topic) => {
      const search = searchTerm.toLowerCase();
      return (
        topic.name?.toLowerCase().includes(search) ||
        topic.description?.toLowerCase().includes(search) ||
        topic.learning_objective?.toLowerCase().includes(search)
      );
    });
  }, [data?.topics, searchTerm]);

  const totalPages   = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex   = (currentPage - 1) * itemsPerPage;
  const currentData  = filteredData?.slice(startIndex, startIndex + itemsPerPage) || [];

  useEffect(() => { setCurrentPage(1); }, [data?.topics, searchTerm]);

  // ── Loading ──
  if (status === "pending") {
    return (
      <div>
        <TopicSectionHeader showAddButton={showAddButton} onAddTopic={onAddTopic} onSearchChange={setSearchTerm} />
        <TopicSkeleton count={itemsPerPage} />
      </div>
    );
  }

  // ── Empty (no topics at all) ──
  if (!data?.topics || data.topics.length === 0) {
    return (
      <div>
        <TopicSectionHeader showAddButton={showAddButton} onAddTopic={onAddTopic} onSearchChange={setSearchTerm} />
        <EmptyTopicState />
      </div>
    );
  }

  // ── Search no results ──
  if (searchTerm && filteredData.length === 0) {
    return (
      <div>
        <TopicSectionHeader showAddButton={showAddButton} onAddTopic={onAddTopic} onSearchChange={setSearchTerm} />
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Tidak ada hasil</h3>
          <p className="text-gray-400 text-sm">
            Tidak ditemukan topik yang sesuai dengan &quot;{searchTerm}&quot;.
          </p>
        </div>
      </div>
    );
  }

  // ── Normal ──
  return (
    <div className=" px-4 py-2 bg-[#D1D2D7]/10 rounded-md w-max">
      <TopicSectionHeader showAddButton={showAddButton} onAddTopic={onAddTopic} onSearchChange={setSearchTerm} />

      {searchTerm && filteredData.length > 0 && (
        <div className="flex justify-center mb-4">
          <p className="text-sm text-gray-600">
            Ditemukan <span className="font-medium text-gray-900">{filteredData.length}</span> topik
            yang cocok dengan &quot;<span className="font-medium text-gray-900">{searchTerm}</span>&quot;
          </p>
        </div>
      )}

      <div className="space-y-2 mb-6">
        {currentData.map((topic: Topic) => (
          <TopicListItem
            key={topic.id}
            id={topic.id}
            name={topic.name}
            description={topic.description}
            learning_objective={topic.learning_objective}
            enable_open_time={topic.enable_open_time}
            enable_close_time={topic.enable_close_time}
            open_time={topic.open_time}
            close_time={topic.close_time}
            is_hidden={topic.is_hidden}
            is_archived={topic.is_archived}
            know={topic.know}
            wtk={topic.wtk}
            learned={topic.learned}
            isSelected={selectedTopicId === topic.id}
            onSelect={() => onSelectTopic?.(topic.id)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        showInfo={true}
        totalItems={filteredData?.length || 0}
        itemsPerPage={itemsPerPage}
      />

      <div className="flex justify-center mt-6">
        <Link
          href={`${pathname}/archive`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.72V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.72c.57-.38 1-.99 1-1.72V4c0-1.1-.9-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z"/>
          </svg>
          <span className="text-sm font-semibold">See Archived Topics</span>
          {data.total_archived_topics > 0 && (
            <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
              {data.total_archived_topics}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default TopicContainer;