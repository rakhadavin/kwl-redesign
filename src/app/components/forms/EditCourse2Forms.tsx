import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useRouter } from "next/navigation";
import Modal from "../modals/Modal";
import useEditCourse2Forms from "@/app/hooks/useEditCourse2Form";
import useSuccessEditCourse from "@/app/hooks/useSuccessEditCourse";

type FormValues = {
  short_name: string;
  full_name: string;
  color_theme: string;
  lecturer_team: string[];
  assistant_team: string[];
};

const EditCourse2Forms = () => {
  const successEditCourse = useSuccessEditCourse();
  const editCourse2Form = useEditCourse2Forms();

  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const router = useRouter();

  const onSubmit = (data: FormValues) => {
   
    handleNext();
  };

  // const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedColor(event.target.value);
  // };

  // const handleBack = () => {
  //   createCourseForms.close()
  // };

  const handleSimpan = () => {
    handleNext();
  };


  const handleNext = () => {
    successEditCourse.open();
    editCourse2Form.close();
  };

  const dosen = ["kowl ganteng", "avel", "arda", "agnes"];

  const mappedArray = dosen.map((item: string) => ({
    value: item,
    label: item,
  }));


  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">
        Tambahkan Tim Pengajar
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="lecturer_team" className="text-xs font-bold">
            Tim Dosen
          </label>
          {/* <p>{setOptionLecturer}</p> */}
          <Select
            id={"lecturer_team"}
            // {...register("lecturer_team")}
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            options={mappedArray}
            // options={optionLecturer}
            // placeholder="Tambahkan tim dosen"
            // onChange={setValue}
            noOptionsMessage={() => "No Lecturer Found."}
            isMulti
            isSearchable
          />
          {/* <p className="error">{errors.lecturer_team?.message}</p> */}
        </div>
        <div className="mb-4">
          <label htmlFor="assistant_team" className="text-xs font-bold">
            Tim Asisten
          </label>
          {/* <p>{setOptionAssistant}</p> */}
          <Select
            id={"assistant_team"}
            // {...register("assistant_team")}
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            options={mappedArray}
            // options={optionassistant}
            // placeholder="Tambahkan tim dosen"
            // onChange={setValue}
            noOptionsMessage={() => "No Assistant Found."}
            isMulti
            isSearchable
          />
          {/* <p className="error">{errors.assistant_team?.message}</p> */}
        </div>

        <button
          // type="button"
          className="mb-1 w-full bg-dark-accent border-2 hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl"
          onClick={handleNext}
        >
          lewati
        </button>
        <button
          // type="submit"
          className="mb-1 w-full bg-transparent border-2 border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent font-bold text-xs py-2 px-2 rounded-xl"
          onClick={handleSubmit(onSubmit)}
        >
          Simpan
        </button>
      </form>
    </>
  );

  return (
    <div>
      <Modal
        label="Buat Course"
        content={content}
        // content={<CourseContent handleNext={handleNext} />}
        isOpen={editCourse2Form.isOpen}
        close={editCourse2Form.close}
      />
    </div>
  );
};

export default EditCourse2Forms;
