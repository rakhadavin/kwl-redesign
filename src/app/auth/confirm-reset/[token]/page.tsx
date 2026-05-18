"use client";
import UnavailableMessage from "@/app/components/message/UnavailableMessage";
import MessageModal from "@/app/components/modals/MessageModal";
import ConfirmationModal from "@/app/components/modals/peserta/ConfirmationModal";
import SuccessModal from "@/app/components/modals/peserta/SuccessModal";
import Spinner from "@/app/components/spinner/spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ResetPassword = {
  new_password: string;
  confirm_password: string;
};
const ConfirmResetPage = ({ params }: { params: { token: string } }) => {
  const token = params.token;
  const [showModal, setShowModal] = useState(false);

  const handleNext = () => {
    window.location.href = "/";
  }
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { isValid, errors },
  } = useForm<ResetPassword>();

  const {status, data} = useQuery({
    queryKey: ["reset"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/reset-password/${token}`
      );
      return data;
    },
  });

  const mutation = useMutation({
    mutationKey: ["reset"],
    mutationFn: async (body: any) => {
      const modified_body = {
        new_password: body.new_password,
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/reset-password/${token}`,
        modified_body
      );
      return data;
    },
    onError: (error: any) => {
  
      if (error.response.status === 500) {
        setError("root.serverError", {
          type: "manual",
          message: "Terjadi kesalahan pada server",
        });
      }
   
    },
    onSuccess: () => {
      setShowModal(true);
    },
  });

  const onSubmit = (data: ResetPassword) => {
    mutation.mutate(data);
  };



  return (
    <>
    {status === "success" ? (
    <div className="flex overflow-hidden relative flex-col pt-20 w-full min-h-[832px] max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0f02501e97f7324d122db872aa878238d070e9da8f9a6e9789c6d56882f3650?apiKey=e886632e3a6843f9a71f8f519391ca26&"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative justify-center items-center self-center px-16 py-7 mt-44 max-w-full text-xs bg-white rounded-lg w-[488px] max-md:px-5 max-md:mt-10">
        <div className="flex flex-col max-w-full w-[400px]">
          <div className="self-center text-xl font-bold text-center text-blue-900">
            Lupa Password
          </div>
          <hr className="h-px w-4/5 self-center my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center mt-6 text-black"
          >
            <div className="font-bold">Password Baru </div>
            <input
              {...register("new_password", { required: true })}
              type="password"
              id="new_password"
              className="justify-center py-1 mt-2 whitespace-nowrap rounded border border-solid border-neutral-400"
            ></input>


            <div className="font-bold mt-4">Konfirmasi Password Baru </div>
            <input
              {...register("confirm_password", {
                required: true,
                validate: (value) => value === getValues("new_password") || "Password baru tidak sama dengan konfirmasi password baru",
              })}
              type="password"
              id="confirm_password"
              className="justify-center py-1 mt-2 whitespace-nowrap rounded border border-solid border-neutral-400"
            ></input>

            {errors.root?.serverError && (
              <div className="text-red-500 py-1">
                {errors.root.serverError.message}
              </div>
            )}

            {
              errors.confirm_password && (
                <div className="text-red-500 py-1">
                  {errors.confirm_password.message}
                </div>
              )
            }

      <SuccessModal
        open={showModal}
        description="Password berhasil direset. Silahkan login ulang."
        closeText="Kembali"
        handleConfirm={handleNext}
      />


            <div className="flex flex-row mt-14 gap-10 text-center text-white whitespace-nowrap max-md:mt-10">
              <button className="px-10 py-2.5 w-[50%] bg-amber-300 rounded-lg max-md:px-5">
                <Link href={"/"}>kembali</Link>
              </button>

              <button 
                type="submit"
                className="px-10 py-2.5 w-[50%] bg-green-400 rounded-lg max-md:px-5 disabled:cursor-not-allowed"
                disabled={mutation.isPending}
              >
                selesai
              </button> 
            </div>
          </form>
        </div>
      </div>
    </div>
    ): 
    status === "pending" ? (
      <Spinner/>
    ) : (
      <div className="flex justify-center items-center min-h-screen">
      <UnavailableMessage
        title="Token tidak valid"
        message="Token yang Anda masukkan tidak valid. Silahkan coba kembali"
        image="/sad_kowl.png"
      />
      </div>
    )
    
    
    }


</>   
  );
 
};

export default ConfirmResetPage;


// type ResetPassword = {
//   old_password: string;
//   new_password: string;
//   confirm_password: string;
// };
// const ConfirmResetPage = ({ params }: { params: { token: string } }) => {
//   const token = params.token;
//   const [showModal, setShowModal] = useState(false);

//   const handleNext = () => {
//     window.location.href = "/";
//   }
//   const {
//     register,
//     handleSubmit,
//     setError,
//     getValues,
//     formState: { isValid, errors },
//   } = useForm<ResetPassword>();

