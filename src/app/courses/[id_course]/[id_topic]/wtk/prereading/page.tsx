"use client";
import MiniButton from "@/app/components/button/peserta/MiniButton";
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { useParams, usePathname } from "next/navigation";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function PreReadingPage() {
  const pathname = usePathname();
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;

  const course = useGetObjects(`/api/course/${id_course}`, "course");
  const topic = useGetObjects(`/api/course/topic/${id_topic}`, "topic");
  const { data } = useGetObjects(`/api/wtk/preread/${id_topic}`, "wtk");

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const file = `${BASE_URL}${data?.file}`;

  const wtk = topic.data?.wtk[0];

  const getUrl = () => {
    if (wtk?.type === "reflection") {
      return `/peserta/courses/${id_course}/${id_topic}/kwl/want_to_know/reflection/${wtk?.id}`;
    } else if (wtk?.type === "checkbox") {
      return `/peserta/courses/${id_course}/${id_topic}/kwl/want_to_know/checkbox/${wtk?.id}`;
    } else {
      return "/peserta/unavailable";
    }
  };

  const url = getUrl();

  const goBack = () => {
    window.history.back();
  };

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-scroll min-h-screen">
      <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: course?.data?.short_name ?? "...", href: `/courses/${id_course}` }, { label: topic?.data?.name ?? "..." }, { label: "WTK" }, { label: "Pre-Reading" }]} />
      <div className="mx-auto m-4 text-center bg-white p-8 h-auto w-96 w-[90%] md:w-[80%] lg:w-[800px] rounded-lg shadow justify-center">
        <h3 className="mt-4 text-sm">
          <span className="font-bold">
            {course.data?.short_name} &nbsp; : &nbsp;{" "}
          </span>
          <span>{topic.data?.name}</span>
        </h3>

        <h1 className="font-bold text-lg mt-8">Want to Know</h1>
        <h2 className="text-lg">Pre-reading Material</h2>

        <p className="mt-8 mx-8">{data?.prereading}</p>

        <br></br>
        <a className="text-indigo-900" href={file}>
          Get file here
        </a>

        <div className="flex text-center justify-center mt-16">
          <button
            onClick={goBack}
            className="text-xs text-white font-bold w-[120px] p-1 mt-4 shadow text-center bg-yellow-400 rounded"
          >
            kembali
          </button>

          {/* <MiniButton
            description="Selanjutnya"
            color="bg-green-500"
            url={url}
          /> */}
        </div>
      </div>
    </main>
  );
}
