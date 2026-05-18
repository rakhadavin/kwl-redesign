"use client";

import React, { useState } from "react";
import MiniButton from "../button/peserta/MiniButton";
import { describe } from "node:test";
import Modal from "../modals/peserta/Modal";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../modals/peserta/ConfirmationModal";
import { useParams } from "next/navigation";
import { usePostAuth } from "@/app/lib/api/useAuth";
import { useForm } from "react-hook-form";
import useQuizProgress from "@/app/hooks/useQuizProgress";

interface ReflectionCardProps {
  stage: string;
  code: string;
  topic: string;
  question: string;
  instruction: string;
  image: string;
  nextPage?: string;
}

type FormValues = {
  reflection: string;
};

const ReflectionCard: React.FC<ReflectionCardProps> = ({
  stage,
  code,
  topic,
  question,
  instruction,
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

  const { mutate, isSuccess } = usePostAuth(
    `/api/${code}/essay/answer`,
    "answer"
  );

  const goBack = () => {
    window.history.back();
  };

  const onSubmit = (data: FormValues) => {
    quizProgress.progress(1, 1);
    const postData = { ...data, topic: Number(id_topic) };
    mutate(
      { body: postData },
      {
        onSuccess: () => {
          setNextOpen(true);
        },
      }
    );
  };

  const setConfirmationModal = (type: string) => {
    return (
      <ConfirmationModal
        open={true}
        description={
          type === "back"
            ? "Lanjut ke halaman course"
            : "Refleksi Know berhasil dikirim"
        }
        closeText="selanjutnya"
        url={""}
      />
    );
  };

  return (
    <div className="flex items-center justify-center text-center">
      <div className="h-auto w-96 w-[90%] md:w-[70%] lg:w-[800px] relative bg-white rounded-lg shadow p-8">
        {/* <button
          onClick={() => setBackOpen(true)}
          id="back"
          className="absolute top-0 left-0 p-4"
        >
          <img src="/back-black.png" width="40" />
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

        <div className="pt-2 pb-8">
          <span className="text-sm"> {question} </span>
        </div>

        <form>
          <textarea
            id="message"
            rows={12}
            className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            placeholder={instruction}
            {...register("reflection", {
              required: { value: true, message: "refleksi harus diisi" },
              maxLength: {
                value: 5000,
                message: "Maksimal 5000 karakter",
              },
            })}
          ></textarea>
          <p className="error">{errors.reflection?.message}</p>

          {nextPage && (
            <button
              onClick={handleSubmit(onSubmit)}
              className="text-sm text-white font-bold w-[120px] py-2 px-6 mt-4 ml-8 shadow text-center bg-green-500 rounded"
            >
              kirim
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
        url={nextPage as string}
      />

      {/* <ConfirmationModal
        open={BackConfirmOpen}
        description="Lanjut ke halaman sebelumnya"
        closeText="selanjutnya"
        url={document.referrer}
      /> */}
    </div>
  );
};

export default ReflectionCard;
