"use client";

import { useGetAuth, usePostAuth } from "@/app/lib/api/useAuth";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

type FeedbackForm = {
  feedback: string;
};
const IndividualPerformance = () => {
  const { mutate, isPending} = usePostAuth("/api/course/feedback", "feedback");
  const { data: session } = useSession();
  const { id_peserta, id_topic, id_course } = useParams();
  const { data: topic } = useGetAuth(`/api/course/topic/${id_topic}`, "topic");
  const router = useRouter();
  
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm<FeedbackForm>();

  const handleConfirm = () => {
    setShowModal(false);
    router.back();
  }

  const handleFeedback = (data: FeedbackForm) => {
    const lecturer_id = session?.userinfo?.role_pk;
    const student_id = id_peserta;

    mutate({
      body: {
        "topic": id_topic,
        "feedback": data.feedback,
        "lecturer": lecturer_id,
        "student": student_id
      }
    },
      {
        onSuccess: () => {
          setShowModal(true);
        },
        onError: () => {
          setError("feedback", {
            type: "manual",
            message: "terjadi kesalahan saat mengirim feedback",
          }); 
        }
      }
    );
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: "Kursus", href: `/courses/${id_course}` }, { label: "Analisis", href: `/courses/${id_course}/analisis` }, { label: topic?.name ?? "..." }, { label: "Feedback" }]} variant="light" />
      <div className="lg:w-[60%] md:w-[50%] w-[600px] mx-auto">
      {/* // <div className="flex items-center justify-center"> */}
      <img src="/feedback.png" width={400} className="block mx-auto"></img>
      <p className="text-center">
        Silahkan ketikkan saran dan masukan untuk peserta
      </p>
      <form>
        <div className="mb-4">
          <label htmlFor="course" className="text-xs font-bold">
            {topic?.name}
          </label>
          <textarea
            id="course"
            {...register("feedback", {
              required: { value: true, message: "Feedback harus diisi" },
              maxLength: { value: 5000, message: "Feedback maksimal 5000 karakter" },
            })}
            rows={8}
            className="mt-3 shadow appearance-none border border-neutral-300 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm shadow shadow-lg"
          />
          <p className="error">{errors.feedback?.message}</p>
          <div className="flex justify-between">
            <button onClick={
              () => {
                router.back();
              }
            }  className="mt-8 mb-1 w-1/3 bg-transparent border-2 border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent font-bold text-xs py-2 px-2 rounded-xl">
              Kembali
            </button>
            <button
        
              onClick={handleSubmit(handleFeedback)}
              disabled={isPending || !isValid}
              className="mt-8 mb-1 w-1/3 bg-dark-accent border-2 disabled:cursor-not-allowed hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl"
            >
              Kirim
            </button>
          </div>
        </div>
      </form>

      <ConfirmationModal
        open={showModal}
        description="Feedback berhasil dikirim"
        closeText="Kembali"
        handleConfirm={handleConfirm}
      />

    
    </div>
    </>
  );
};


interface ConfirmationModalProps {
  open: boolean;
  description: string;
  closeText: string;
  handleConfirm?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  description,
  closeText,
  handleConfirm,
}) => {
  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center transition-colors text-center
        ${open ? "visible bg-black/20" : "invisible"}
        `}
    >
      <div className="content-center w-64 h-22 pt-6 p-4 text-xs bg-white rounded flex flex-col flex-wrap rounded-2xl shadow">
        {description}

        <div>
        <button onClick={handleConfirm}
            className={`mb-2 w-24 h-7 h-[30px] bg-green-accent border-2 hover:bg-transparent hover:text-green-accent hover:border-green-accent text-white font-bold text-xs py-2 px-2 rounded-xl`}
          >
            {closeText}
          </button>
        </div>
      </div>
    </div>
  );
};


export default IndividualPerformance;
