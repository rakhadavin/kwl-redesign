"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSessionRekapManager } from "@/app/hooks/useSessionRecap";
import SessionRekapCard from "@/app/components/card/SessionRekapCard";
import { HiArrowLeft, HiDownload, HiRefresh } from "react-icons/hi";
import { useState } from "react";

const KuesionerRekap = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const kuesioner_id = params.kuesioner_id as string;
  const [isExporting, setIsExporting] = useState(false);

  // Fetch session recap data using custom hook
  const { 
    data: sessionData, 
    isLoading, 
    error,
    refetch,
    exportSessions,
    getTotalSessions,
    getKuesionerInfo,
    getSessions
  } = useSessionRekapManager(kuesioner_id);

  const handleViewDetail = (sessionId: string) => {
    router.push(`/kuesioner/${kuesioner_id}/rekap/${sessionId}`);
  };

  const handleExport = async () => {
    if (!session?.access) return;
    
    setIsExporting(true);
    try {
      await exportSessions(
        kuesioner_id, 
        session.access, 
        getKuesionerInfo()?.title
      );
    } catch (error) {
      console.error('Export failed:', error);
      // Optionally show error notification to user
    }
    setIsExporting(false);
  };

  const handleBack = () => {
    router.push('/kuesioner');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data rekap...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Gagal Memuat Data</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
          >
            <HiRefresh className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

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
            Kembali ke Daftar Kuesioner
          </button>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Rekap Sesi: {getKuesionerInfo()?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    {getKuesionerInfo()?.question_type}
                  </span>
                  <span>PIN: {getKuesionerInfo()?.pin}</span>
                  <span>Total Sesi: {getTotalSessions()}</span>
                </div>
                {getKuesionerInfo()?.description && (
                  <p className="text-gray-600 mt-2">{getKuesionerInfo()?.description}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => refetch()}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <HiRefresh className="w-4 h-4" />
                  Refresh
                </button>
                
                {getSessions().length > 0 && (
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HiDownload className="w-4 h-4" />
                    {isExporting ? 'Mengekspor...' : 'Export Data'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {getSessions().length > 0 ? (
          <div className="space-y-6">
            <div className="text-gray-700">
              <p className="font-medium">
                Ditemukan {getSessions().length} sesi yang telah dilakukan
              </p>
            </div>
            
            <div className="grid gap-6">
              {getSessions().map((session: any) => (
                <SessionRekapCard
                  key={session.session_id}
                  session={session}
                  questionType={getKuesionerInfo()?.question_type || ''}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center bg-white rounded-lg shadow p-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Sesi</h3>
            <p className="text-gray-500 mb-4">
              Kuesioner ini belum pernah dijalankan. Mulai sesi pertama untuk melihat rekap data.
            </p>
            <button
              onClick={() => router.push(`/kuesioner/${kuesioner_id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Mulai Kuesioner
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KuesionerRekap;