"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "../modals/Modal";
import { useGetAuthWithTopicId, usePostAuth } from "@/app/lib/api/useAuth";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import useEditPreReadingMaterialForms from "@/app/hooks/useEditPreReadingMaterialForms";
import useSuccessCreateWTK from "@/app/hooks/useSuccessCreateWTK";


type FormData = {
  file?: File;
  prereading: string;
};

const EditPreReadingMaterialForms = () => {
  const editPreReadingMaterialForms = useEditPreReadingMaterialForms();
  const {
    data,
    status,
    isSuccess: success,
  } = useGetAuthWithTopicId(
    `/api/wtk/preread/`,
    "preread get",
    editPreReadingMaterialForms.topicId
  );

  if (status === "success") {
    return <EditPreReadingMaterialFormsChild preread={data} />;
  }
};

const EditPreReadingMaterialFormsChild = ({ preread }: any) => {
  const editPreReadingMaterialForms = useEditPreReadingMaterialForms();
  const successCreateWTK = useSuccessCreateWTK();
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const file = `${BASE_URL}${preread?.file}`;


  const form = useForm<FormData>({
    defaultValues: {
      prereading: preread["prereading"],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleNext = () => {
    editPreReadingMaterialForms.close();
    successCreateWTK.open();
  };

  const { data: session, status } = useSession();

  const submitForm = (data: any) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: (userData: any) => {
      const formData = new FormData();

      if (userData["file"]) formData.append("file", userData["file"]);
      if (userData["prereading"]) formData.append("prereading", userData["prereading"]);
     
      formData.append("topic", editPreReadingMaterialForms.topicId.toString());

      const data = axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/wtk/preread/${editPreReadingMaterialForms.topicId}`,
        formData,
        { headers: { Authorization: `Bearer ${session?.access}` } }
      );
      return data;
    },
    // onError: (error: AxiosError) => {
      
    // },
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
        <div>
          <a href={file ? file : ""} target="_blank" className="block text-indigo-900 text-xs">
            {file ? "Hasil unggahan" : "Belum ada unggahan"}
          </a>
        </div>
        <div className="py-2">
          <label className="text-xs font-bold block" htmlFor="file_input">
            Upload file
          </label>
        </div>
          <Controller
            control={control}
            name={"file"}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  {...field}
                  // value={value?.name}
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
            simpan
          </button>
        </div>
      </form>
    </>
  );
  return (
    <div>
      <Modal
        label="Edit Pre-Reading Material"
        content={content}
        isOpen={editPreReadingMaterialForms.isOpen}
        close={editPreReadingMaterialForms.close}
      />
    </div>
  );
};

export default EditPreReadingMaterialForms;
