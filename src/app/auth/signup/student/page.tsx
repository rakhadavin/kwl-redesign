"use client";

import Spinner from "@/app/components/spinner/spinner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FieldWrapper,
  FormSectionLayout,
  IconBadgeCheck,
  IconGraduation,
  IconUser,
  RegisterPageWrapper,
  RegisterTitle,
  ServerErrorAlert,
  Stepper,
  StepFooterButtons,
  StepInformasiAkun,
  TextInput,
} from "../../../components/register/RegisterFormComponents";

type FormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  nama_lengkap: string;
  domisili: string;
  studentId: string;
  major: string;
  faculty: string;
  semester: string;
  institusi: string;
};

const STEPS = [
  { label: "Informasi Akun", icon: <IconUser /> },
  { label: "Identitas Mahasiswa", icon: <IconGraduation /> },
  { label: "Akun Berhasil Dibuat", icon: <IconBadgeCheck /> },
];

export default function RegisterStudentPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/auth/signin" });
    }
  }, [session]);

  if (session?.userinfo?.role === "student") router.push("/peserta");
  if (session?.userinfo?.role === "lecturer") router.push("/courses");

  const {
    register,
    handleSubmit,
    setError,
    trigger,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormValues>({ mode: "onTouched" });

  const watchedNama = watch("nama_lengkap");
  const watchedDomisili = watch("domisili");
  const watchedNPM = watch("studentId");

  useEffect(() => {
    if (status === "authenticated" && session?.userinfo) {
      if (session.userinfo.email)
        setValue("email", session.userinfo.email, { shouldValidate: true });
      if (session.userinfo.username)
        setValue("username", session.userinfo.username, {
          shouldValidate: true,
        });
      if (session.userinfo.name)
        setValue("nama_lengkap", session.userinfo.name, {
          shouldValidate: true,
        });
    }
  }, [status, session, setValue]);

  const mutation = useMutation({
    mutationKey: ["register_student"],
    mutationFn: (data: FormValues) => {
      const userObj: any = {
        email: data.email,
        username: data.username,
        domisili: data.domisili,
      };
      if (status === "unauthenticated") userObj.password = data.password;

      const body = {
        user: userObj,
        student_id: data.studentId,
        major: data.major,
        faculty: data.faculty,
        term: data.semester,
        institusi: data.institusi,
        nama_lengkap: data.nama_lengkap,
      };

      if (status === "authenticated") {
        return axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/student`,
          body,
          { headers: { Authorization: `Bearer ${session.access}` } },
        );
      }
      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/register/student`,
        body,
      );
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message;
      setError("root.serverError", {
        type: error.response ? "400" : "500",
        message:
          msg === "Email already exists"
            ? "Email sudah terdaftar"
            : msg === "Username already exists"
              ? "Username sudah terdaftar"
              : undefined,
      });
    },
    onSuccess: () => {
      if (status === "authenticated") update({ userinfo: { role: "student" } });
      router.push("/auth/signin");
    },
  });

  const STEP1_FIELDS: (keyof FormValues)[] =
    status === "unauthenticated"
      ? ["email", "username", "password", "confirmPassword"]
      : ["email", "username"];

  const handleNext = async () => {
    const valid = await trigger(STEP1_FIELDS);
    if (valid) setStep(1);
  };

  if (status === "loading") return <Spinner />;

  return (
    <RegisterPageWrapper>
      <RegisterTitle />
      <Stepper current={step} steps={STEPS} />

      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        {/* ── Step 0 ── */}
        {step === 0 && (
          <FormSectionLayout label="Informasi Akun">
            <StepInformasiAkun
              register={register}
              errors={errors}
              getValues={getValues}
              watch={watch}
              isAuthenticated={status === "authenticated"}
              emailDisabled={
                status === "authenticated" && !!session?.userinfo?.email
              }
              usernameDisabled={
                status === "authenticated" && !!session?.userinfo?.username
              }
              onNext={handleNext}
            />
          </FormSectionLayout>
        )}

        {/* ── Step 1 ── */}
        {step === 1 && (
          <FormSectionLayout label="Identitas Mahasiswa">
            <div className="flex flex-col gap-5">
              <FieldWrapper
                label="Nama Lengkap"
                required
                error={errors.nama_lengkap?.message}
              >
                <TextInput
                  {...register("nama_lengkap", {
                    required: "Nama lengkap wajib diisi",
                  })}
                  type="text"
                  placeholder="Nama Lengkap"
                  valid={!!watchedNama && !errors.nama_lengkap}
                  invalid={!!errors.nama_lengkap}
                />
              </FieldWrapper>

              <FieldWrapper
                label="Domisili"
                required
                error={errors.domisili?.message}
              >
                <TextInput
                  {...register("domisili", {
                    required: "Domisili wajib diisi",
                  })}
                  type="text"
                  placeholder="Domisili"
                  valid={!!watchedDomisili && !errors.domisili}
                  invalid={!!errors.domisili}
                />
              </FieldWrapper>

              <FieldWrapper
                label="Nomor Pokok Mahasiswa"
                required
                hint="Minimal 10 karakter numerik"
                error={errors.studentId?.message}
              >
                <TextInput
                  {...register("studentId", {
                    required: "NPM wajib diisi",
                    minLength: {
                      value: 10,
                      message: "NPM minimal 10 karakter",
                    },
                    maxLength: {
                      value: 10,
                      message: "NPM maksimal 10 karakter",
                    },
                  })}
                  type="text"
                  placeholder="ex: 1234567890"
                  valid={!!watchedNPM && !errors.studentId}
                  invalid={!!errors.studentId}
                />
              </FieldWrapper>

              {/* Jurusan + Fakultas */}
              <div className="grid grid-cols-2 gap-4">
                <FieldWrapper
                  label="Jurusan"
                  required
                  error={errors.major?.message}
                >
                  <div className="relative">
                    <select
                      {...register("major", {
                        required: "Jurusan wajib dipilih",
                      })}
                      className="w-full h-10 px-3 pr-8 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="">Pilih Jurusan</option>
                      <option value="Sistem Informasi">Sistem Informasi</option>
                      <option value="Ilmu Komputer">Ilmu Komputer</option>
                      <option value="Teknik Informatika">
                        Teknik Informatika
                      </option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      ▾
                    </span>
                  </div>
                </FieldWrapper>

                <FieldWrapper
                  label="Fakultas"
                  required
                  error={errors.faculty?.message}
                >
                  <div className="relative">
                    <select
                      {...register("faculty", {
                        required: "Fakultas wajib dipilih",
                      })}
                      className="w-full h-10 px-3 pr-8 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="">Pilih Fakultas</option>
                      <option value="Ilmu Komputer">Ilmu Komputer</option>
                      <option value="Teknik">Teknik</option>
                      <option value="Ekonomi">Ekonomi</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      ▾
                    </span>
                  </div>
                </FieldWrapper>
              </div>

              <FieldWrapper
                label="Semester"
                required
                error={errors.semester?.message}
              >
                <TextInput
                  {...register("semester", {
                    required: "Semester wajib diisi",
                  })}
                  type="text"
                  placeholder="ex: 8"
                />
              </FieldWrapper>

              <FieldWrapper
                label="Institusi"
                required
                error={errors.institusi?.message}
              >
                <TextInput
                  {...register("institusi")}
                  type="text"
                  placeholder="ex: 1234567890"
                />
              </FieldWrapper>

              {errors.root?.serverError && (
                <ServerErrorAlert
                  message={
                    errors.root.serverError.type === "400"
                      ? errors.root.serverError.message
                      : undefined
                  }
                />
              )}

              <StepFooterButtons
                onBack={() => setStep(0)}
                isPending={mutation.isPending}
              />
            </div>
          </FormSectionLayout>
        )}
      </form>
    </RegisterPageWrapper>
  );
}