//   const {status, data} = useQuery({
//     queryKey: ["reset"],
//     queryFn: async () => {
//       const { data } = await axios.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/reset-password/${token}`
//       );
//       return data;
//     },
//   });

//   const mutation = useMutation({
//     mutationKey: ["reset"],
//     mutationFn: async (body: any) => {
//       const modified_body = {
//         new_password: body.new_password,
//       };
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/reset-password/${token}`,
//         modified_body
//       );
//       return data;
//     },
//     onError: (error: any) => {
  
//       if (error.response.status === 500) {
//         setError("root.serverError", {
//           type: "manual",
//           message: "Terjadi kesalahan pada server",
//         });
//       }
//       if (error.response.status === 400) {
    
//         if (error.response.data.message === "Old password is incorrect") {
//           setError("root.serverError", {
//             type: "manual",
//             message: "Password lama salah",
//           });
//         }
       
//       }
//     },
//     onSuccess: () => {
//       setShowModal(true);
//     },
//   });

//   const onSubmit = (data: ResetPassword) => {
//     mutation.mutate(data);
//   };



//   return (
//     <>
//     {status === "success" ? (
//     <div className="flex overflow-hidden relative flex-col pt-20 w-full min-h-[832px] max-md:max-w-full">
//       <img
//         loading="lazy"
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0f02501e97f7324d122db872aa878238d070e9da8f9a6e9789c6d56882f3650?apiKey=e886632e3a6843f9a71f8f519391ca26&"
//         className="object-cover absolute inset-0 size-full"
//       />
//       <div className="flex relative justify-center items-center self-center px-16 py-7 mt-44 max-w-full text-xs bg-white rounded-lg w-[488px] max-md:px-5 max-md:mt-10">
//         <div className="flex flex-col max-w-full w-[400px]">
//           <div className="self-center text-xl font-bold text-center text-blue-900">
//             Lupa Password
//           </div>
//           <hr className="h-px w-4/5 self-center my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col justify-center mt-6 text-black"
//           >
//             <div className="font-bold">Password Baru </div>
//             <input
//               {...register("new_password", { required: true })}
//               type="password"
//               id="new_password"
//               className="justify-center py-1 mt-2 whitespace-nowrap rounded border border-solid border-neutral-400"
//             ></input>

//             <div className="font-bold mt-4">Password Lama </div>
//             <input
//               {...register("old_password", { required: true ,
//                 validate: (value) => value !== getValues("new_password") || "Password baru tidak boleh sama dengan password lama"
//               })
              
//               }
//               type="password"
//               id="old_password"
//               className="justify-center py-1 mt-2 whitespace-nowrap rounded border border-solid border-neutral-400"
//             ></input>

//             <div className="font-bold mt-4">Konfirmasi Password Baru </div>
//             <input
//               {...register("confirm_password", {
//                 required: true,
//                 validate: (value) => value === getValues("new_password") || "Password baru tidak sama dengan konfirmasi password baru",
//               })}
//               type="password"
//               id="confirm_password"
//               className="justify-center py-1 mt-2 whitespace-nowrap rounded border border-solid border-neutral-400"
//             ></input>

//             {errors.root?.serverError && (
//               <div className="text-red-500 py-1">
//                 {errors.root.serverError.message}
//               </div>
//             )}

//             {errors.old_password && (
//               <div className="text-red-500 py-1">
//                 {errors.old_password.message}
//               </div>
//             )}

//             {
//               errors.confirm_password && (
//                 <div className="text-red-500 py-1">
//                   {errors.confirm_password.message}
//                 </div>
//               )
//             }

//       <SuccessModal
//         open={showModal}
//         description="Password berhasil direset. Silahkan login ulang."
//         closeText="Kembali"
//         handleConfirm={handleNext}
//       />


//             <div className="flex flex-row mt-14 gap-10 text-center text-white whitespace-nowrap max-md:mt-10">
//               <button className="px-10 py-2.5 w-[50%] bg-amber-300 rounded-lg max-md:px-5">
//                 <Link href={"/"}>kembali</Link>
//               </button>

//               <button 
//                 type="submit"
//                 className="px-10 py-2.5 w-[50%] bg-green-400 rounded-lg max-md:px-5 disabled:cursor-not-allowed"
//                 disabled={mutation.isPending}
//               >
//                 selesai
//               </button> 
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//     ): 
//     status === "pending" ? (
//       <Spinner/>
//     ) : (
//       <div className="flex justify-center items-center min-h-screen">
//       <UnavailableMessage
//         title="Token tidak valid"
//         message="Token yang Anda masukkan tidak valid. Silahkan coba kembali"
//         image="/sad_kowl.png"
//       />
//       </div>
//     )
    
    
//     }


// </>   
//   );
 
// };

// export default ConfirmResetPage;
