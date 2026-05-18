"use client";

import SearchBar from "../../../components/button/SearchBar";
import AddCourseButton from "../../../components/button/AddCourseButton";
import RewardsCard from "../../../components/card/RewardCard";
import AddRewardsForms from "../../../components/forms/AddRewardsForms";
import DeleteRewardConfirmation from "@/app/components/message/DeleteRewardConfirmation";
import DetailReward from "@/app/components/message/DetailReward";
import EditRewardsForms from "@/app/components/forms/EditRewardsForms";
import RewardContainer from "@/app/components/card/RewardContainer";
import { useParams, useRouter } from "next/navigation";
import { useGetAuth } from "@/app/lib/api/useAuth";

export default function RewardPage() {
  const params = useParams();
  const router = useRouter();

  const { data } = useGetAuth(
    `/api/course/${params.id_course}`,
    "course reward"
  );

  return (
    <main className="py-5">
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="hidden sm:block w-6 h-6 ml-5 text-main hover:opacity-80 cursor-pointer"
          onClick={router.back}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <h1 className="flex-1 pb-5 text-main font-bold text-2xl text-center">
          Rewards - {data && data["full_name"]}
        </h1>
      </div>

      <h2 className="py-5 text-black font-bold text-xl text-center">
        Penukaran
      </h2>

      <RewardContainer />
      {/* <RewardsCard /> */}
      <AddRewardsForms />
      <DeleteRewardConfirmation />
      <DetailReward />
      <EditRewardsForms />
      <AddCourseButton add="rewards" />
    </main>
  );
}
