import { useState, useEffect } from "react";
import { useGetAuth, usePostAuth, usePutAuth } from "@/app/lib/api/useAuth";
import { useForm } from "react-hook-form";
import Modal from "../modals/Modal";
// import CreateDetailKuesionerForms from "./CreateDetailKuesionerForms";
// import ChooseKuesionerForm from "./ChooseKuesionerForn";
import useCreateKuesionerForms from "@/app/hooks/useCreateKuesionerForms";
import useSuccessCreateKuesioner from "@/app/hooks/useSuccessCreateKuesioner";
import CreateDetailKuesionerForms from "./CreateDetailKuesionerForms";
import ChooseKuesionerForm from "./ChooseKuesionerForms";

type Choices = {
  choice_text: string;
  is_correct: boolean;
};

type Questions = {
  question_text: string;
  time_limit: number;
  score: number;
  choices: Choices[];
  correct_choice?: string;
};

type KuesionerType = {
  title: string;
  description: string;
  question_type: string;
  visibility: "Private" | "Public";
  questions: Questions[];
};

type TemplateType = "Open Ended" | "Multiple Choice" | "Polling" | null;

const CreateKuesionerForms = () => {
  const createKuesionerForms = useCreateKuesionerForms();
  const successCreateKuesioner = useSuccessCreateKuesioner();
  const [step, setStep] = useState<"template" | "details">("template");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(null);

  const form = useForm<KuesionerType>({
    defaultValues: {
      title: "",
      description: "",
      question_type: selectedTemplate || "",
      visibility: "Private",
      questions: [],
    },
  });

  const kuesionerId = createKuesionerForms.kuesionerId;
  const { data: kuesionerData, isLoading } = useGetAuth(
    `/api/kuesioner/${kuesionerId}`,
    `detail kuesioner ${kuesionerId}`,
    false,
    !!kuesionerId
  );

  const { register, handleSubmit, control, formState, setValue, reset } = form;
  const { errors } = formState;
  const { mutate: createMutate } = usePostAuth(
    "/api/kuesioner/",
    "create kuesioner"
  );
  const { mutate: updateMutate } = usePutAuth(
    `/api/kuesioner/${kuesionerId}/`,
    "update kuesioner"
  );

  useEffect(() => {
    if (kuesionerData && kuesionerData.data) {
      const data = kuesionerData.data;
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("question_type", data.question_type);
      setValue("visibility", data.visibility);

      const transformedQuestions = data.questions.map((question: any) => ({
        question_text: question.question_text,
        time_limit: question.time_limit,
        score: question.score,
        choices: question.choices.map((choice: any) => ({
          choice_text: choice.choice_text,
          is_correct: choice.is_correct,
        })),
        ...(data.question_type === "Multiple Choice" && {
          correct_choice:
            question.correct_choice ||
            question.choices
              .findIndex((choice: any) => choice.is_correct)
              .toString(),
        }),
      }));

      setValue("questions", transformedQuestions);

      setSelectedTemplate(data.question_type as TemplateType);
    }
  }, [kuesionerData, kuesionerId, setValue]);

  useEffect(() => {
    if (selectedTemplate) {
      setValue("question_type", selectedTemplate);
    }
  }, [selectedTemplate, setValue]);

  const onSubmit = (data: KuesionerType) => {
    // Transform data untuk format yang sesuai dengan backend
    const transformedData = {
      ...data,
      questions: data.questions.map((question: any, index: number) => {
        const transformedQuestion: any = {
          number: index + 1,
          question_text: question.question_text,
          time_limit: question.time_limit,
          score: question.score,
          choices: question.choices.map((choice: any, index: number) => ({
            choice_text: choice.choice_text,
            is_correct:
              selectedTemplate === "Multiple Choice"
                ? question.correct_choice === index.toString()
                : choice.is_correct,
          })),
        };

        // Tambahkan correct_choice hanya untuk Multiple Choice
        if (selectedTemplate === "Multiple Choice") {
          transformedQuestion.correct_choice = question.correct_choice;
        }

        return transformedQuestion;
      }),
    };

    if (kuesionerId) {
      updateMutate(
        { body: transformedData },
        {
          onSuccess: () => {
            handleNext();
          },
        }
      );
    } else {
      createMutate(
        { body: transformedData },
        {
          onSuccess: () => {
            handleNext();
          },
        }
      );
    }
  };

  const handleNext = () => {
    successCreateKuesioner.open();
    createKuesionerForms.close();
    reset();
    setSelectedTemplate(null);
    if (!kuesionerId) {
      setStep("template");
    }
  };

  const handleTemplateSelect = (template: TemplateType) => {
    setSelectedTemplate(template);
    setStep("details");
  };

  const handleBack = () => {
    setStep("template");
    setSelectedTemplate(null);
  };

  const handleClose = () => {
    reset();
    setSelectedTemplate(null);
    if (!kuesionerId) {
      setStep("template");
    }

    createKuesionerForms.close();
  };

  const FormContent = kuesionerId ? (
    <CreateDetailKuesionerForms
      register={register}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleBack={handleBack}
      handleClose={handleClose}
      selectedTemplate={selectedTemplate}
      create={false}
    />
  ) : step === "template" ? (
    <ChooseKuesionerForm handleSelect={handleTemplateSelect} />
  ) : (
    <CreateDetailKuesionerForms
      register={register}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleBack={handleBack}
      handleClose={handleClose}
      selectedTemplate={selectedTemplate}
      create={true}
    />
  );

  return (
    <div>
      <Modal
        isOpen={createKuesionerForms.isOpen}
        close={handleClose}
        label={
          kuesionerId
            ? `Edit Kuesioner - ${selectedTemplate || "Loading..."}`
            : step === "template"
            ? "Pilih Jenis Kuesioner"
            : `Buat Kuesioner - ${selectedTemplate}`
        }
        content={FormContent}
      />
    </div>
  );
};

export default CreateKuesionerForms;
