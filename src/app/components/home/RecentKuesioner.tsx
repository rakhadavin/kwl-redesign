"use client";

import { useGetAuth } from "../../lib/api/useAuth";
import { useSession } from "next-auth/react";
import Link from "next/link";

const TYPE_COLORS: Record<string, string> = {
  "Open Ended":      "bg-gray-100 text-gray-700",
  "Multiple Choice": "bg-gray-100 text-gray-700",
  "Polling":         "bg-gray-100 text-gray-700",
};

const FALLBACK_COLORS = ["#FFC453", "#FF84A6", "#2E3A87", "#FF6B35", "#4DB6AC"];

export default function RecentKuesioner() {
  const { data: session, status } = useSession();

  const { data: kuesionerData, isLoading } = useGetAuth(
    "/api/kuesioner/",
    "recent-kuesioner",
    false,
    status === "authenticated",
  );

  const items = (kuesionerData?.data ?? kuesionerData ?? []).slice(0, 5);

  if (isLoading) {
    return (
      <div className="bg-indigo-50 rounded-2xl p-6">
        <h2 className="text-xl font-extrabold text-center mb-6 tracking-wide">5 RECENT KUESIONER</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex gap-3 bg-white rounded-2xl overflow-hidden h-20">
              <div className="w-28 bg-gray-200 shrink-0" />
              <div className="flex-1 p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50 rounded-2xl p-6">
      <h2 className="text-xl font-extrabold text-center mb-6 tracking-wide text-gray-800">
        {items.length} RECENT KUESIONER
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="font-medium">Belum ada kuesioner yang dibuat</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((k: any, idx: number) => (
            <div key={k.id ?? idx}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex items-stretch"
            >
              {/* color block */}
              <div
                className="w-28 shrink-0"
                style={{ backgroundColor: k.color ?? FALLBACK_COLORS[idx % FALLBACK_COLORS.length] }}
              />
              {/* info */}
              <div className="flex-1 px-4 py-3 min-w-0">
                <h3 className="font-bold text-sm text-gray-900 truncate">{k.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{k.description}</p>
              </div>
              {/* type badge */}
              <div className="flex items-center pr-4 shrink-0">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${TYPE_COLORS[k.question_type] ?? "bg-gray-100 text-gray-600"}`}>
                  {k.question_type || k.type || "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/kuesioner" className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold text-sm transition-colors">
          Lihat Kuesioner Saya
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}