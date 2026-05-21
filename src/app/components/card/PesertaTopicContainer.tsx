"use client";

import React, { useState, useEffect, useMemo } from "react";
import MediumCard from "../button/peserta/MediumCard";
import Pagination from "../ui/Pagination";
import PesertaTopicSkeleton from "../ui/PesertaTopicSkeleton";
import SearchCourse from "../ui/SearchCourse";

interface TopicData {
  id: number;
  name: string;
  description: string;
  enable_open_time: boolean;
  enable_close_time: boolean;
  open_time: string;
  close_time: string;
  is_accessible: boolean;
  know: Array<{ id: number; type: string }>;
  wtk: Array<{ id: number; type: string }>;
  learned: Array<{ id: number; type: string }>;
}

interface KwlData {
  kwl_status: string;
}

interface Topic {
  topic_data: TopicData;
  kwl_data: KwlData | "kosong";
  know: any[];
  wtk: any[];
  learned: any[];
}

interface PesertaTopicContainerProps {
  data: Topic[];
  isLoading?: boolean;
  courseId: string | string[];
  onSelectTopic?: (topic: Topic) => void;
  selectedTopicId?: number;
  showSearch?: boolean;
}

const PesertaTopicContainer: React.FC<PesertaTopicContainerProps> = ({
  data,
  isLoading = false,
  courseId,
  onSelectTopic,
  selectedTopicId,
  showSearch = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  const filteredData = useMemo(() => {
    if (!searchTerm || !data) return data || [];

    return data.filter(topic => {
      const name = topic.topic_data.name?.toLowerCase() || "";
      const description = topic.topic_data.description?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      return name.includes(search) || description.includes(search);
    });
  }, [data, searchTerm]);

  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData?.slice(startIndex, endIndex) || [];

  useEffect(() => { setCurrentPage(1); }, [data]);
  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  if (isLoading) {
    return <PesertaTopicSkeleton count={itemsPerPage} />;
  }

  return (
    <div className="flex flex-col h-max gap-4 bg-gray-100 px-6 py-4 rounded-md">
      <div className="flex-1">
        {showSearch && (
          <div className="flex justify-center mb-6">
            <SearchCourse
              onSearchChange={setSearchTerm}
              placeholder="Cari topik berdasarkan nama atau deskripsi..."
              size="lg"
            />
          </div>
        )}

        {!data || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-xl font-semibold mb-2">Belum Ada Topik</h3>
            <p className="text-center text-gray-400">
              Topik pembelajaran belum tersedia di course ini.
            </p>
          </div>
        ) : searchTerm && currentData.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Tidak Ada Hasil</h3>
            <p className="text-center text-gray-400">
              Tidak ditemukan topik yang sesuai dengan pencarian "{searchTerm}".
            </p>
          </div>
        ) : (
              <div className="mt-10">
            <div className="space-y-2 mb-6">
                  {currentData.map((topic) => (
                <div key={topic.topic_data.id}>
                  <MediumCard
                    title={topic.topic_data.name}
                    subtitle={topic.topic_data.description}
                        onClick={() => onSelectTopic?.(topic)}
                        isSelected={selectedTopicId === topic.topic_data.id}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredData && filteredData.length > itemsPerPage && (
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            showInfo={true}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default PesertaTopicContainer;
