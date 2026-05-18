"use client";

import { useParams, useRouter } from "next/navigation";
import { useDetailedSessionRecap } from "@/app/hooks/useSessionRecap";
import { HiArrowLeft, HiUsers, HiClock, HiDownload } from "react-icons/hi";
import { useState } from "react";

const SessionDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const kuesioner_id = params.kuesioner_id as string;
  const session_id = params.session_id as string;

  const { 
    data: sessionDetail, 
    isLoading, 
    error 
  } = useDetailedSessionRecap(kuesioner_id, session_id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBack = () => {
    router.push(`/kuesioner/${kuesioner_id}/rekap`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail sesi...</p>
        </div>
      </div>
    );
  }

  if (error || !sessionDetail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Tidak Dapat Memuat Detail Sesi</h2>
          <p className="text-gray-600 mb-4">{error?.message || 'Terjadi kesalahan'}</p>
          <button
            onClick={handleBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Kembali ke Rekap
          </button>
        </div>
      </div>
    );
  }

  const { session, kuesioner, participants, questions_analysis } = sessionDetail;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            Kembali ke Rekap Sesi
          </button>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Detail Sesi #{session.session_number}
                </h1>
                <h2 className="text-lg text-gray-600 mb-3">{kuesioner.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p><span className="font-medium">Dimulai:</span> {formatDate(session.started_at)}</p>
                    {session.finished_at && (
                      <p><span className="font-medium">Selesai:</span> {formatDate(session.finished_at)}</p>
                    )}
                  </div>
                  <div>
                    <p><span className="font-medium">Dimulai oleh:</span> {session.started_by || 'Tidak diketahui'}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        session.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {session.is_active ? 'Aktif' : 'Selesai'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <HiUsers className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Participants</p>
                  <p className="font-bold text-blue-600">{session.total_participants}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <HiClock className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Durasi</p>
                  <p className="font-bold text-green-600">
                    {session.finished_at 
                      ? `${Math.round((new Date(session.finished_at).getTime() - new Date(session.started_at).getTime()) / (1000 * 60))} mnt`
                      : 'Berlangsung'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participants List */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Daftar Participants</h3>
            </div>
            <div className="p-6">
              {participants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {participants.map((participant: any) => (
                    <div key={participant.guest_id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {participant.guest_name?.charAt(0)?.toUpperCase() || '?'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{participant.guest_name || 'Guest'}</p>
                          <p className="text-sm text-gray-500">
                            Bergabung: {formatDate(participant.joined_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Belum ada participant</p>
              )}
            </div>
          </div>
        </div>

        {/* Questions Analysis */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Analisis Pertanyaan</h3>
          
          {questions_analysis.length > 0 ? (
            questions_analysis.map((question: any) => (
              <div key={question.question_id} className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    {question.question_number}. {question.question_text}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Total Responses: {question.total_responses}
                  </p>
                </div>

                <div className="p-6">
                  {kuesioner.question_type === 'Polling' && question.choice_statistics ? (
                    <div className="space-y-4">
                      <h5 className="font-medium text-gray-700">Statistik Pilihan:</h5>
                      <div className="space-y-3">
                        {Object.entries(question.choice_statistics).map(([choice, count]: [string, any]) => {
                          const percentage = question.total_responses > 0 
                            ? ((count / question.total_responses) * 100).toFixed(1) 
                            : '0';
                          
                          return (
                            <div key={choice} className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-medium text-gray-700">{choice}</span>
                                  <span className="text-sm text-gray-500">{count} ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : kuesioner.question_type === 'Open Ended' ? (
                    <div className="space-y-4">
                      <h5 className="font-medium text-gray-700">Jawaban Participants:</h5>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {question.responses.map((response: any, index: number) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-gray-700">{response.guest_name}</span>
                              <span className="text-xs text-gray-500">
                                {formatDate(response.answered_at)}
                              </span>
                            </div>
                            <p className="text-gray-800">{response.text_answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Pertanyaan</h3>
              <p className="text-gray-500">Sesi ini belum memiliki pertanyaan yang dijawab.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetailPage;