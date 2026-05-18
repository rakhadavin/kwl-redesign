"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { usePostAuth } from "@/app/lib/api/useAuth";

import useAddRewardsForms from "@/app/hooks/useAddRewards";
import useSuccessAddRewards from "@/app/hooks/useSuccessSaveRewards";

type FormValues = {
  name: string;
  stock: number;
  point: number;
  expired_date: Date;
  detail_instruction: string;
};
const AddRewardsForms = () => {
  const addRewardsForms = useAddRewardsForms();
  const successAddRewardsForms = useSuccessAddRewards();

  const router = useRouter();
  const pathname = usePathname();
  const courseId = pathname.split("/")[2];

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isSuccess } = usePostAuth(`/api/course/reward`, "reward");

  const onSubmit = (data: FormValues) => {
    const postData = { ...data, course: Number(courseId) };
    mutate(
      { body: postData },
      {
        onSuccess: () => {
          handleNext();
        },
      }
    );

    handleNext();
  };

  const handleNext = () => {
    successAddRewardsForms.open();
    addRewardsForms.close();
  };

  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">Detail Reward</p>

      <form>
        <div className="mb-4">
          <label htmlFor="name" className="text-xs font-bold">
            Nama Reward
          </label>
          <input
            id="name"
            {...register("name", {
              required: { value: true, message: "nama reward harus diisi" },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
          />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="stock" className="text-xs font-bold">
            Kuota
          </label>
          <input
            id="stock"
            {...register("stock", {
              required: { value: true, message: "kuota harus diisi" },
              pattern: {
                value: /^[0-9]*$/,
                message: "kuota harus berupa angka",
              },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
          />
          <p className="error">{errors.stock?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="point" className="text-xs font-bold">
            Poin
          </label>
          <input
            id="point"
            {...register("point", {
              required: { value: true, message: "point harus diisi" },
              pattern: {
                value: /^[0-9]*$/,
                message: "poin harus berupa angka",
              },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
          />
          <p className="error">{errors.point?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="expired_date" className="text-xs font-bold">
            Tanggal Expired
          </label>
          <input
            id="expired_date"
            {...register("expired_date", {
              required: {
                value: true,
                message: "tanggal expired harus diisi harus diisi",
              },
            })}
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
          />
          <p className="error">{errors.expired_date?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="detail_instruction" className="text-xs font-bold">
            Detail dan Instruksi Pengambilan
          </label>
          <textarea
            id="detail_instruction"
            {...register("detail_instruction", {
              required: { value: true, message: "detail harus diisi" },
            })}
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
          />
          <p className="error">{errors.detail_instruction?.message}</p>
        </div>
        <button
          className="mb-1 w-full bg-dark-accent border-2 hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl"
          onClick={handleSubmit(onSubmit)}
        >
          simpan reward
        </button>
      </form>
    </>
  );
  return (
    <div>
      <Modal
        label="Tambah Reward"
        content={content}
        isOpen={addRewardsForms.isOpen}
        close={addRewardsForms.close}
      />
    </div>
  );
};

export default AddRewardsForms;
