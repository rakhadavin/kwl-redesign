"use client";
import React from "react";
import MicroButton from "../button/peserta/MicroButton";
import { useSession } from "next-auth/react";
import { usePostAuth, usePutAuth } from "@/app/lib/api/useAuth";
import useDetailReward from "@/app/hooks/useDetailReward";

interface RewardCardProps {
  nama: string;
  harga: string;
  tanggal: string;
  stok: string;
  detail: string;
  isClaimed: boolean;
  rewardId: number;
  courseId: string;
  studentId: number;
}

type Redeem = {
  course_id: string;
  reward_id: number;
  student_id: number;
};

const RewardCard: React.FC<RewardCardProps> = ({
  nama,
  harga,
  tanggal,
  stok,
  detail,
  isClaimed,
  rewardId,
  courseId,
  studentId,
}) => {
  const detailReward = useDetailReward();
  const mutation = usePostAuth("/api/course/redeem", "claim");

  const handleButtonClicked = (option: string) => {
    if (isClaimed) {
      detailReward.open(rewardId, detail);
    } else {
      const redeem: Redeem = {
        course_id: courseId,
        reward_id: rewardId,
        student_id: studentId,
      };

      mutation.mutate({ body: redeem },
        {
          onSuccess: () => {
            window.location.reload();
          },
        }
      );
 
    }
  };

  return (
    <div
      id="card-reward"
      className="mt-4 px-4 py-8 flex overflow-hidden bg-white rounded-lg shadow"
    >
      <div className="w-2/3 flex flex-col text-left">
        <span id="nama-reward" className="font-bold text-sm">
          {nama}
        </span>
        <span id="harga-reward" className="font-bold text-3xl">
          {harga}
        </span>
        <span className="text-sm">Poin</span>
        <span id="date" className="text-xs text-gray-300">
          {tanggal}
        </span>
      </div>

      <div className="w-1/3 flex flex-col text-center">
        <div className={`flex flex-wrap mb-6 ${isClaimed ? "invisible" : ""}`}>
          <span className="text-xs p-1">Kuota:</span>
          <div
            id="kuota"
            className="text-xs px-2 py-1 border-2 rounded-lg bg-gray-100 border-indigo-900 text-indigo-900 font-bold"
          >
            {stok}
          </div>
        </div>

        <MicroButton
          name={isClaimed ? "Detail" : "Tukar"}
          colour={isClaimed ? "bg-dark-accent" : "bg-indigo-900"}
          detail={detail}
          onClick={handleButtonClicked}
        />
      </div>
    </div>
  );
};

export default RewardCard;
