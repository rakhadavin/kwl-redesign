"use client";

import React, { useState } from "react";
import Modal from "../modals/peserta/Modal";
import ConfirmationModal from "../modals/peserta/ConfirmationModal";
import { useParams } from "next/navigation";
import { usePostAuth } from "@/app/lib/api/useAuth";
import { useForm } from "react-hook-form";
import { useGetObjects } from "@/app/lib/peserta/useCourses";
import CheckBox from "./CheckBox";
import useQuizProgress from "@/app/hooks/useQuizProgress";

interface CheckBoxCardProps {
  stage: string;
  topic: string;
  question: string;
  image: string;
  nextPage?: string;
}

type FormValues = {
  choices: number[];
};

const CheckBoxCard: React.FC<CheckBoxCardProps> = ({
  stage,
  topic,
  question,
  image,
  nextPage,
}) => {
  const [Backopen, setBackOpen] = useState(false);
  const [Nextopen, setNextOpen] = useState(false);

  const [BackConfirmOpen, setBackConfirmOpen] = useState(false);
  const [NextConfirmOpen, setNextConfirmOpen] = useState(false);

  const id_course = useParams().id_course;
  const id_topic = useParams().id_topic;

  const quizProgress = useQuizProgress();

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isPending } = usePostAuth(`/api/wtk/poll/answer`, "answer");

  const { data } = useGetObjects(`/api/wtk/poll/${id_topic}`, "wtk");

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    if (newCheckedItems.includes(index)) {
      newCheckedItems.splice(newCheckedItems.indexOf(index), 1); // Remove if already checked
    } else {
      newCheckedItems.push(index); // Add if not checked
    }
    setCheckedItems(newCheckedItems);
  };

  const goBack = () => {
    window.history.back();
  };

  const onSubmit = () => {
    quizProgress.progress(2, 2);
    const postData = { choices: checkedItems, topic: Number(id_topic) };

    mutate(
      { body: postData },
      {
        onSuccess: () => {
          setNextOpen(true);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center text-center">
      <div className="h-auto w-96 w-[90%] md:w-[80%] lg:w-[800px] relative bg-white rounded-lg shadow p-8 justify-center">
        {/* <button onClick={() => setBackOpen(true)} id="back" className="absolute top-0 left-0 p-4">
                    <img src="/back-black.png" width="40"/>
                </button> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="black"
          className="w-14 h-14 hover:opacity-80 cursor-pointer absolute top-0 left-0 p-4"
          onClick={() => setBackOpen(true)}
          id="back"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        <div className="pb-4 pt-8 inline-flex text-left items-center">
          <img src={image} width="64" />
          <div className="px-4">
            <h1 className="text-xl font-extrabold">{stage}</h1>
            <h2 className="text-xs">{topic}</h2>
          </div>
        </div>

        <div id="question" className="my-2 mb-6">
          <span className="text-sm"> {question} </span>
        </div>

        <form>
          {data?.options?.map(
            (
              content: { option_answer: string; id: number },
              index: React.Key | null | undefined
            ) => (
              <div key={index}>
                <CheckBox
                  content={content.option_answer}
                  checked={checkedItems.includes(content.id)}
                  onChange={() => handleCheckboxChange(content.id)}
                />
              </div>
            )
          )}

          {nextPage && (
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={checkedItems.length === 0 || isPending}
              className={`text-sm text-white font-bold w-[120px] py-2 px-6 mt-4 ml-8 shadow text-center rounded flex items-center justify-center gap-1 mx-auto ${
                checkedItems.length === 0 || isPending ? "bg-green-300 cursor-not-allowed" : "bg-green-500"
              }`}
            >
              {isPending ? (
                <>
                  <svg className="animate-spin w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Loading...
                </>
              ) : "kirim"}
            </button>
          )}
        </form>
      </div>

      <Modal
        open={Nextopen}
        description="Refleksi dikirim. Lanjut ke tahapan berikutnya?"
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
        description="Pergi ke halaman pre-reading?"
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
        url={nextPage}
      />

      <ConfirmationModal
        open={BackConfirmOpen}
        description="Lanjut ke halaman sebelumnya"
        closeText="selanjutnya"
        url={document.referrer}
      />
    </div>
  );
};

export default CheckBoxCard;
