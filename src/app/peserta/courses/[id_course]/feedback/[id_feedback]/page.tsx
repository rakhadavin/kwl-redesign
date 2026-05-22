'use client'
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";
import { useParams, useRouter } from "next/navigation";

export default function FeedbackDetailPage() {
    const params = useParams()
    const { data } = useGetObjects(`/api/course/feedback/${params.id_feedback}`,"get a detail feedback")   
    const router = useRouter();
    return(
        // duplicable = buttons
        <main>
            <Breadcrumb variant="light" items={[
              { label: "Beranda", href: "/peserta" },
              { label: "Kursus", href: "/peserta/mycourses" },
              { label: "Feedback", href: `/peserta/courses/${params.id_course}/feedback` },
              { label: "Detail" },
            ]} />
            <div className="pt-5 flex flex-col items-center justify-center">
                <div className="w-[90%] md:w-[70%] lg:w-[400px]">
                    <img src="/kowl-class-1.png"/>
                </div>

                <h1 className="font-bold text-lg m-8">Feedback</h1>

                <div className="mb-20 w-[90%] md:w-[70%] lg:w-[760px]">
                    <span id="feedback-content">
                        {data?.feedback}
                    </span>
                </div>

                <button onClick={
                    () => router.back()
                }>
                    <div className="text-sm mb-16 p-1 w-[97%] md:w-[95%] lg:w-[240px] bg-white border-2 rounded-lg border-indigo-900 text-indigo-900 font-bold">

                        kembali
                    </div>
                </button>
            </div>
        </main>
    );
}