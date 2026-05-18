"use client";

import React from "react";
import useEditPGKnowForms from "@/app/hooks/useEditPGknowForms";
import useEditEssayKnowForms from "@/app/hooks/useEditEssayKnowForms";
import useEditCheckboxWTKForms from "@/app/hooks/useEditCheckboxWTKForms";
import useEditEssayWTKForms from "@/app/hooks/useEditEssayWTKForms";
import useEditPGLearnedForms from "@/app/hooks/useEditPGLearnedForms";
import useEditEssayLearnedForms from "@/app/hooks/useEditEssayLearned";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useParams } from "next/navigation";

import RewardsCard from "./RewardCard";

const RewardContainer = () => {
  const editPGKnowForms = useEditPGKnowForms();
  const editEssayKnowForms = useEditEssayKnowForms();
  const editCheckboxWTKForms = useEditCheckboxWTKForms();
  const editEssayWTKForms = useEditEssayWTKForms();
  const editPGLearnedForms = useEditPGLearnedForms();
  const editEssayLearnedForms = useEditEssayLearnedForms();

  // const [rewards, setRewards] = useState([]);

  // const router = useRouter();
  const params = useParams();
  // const pathname = usePathname();
  // const courseId = pathname.split("/")[2];
  const { data } = useGetAuth(
    `/api/course/reward/${params.id_course}/all`,
    "lecturer"
  );
  
  

  return (
    <div>
      {data?.map((reward:any) => (
        <RewardsCard
          rewardId={parseInt(reward["id"])}
          reward={reward["name"]}
          expired={reward["expired_date"]}
          quota={reward["stock"]}
          point={reward["point"]}
          detail_instruction={reward["detail_instruction"]}
        />
      ))}
    </div>
  );
};

export default RewardContainer;
