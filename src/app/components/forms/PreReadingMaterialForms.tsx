"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import { usePostAuth } from "@/app/lib/api/useAuth";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import usePreReadingMaterialForms from "@/app/hooks/usePreReadingMaterialForms";
import useSuccessCreateWTK from "@/app/hooks/useSuccessCreateWTK";
import SuccessCreateWTK from "../message/SuccessCreateWTK";

type FormData = {
  file: File;
  prereading: string;
};

const PreReadingMaterialForms = () => {
  const preReadingMaterialForms = usePreReadingMaterialForms();
  const successCreateWTK = useSuccessCreateWTK();

  const [file, setFile] = useState<File>();

  const form = useForm<FormData>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleNext = () => {
    preReadingMaterialForms.close();
    successCreateWTK.open();
  };

  const { data: session, status } = useSession();

  const submitForm = (data: any) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: (userData: any) => {
      const formData = new FormData();
      formData.append("file", userData["file"]);
      formData.append("prereading", userData["prereading"]);
      formData.append("topic", preReadingMaterialForms.topicId.toString());


      const data = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/wtk/preread`,
        formData,
        { headers: { Authorization: `Bearer ${session?.access}` } }
      );
      return data;
    },
    onError: (error: AxiosError) => {
    },
    onSuccess: () => {
      handleNext();
    },
  });

  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">
        Pre-Reading Material
      </p>

      <form>
        <div className="mb-4">
          <label className="text-xs font-bold" htmlFor="file_input">
            Upload file
          </label>
          <Controller
            control={control}
            name={"file"}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  {...field}
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      onChange(event.target.files[0]);
                    }
                  }}
                  type="file"
                  id="file_input"
                />
              );
            }}
          />
        </div>

        <div className="mb-4">
          <textarea
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            id="prereading"
            rows={10}
            {...register("prereading")}
          />
        </div>
        <div className="btn-group flex flex-col">
          <button
            className="mb-1 w-full bg-dark-accent border-2 hover:bg-white hover:text-dark-accent hover:border-dark-accent text-white font-bold text-xs py-2 px-2 rounded-xl"
            onClick={handleNext}
          >
            lewati
          </button>
          <button
            type="submit"
            className="mb-1 w-full bg-transparent border-2 border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent font-bold text-xs py-2 px-2 rounded-xl"
            onClick={handleSubmit(submitForm)}
          >
            Simpan
          </button>
        </div>
      </form>
    </>
  );
  return (
    <div>
      <Modal
        label="Tambah Pre-Reading Material"
        content={content}
        isOpen={preReadingMaterialForms.isOpen}
        close={preReadingMaterialForms.close}
      />
    </div>
  );
};

export default PreReadingMaterialForms;
