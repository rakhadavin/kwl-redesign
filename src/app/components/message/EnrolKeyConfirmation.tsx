import useEnrolKeyConfirmation from "@/app/hooks/useEnrolKeyConfirmation";
import Modal from "../modals/Modal";
import { useForm } from "react-hook-form";
import { usePostAuth } from "@/app/lib/api/useAuth";
import useSuccessEnrolCourse from "@/app/hooks/useSuccessEnrolCourse";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

type Enroll = {
  course_id: number;
  student_id: number;
  enrollment_key: string;
};

type FormValues = {
  enrollment_key?: string;
};

const EnrolKeyConfirmation = () => {
  const enrolKeyConfirmation = useEnrolKeyConfirmation();
  const successEnrolCourse = useSuccessEnrolCourse();
  const [serverError, setServerError] = useState<string>("");

  const { mutate, isSuccess, isPending, error } = usePostAuth("/api/course/enroll-student", "enroll");
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState, setError } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    setServerError("");
    
    const body: Enroll = {
      course_id: enrolKeyConfirmation.courseId!, 
      student_id: enrolKeyConfirmation.studentId!,
      enrollment_key: data.enrollment_key || "",
    };
    
    mutate(
      { body: body },
      {
        onSuccess: () => {
          handleNext();
        },
        onError: (error: any) => {
          if (error?.response?.data?.message) {
            const errorMessage = error.response.data.message;
            
            if (errorMessage.includes("Invalid enrollment key") || 
                errorMessage.includes("Enrollment key is required")) {
              setError("enrollment_key", {
                type: "server",
                message: errorMessage
              });
            } else if (errorMessage.includes("already enrolled")) {
              setServerError("Anda sudah terdaftar dalam course ini");
            } else {
              setServerError(errorMessage);
            }
          } else if (error?.response?.data?.enrollment_key) {
            setError("enrollment_key", {
              type: "server",
              message: error.response.data.enrollment_key[0]
            });
          } else {
            setServerError("Terjadi kesalahan. Silakan coba lagi.");
          }
        },
      }
    );
  };

  const handleNext = () => {
    successEnrolCourse.open();
    enrolKeyConfirmation.close();
    setServerError("");
  };

  const handleClose = () => {
    setServerError("");
    form.reset();
    enrolKeyConfirmation.close();
  };

  const content = (
    <div>
      <p className="text-main font-semibold font-sm py-2">
        Silakan masukkan Enrollment Key
      </p>
      
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}
      
      <form>
        <div className="mb-4">
          <label htmlFor="enrollment_key" className="text-xs font-bold">
            Enrollment Key
          </label>
          <input
            id="enrollment_key"
            {...register("enrollment_key", {
              required: {
                value: true,
                message: "Enrollment Key harus diisi",
              },
              maxLength: {
                value: 100,
                message: "Enrollment Key maksimal 100 karakter",
              },
            })}
            type="text"
            className={`shadow appearance-none border border-solid rounded w-full text-neutral-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${
              errors.enrollment_key ? 'border-red-500' : 'border-neutral-400'
            }`}
            disabled={isPending}
          />
          {errors.enrollment_key && (
            <p className="text-red-500 text-xs mt-1">Invalid Enrollment Key</p>
          )}
        </div>
        
        <button
          type="button"
          className={`mb-1 w-full border-2 font-bold text-xs py-2 px-2 rounded-xl transition-colors ${
            isPending 
              ? 'bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-transparent border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent'
          }`}
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Selanjutnya'}
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );

  return (
    <div>
      <Modal
        label="Konfirmasi Enrollment Key"
        content={content}
        isOpen={enrolKeyConfirmation.isOpen}
        close={handleClose}
      />
    </div>
  );
};

export default EnrolKeyConfirmation;