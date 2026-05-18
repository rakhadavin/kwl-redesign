"use client";

import { useGetAuth } from "@/app/lib/api/useAuth";

/**
 * Custom hook untuk mengambil data rekap semua sesi kuesioner
 */
export const useSessionRecap = (
  kuesioner_id: string,
  enabled: boolean = true
) => {
  return useGetAuth(
    `/api/kuesioner/${kuesioner_id}/session-recap/`,
    `session-recap-${kuesioner_id}`,
    false, // fetchOnce = false untuk memungkinkan refresh
    enabled && !!kuesioner_id
  );
};

/**
 * Custom hook untuk mengambil detail satu sesi spesifik
 */
export const useDetailedSessionRecap = (
  kuesioner_id: string,
  session_id: string,
  enabled: boolean = true
) => {
  return useGetAuth(
    `/api/kuesioner/${kuesioner_id}/session-recap/${session_id}/`,
    `session-detail-${session_id}`,
    false, // fetchOnce = false untuk memungkinkan refresh
    enabled && !!(kuesioner_id && session_id)
  );
};

/**
 * Hook untuk export data sessions (tidak menggunakan query karena ini download action)
 */
export const useExportSessionData = () => {
  const exportSessions = async (
    kuesioner_id: string,
    session_token: string,
    kuesioner_title?: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/kuesioner/${kuesioner_id}/export-sessions/`,
        {
          headers: {
            Authorization: `Bearer ${session_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      const data = await response.json();

      if (data.success && data.export_data) {
        // Create and download file
        const blob = new Blob([JSON.stringify(data.export_data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `kuesioner_sessions_${
          kuesioner_title || "export"
        }_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return { success: true };
      } else {
        throw new Error(data.error || "Export failed");
      }
    } catch (error) {
      console.error("Export failed:", error);
      throw error;
    }
  };

  return { exportSessions };
};

/**
 * Hook gabungan untuk semua operasi session recap
 * Menyediakan data dan fungsi export dalam satu hook
 */
export const useSessionRekapManager = (kuesioner_id: string) => {
  const sessionRekapQuery = useSessionRecap(kuesioner_id);
  const { exportSessions } = useExportSessionData();

  return {
    // Data dan status query
    data: sessionRekapQuery.data,
    isLoading: sessionRekapQuery.isLoading,
    error: sessionRekapQuery.error,
    refetch: sessionRekapQuery.refetch,

    // Export function
    exportSessions,

    // Helper functions
    getTotalSessions: () => sessionRekapQuery.data?.total_sessions || 0,
    getKuesionerInfo: () => sessionRekapQuery.data?.kuesioner || null,
    getSessions: () => sessionRekapQuery.data?.sessions || [],
  };
};
