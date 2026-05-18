"use client";

import { FC } from "react";
import { HiUsers, HiClock, HiCheckCircle, HiXCircle } from "react-icons/hi";

interface SessionRekapCardProps {
  session: {
    session_id: string;
    session_number: number;
    started_at: string;
    finished_at: string | null;
    total_participants: number;
    started_by: string | null;
    is_active: boolean;
    questions: Array<{
      question_id: string;
      question_text: string;
      question_number: number;
      answers: Array<any>;
    }>;
    participants: Array<{
      guest_id: string;
      guest_name: string;
      joined_at: string;
    }>;
  };
  questionType: string;
  onViewDetail?: (sessionId: string) => void;
}

const SessionRekapCard: FC<SessionRekapCardProps> = ({
  session,
  questionType,
  onViewDetail,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTotalAnswers = () => {
    return session.questions.reduce(
      (total, question) => total + question.answers.length,
      0
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <span className="text-blue-600 font-bold text-lg">
              #{session.session_number}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              Sesi {session.session_number}
            </h3>
            <p className="text-sm text-gray-500">
              Dimulai oleh {session.started_by || "Tidak diketahui"}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
            session.is_active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {session.is_active ? (
            <>
              <HiCheckCircle className="w-4 h-4" />
              Aktif
            </>
          ) : (
            <>
              <HiXCircle className="w-4 h-4" />
              Selesai
            </>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <HiUsers className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Participants</p>
            <p className="font-semibold">{session.total_participants}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <HiClock className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Total Jawaban</p>
            <p className="font-semibold">{getTotalAnswers()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-purple-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm text-gray-500">Pertanyaan</p>
            <p className="font-semibold">{session.questions.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-orange-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm text-gray-500">Durasi</p>
            <p className="font-semibold">
              {session.finished_at
                ? `${Math.round(
                    (new Date(session.finished_at).getTime() -
                      new Date(session.started_at).getTime()) /
                      (1000 * 60)
                  )} mnt`
                : "Berlangsung"}
            </p>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="border-t pt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Dimulai:</span>{" "}
            {formatDate(session.started_at)}
          </p>
          {session.finished_at && (
            <p>
              <span className="font-medium">Selesai:</span>{" "}
              {formatDate(session.finished_at)}
            </p>
          )}
        </div>
      </div>

      {/* Questions Preview */}
      {session.questions.length > 0 && (
        <div className="border-t pt-4 mb-4">
          <h4 className="font-medium text-gray-700 mb-2">
            Preview Pertanyaan:
          </h4>
          <div className="space-y-2">
            {session.questions.slice(0, 2).map((question) => (
              <div
                key={question.question_id}
                className="bg-gray-50 rounded p-3"
              >
                <p className="text-sm font-medium text-gray-700">
                  {question.question_number}. {question.question_text}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {question.answers.length} jawaban diterima
                </p>
              </div>
            ))}
            {session.questions.length > 2 && (
              <p className="text-sm text-gray-500 text-center">
                +{session.questions.length - 2} pertanyaan lainnya
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      {onViewDetail && (
        <div className="border-t pt-4">
          <button
            onClick={() => onViewDetail(session.session_id)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            Lihat Detail Sesi
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionRekapCard;
