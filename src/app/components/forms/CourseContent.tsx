"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useGetAuth, usePutAuth } from "@/app/lib/api/useAuth";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

import useCreateCourseForms from "@/app/hooks/useCreateCourseForms";
import useCreateCourse2Forms from "@/app/hooks/useCreateCourse2Forms";
import useSuccessEditCourse from "@/app/hooks/useSuccessEditCourse";

type FormValues = {
  short_name: string;
  full_name: string;
  color_theme: string;
  enrollment_key: string;
};

const CourseContent = () => {
  const createCourseForms = useCreateCourseForms();
  const createCourse2Forms = useCreateCourse2Forms();
  const successEditCourse = useSuccessEditCourse();

  const params = useParams();

  const { data } = useGetAuth(`/api/course/${params.id_course}`, "course name");

  const form = useForm<FormValues>({
    defaultValues: {
      full_name: data && data["full_name"],
      short_name: data && data["short_name"],
      color_theme: data && data["color_theme"],
      enrollment_key: data && data["enrollment_key"],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate, isSuccess } = usePutAuth(
    `/api/course/${params.id_course}`,
    "edit course"
  );

  const onSubmit = (data: FormValues) => {
    mutate(
      { body: data },
      {
        onSuccess: () => {
          handleNext();
        },
      }
    );
  };

  const handleNext = () => {
    successEditCourse.open();
  };

  const { data: list_lecture } = useGetAuth(
    `/api/auth/lecturer/all`,
    "list lecturer"
  );

  const mappedArray = list_lecture?.map((item: any) => ({
    value: item,
    label: item["user"]["nama_lengkap"],
  }));

  const content = (
    <div>
      <p className="text-main font-semibold font-sm py-2">
        Deskripsikan Course Anda
      </p>

      <form>
        <div className="mb-4">
          <label htmlFor="short_name" className="text-xs font-bold">
            Nama Singkat Course
          </label>
          <input
            id="short_name"
            {...register("short_name", {
              required: {
                value: true,
                message: "nama singkat course harus diisi",
              },
            })}
            type="text"
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <p className="error">{errors.short_name?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="full_name" className="text-xs font-bold">
            Nama Panjang Course
          </label>
          <input
            id="full_name"
            {...register("full_name", {
              required: {
                value: true,
                message: "nama panjang course harus diisi",
              },
            })}
            type="text"
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <p className="error">{errors.full_name?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="color_theme" className="text-xs font-bold">
            Tema Warna
          </label>
          <div className="flex mt-2">
            <div className="flex items-center me-2">
              <input
                id="dark-accent"
                type="radio"
                value="dark-accent"
                {...register("color_theme")}
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

        <button
          className="mb-1 w-full bg-transparent border-2 border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent font-bold text-xs py-2 px-2 rounded-xl"
          onClick={handleSubmit(onSubmit)}
        >
          simpan
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
  return <div>{content}</div>;
};

export default CourseContent;
