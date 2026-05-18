'use client'

import SuccessModal from "@/app/components/modals/peserta/SuccessModal";
import { usePostAuth } from "@/app/lib/api/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { set, useForm } from "react-hook-form";

type ResetPassword = {
  email: string;
};

function ResetPasswordPage() {

  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors},
  } = useForm<ResetPassword>();

  const handleNext = () => {
    window.location.href = "/";
  }

 
  const mutation = useMutation({
    mutationKey: ["reset"],
    mutationFn: async (body: ResetPassword) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/reset`,
        body
      );
      return data;
    },
    onError: (error:any) => {
      console
      if (error.response.status === 500) {
        setError("email", {
          type: "manual",
          message: "Terjadi kesalahan pada server",
        });
      }
      if (error.response.status === 400) {
        setError("email", {
          type: "manual",
          message: "Email tidak ditemukan",
        });
      }
    },
    onSuccess: () => {
      setShowModal(true);
    },
   
  });

  const onSubmit = (data: ResetPassword) => {
  
      mutation.mutate(data);
  };
  return (
    <div className="flex overflow-hidden relative flex-col pt-20 w-full min-h-[832px] max-md:max-w-full">
      <img
        loading="lazy"
        src="/transition-bg.png"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative justify-center items-center self-center px-16 py-7 mt-44 max-w-full text-xs bg-white rounded-lg w-[488px] max-md:px-5 max-md:mt-10">

          <form className="flex flex-col max-w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="self-center text-xl font-bold text-center text-blue-900">
            Lupa Password
          </div>
          <hr className="h-px w-[70%] my-6 self-center bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="mt-6 text-center text-black">
            Masukkan e-mail yang terdaftar. Kami akan mengirimkan pesan untuk
            atur ulang kata sandi Anda.
          </div>
          <div className="flex flex-col justify-center mt-6 mx-6 text-black">
            <label className="font-bold">Email </label>
            <input
              {...register("email", { required: true })}
              type="text"
              id="email"
              className="justify-center py-1 mt-2 whitespace-nowrap rounded border border-solid border-neutral-400"
            ></input>
            
            {errors.email && (
            <div className="text-red-500 py-1">{errors.email.message}</div>
          )}

        
          </div>

     
          <button
            disabled={mutation.isPending || !isValid}
            className="justify-center items-center px-16 py-3 mx-5 mt-5 font-bold text-center disabled:cursor-not-allowed text-white whitespace-nowrap rounded-lg bg-blue-950 max-md:px-5 max-md:mx-2.5"
          >
            kirim
          </button>
         
          <button className="justify-center items-center px-16 py-3 mt-1.5 mr-5 ml-5 font-bold text-center whitespace-nowrap rounded-lg border-2 border-solid border-blue-950 text-slate-900 max-md:px-5 max-md:mx-2.5">
            <Link href={"/"}>kembali</Link>
          </button>
          </form>
        </div>

        <SuccessModal
        open={showModal}
        description="Password berhasil direset. Silahkan cek email Anda untuk mengatur ulang password."
        closeText="Kembali"
        handleConfirm={handleNext}
      />

    </div>

    
  );
}

export default ResetPasswordPage;
