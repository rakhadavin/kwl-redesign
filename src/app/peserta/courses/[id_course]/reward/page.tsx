"use client";
import RewardCard from "@/app/components/rewards/RewardCard";
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useGetAuthByStudentIdAndCourseId } from "@/app/lib/peserta/useCourses";
import DetailReward from "@/app/components/message/DetailReward";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

export default function RewardPage() {
  // TODO: separate claimed and not
  const id = useParams().id_course;
  const router = useRouter();
  const { data, status } = useGetAuthByStudentIdAndCourseId(
    `/api/course/reward/redeem/${id}/`,
    "reward"
  );
  const { data: point, status: point_status } = useGetAuthByStudentIdAndCourseId(
    `/api/course/student-point/${id}/`,
    "course"
  );
  const { data: session, status: session_status } = useSession();
  const { data: history, status: history_status } =
    useGetAuthByStudentIdAndCourseId(
      `/api/course/redeem/history/${id}/`,
      "history"
    );
  console.log(history);

  return (
    <main className="p-5">
      <Breadcrumb variant="light" items={[
        { label: "Beranda", href: "/peserta" },
        { label: "Kursus", href: `/peserta/courses/${id}` },
        { label: "Rewards" },
      ]} />
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 ml-5 text-main hover:opacity-80 cursor-pointer"
          onClick={router.back}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        <h1 className="flex-1 text-main font-bold text-2xl text-center">
          Rewards
        </h1>
      </div>

      <div className="p-8 flex flex-wrap items-center justify-center ">
        <div
          id="tukar-box"
          className="p-8 mb-8 text-center overflow-y-auto scrollbar-thin h-[540px] w-96 w-[90%] md:w-[70%] lg:w-[400px] relative bg-white rounded-lg shadow"
        >
          <h1 className="font-bold m-4 text-lg">Tukar</h1>

          {status === "pending" && session_status === "loading" ? null : data &&
            data.length > 0 ? (
            data.map(
              (
                reward: {
                  id: number;
                  name: string;
                  point: string;
                  expired_date: string;
                  stock: string;
                  detail_instruction: string;
                  redeemed: boolean;
                },
                index: number
              ) => (
                <div key={index}>
                  <RewardCard
                    nama={reward.name}
                    harga={reward.point}
                    tanggal={reward.expired_date}
                    stok={reward.stock}
                    detail={reward.detail_instruction}
                    rewardId={reward.id}
                    courseId={`${id}`}
                    isClaimed={reward.redeemed}
                    studentId={
                      session?.userinfo?.role_pk ? session.userinfo.role_pk : 0
                    }
                  />
                </div>
              )
            )
          ) : (
            <div>No rewards</div>
          )}
        </div>

        <div id="divider" className="mb-8 mx-8 flex flex-col text-center">
          <span className="font-bold text-xl"> Poin Kamu </span>
          <div
            id="poin"
            className="bg-dark-accent font-bold text-2xl text-white rounded-lg p-2 my-4 mx-12"
          >
            {" "}
            {point?.total_point}{" "}
          </div>
          <img src="/koko-reward.png" width="200" />
        </div>

        <div
          id="riwayat-box"
          className="mb-8 p-8 text-center overflow-y-auto scrollbar-thin h-[540px] w-96 w-[90%] md:w-[70%] lg:w-[400px] relative bg-white rounded-lg shadow"
        >
          <h1 className="font-bold m-4 text-lg">Riwayat</h1>

          {history_status === "pending" ? null : history &&
            history.length > 0 ? (
            history.map(
              (
                item: {
                  reward_item: {
                    id: number;
                    name: string;
                    point: string;
                    expired_date: string;
                    stock: string;
                    detail_instruction: string;
                  };
                  id: number;
                },
                index: number
              ) => (
                <div key={index}>
                  <RewardCard
                    nama={item.reward_item.name}
                    harga={item.reward_item.point}
                    tanggal={item.reward_item.expired_date}
                    stok={item.reward_item.stock}
                    detail={item.reward_item.detail_instruction}
                    rewardId={item.reward_item.id}
                    courseId={`${id}`}
                    isClaimed={true}
                    studentId={
                      session?.userinfo?.role_pk ? session.userinfo.role_pk : 0
                    }
                  />
                </div>
              )
            )
          ) : (
            <div>No rewards</div>
          )}
        </div>
      </div>
      <DetailReward />
    </main>
  );
}
