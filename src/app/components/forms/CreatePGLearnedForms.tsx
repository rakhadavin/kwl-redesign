"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Modal from "../modals/Modal";
import { usePostAuth } from "@/app/lib/api/useAuth";

import useCreatePGLearnedForms from "@/app/hooks/useCreatePGLearned";
import useSuccessCreateLearned from "@/app/hooks/useSuccessCreateLearned";

type Soal = {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  score: number;
};

type FormValues = { soal: Soal[] };

const EMPTY_SOAL: Soal = {
  question: "", option_a: "", option_b: "", option_c: "", option_d: "",
  correct_option: "", score: 0,
};

const CreatePGLearnedForms = () => {
  const createPGLearnedForms = useCreatePGLearnedForms();
  const successCreateLearned = useSuccessCreateLearned();
  const [currentIdx, setCurrentIdx] = useState(0);

  const form = useForm<FormValues>({ defaultValues: { soal: [{ ...EMPTY_SOAL }] } });
  const { register, control, handleSubmit, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "soal" });

  const { mutate, isPending } = usePostAuth("/api/learned/quiz", "lecturer");

  const onSubmit = (data: FormValues) => {
    mutate(
      { body: { questions: data.soal, type: "quiz", topic: createPGLearnedForms.topicId } },
      { onSuccess: () => { successCreateLearned.open(); createPGLearnedForms.close(); setTimeout(() => window.location.reload(), 1500); } }
    );
  };

  const addSoal = () => {
    append({ ...EMPTY_SOAL });
    setCurrentIdx(fields.length);
  };

  const removeSoal = () => {
    if (fields.length === 1) return;
    remove(currentIdx);
    setCurrentIdx(Math.max(0, currentIdx - 1));
  };

  const content = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* ── Nomor Soal ── */}
      <div>
        <p className="text-xs font-semibold text-gray-600 mb-2">Nomor Soal</p>
        <div className="flex flex-wrap gap-2 items-start">
          <div className="flex flex-wrap gap-2 flex-1">
            {fields.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIdx(i)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                  i === currentIdx
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={removeSoal}
              disabled={fields.length === 1}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-400 text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Hapus Soal
            </button>
            <button
              type="button"
              onClick={addSoal}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-orange-400 text-white hover:bg-orange-500"
            >
              <span className="text-base leading-none">+</span> Tambah Soal
            </button>
          </div>
        </div>
      </div>

      {/* ── Per-soal form ── */}
      {fields.map((field, i) => (
        <div key={field.id} className={i === currentIdx ? "space-y-4" : "hidden"}>
          <p className="text-xs font-bold text-center text-gray-800 tracking-widest uppercase">Detail Soal</p>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Pertanyaan</label>
            <input
              {...register(`soal.${i}.question`, { required: "Pertanyaan harus diisi", maxLength: { value: 1000, message: "Maks 1000 karakter" } })}
              placeholder="Tulis pertanyaan anda"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.soal?.[i]?.question && <p className="text-xs text-red-500 mt-1">{errors.soal[i]?.question?.message}</p>}
          </div>

          <p className="text-xs font-bold text-center text-gray-800 tracking-widest uppercase">Opsi</p>

          {(["option_a","option_b","option_c","option_d"] as const).map((opt, oi) => (
            <div key={opt}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Opsi {["A","B","C","D"][oi]}</label>
              <input
                {...register(`soal.${i}.${opt}`, { required: `Opsi ${["A","B","C","D"][oi]} harus diisi`, maxLength: { value: 1000, message: "Maks 1000 karakter" } })}
                placeholder="Tulis pertanyaan anda"
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.soal?.[i]?.[opt] && <p className="text-xs text-red-500 mt-1">{errors.soal[i]?.[opt]?.message}</p>}
            </div>
          ))}

          <p className="text-xs font-bold text-center text-gray-800 tracking-widest uppercase">Jawaban Benar</p>

          <div className="relative">
            <select
              {...register(`soal.${i}.correct_option`, { required: "Jawaban benar harus dipilih" })}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">Pilih jawaban benar</option>
              <option value="Opsi A">Opsi A</option>
              <option value="Opsi B">Opsi B</option>
              <option value="Opsi C">Opsi C</option>
              <option value="Opsi D">Opsi D</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
            {errors?.soal?.[i]?.correct_option && <p className="text-xs text-red-500 mt-1">{errors.soal[i]?.correct_option?.message}</p>}
          </div>

          <div className="p-3 rounded-lg border" style={{ backgroundColor: 'rgba(255, 130, 39, 0.3)', borderColor: '#FF8227' }}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Poin</label>
            <p className="text-xs text-gray-600 mb-1">Masukkan nilai poin antara 0 - 100</p>
            <input
              {...register(`soal.${i}.score`, {
                required: "Poin harus diisi",
                pattern: { value: /^[0-9]*$/, message: "Poin harus berupa angka" },
                validate: (value) => {
                  const num = Number(value);
                  if (isNaN(num) || num < 0 || num > 100) return "Poin harus antara 0 - 100";
                  return true;
                },
              })}
              type="text"
              placeholder="0"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.soal?.[i]?.score && <p className="text-xs text-red-500 mt-1">{errors.soal[i]?.score?.message}</p>}
          </div>
        </div>
      ))}

      {/* ── Footer ── */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-lg transition-colors ${
            isPending
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-900 text-white hover:bg-blue-800"
          }`}
        >
          {isPending ? (
            <>
              <svg className="animate-spin w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm-5 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3-10H5V5h10v4z"/>
              </svg>
              SIMPAN
            </>
          )}
        </button>
      </div>
    </form>
  );

  return (
    <Modal
      label="Buat Pertanyaan Learned"
      content={content}
      isOpen={createPGLearnedForms.isOpen}
      close={createPGLearnedForms.close}
    />
  );
};

export default CreatePGLearnedForms;