import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";

type EditStudentFormProps = {
  email: string;
  nama_lengkap: string;
  domisili: string;
  picture_url: string;
  student_id: string;
  major: string;
  faculty: string;
  term: string;
  institusi: string;
  profile_photo: any;
};
const EditStudentForms = ({
  preloadedUser,
  onMutationSuccess,
}: {
  preloadedUser: any;
  onMutationSuccess: () => void;
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const router = useRouter();
  const { data: session } = useSession();
  const preloadedImage = preloadedUser.user.profile_photo;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<EditStudentFormProps>({
    defaultValues: {
      email: preloadedUser.user.email,
      nama_lengkap: preloadedUser.user.nama_lengkap,
      domisili: preloadedUser.user.domisili,
      picture_url: preloadedUser.user.profile_photo,
      student_id: preloadedUser.student_id,
      major: preloadedUser.major,
      faculty: preloadedUser.faculty,
      term: preloadedUser.term,
      institusi: preloadedUser.institusi,
    },
  });

  const submitForm = (data: any) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: (userData: any) => {
      const formData = new FormData();

      formData.append("email", userData.email);
      formData.append("nama_lengkap", userData.nama_lengkap);
      formData.append("domisili", userData.domisili);
      if (userData.profile_photo instanceof File) {
        formData.append("profile_photo", userData.profile_photo);
      }
      formData.append("student_id", userData.student_id);
      formData.append("major", userData.major);
      formData.append("faculty", userData.faculty);
      formData.append("term", userData.term);
      formData.append("institusi", userData.institusi ?? "");

      const data = axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/student`,
        formData,
        { headers: { Authorization: `Bearer ${session?.access}` } },
      );
      return data;
    },
    onError: (error: any) => {
      const parsed_error = error?.response?.data?.message;
      if (parsed_error == "Email already exists") {
        setError("email", {
          type: "manual",
          message: "Email sudah terdaftar",
        });
      }
    },
    onSuccess: () => {
      onMutationSuccess();
    },
  });

  return (
    <div className="flex overflow-hidden relative flex-col pt-20 w-full min-h-[832px] max-md:max-w-full">
      <img
        loading="lazy"
        src="/bg2.png"
        alt=""
        className="object-cover absolute inset-0 size-full"
      />
      <main className="flex relative justify-center items-center self-center px-16 py-11 mt-20 w-full bg-white rounded-lg shadow-sm max-w-[998px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="max-w-full w-[797px]">
          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex gap-5 max-md:flex-col max-md:gap-0"
          >
            <section className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-2 max-md:max-w-full">
                <h1 className="self-end text-2xl font-bold text-center text-blue-900">
                  Edit Profil
                </h1>
                <div className="mt-12 text-xs font-bold text-black max-md:mt-10 max-md:max-w-full">
                  Foto Profil
                </div>
                <div className="flex items-center gap-2 px-16 py-5 mt-2 rounded border border-solid bg-zinc-100 border-neutral-400 max-md:px-5 max-md:max-w-full">
                  <label htmlFor="photo_profile">
                    {preloadedImage && (
                      <label htmlFor="photo_profile">
                        <Image
                          src={
                            preloadedImage.startsWith("http")
                              ? preloadedImage
                              : `${BASE_URL}${preloadedImage}`
                          }
                          alt="Profile Photo"
                          width={60} // replace with your desired width
                          height={60} // replace with your desired height
                          className="rounded-full aspect-square object-cover"
                        />
                      </label>
                    )}
                  </label>
                  <Controller
                    control={control}
                    name={"profile_photo"}
                    rules={{
                      validate: (value) =>
                        !value ||
                        (value && value instanceof File) ||
                        "The selected item must be a file",
                    }}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <input
                          {...field}
                          value={value?.fileName}
                          onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                              onChange(event.target.files[0]);
                            }
                          }}
                          type="file"
                          id="profile_photo"
                        />
                      );
                    }}
                  />
                </div>
                <div className="mt-4 text-xs font-bold text-black max-md:max-w-full">
                  Email
                </div>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                  type="text"
                  className="justify-center py-1.5 mt-2 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 max-md:max-w-full"
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
                <div className="mt-4 text-xs font-bold text-black max-md:max-w-full">
                  Nama Lengkap
                </div>
                <input
                  type="text"
                  {...register("nama_lengkap")}
                  className="justify-center py-2 mt-1 text-xs rounded border border-solid border-neutral-400 max-md:max-w-full"
                />
                <div className="mt-4 text-xs font-bold text-black max-md:max-w-full">
                  Domisili
                </div>
                <input
                  type="text"
                  {...register("domisili")}
                  className="justify-center py-1.5 mt-2 text-xs whitespace-nowrap rounded border border-solid border-neutral-400 max-md:max-w-full"
                />
                <div className="mt-4 text-xs font-bold text-black max-md:max-w-full max-sm:mt-3.5">
                  Nomor Pokok Mahasiswa
                </div>
                <input
                  {...register("student_id")}
                  type="text"
                  className="justify-center py-2 mt-2 text-xs whitespace-nowrap rounded border border-solid border-neutral-400max-md:max-w-full"
                />
              </div>
            </section>
            <section className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow mt-20 text-xs text-black max-md:mt-10 max-sm:mt-1.5">
                <div className="font-bold">Jurusan</div>
                <input
                  {...register("major")}
                  type="text"
                  className="justify-center py-1.5 mt-2 text-xs rounded border border-solid border-neutral-400"
                />
                <div className="mt-4 max-sm:mt-3.5 font-bold">Fakultas</div>
                <input
                  {...register("faculty")}
                  type="text"
                  className="justify-center py-1.5 text-xs mt-2 rounded border border-solid border-neutral-400"
                />
                <div className="mt-4 max-sm:mt-3.5 font-bold">Semester</div>
                <input
                  {...register("term")}
                  type="text"
                  className="justify-center py-2 mt-2 text-xs whitespace-nowrap rounded border border-solid border-neutral-400"
                />
                <div className="mt-4 max-sm:mt-3.5 font-bold">Institusi</div>
                <input
                  {...register("institusi")}
                  type="text"
                  className="justify-center py-1.5 mt-2 text-xs rounded border border-solid border-neutral-400"
                />
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="justify-center items-center px-16 py-3 mt-16 mr-7 ml-6 text-sm text-center text-white whitespace-nowrap rounded-lg bg-blue-950 max-md:px-5 max-md:mx-2.5 max-md:mt-10"
                >
                  Simpan
                </button>

                <button
                  onClick={() => {
                    router.back();
                  }}
                  className="justify-center items-center px-16 py-3 mt-3 mr-7 ml-6 text-sm text-center whitespace-nowrap bg-white rounded-lg border border-solid border-blue-950 text-blue-950 max-md:px-5 max-md:mx-2.5"
                >
                  kembali
                </button>
              </div>
            </section>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditStudentForms;
