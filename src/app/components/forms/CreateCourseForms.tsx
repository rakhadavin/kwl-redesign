import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { usePostAuth } from "@/app/lib/api/useAuth";
import useCreateCourseForms from "@/app/hooks/useCreateCourseForms";
import Modal from "../modals/Modal";
import useSuccessCreateCourse from "@/app/hooks/useSuccessCreateCourse";
import { useQueryClient } from "@tanstack/react-query";

type FormValues = {
  short_name: string;
  full_name: string;
  color_theme: string;
  enrollment_key?: string;
  institusi?: string;
  prodi?: string;
};

const CreateCourseForms = () => {
  const createCourseForms = useCreateCourseForms();
  const successCreateCourse = useSuccessCreateCourse();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isPending } = usePostAuth("/api/course/", "lecturer");

  const onSubmit = (data: FormValues) => {
    mutate(
      { body: data },
      {
        onSuccess: (response: any) => {
          queryClient.invalidateQueries({ queryKey: ["lecturer courses"] });
          successCreateCourse.open(response?.id);
          createCourseForms.close();
        },
      }
    );
  };

  const handleNext = () => {
    successCreateCourse.open();
    createCourseForms.close();
  };

  const content = (
    <div>
      <p className="text-main font-semibold font-sm py-2">
        Deskripsikan Course Anda
      </p>

      <form>
        <div className="mb-4">
          <label htmlFor="short_name" className="text-xs font-bold">
            Nama Singkat Course <span className="text-red-500">*</span>
          </label>
          <input
            id="short_name"
            {...register("short_name", {
              required: {
                value: true,
                message: "nama singkat course harus diisi",
              },
              maxLength: {
                value: 100,
                message: "nama singkat course maksimal 100 karakter",
              },
            })}
            type="text"
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <p className="error">{errors.short_name?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="full_name" className="text-xs font-bold">
            Nama Panjang Course <span className="text-red-500">*</span>
          </label>
          <input
            id="full_name"
            {...register("full_name", {
              required: {
                value: true,
                message: "nama panjang course harus diisi",
              },
              maxLength: {
                value: 255,
                message: "nama panjang course maksimal 255 karakter",
              },
            })}
            type="text"
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <p className="error">{errors.full_name?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="color_theme" className="text-xs font-bold">
            Tema Warna <span className="text-red-500">*</span>
          </label>
          <div className="flex mt-2">
            <div className="flex items-center me-2">
              <input
                id="dark-accent"
                type="radio"
                value="dark-accent"
                {...register("color_theme")}
                defaultChecked={true}
                className="w-5 h-5 text-dark-accent border-0 focus:ring-dark-accent bg-dark-accent"
              />
              <label
                htmlFor="dark-accent"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              ></label>
            </div>

            <div className="flex items-center me-2">
              <input
                id="kiki-blue"
                type="radio"
                value="kiki-blue"
                {...register("color_theme")}
                className="w-5 h-5 text-kiki-blue border-0 focus:ring-kiki-blue bg-kiki-blue"
              />
              <label
                htmlFor="kiki-blue"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              ></label>
            </div>

            <div className="flex items-center me-2">
              <input
                id="kowl-orange"
                type="radio"
                value="kowl-orange"
                {...register("color_theme")}
                className="w-5 h-5 text-kowl-orange border-0 focus:ring-kowl-orange bg-kowl-orange"
              />
              <label
                htmlFor="kowl-orange"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              ></label>
            </div>

            <div className="flex items-center me-2">
              <input
                id="wawa-pink"
                type="radio"
                value="wawa-pink"
                {...register("color_theme")}
                className="w-5 h-5 text-wawa-pink border-0 focus:ring-wawa-pink bg-wawa-pink"
              />
              <label
                htmlFor="wawa-pink"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              ></label>
            </div>

            <div className="flex items-center me-2">
              <input
                id="lulu-yellow"
                type="radio"
                value="lulu-yellow"
                {...register("color_theme")}
                className="w-5 h-5 text-lulu-yellow border-0 focus:ring-lulu-yellow bg-lulu-yellow"
              />
              <label
                htmlFor="lulu-yellow"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              ></label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="full_name" className="text-xs font-bold">
            Enrollment Key (Opsional)
          </label>
          <input
            id="enrollment_key"
            {...register("enrollment_key", {
              maxLength: {
                value: 100,
                message: "enrollment key course maksimal 100 karakter",
              },
            })}
            type="text"
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <p className="error">{errors.enrollment_key?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="institusi" className="text-xs font-bold">
            Institusi <span className="text-gray-400 font-normal">(Opsional)</span>
          </label>
          <input
            id="institusi"
            {...register("institusi")}
            type="text"
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="prodi" className="text-xs font-bold">
            Program Studi <span className="text-gray-400 font-normal">(Opsional)</span>
          </label>
          <input
            id="prodi"
            {...register("prodi")}
            type="text"
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
        </div>

        <button
          className={`mb-1 w-full border-2 font-bold text-xs py-2 px-2 rounded-xl transition-colors ${
            isPending
              ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-transparent border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent"
          }`}
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Simpan"}
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );

  return (
    <div>
      <Modal
        label="Buat Course"
        content={content}
        isOpen={createCourseForms.isOpen}
        close={createCourseForms.close}
      />
    </div>
  );
};

export default CreateCourseForms;
