"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface KWLItem {
  id: number;
  type: string;
}

interface TopicData {
  id: number;
  name: string;
  know?: KWLItem[];
  wtk?: KWLItem[];
  learned?: KWLItem[];
}

interface Topic {
  topic_data: TopicData;
  kwl_data: { kwl_status: string } | "kosong";
}

interface KWLQuestionTopicProps {
  topic: Topic | null;
}

interface KWLButtonProps {
  label: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  href: string | null;
}

function KWLButton({ label, badge, badgeColor, accentColor, href }: KWLButtonProps) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-lg border-l-4 ${accentColor} bg-white shadow-sm ${href ? "" : "opacity-50"}`}>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm text-gray-800">{label}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${badgeColor}`}>
          {badge}
        </span>
      </div>
      {href ? (
        <Link href={href}>
          <button className="text-xs font-bold px-3 py-1 rounded-lg bg-main text-white hover:opacity-80 transition-opacity">
            Kerjakan
          </button>
        </Link>
      ) : (
        <button disabled className="text-xs font-bold px-3 py-1 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed">
          Kerjakan
        </button>
      )}
    </div>
  );
}

const KWLQuestionTopic: React.FC<KWLQuestionTopicProps> = ({ topic }) => {
  const { id_course } = useParams<{ id_course: string }>();

  if (!topic) {
    return (
      <div className="rounded-lg px-7 py-4 h-full w-full bg-gray-100 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-gray-400 text-sm">Pilih topik untuk melihat pertanyaan KWL</p>
      </div>
    );
  }

  const topicId = topic.topic_data.id;

  if (
    topic.topic_data.know === undefined ||
    topic.topic_data.wtk === undefined ||
    topic.topic_data.learned === undefined
  ) {
    return (
      <div className="rounded-lg px-7 py-4 h-full w-full bg-gray-100 flex flex-col items-center justify-center min-h-[300px] gap-3">
        <svg className="animate-spin w-6 h-6 text-main" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-gray-400 text-sm">Memuat pertanyaan KWL...</p>
      </div>
    );
  }

  const know    = topic.topic_data.know[0]    ?? null;
  const wtk     = topic.topic_data.wtk[0]     ?? null;
  const learned = topic.topic_data.learned[0] ?? null;

  const knowHref = know
    ? know.type === "reflection"
      ? `/peserta/courses/${id_course}/${topicId}/kwl/know/reflection/${know.id}`
      : `/peserta/courses/${id_course}/${topicId}/kwl/know/quiz/${know.id}`
    : null;

  const wtkHref = wtk
    ? `/peserta/courses/${id_course}/${topicId}/kwl/want_to_know/pre_reading`
    : null;

  const learnedHref = learned
    ? learned.type === "reflection"
      ? `/peserta/courses/${id_course}/${topicId}/kwl/learned/reflection/${learned.id}`
      : `/peserta/courses/${id_course}/${topicId}/kwl/learned/quiz/${learned.id}`
    : null;

  const knowBadge    = know    ? (know.type    === "reflection" ? "Essay"    : "Quiz")     : "Belum ada";
  const wtkBadge     = wtk     ? (wtk.type     === "reflection" ? "Essay"    : "Checkbox") : "Belum ada";
  const learnedBadge = learned ? (learned.type === "reflection" ? "Essay"    : "Quiz")     : "Belum ada";

  return (
    <div className="rounded-lg px-7 py-4 h-full w-full bg-gray-100 flex flex-col gap-4">
      <div>
        <h1 className="text-main font-bold uppercase text-xl">Pertanyaan Topic</h1>
        <p className="text-gray-400 text-sm">
          Selamat mengerjakan pertanyaan KWL untuk topik -{" "}
          <span className="font-semibold text-gray-600">{topic.topic_data.name}</span>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {know && (
          <KWLButton
            label="Know"
            badge={knowBadge}
            badgeColor="bg-blue-100 text-blue-600"
            accentColor="border-orange-400"
            href={knowHref}
          />
        )}
        {wtk && (
          <KWLButton
            label="Want to Know"
            badge={wtkBadge}
            badgeColor="bg-indigo-100 text-indigo-600"
            accentColor="border-indigo-400"
            href={wtkHref}
          />
        )}
        {learned && (
          <KWLButton
            label="Learned"
            badge={learnedBadge}
            badgeColor="bg-pink-100 text-pink-600"
            accentColor="border-pink-400"
            href={learnedHref}
          />
        )}
        {!know && !wtk && !learned && (
          <p className="text-gray-400 text-sm text-center py-4">Belum ada pertanyaan KWL untuk topik ini.</p>
        )}
      </div>
    </div>
  );
};

export default KWLQuestionTopic;
