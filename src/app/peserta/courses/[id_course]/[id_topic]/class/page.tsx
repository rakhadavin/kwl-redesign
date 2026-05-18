"use client";

import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { useParams, useRouter } from "next/navigation";

export default function ClassTransitionPage() {

    const params = useParams();
    const id_course = params.id_course;
    const id_topic = params.id_topic;
    const router = useRouter()
    const {data, status} = useGetObjects(`/api/course/topic/${id_topic}`,"topic");

    const learned = data?.learned[0];

    const getUrl = (learned: any) => {      
        if(learned?.type === "reflection"){
            return `/peserta/courses/${id_course}/${id_topic}/kwl/learned/reflection/${learned?.id}`
        }
        else if(learned?.type === "quiz"){
            return `/peserta/courses/${id_course}/${id_topic}/kwl/learned/quiz/${learned?.id}`
        }
        else{
            return"/peserta/unavailable"
        }
    }

    //const url = getUrl();

    return(
        <main>

            <div className="pt-5 flex flex-col items-center justify-center">

                <div className="w-[90%] md:w-[70%] lg:w-[400px]">
                    <img src="/kowl-class-1.png"/>
                </div>

                <h1 className="font-bold text-lg mt-6 m-2">Saatnya Kelas</h1>
                <span className="mx-4">Setelah sesi kelas, kamu bisa lanjut ke tahap berikutnya!</span>

                <div id="button-container" className="flex m-12">

                    <a href={`/peserta/courses/${id_course}`}>
                        <button className="flex bg-white rounded overflow-hidden shadow text-left m-4">
                        
                            <div className="w-[54px] bg-indigo-900 p-2 hidden md:block">
                                <img src="/refleksi.png"/>
                            </div>
                            <div className="flex flex-col p-2 mt-1">
                                <span className="font-bold text-xs">Back to Course</span>
                                <span className="text-xs">Kembali ke halaman course</span>
                            </div>
                        </button>
                    </a>

                    
                        <button onClick={() => router.push(getUrl(learned))} disabled={(learned === undefined)? true : false} className="flex bg-white rounded overflow-hidden shadow text-left m-4">

                            <div className={`w-[54px] ${(learned === undefined)? "" : "bg-indigo-900"} p-2 hidden md:block`}>
                                <img className={`${(learned === undefined)? "hidden" : ""}`} src="/learned.png"/>
                            </div>
                            <div className="flex flex-col p-2 mt-1">
                                <span className="font-bold text-xs">
                                    {`${(learned === undefined)? "Loading..." : "Continue to Learned"}`}
                                </span>
                                <span className="text-xs">
                                    {`${(learned === undefined)? "Halaman sedang diproses" : "Lanjut ke halaman learned"}`}
                                </span>
                            </div>

                        </button >


                </div>

            </div>

        </main>
    );
}