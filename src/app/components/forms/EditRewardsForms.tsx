"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import WidthButton from "../button/WidthButton";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  usePutAuth,
  useGetAuthWithTopicId,
  useGetAuth,
} from "@/app/lib/api/useAuth";

import useEditRewardForms from "@/app/hooks/useEditRewardForms";
import useSuccessAddRewards from "@/app/hooks/useSuccessSaveRewards";
import Spinner from "../spinner/spinner";

type FormValues = {
  name: string;
  stock: number;
  point: number;
  expired_date: Date;
  detail_instruction: string;
};
const EditRewardsForms = () => {
  const editRewardsForms = useEditRewardForms();
  const {
    data,
    status,
    isSuccess: success,
  } = useGetAuthWithTopicId(
    `/api/course/reward/`,
    "prev essay know",
    editRewardsForms.rewardId as number
  );
  // const {
  //   data,
  //   status,
  //   isSuccess: success,
  // } = useGetAuth(
  //   `/api/reward/${editRewardsForms.rewardId}`,
  //   "prev edit reward"
  // );


  if (status === "success") {
    return <EditRewardsFormsChild data={data} />;
  }
};

const EditRewardsFormsChild = ({ data }: any) => {
  const editRewardsForms = useEditRewardForms();
  const successAddRewardsForms = useSuccessAddRewards();

  const router = useRouter();
  const pathname = usePathname();
  const courseId = pathname.split("/")[2];

  const form = useForm<FormValues>({
    defaultValues: {
      name: data?.name,
      stock: data?.stock,
      point: data?.point,
      expired_date: data?.expired_date,
      detail_instruction: data?.detail_instruction,
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isSuccess } = usePutAuth(
    `/api/course/reward/${editRewardsForms.rewardId}`,
    "edit reward"
  );

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
  };

  const handleNext = () => {
    successAddRewardsForms.open();
    editRewardsForms.close();
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
            // type="text"
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
          Simpan Reward
        </button>
      </form>
      {/* <WidthButton
        label1="simpan"
        next1="SuccessAddRewardsForms"
        close="AddRewardsForms"
      /> */}
    </>
  );
  return (
    <div>
      <Modal
        label="Edit Reward"
        content={content}
        isOpen={editRewardsForms.isOpen}
        close={editRewardsForms.close}
      />
    </div>
  );
};

export default EditRewardsForms;
