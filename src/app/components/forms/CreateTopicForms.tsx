"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Modal from "../modals/Modal";
import { useRouter } from "next/navigation";
import { usePostAuth, usePutAuth } from "@/app/lib/api/useAuth";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import useCreateTopicForms from "@/app/hooks/useCreateTopicForms";
import useSuccessCreateTopic from "@/app/hooks/useSuccessCreateTopic";

type FormValues = {
  name: string;
  description: string;
  learning_objective: string;
  enable_open_time: boolean; 
  enable_close_time: boolean;
  open_time: string;         
  close_time: string;        
};

interface CreateTopicFormsProps {
  courseId: string | string[];
}

const CreateTopicForms: React.FC<CreateTopicFormsProps> = ({ courseId }) => {
  const createTopicForms = useCreateTopicForms();
  const successCreateTopic = useSuccessCreateTopic();
  const [isTimingOpen, setIsTimingOpen] = useState(false);

const form = useForm<FormValues>({
  defaultValues: {
    name: "",
    description: "",
    learning_objective: "",
    enable_open_time: false,
    enable_close_time: false,
    open_time: "",
    close_time: "",
  }
});
  const { register, control, handleSubmit, formState, setValue, watch } = form;
  const { errors } = formState;

  const router = useRouter();

  const enable_open_time = watch("enable_open_time");
  const enable_close_time = watch("enable_close_time");
  const open_time = watch("open_time");
  const close_time = watch("close_time");

  useEffect(() => {
    if (enable_open_time || enable_close_time || open_time || close_time) {
      setIsTimingOpen(true);
    }
  }, [enable_open_time, enable_close_time, open_time, close_time]);

  useEffect(() => {
    if (createTopicForms.isOpen) {
      setValue("name", createTopicForms.name || "");
      setValue("description", createTopicForms.description || "");
      setValue("learning_objective", createTopicForms.learning_objective || "");
      setValue("enable_open_time", createTopicForms.enable_open_time || false);
      setValue("enable_close_time", createTopicForms.enable_close_time || false);
      setValue("open_time", createTopicForms.open_time || "");
      setValue("close_time", createTopicForms.close_time || "");
    }
  }, [createTopicForms.isOpen]);

  const { mutate: createMutate, isPending: isCreatePending } = usePostAuth("/api/course/topic", "lecturer");

  const onSubmit = async (data: FormValues) => {
    const postData = { 
      ...data, 
      course: Number(courseId),
      open_time: data.open_time || null,
      close_time: data.close_time || null,
      enable_open_time: data.enable_open_time,
      enable_close_time: data.enable_close_time,
    };
    createMutate(
      { body: postData },
      {
        onSuccess: () => {
          successCreateTopic.open();
          createTopicForms.close();
          setTimeout(() => window.location.reload(), 1500);
        },
      }
    );
  };

  const { mutate: updateMutate, isPending: isUpdatePending } = usePutAuth(`/api/course/topic/${createTopicForms.id}`, "lecturer");
  const isPending = isCreatePending || isUpdatePending;

  const updateTopic = async (data: FormValues) => {
    const postData = { 
      ...data, 
      course: Number(courseId),
      open_time: data.open_time || null,
      close_time: data.close_time || null,
      enable_open_time: data.enable_open_time,
      enable_close_time: data.enable_close_time,
    };
    updateMutate(
      { body: postData, id: createTopicForms.create ? undefined : createTopicForms.id },
      {
        onSuccess: () => {
          successCreateTopic.open();
          createTopicForms.close();
          setTimeout(() => window.location.reload(), 1500);
        },
      }
    );
  };

  const content = (
    <>
      <p className="text-main font-semibold font-sm py-2">
        Deskripsikan Topic Anda
      </p>
      <p className="text-xs text-gray-400 mb-3"><span className="text-red-500">*</span> Wajib diisi</p>

      <form onSubmit={createTopicForms.create ? handleSubmit(onSubmit) : handleSubmit(updateTopic)}>
        <div className="mb-4">
          <label htmlFor="name" className="text-xs font-bold">
            Nama Topic <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            {...register("name", {
              required: { value: true, message: "nama topic harus diisi" },
            })}
            type="text"
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          <p className="error text-red-500 text-xs mt-1">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="text-xs font-bold">
            Deskripsi Topic <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: {
                value: true,
                message: "deskripsi topic harus diisi",
              },
            })}
            rows={3}
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm resize-vertical"
          />
          <p className="error text-red-500 text-xs mt-1">{errors.description?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="text-xs font-bold">
            Learning Objective <span className="text-red-500">*</span>
          </label>
          <textarea
            id="learning_objective"
            {...register("learning_objective", {
              required: {
                value: true,
                message: "learning objective harus diisi",
              },
            })}
            rows={3}
            className="shadow appearance-none border border-solid border-neutral-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm resize-vertical"
          />
          <p className="error text-red-500 text-xs mt-1">{errors.learning_objective?.message}</p>
        </div>

        <div className="mb-4">
          <div 
            className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
            onClick={() => setIsTimingOpen(!isTimingOpen)}
          >
            <div className="flex items-center space-x-2">
              <div className="text-sm font-semibold text-gray-700">
                Pengaturan Waktu
              </div>
              {/* Show status badges for enabled or filled time */}
              {/* <div className="flex space-x-1">
                {enableStartTime && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    ✓ Aktif Mulai
                  </span>
                )}
                {!enableStartTime && startTime && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    ⏸ Draft Mulai
                  </span>
                )}
                {enableEndTime && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    ✓ Aktif Selesai
                  </span>
                )}
                {!enableEndTime && endTime && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    ⏸ Draft Selesai
                  </span>
                )}
              </div> */}
            </div>
            {isTimingOpen ? (
              <HiChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <HiChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>

          {/* Dropdown Content */}
          {isTimingOpen && (
            <div className="mt-3 p-4 bg-white border border-gray-200 rounded-lg">
              {/* Time Inputs - Always visible */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Start Time Input */}
                <div className="space-y-2">
                  <label htmlFor="open_time" className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                    Waktu Mulai Topic
                    <span className="text-gray-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    id="open_time"
                    {...register("open_time", {
                      validate: (value) => {
                        if (value && close_time && new Date(value) >= new Date(close_time)) {
                          return "waktu mulai harus sebelum waktu berakhir";
                        }
                        return true;
                      }
                    })}
                    type="datetime-local"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none text-sm transition-colors ${
                      enable_open_time
                        ? 'border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        : 'border-gray-300 focus:border-gray-400'
                    }`}
                    placeholder="Pilih waktu mulai (opsional)"
                  />
                  <p className="error text-red-500 text-xs">{errors.open_time?.message}</p>

                  <div className="flex items-center mt-2">
                    <input
                      id="enable_open_time"
                      {...register("enable_open_time")}
                      type="checkbox"
                      disabled={!open_time}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <label htmlFor="enable_open_time" className={`text-sm ${!open_time ? 'text-gray-400' : 'text-gray-700'}`}>
                      {'Aktifkan waktu mulai'}
                    </label>
                  </div>
                  {/* <p className="text-xs text-gray-500">
                    {enable_open_time && open_time
                      ? 'Topic hanya bisa diakses setelah waktu yang ditentukan'
                      : startTime 
                      ? 'Waktu tersimpan sebagai draft, belum aktif'
                      : 'Kosongkan jika topic selalu tersedia'
                    }
                  </p> */}
                </div>

                <div className="space-y-2">
                  <label htmlFor="close_time" className="text-xs font-bold text-green-700 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                    Waktu Berakhir Topic
                    <span className="text-gray-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    id="close_time"
                    {...register("close_time", {
                      validate: (value) => {
                        if (value && open_time && new Date(value) <= new Date(open_time)) {
                          return "waktu berakhir harus setelah waktu mulai";
                        }
                        return true;
                      }
                    })}
                    type="datetime-local"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none text-sm transition-colors ${
                      enable_close_time 
                        ? 'border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-500' 
                        : 'border-gray-300 focus:border-gray-400'
                    }`}
                    placeholder="Pilih waktu berakhir (opsional)"
                  />
                  <p className="error text-red-500 text-xs">{errors.close_time?.message}</p>

                  <div className="flex items-center mt-2">
                    <input
                      id="enable_close_time"
                      {...register("enable_close_time")}
                      type="checkbox"
                      disabled={!close_time}
                      className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <label htmlFor="enable_close_time" className={`text-sm ${!close_time ? 'text-gray-400' : 'text-gray-700'}`}>
                      {'Aktifkan waktu berakhir'}
                    </label>
                  </div>
                  {/* <p className="text-xs text-gray-500">
                    {enableEndTime && endTime 
                      ? 'Topic tidak bisa diakses setelah waktu yang ditentukan'
                      : endTime 
                      ? 'Waktu tersimpan sebagai draft, belum aktif'
                      : 'Kosongkan jika topic tidak memiliki batas waktu'
                    }
                  </p> */}
                </div>
              </div>

              {/* <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-xs text-blue-800 space-y-1">
                  <p className="font-semibold">💡 Tips Pengaturan Waktu:</p>
                  <p>• Anda bisa mengisi waktu terlebih dahulu tanpa mengaktifkannya</p>
                  <p>• Centang checkbox "Aktifkan" hanya saat sudah siap menerapkan batasan waktu</p>
                  <p>• Waktu yang tidak diaktifkan akan tersimpan sebagai draft</p> */}
                  {/* {(enableStartTime || enableEndTime) && (
                    <p className="text-blue-900 font-medium mt-2">⚠ Ada pembatasan waktu yang aktif pada topic ini</p>
                  )} */}
                {/* </div>
              </div> */}
            </div>
          )}
        </div>

        <div className="btn-group flex flex-col">
          <button
            type="submit"
            disabled={isPending}
            className={`mb-1 w-full border-2 font-bold text-xs py-2 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 ${
              isPending
                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-transparent border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent"
            }`}
          >
            {isPending ? (
              <>
                <svg className="animate-spin w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Loading...
              </>
            ) : "Simpan"}
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );

  return (
    <div>
      <Modal
        label={createTopicForms.create ? "Tambah Topic" : "Edit Topic"}
        content={content}
        isOpen={createTopicForms.isOpen}
        close={createTopicForms.close}
      />
    </div>
  );
};

export default CreateTopicForms;