"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../modals/Modal";
import Select from "react-select";
import { useGetAuth, usePostAuth } from "@/app/lib/api/useAuth";

import useCreateCourseForms from "@/app/hooks/useCreateCourseForms";
import useCreateCourse2Forms from "@/app/hooks/useCreateCourse2Forms";
import useSuccessCreateCourse from "@/app/hooks/useSuccessCreateCourse";

type FormValues = {
  lecturer_team: string[];
};

const CreateCourse2Forms = () => {
  const createCourseForms = useCreateCourseForms();
  const createCourse2Forms = useCreateCourse2Forms();
  const successCreateCourse = useSuccessCreateCourse();

  const [value, setValue] = useState("null");
  const [optionLecturer, setOptionLecturer] = useState(null);
  const [optionAssistant, setOptionAssistant] = useState(null);
  const form = useForm<FormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = form;

  const { data } = useGetAuth(`/api/auth/lecturer/all`, "list lecturer");

  const { mutate, isSuccess } = usePostAuth("/api/course/", "lecturer");

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

  const handleSimpan = () => {
    handleNext();
  };

  const handleNext = () => {
    successCreateCourse.open();
    createCourse2Forms.close();
  };

  const handleSebelumnya = () => {
    createCourse2Forms.close();
    createCourseForms.open();
  };

  const options = [
    { value: "Pak Kowl Ganteng", label: "Pak Kowl Ganteng" },
    { value: "Avel", label: "Avel" },
    { value: "Agnes", label: "Agnes" },
    { value: "Arda", label: "Arda" },
  ];

  const mappedArray = data?.map((item: any) => ({
    value: item,
    label: item["user"]["nama_lengkap"],
  }));

  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">
        Tambahkan Tim Pengajar
      </p>

      <form>
        <div className="mb-4">
          <label htmlFor="lecturer_team" className="text-xs font-bold">
            Tim Dosen
          </label>
          <Select
            id={"lecturer_team"}
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            options={mappedArray}
            noOptionsMessage={() => "No Lecturer Found."}
            isMulti
            isSearchable
          />
        </div>

        <button
          className="mb-1 w-full bg-dark-accent border-2 hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl"
          onClick={handleNext}
        >
          lewati
        </button>
        <button
          className="mb-1 w-full bg-transparent border-2 border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent font-bold text-xs py-2 px-2 rounded-xl"
          onClick={handleSubmit(onSubmit)}
        >
          simpan
        </button>
      </form>
    </>
  );
  return (
    <div>
      <Modal
        label="Buat Course"
        content={content}
        isOpen={createCourse2Forms.isOpen}
        close={createCourse2Forms.close}
      />
    </div>
  );
};

export default CreateCourse2Forms;
