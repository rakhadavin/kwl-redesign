"use client";

import { useGetAuthByStudentIdAndCourseId } from "@/app/lib/peserta/useCourses";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function CalculatePoin() {
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;
  const pathname = usePathname().split("/").slice(0, 5).join("/");
  const router = useRouter();
  const { data } = useGetAuthByStudentIdAndCourseId(
    `/api/course/kwl-point/${id_topic}/`,
    "poin"
  );

  console.log(pathname)


  return (
    <main className="py-5 text-center bg-[url('/bg-star.png')] bg-scroll min-h-screen">
      <div className="flex flex-col gap-4 items-center text-center justify-center py-16">
        <div className="flex flex-col bg-white rounded-3xl shadow py-12 px-16 items-center relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="black"
            className="w-14 h-14 hover:opacity-80 cursor-pointer absolute top-0 left-0 p-4"
            onClick={() => router.back()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <h1 className="text-xl font-extrabold">Selamat!</h1>
          <h2 className="text-sm" id="poin-know">
            Mari hitung total poinmu
          </h2>

          <div className="my-4 flex flex-col">
            <div className="py-2 inline-flex text-left items-center shadow rounded-lg">
              <img src="/know.png" width="54" />
              <div className="px-4">
                <h1 className="text-lg font-extrabold">Know</h1>
                <h2 id="poin-know">{data?.know_score}</h2>
              </div>
            </div>

            <div className="py-2 inline-flex text-left items-center shadow rounded-lg">
              <img src="/wtk.png" width="54" />
              <div className="px-4">
                <h1 className="text-lg font-extrabold">Want to Know</h1>
                <h2 id="poin-wtk">{data?.wtk_score}</h2>
              </div>
            </div>

            <div className="py-2 inline-flex text-left items-center shadow rounded-lg">
              <img src="/learned.png" width="54" />
              <div className="px-4">
                <h1 className="text-lg font-extrabold">Learned</h1>
                <h2 id="poin-learned">{data?.learned_score}</h2>
              </div>
            </div>
          </div>


          <button className="w-[160px] p-1 mt-4 shadow text-center bg-green-500 rounded">
            <a
              href={`/peserta/courses/${id_course}`}
              className="text-xs text-white font-bold"
            >
              back to course
            </a>
          </button>

  
          
        </div>

        <div>
        <Link href={`${pathname}/analisis/detail_submisi`}>
              <div className="text-right">
                <div className="m-2 shadow inline-flex bg-white rounded-l shadow">
                  <img src="/submission_button/orange.png" width="50" />
                  <button className="w-64 h-12 px-3.5 ps-10 text-dark-accent font-bold shadow">
                    Analisis Submisi
                  </button>
                  <img src="/submission_button/kowl-orange.png" width="50" />
                </div>
              </div>
            </Link>
        </div>

      </div>
    </main>
  );
}
