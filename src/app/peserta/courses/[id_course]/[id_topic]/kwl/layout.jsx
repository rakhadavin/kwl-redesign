"use client";

import useQuizProgress from "@/app/hooks/useQuizProgress";
import {
  useGetObjects,
  useGetObjectsWithStudent,
} from "@/app/lib/peserta/useCourses";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { HiOutlineCheckCircle, HiOutlineMinusCircle } from "react-icons/hi";

export default function KWLLayout({ children }) {
  const param = useParams();
  const idCourse = param.id_course;
  const idTopic = param.id_topic;
  const quizProgress = useQuizProgress();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);

  const { data } = useGetObjectsWithStudent(
    `/api/course/kwl-status/${idCourse}/`,
    `topic-${idTopic}`
  );
  
  const currentTopic = data?.find(
    (topic) => topic.topic_data.id === parseInt(idTopic)
  );

  const status = currentTopic?.kwl_data.kwl_status;
  const know = currentTopic?.topic_data?.know[0];

  const knowType = currentTopic?.topic_data?.know?.[0]?.type;
  const { data: quizKnowData } = useGetObjects(
    `/api/know/quiz/${idTopic}`,
    `know-quiz-${idTopic}`
  );
  
  const learnedType = currentTopic?.topic_data?.learned?.[0]?.type;
  const { data: quizLearnedData } = useGetObjects(
    `/api/learned/quiz/${idTopic}`,
    `learned-quiz-${idTopic}`
  );
  
  useEffect(() => {
    let total = 0;
    if (knowType === "reflection") {
      total += 1;
    } else if (knowType === "quiz" && quizKnowData?.questions) {
      total += quizKnowData.questions.length;
    }
    
    total += 2;

    if (learnedType === "reflection") {
      total += 1;
    } else if (learnedType === "quiz" && quizLearnedData?.questions) {
      total += quizLearnedData.questions.length;
    }
    setTotalProgress(total);
  }, [quizKnowData, knowType, quizLearnedData, learnedType]);

  useEffect(() => {
    if (totalProgress === 0) return;
    
    let progress = 0;
    const finishedQuiz = ((quizProgress?.current/quizProgress?.total) * (100/3)) || 0;

    if (status === "learned") {
      progress = totalProgress;
    } else if (status === "wtk") {
      progress = (100 * 2/3) + finishedQuiz;
    } else if (status === "know") {
      progress = (100 * 1/3) + finishedQuiz;
    } else if (know) {
      progress = finishedQuiz;
    }
    setCurrentProgress(progress);
  }, [quizProgress?.current, status, know, knowType, learnedType, quizKnowData, quizLearnedData, totalProgress]);

  const progressPercentage = useMemo(() => {
    if (totalProgress <= 0 || currentProgress < 0) return 0;
    return Math.round(currentProgress);
  }, [currentProgress, totalProgress]);

  return (
    <div>
      <div className="w-full fixed bottom-0 left-0 right-0 bg-white border-b shadow-sm z-[9] px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end items-center mb-2">
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% selesai
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-gray-400 mt-1">
            <span className="inline-flex items-center gap-1">
              Know: {status === "know" ? <HiOutlineCheckCircle className="inline text-green-500" /> : <HiOutlineMinusCircle className="inline" />}
            </span>
            <span className="mx-2">|</span>
            <span className="inline-flex items-center gap-1">
              WTK: {status === "wtk" ? <HiOutlineCheckCircle className="inline text-green-500" /> : <HiOutlineMinusCircle className="inline" />}
            </span>
            <span className="mx-2">|</span>
            <span className="inline-flex items-center gap-1">
              Learned: {status === "learned" ? <HiOutlineCheckCircle className="inline text-green-500" /> : <HiOutlineMinusCircle className="inline" />}
            </span>
          </div>
        </div>
      </div>
      
        {children}
    </div>
  );
}