"use client";

import React, { useState } from "react";
import { useGetAuth, usePostAuth, usePutAuth, useDeleteAuth } from "@/app/lib/api/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import SearchBar from "../button/SearchBar";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

type FeedbackForm = {
  feedback: string;
};

interface FeedbackModalProps {
  participant: any;
  mode: "add" | "edit";
  existingFeedback?: any;
  onClose: () => void;
}

function FeedbackModal({ participant, mode, existingFeedback, onClose }: FeedbackModalProps) {
  const { data: session } = useSession();
  const params = useParams();
  const queryClient = useQueryClient();
  const isEdit = mode === "edit";

  const feedbackQueryKey = `feedback-student-${participant["id"]}`;
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  const { data: topics } = useGetAuth(`/api/course/topic/${params.id_course}/all`, "course-topics");
  const { mutate: addFeedback, isPending: isAdding } = usePostAuth("/api/course/feedback", "send-feedback");
  const { mutate: editFeedback, isPending: isEditing } = usePutAuth("/api/course/feedback/", "edit-feedback");
  const isPending = isAdding || isEditing;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FeedbackForm>({
    defaultValues: { feedback: isEdit ? existingFeedback?.feedback ?? "" : "" },
  });

  const onSubmit = (data: FeedbackForm) => {
    if (isEdit) {
      const body = { feedback: data.feedback };
      console.log("[FeedbackModal] EDIT body:", body, "key:", existingFeedback?.id);
      editFeedback(
        { body, key: existingFeedback?.id },
        {
          onSuccess: (res) => {
            console.log("[FeedbackModal] EDIT onSuccess, res:", res, "refetching key:", feedbackQueryKey);
            queryClient.refetchQueries({ queryKey: [feedbackQueryKey] });
            setSubmitted(true);
          },
        }
      );
    } else {
      const body = {
        topic: selectedTopic["id"],
        feedback: data.feedback,
        lecturer: session?.userinfo?.role_pk,
        student: participant["id"],
      };
      console.log("[FeedbackModal] ADD body:", body, "queryKey:", feedbackQueryKey);
      addFeedback(
        { body },
        {
          onSuccess: (res) => {
            console.log("[FeedbackModal] ADD onSuccess, res:", res, "refetching key:", feedbackQueryKey);
            queryClient.refetchQueries({ queryKey: [feedbackQueryKey] }).then(() => {
              console.log("[FeedbackModal] refetch done, cache:", queryClient.getQueryData([feedbackQueryKey]));
            });
            setSubmitted(true);
          },
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <p className="text-sm font-semibold text-gray-700">
              Feedback berhasil {isEdit ? "diperbarui" : "dikirim"} untuk{" "}
              <span className="text-blue-900">{participant["user"]["nama_lengkap"]}</span>!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors"
            >
              Tutup
            </button>
          </div>

        ) : !isEdit && !selectedTopic ? (
          <>
              <h2 className="text-sm font-bold text-gray-800 mb-3">Pilih Topik</h2>
            <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {topics?.topics?.map((topic: any) => (
                <li key={topic["id"]}>
                  <button
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className="w-full text-left px-4 py-3 text-sm border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    {topic["name"]}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </>

        ) : (
          <>
                {!isEdit && (
                  <button
                    type="button"
                    onClick={() => setSelectedTopic(null)}
                    className="text-xs text-blue-900 hover:underline mb-3 flex items-center gap-1"
                  >
                    ← Ganti topik
                  </button>
                )}
                <h2 className="text-sm font-bold text-gray-800 mb-1">
                  {isEdit ? "Edit Feedback" : "Kirim Feedback"}
                </h2>
                {selectedTopic && (
                  <p className="text-xs text-gray-500 mb-1">
                    Topik: <span className="font-semibold text-gray-700">{selectedTopic["name"]}</span>
                  </p>
                )}
                {isEdit && existingFeedback?.topic_name && (
                  <p className="text-xs text-gray-500 mb-1">
                    Topik: <span className="font-semibold text-gray-700">{existingFeedback.topic_name}</span>
                  </p>
                )}
            <p className="text-xs text-gray-500 mb-4">
                  kepada:{" "}
                  <span className="font-semibold text-gray-700">{participant["user"]["nama_lengkap"]}</span>
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
                    {isPending ? "Menyimpan..." : isEdit ? "Simpan" : "Kirim"}
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

interface ParticipantRowProps {
  participant: any;
  index: number;
  isButtonActive: boolean;
  pathname: string;
  onOpenModal: (data: { mode: "add" | "edit"; participant: any; existingFeedback?: any }) => void;
}

const ParticipantRow = ({
  participant,
  index,
  isButtonActive,
  pathname,
  onOpenModal,
}: ParticipantRowProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const feedbackQueryKey = `feedback-student-${participant["id"]}`;
  const { data: feedbacks } = useGetAuth(
    `/api/course/feedback/student/${params.id_course}/${participant["id"]}`,
    feedbackQueryKey
  );
  const { mutate: deleteFeedback, isPending: isDeleting } = useDeleteAuth(
    "/api/course/feedback/",
    `delete-feedback-${participant["id"]}`
  );

  const latestFeedback = feedbacks?.feedbacks?.[0];
  const hasFeedback = !!latestFeedback;
  console.log(`[ParticipantRow] latestFeedback for ${participant["id"]}:`, latestFeedback);
  const handleDelete = () => {
    deleteFeedback(
      { key: latestFeedback?.id },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: [feedbackQueryKey] }) }
    );
  };

  return (
    <tr className="h-12 border-b border-gray-100">
      <td className="font-bold">{index + 1}</td>
      <td>{participant["user"]["nama_lengkap"]}</td>
      <td>{participant["user"]["email"]}</td>
      <td className="px-3 py-2">
        {hasFeedback ? (
          <textarea
            disabled
            value={latestFeedback.feedback}
            rows={2}
            className="w-full text-xs text-gray-600 border border-gray-200 rounded-lg px-2 py-1 resize-none bg-gray-50"
          />
        ) : (
          <span className="text-gray-400 text-xs italic">belum ada feedback</span>
        )}
      </td>
      <td>
        {hasFeedback ? (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => onOpenModal({ mode: "edit", participant, existingFeedback: latestFeedback })}
              className="w-14 h-7 bg-yellow-500 text-white font-bold text-xs rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-14 h-7 bg-red-500 text-white font-bold text-xs rounded-lg hover:bg-red-400 disabled:opacity-50 transition-colors"
            >
              {isDeleting ? "..." : "Delete"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => onOpenModal({ mode: "add", participant })}
            className="w-28 h-8 bg-blue-900 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition-colors"
          >
            Add Feedback
          </button>
        )}
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
  );
};

const TableParticipant: React.FC<TableParticipantProps> = ({ isButtonActive }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<{
    mode: "add" | "edit";
    participant: any;
    existingFeedback?: any;
  } | null>(null);

  const params = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { data } = useGetAuth(`/api/course/${params.id_course}/students`, "list student");

  const filteredData = data?.filter((participant: any) =>
    participant["user"]["nama_lengkap"]
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (data && data.length === 0) {
    return <EmptyParticipantState />;
  }

  const handleCloseModal = () => {
    if (activeModal) {
      queryClient.refetchQueries({
        queryKey: [`feedback-student-${activeModal.participant["id"]}`],
      });
    }
    setActiveModal(null);
  };

  return (
    <>
      {activeModal && (
        <FeedbackModal
          participant={activeModal.participant}
          mode={activeModal.mode}
          existingFeedback={activeModal.existingFeedback}
          onClose={handleCloseModal}
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
                  <th className="w-56">Nama</th>
                  <th className="w-56">Email</th>
                  <th className="w-80">Feedback</th>
                  <th className="w-44">Action</th>
                {isButtonActive && <th className="w-52">Hasil</th>}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData?.map((participant: any, index: number) => (
                <ParticipantRow
                  key={participant["id"]}
                  participant={participant}
                  index={index}
                  isButtonActive={isButtonActive}
                  pathname={pathname}
                  onOpenModal={setActiveModal}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TableParticipant;
