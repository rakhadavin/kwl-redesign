"use client";

import React from "react";
import useDeleteRewardConfirmation from "@/app/hooks/useDeleteRewardsConfirmation";
import useSuccessDeleteReward from "@/app/hooks/useSuccessDeleteReward";
import useDetailReward from "@/app/hooks/useDetailReward";
import useEditRewardForms from "@/app/hooks/useEditRewardForms";

import { useDeleteAuth } from "@/app/lib/api/useAuth";

interface RewardCardProps {
  rewardId: number;
  reward: string;
  quota: number;
  expired: string;
  point: number;
  detail_instruction: string;
}

const RewardCard: React.FC<RewardCardProps> = ({
  rewardId,
  reward,
  quota,
  expired,
  point,
  detail_instruction,
}) => {
  const deleteRewardConfirmation = useDeleteRewardConfirmation();
  const successDeleteReward = useSuccessDeleteReward();
  const detailReward = useDetailReward();
  const editRewardsForms = useEditRewardForms();

  const { mutate } = useDeleteAuth(
    `/api/course/reward/${rewardId}`,
    "delete reward"
  );

  const handleDelete = () => {
    mutate({
      onSuccess: () => {
      },
      onError: () => {
      },
    });
    successDeleteReward.open();
  };

  return (
    <div className="flex items-center justify-center py-5 flex wrap">
      <div className="h-auto w-96 w-[90%] md:w-[80%] lg:w-[500px] relative bg-white rounded-lg shadow ">
        <div className="py-5 px-8 flex flex-col">
          <div className="flex justify-between">
            <p className="text-black text-base font-bold">{reward}</p>
            <div className="flex justify-end items-center">
              <div className="w-28 h-8 justify-start items-center gap-1.5 inline-flex mr-8">
                <div className="text-black text-base font-light ">Kuota:</div>
                <div className="w-12 h-8 relative">
                  <div className="w-12 h-8 left-0 top-0 absolute bg-zinc-100 rounded-lg border border-blue-900" />
                  <div className="w-7 h-3.5 left-[9.5px] top-[5px] absolute text-center text-slate-900 text-base font-bold ">
                    {quota}
                  </div>
                </div>
              </div>
              {/* trash */}
              <svg
                onClick={() => {
                  deleteRewardConfirmation.open(rewardId, () => handleDelete());
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5hover:opacity-80 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </div>

          <span className="text-black text-5xl font-bold ">{point}</span>
          <span className="text-black text-sm font-normal ">poin</span>
          <div className="flex justify-between items-center">
            <span className="text-grey text-sm font-extralight">{expired}</span>

            <div className="flex">
              <button
                className="mb-2 w-28 h-8 bg-dark-accent border-2 border-white hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl"
                onClick={() => {
                  detailReward.open(rewardId, detail_instruction);
                }}
              >
                Detail
              </button>
              <button
                className="mb-2 w-28 h-8 bg-main border-2 border-white hover:bg-white hover:text-main hover:border-main text-white font-bold text-xs py-2 px-2 rounded-xl"
                onClick={() => {
                  editRewardsForms.open(rewardId);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
