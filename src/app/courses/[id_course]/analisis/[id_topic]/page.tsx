"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useGetAuth } from "@/app/lib/api/useAuth";
import Link from "next/link";
import LadderCard from "@/app/components/card/LadderCard";
import BarChartParent from "@/app/components/chart/BarChart";
import TableProgressParticipant from "@/app/components/courseDetail/TableProgressParticipant";

interface ParticipationCardProps {
  title: string;
  percentage: string;
  count: string;
  totalParticipants: string;
  textColor: string;
}

const ParticipationCard: React.FC<ParticipationCardProps> = ({
  title,
  percentage,
  count,
  totalParticipants,
  textColor,
}) => (
  <div className="w-full md:w-1/3 h-52 flex flex-col justify-around items-center bg-white mx-2 my-2 rounded border-b">
    <header className="flex items-center rounded-t justify-center relative border-b">
      <p className="py-2 text-dark-accent font-bold text-sm">{title}</p>
    </header>
    <p className={`pt-5 ${textColor} font-bold font-medium text-5xl`}>
      {percentage}
    </p>
    <p className="pb-8 font-medium text-xl">
      {count}/{totalParticipants}
    </p>
  </div>
);

interface UserPerformanceProps {
  title: string;
  users: string[];
}

const UserPerformance: React.FC<UserPerformanceProps> = ({ title, users }) => (
  <section className="flex flex-col items-center px-4 py-7 bg-white rounded-lg shadow-sm max-md:px-5">
    <header className="text-xl font-bold text-center">{title}</header>
    <div className="shrink-0 mt-3.5 h-px bg-zinc-100 w-[217px]" />
    <div className="flex flex-col justify-center self-stretch mt-5 text-sm">
      {users.map((user, index) => (
        <div
          key={index}
          className="justify-center p-2.5 mt-8 bg-white rounded-lg border border-solid border-neutral-400"
        >
          {user}
        </div>
      ))}
    </div>
  </section>
);

