"use client";

import React, { useState } from "react";
import KwlTitle from "@/app/components/kwl/KwlTitle";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";
import { useParams } from "next/navigation";

import { useGetObjects } from "@/app/lib/peserta/useCourses";
import NumberCard from "@/app/components/kwl/NumberCard";
import QuizOptionContainer from "@/app/components/kwl/QuizOptionContainer";
import Modal from "@/app/components/modals/peserta/Modal";
import ConfirmationModal from "@/app/components/modals/peserta/ConfirmationModal";

export default function KnowPageQuiz() {
  const params = useParams();
  const id_course = params.id_course;
  const id_topic = params.id_topic;
  const { data } = useGetObjects(`/api/know/quiz/${id_topic}`, "know");

  // bottleneck potential
  const course = useGetObjects(`/api/course/${id_course}`, "course");
  const topic = useGetObjects(`/api/course/topic/${id_topic}`, "topic");

  const [currentNum, setCurrentNum] = useState(1);

  const maxNum = data?.questions.length;

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

  const goBack = () => {
    window.history.back();
  };

  const increment = () => {
    if (currentNum < maxNum) {
      setCurrentNum((prevNumber) => prevNumber + 1);
    } else {
      goBack();
    }
  };

  const decrement = () => {
    if (currentNum > 1) {
      setCurrentNum((prevNumber) => prevNumber - 1);
    } else {
      setBackOpen(true);
    }
  };

  return (
    <main className="py-5 text-center bg-[url('/bg1.png')] bg-cover min-h-screen">
      <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: course?.data?.short_name ?? "...", href: `/courses/${id_course}` }, { label: topic?.data?.name ?? "..." }, { label: "Know" }, { label: "Quiz" }]} />
      <div id="numbers-container" className="m-1 inline-flex text-center">
        {numList.map((num, index) => (
          <button onClick={() => setCurrentNum(num)}>
            <NumberCard number={num} isActive={currentNum === num} />
          </button>
        ))}
      </div>

      <br />

      <KwlTitle course={course?.data?.short_name} topic={topic?.data?.name} />

      {data?.questions.map(
        (content: { question: string; options: any[] }, index: number) => (
          <div key={index}>
            <div
              className={` ${
                currentNum === index + 1 ? "" : "hidden"
              } flex items-center justify-center text-center`}
            >
              <div className="h-auto w-96 w-[90%] md:w-[80%] lg:w-[800px] relative bg-white rounded-lg shadow p-8 justify-center">
                {/* <button
                  onClick={() => setBackOpen(true)}
                  id="back"
                  className={`${
                    index === 0 ? "" : "hidden"
                  } absolute top-0 left-0 p-4`}
                >
                  <img src="/back-black.png" width="40" />
                </button> */}
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

                <div className="py-4 inline-flex text-left items-center">
                  <img src={"/know.png"} width="64" />
                  <div className="px-4">
                    <h1 className="text-xl font-extrabold">{"Know"}</h1>
                    <h2 className="text-xs">{topic?.data?.name}</h2>
                  </div>
                </div>

                <div id="question" className="my-2 mb-6">
                  <span className="text-sm"> {content?.question} </span>
                </div>

                {/* options */}
                <QuizOptionContainer
                  contents={content?.options}
                  onSelect={handleOptionChange}
                />

                <div className="inline-flex text-left items-center">
                  <button
                    onClick={decrement}
                    className="text-xs text-white font-bold w-[120px] p-1 mt-4 ml-8 shadow text-center bg-yellow-400 rounded"
                  >
                    kembali
                  </button>

                  <button
                    onClick={increment}
                    className="text-xs text-white font-bold w-[120px] p-1 mt-4 ml-8 shadow text-center bg-green-500 rounded"
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
