"use client";

import React, { useState } from "react";
import { useGetAuth, usePostAuth } from "@/app/lib/api/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import useCreateCourse2Forms from "@/app/hooks/useCreateCourse2Forms";
import Link from "next/link";
import SearchBar from "../button/SearchBar";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

type FeedbackForm = {
  feedback: string;
};

interface FeedbackModalProps {
  participant: any;
  onClose: () => void;
}

function FeedbackModal({ participant, onClose }: FeedbackModalProps) {
  const { data: session } = useSession();
  const params = useParams();
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = usePostAuth("/api/course/feedback", "send-feedback");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FeedbackForm>();

  const onSubmit = (data: FeedbackForm) => {
    mutate(
      {
        body: {
          topic: params.id_topic ?? null,
          feedback: data.feedback,
          lecturer: session?.userinfo?.role_pk,
          student: participant["id"],
        },
      },
      {
        onSuccess: () => setSubmitted(true),
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <p className="text-sm font-semibold text-gray-700">
              Feedback berhasil dikirim ke <span className="text-blue-900">{participant["user"]["nama_lengkap"]}</span>!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors"
            >
              Tutup
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-sm font-bold text-gray-800 mb-1">Kirim Feedback</h2>
            <p className="text-xs text-gray-500 mb-4">
              kepada: <span className="font-semibold text-gray-700">{participant["user"]["nama_lengkap"]}</span>
            </p>
            <textarea
              {...register("feedback", {
                required: "Feedback harus diisi",
                maxLength: { value: 5000, message: "Maksimal 5000 karakter" },
              })}
              rows={6}
              placeholder="Tulis feedback untuk peserta..."
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {errors.feedback && (
              <p className="text-xs text-red-500 mt-1">{errors.feedback.message}</p>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isPending || !isValid}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-900 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface TableParticipantProps {
  isButtonActive: boolean;
}

function EmptyParticipantState() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <img
        src="/empty_mahasiswa.png"
        alt="No participants"
        className="w-72 h-auto mb-6 object-contain"
      />

      <p className="text-gray-400 font-semibold text-lg mb-1">
        Belum ada mahasiswa yang terdaftar pada course ini.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Mulai dengan membuat course baru.
      </p>

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Kembali ke Detail Course
      </button>
    </div>
  );
}

const TableParticipant: React.FC<TableParticipantProps> = ({ isButtonActive }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackParticipant, setFeedbackParticipant] = useState<any>(null);
  const params = useParams();
  const pathname = usePathname();

  const { data } = useGetAuth(
    `/api/course/${params.id_course}/students`,
    "list student"
  );

  const filteredData = data?.filter((participant: any) =>
    participant["user"]["nama_lengkap"]
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Empty state — no participants at all
  if (data && data.length === 0) {
    return <EmptyParticipantState />;
  }

  return (
    <>
      {feedbackParticipant && (
        <FeedbackModal
          participant={feedbackParticipant}
          onClose={() => setFeedbackParticipant(null)}
        />
      )}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="py-10 flex flex-col items-center justify-center overflow-y-scroll scrollbar-none">
        {filteredData && filteredData.length === 0 ? (
          <p className="text-gray-400 text-sm mt-4">
            Tidak ditemukan peserta dengan nama &quot;{searchQuery}&quot;.
          </p>
        ) : (
          <table className="table-fixed text-center">
            <thead className="bg-main text-white h-12">
              <tr>
                <th className="w-12">No</th>
                <th className="w-72">Nama</th>
                  <th className="w-72">Email</th>
                  <th className="w-72">Action</th>
                {isButtonActive && <th className="w-52">Hasil</th>}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData?.map((participant: any, index: number) => (
                <tr className="h-12" key={participant["id"]}>
                  <td className="font-bold">{index + 1}</td>
                  <td>{participant["user"]["nama_lengkap"]}</td>
                  <td>{participant["user"]["email"]}</td>
                  <td>
                    <button
                      onClick={() => setFeedbackParticipant(participant)}
                      className="w-24 h-8 bg-blue-900 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition-colors"
                    >
                      Feedback
                    </button>
                  </td>
                  {isButtonActive && (
                    <td>
                      <Link href={`${pathname}/${participant["id"]}`}>
                        <button className="mb-2 w-28 h-8 bg-main border-2 border-white hover:bg-white hover:text-main hover:border-main text-white font-bold text-xs py-2 px-2 rounded-xl">
                          Lihat
                        </button>
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TableParticipant;