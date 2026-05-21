"use client";

import React, { useState, useEffect } from "react";
import KwlTitle from "@/app/components/kwl/KwlTitle";
import NumberContainer from "@/app/components/kwl/NumberContainer";
import QuizCard from "@/app/components/kwl/QuizCard";

import { useParams } from "next/navigation";

import { useGetObjects } from "@/app/lib/peserta/useCourses";
import { usePostAuth } from "@/app/lib/api/useAuth";
import NumberCard from "@/app/components/kwl/NumberCard";
import QuizOptionContainer from "@/app/components/kwl/QuizOptionContainer";
import Modal from "@/app/components/modals/peserta/Modal";
import ConfirmationModal from "@/app/components/modals/peserta/ConfirmationModal";
import useQuizProgress from "@/app/hooks/useQuizProgress";

export default function KnowPageQuiz() {
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;
  const quizProgress = useQuizProgress();

  const { data, isLoading } = useGetObjects(`/api/know/quiz/${id_topic}`, "know");

  // bottleneck potential
  const course = useGetObjects(`/api/course/${id_course}`, "course");
  const topic = useGetObjects(`/api/course/topic/${id_topic}`, "topic");

  const [currentNum, setCurrentNum] = useState(1);

  const maxNum = data?.questions?.length;
  const numList = generateList(maxNum);

  function generateList(length: number) {
    const list = [];
    for (let i = 1; i <= length; i++) {
      list.push(i);
    }
    return list;
  }

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleOptionChange = (index: number, options: any[]) => {
    const newCheckedItems = removeDuplicateItems(
      [...checkedItems],
      options.map((option) => option.id)
    );

    newCheckedItems.push(index);
    newCheckedItems.sort((a, b) => a - b);
    quizProgress.progress(newCheckedItems.length, maxNum);
    setCheckedItems(newCheckedItems);
  };
  // terus urutin KARNA SELALU TERURUT YES

  function removeDuplicateItems(list1: number[], list2: number[]) {
    const newList1 = list1.filter((item) => !list2.includes(item));
    return newList1;
  }

  const [Backopen, setBackOpen] = useState(false);
  const [Nextopen, setNextOpen] = useState(false);

  const [BackConfirmOpen, setBackConfirmOpen] = useState(false);
  const [NextConfirmOpen, setNextConfirmOpen] = useState(false);

  const { mutate, isSuccess } = usePostAuth(`/api/know/quiz/answer`, "answer");

  const goBack = () => {
    window.history.back();
  };

  const onSubmit = () => {
    const postData = { answers: checkedItems, topic: Number(id_topic) };
    mutate(
      { body: postData },
      {
        onSuccess: () => {
          setNextOpen(true);
        },
      }
    );
  };

  const increment = () => {
    if (currentNum < maxNum) {
      setCurrentNum((prevNumber) => prevNumber + 1);
    } else {
      onSubmit();
    }
  };

  const decrement = () => {
    if (currentNum > 1) {
      setCurrentNum((prevNumber) => prevNumber - 1);
    } else {
      setBackOpen(true);
    }
  };

  if (isLoading || !data) {
    return (
      <main className="py-5 text-center bg-[url('/bg1.png')] bg-cover min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-white text-sm">Memuat soal...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-cover bg-scroll min-h-screen">
      <div id="numbers-container" className="m-1 inline-flex text-center">
        {numList.map((num, index) => (
          <button onClick={() => setCurrentNum(num)}>
            <NumberCard number={num} isActive={currentNum === num} />
          </button>
        ))}
      </div>

      <br />

      <KwlTitle course={course?.data?.short_name} topic={topic?.data?.name} />

      {data?.questions?.map(
        (content: { question: string; options: any[] }, index: number) => (
          <div key={index}>
            <div
              className={` ${
                currentNum === index + 1 ? "" : "hidden"
              } flex items-center justify-center text-center`}
            >
              <div className="w-[90%] md:w-[80%] lg:w-[800px] relative bg-white rounded-lg shadow flex flex-col max-h-[88vh]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="black"
                  className={`w-14 h-14 hover:opacity-80 cursor-pointer ${
                    index === 0 ? "" : "hidden"
                  } absolute top-0 left-0 p-4`}
                  onClick={() => setBackOpen(true)}
                  id="back"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>

                {/* header — fixed, does not scroll */}
                <div className="py-4 px-8 inline-flex text-left items-center shrink-0">
                  <img src={"/know.png"} width="64" />
                  <div className="px-4">
                    <h1 className="text-xl font-extrabold">{"Know"}</h1>
                    <h2 className="text-xs">{topic?.data?.name}</h2>
                  </div>
                </div>

                {/* scrollable content area */}
                <div className="flex-1 overflow-y-auto px-8 pb-2">
                  <div id="question" className="my-2 mb-6">
                    <span className="text-sm"> {content?.question} </span>
                  </div>

                  <QuizOptionContainer
                    contents={content?.options}
                    onSelect={handleOptionChange}
                  />
                </div>

                {/* navigation buttons — always visible at bottom */}
                <div className="shrink-0 px-8 py-5 flex gap-4 justify-center border-t border-gray-100">
                  <button
                    onClick={decrement}
                    className="text-xs text-white font-bold w-[120px] py-2 shadow text-center bg-yellow-400 rounded"
                  >
                    kembali
                  </button>

                  <button
                    onClick={increment}
                    className="text-xs text-white font-bold w-[120px] py-2 shadow text-center bg-green-500 rounded"
                  >
                    selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      <Modal
        open={Nextopen}
        description="Kuis dikirim. Lanjut ke tahapan berikutnya?"
        closeText="kembali"
        nextText="konfirmasi"
        onClose={() => setNextOpen(false)}
        onNext={() => {
          setNextOpen(false);
          setNextConfirmOpen(true);
        }}
      />

      <Modal
        open={Backopen}
        description="Pergi ke halaman course?"
        closeText="kembali"
        nextText="konfirmasi"
        onClose={() => setBackOpen(false)}
        onNext={goBack}
      />

      {/* nanti url jadi parameter */}
      <ConfirmationModal
        open={NextConfirmOpen}
        description={"Lanjut ke proses berikutnya"}
        closeText="selanjutnya"
        url={`/peserta/courses/${id_course}/${id_topic}/kwl/want_to_know/pre_reading`}
      />

      <ConfirmationModal
        open={BackConfirmOpen}
        description="Lanjut ke halaman sebelumnya"
        closeText="selanjutnya"
        url={document.referrer}
      />
    </main>
  );
}
