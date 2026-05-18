"use client";

import React from "react";
import KuesionerCard from "./QuizCard";
import useCreateKuesionerForms from "@/app/hooks/useCreateKuesionerForms";

function EmptyState() {
  const createKuesionerForms = useCreateKuesionerForms();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <img
        src="/error_state_mahasiswa.png"
        alt="No questionnaires"
        className="w-72 h-auto mb-6 object-contain"
      />
      <p className="text-gray-500 font-semibold text-lg mb-1">
        Belum ada kuesioner yang dibuat.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Tambahkan kuesioner untuk mengumpulkan refleksi mahasiswa.
      </p>
      <button
        onClick={() => createKuesionerForms.open()}
        className="flex items-center gap-2 px-8 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors"
      >
        <span className="text-lg leading-none">+</span> Add Questionnaire
      </button>
    </div>
  );
}

const AllKuesionerContainer = ({ data }: { data: any }) => {
  const items = data?.data ?? data ?? [];

  if (!items || items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {items.map((kuesioner: any, index: number) => (
        <KuesionerCard
          key={index}
          id={kuesioner["id"]}
          title={kuesioner["title"]}
          description={kuesioner["description"]}
        />
      ))}
    </div>
  );
};

export default AllKuesionerContainer;