const AnalyzeTopicPage: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const { data: topic } = useGetAuth(
    `/api/course/topic/${params.id_topic}`,
    "topic info"
  );

  const { data: kwlParticipant } = useGetAuth(
    `/api/analysis/kwl-participants/${params.id_topic}`,
    "kwl-participant know"
  );

  const { data: ladder } = useGetAuth(
    `/api/analysis/topic-ladder/${params.id_topic}/4`,
    "ladder"
  );

  return (
    <main className="px-2 py-5 flex flex-col bg-cover bg-scroll bg-dark-accent min-h-screen">
      <div className="flex flex-row mb-5 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="white"
          className="w-6 h-6 ml-5 hover:opacity-80 cursor-pointer sm:ml-0"
          onClick={router.back}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <div className="flex-1 text-center">
          <h1 className="text-white font-bold text-2xl">
            {topic?.course_data?.full_name}
          </h1>
          <h2 className="text-white text-l">{topic?.name}</h2>
        </div>
      </div>
      <TableProgressParticipant/>
      <div className="py-5 flex flex-row justify-center items-center flex-wrap">
        <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-4/5 lg:w-5/6 bg-zinc-100 shadow rounded">
          <ParticipationCard
            title="Partisipasi Know"
            percentage={kwlParticipant?.know?.percentage ?? "N/A"}
            count={kwlParticipant?.know?.total_participants ?? "0"}
            totalParticipants={kwlParticipant?.total_students_enrolled ?? "0"}
            textColor="text-teal-500"
          />
          <ParticipationCard
            title="Partisipasi Want to Know"
            percentage={kwlParticipant?.wtk?.percentage ?? "N/A"}
            count={kwlParticipant?.wtk?.total_participants ?? "0"}
            totalParticipants={kwlParticipant?.total_students_enrolled ?? "0"}
            textColor="text-pink-400"
          />
          <ParticipationCard
            title="Partisipasi Learned"
            percentage={kwlParticipant?.learned?.percentage ?? "N/A"}
            count={kwlParticipant?.learned?.total_participants ?? "0"}
            totalParticipants={kwlParticipant?.total_students_enrolled ?? "0"}
            textColor="text-orange-500"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center w-full">
        <div className="flex flex-col w-full md:w-1/2 justify-center items-center gap-5">
          <div className="flex flex-col text-white text-center">
            <h3 className="font-bold">Performa Asesmen</h3>
            <p className="text-sm">
              Performa bisa dilihat untuk tipe soal pilihan ganda.
              <br />
              Detail dari jawaban tersedia di halaman analiisa submission.
            </p>
          </div>
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="w-full flex justify-center items-center">
              <div className="p-5 bg-white rounded-lg w-full md:w-4/5">
                <div className="flex items-center">
                  <img className="w-12 h-12" src="/know.png" alt="Know Icon" />
                  <div className="ml-4 text-start">
                    <span className="text-lulu-yellow text-xl font-bold">
                      KNOW
                      <br />
                    </span>
                    <span className="text-black text-sm">
                      Jumlah peserta yang menjawab dengan benar
                    </span>
                  </div>
                </div>
                <div className="flex flex-grow justify-center w-full">
                  {topic?.know?.[0]?.type === "quiz" && (
                    <div className="w-full">
                      <BarChartParent
                        topic_id={params.id_topic as string}
                        type="know"
                      />
                    </div>
                  )}
                  {topic?.know?.[0]?.type === "reflection" && (
                    <div className="w-full">
                      <div className="mx-auto py-4 text-center text-black text-4xl md:text-8xl font-bold">
                        N/A
                      </div>
                      <div className="mx-auto text-center text-sm">
                        <span>Tipe soal</span>
                        <span className="font-bold"> refleksi </span>
                        <span>
                          memberikan poin secara penuh.
                          <br />
                          Anda bisa mengakses jawaban peserta dan memberi
                          feedback di halaman
                        </span>
                        <span className="font-bold">
                          performa individu peserta.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="p-5 bg-white rounded-lg w-full md:w-4/5">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12"
                    src="/learned.png"
                    alt="Learned Icon"
                  />
                  <div className="ml-4 text-start">
                    <span className="text-lulu-yellow text-xl font-bold">
                      LEARNED
                      <br />
                    </span>
                    <span className="text-black text-sm">
                      Jumlah peserta yang menjawab dengan benar
                    </span>
                  </div>
                </div>
                <div className="flex flex-grow justify-center w-full">
                  {topic?.learned?.[0]?.type === "quiz" && (
                    <div className="w-full">
                      <BarChartParent
                        topic_id={params.id_topic as string}
                        type="learned"
                      />
                    </div>
                  )}
                  {topic?.learned?.[0]?.type === "reflection" && (
                    <div className="w-full">
                      <div className="mx-auto py-4 text-center text-black text-4xl md:text-8xl font-bold">
                        N/A
                      </div>
                      <div className="mx-auto text-center text-sm">
                        <span>Tipe soal</span>
                        <span className="font-bold"> refleksi </span>
                        <span>
                          memberikan poin secara penuh.
                          <br />
                          Anda bisa mengakses jawaban peserta dan memberi
                          feedback di halaman 
                        </span>
                        <span className="font-bold">
                          performa individu peserta.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 justify-center items-center gap-5">
          <div className="flex flex-col items-center">
            <Link href={`${pathname}/submisi_individu`} className="w-full">
              <div>
                <div className="m-2 shadow inline-flex bg-white rounded-l shadow">
                  <img
                    src="/performance_button/yellow.png"
                    width="50"
                    alt="yellow button icon"
                  />
                  <button className="w-64 h-12 px-3.5 ps-10 text-dark-accent font-bold shadow">
                    Lihat Performa Individu
                  </button>
                  <img
                    src="/performance_button/koko.png"
                    width="50"
                    alt="koko button icon"
                  />
                </div>
              </div>
            </Link>
            <Link href={`${pathname}/detail_submisi`} className="w-full">
              <div>
                <div className="m-2 shadow inline-flex bg-white rounded-l shadow">
                  <img
                    src="/submission_button/orange.png"
                    width="50"
                    alt="orange button icon"
                  />
                  <button className="w-64 h-12 px-3.5 ps-10 text-dark-accent font-bold shadow">
                    Analisis Submisi
                  </button>
                  <img
                    src="/submission_button/kowl-orange.png"
                    width="50"
                    alt="orange button icon"
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-center w-[70%]">
            <div className="flex flex-col shrink sm:w-[80%] md:w-[70%] lg:w-[70%] gap-5">
              <div className="p-5 bg-white rounded-lg text-center">
                <header className="flex items-center rounded-t justify-center border-b">
                  <span className="text-black text-xl font-bold items-center">
                    Pencapai Poin Tertinggi
                  </span>
                </header>
                <div className="flex-col justify-center items-center gap-8 inline-flex w-full">
                  {ladder?.highest?.map((data: any, index: number) => (
                    <LadderCard
                      fullname={data?.student}
                      score={data?.total_point}
                      key={index}
                    />
                  ))}
                </div>
              </div>
              <div className="p-5 bg-white rounded-lg text-center">
                <header>
                  <span className="text-black text-xl font-bold items-center">
                    Pencapai Poin Terendah
                  </span>
                </header>
                <div className="flex-col justify-center items-center gap-8 inline-flex w-full">
                  {ladder?.lowest?.map((data: any, index: number) => (
                    <LadderCard
                      fullname={data?.student}
                      score={data?.total_point}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnalyzeTopicPage;