"use client";

import React, { useState } from "react";

import TopicKWLCard from "./TopicKWLCard";
import useCreateQuizModal from "@/app/hooks/useCreateQuizModal";
import useDeleteTopicConfirmation from "@/app/hooks/useDeleteTopicConfirmation";
import DeleteTopicConfirmation from "../message/DeleteTopicConfirmation";
import useChooseKnowType from "@/app/hooks/useChooseKnowType";
import useChooseWTKType from "@/app/hooks/useChooseWTKType";
import useChooseLearnedType from "@/app/hooks/useChooseLearnedType";
import CreateTopicForms from "../forms/CreateTopicForms";
import { useDeleteAuth, useGetAuth, usePatchAuth } from "@/app/lib/api/useAuth";
import useSuccessDeleteTopic from "@/app/hooks/useSuccessDeleteTopic";
import useDeleteKWLConfirmation from "@/app/hooks/useDeleteKWLConfirmation";
import useSuccessDeleteKWL from "@/app/hooks/useSuccessDeleteKWL";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import DropdownMenuButton, { DropdownItem } from "../button/DropdownMenuButton";
import { HiEye, HiEyeOff, HiPencil, HiTrash, HiArchive } from "react-icons/hi";
import useHideTopicConfirmation from "@/app/hooks/useHideTopicConfirmation";
import useSuccessHideTopic from "@/app/hooks/useSuccessHideTopic";
import useCreateTopicForms from "@/app/hooks/useCreateTopicForms";
import useArchiveTopicConfirmation from "@/app/hooks/useArchiveTopicConfirmation";
import useSuccessArchiveTopic from "@/app/hooks/useSuccessArchiveTopic";

interface TopicCardProps {
  id: number;
  topic: string;
  description: string;
  learning_objective: string;
  enable_open_time: boolean;
  enable_close_time: boolean;
  open_time: string;
  close_time: string;
  knowId: number;
  wtkId: number;
  learnedId: number;
  knowType: string;
  wtkType: string;
  learnedType: string;
  updated: string;
  isHidden: boolean;
  isArchived: boolean;
  handleKnow: () => void;
  handleWTK: () => void;
  handleLearned: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({
  id,
  topic,
  description,
  learning_objective,
  enable_open_time,
  enable_close_time,
  open_time,
  close_time,
  knowId,
  wtkId,
  learnedId,
  knowType,
  wtkType,
  learnedType,
  updated,
  isHidden,
  isArchived,
  handleKnow,
  handleWTK,
  handleLearned,
}) => {
  const pathname = usePathname();
  const params = useParams();
  const createQuizModal = useCreateQuizModal();
  const deleteTopicConfirmation = useDeleteTopicConfirmation();
  const chooseKnowType = useChooseKnowType();
  const chooseWTKType = useChooseWTKType();
  const chooseLearnedType = useChooseLearnedType();
  const successDeleteTopic = useSuccessDeleteTopic();
  const successDeleteKWL = useSuccessDeleteKWL();
  const hideTopicConfirmation = useHideTopicConfirmation();
  const archiveTopicConfirmation = useArchiveTopicConfirmation();
  const successHideTopic = useSuccessHideTopic();
  const SuccessArchiveTopic = useSuccessArchiveTopic();
  const createTopicForms = useCreateTopicForms();

  const [show, setShow] = useState(false);

  const { mutate: mutateTopic } = useDeleteAuth(
    `/api/course/topic/${id}`,
    "lecturer"
  );

  const handleDeleteTopic = () => {
    mutateTopic({
      onSuccess: () => {},
      onError: () => {},
    });
    successDeleteTopic.open();
  };

  const { mutate: mutateKnow } = useDeleteAuth(
    `/api/know/${knowType}/${id}`,
    "lecturer"
  );

  const handleDeleteKnow = () => {
    mutateKnow({
      onSuccess: () => {},
      onError: () => {},
    });
    successDeleteKWL.open();
  };

  const { mutate: mutateWTK } = useDeleteAuth(
    `/api/wtk/${wtkType === "checkbox" ? "poll" : "essay"}/${id}`,
    "lecturer"
  );

  const handleDeleteWTK = () => {
    mutateWTK({
      onSuccess: () => {},
      onError: () => {},
    });
    successDeleteKWL.open();
  };

  const { mutate: mutateLearned } = useDeleteAuth(
    `/api/learned/${learnedType}/${id}`,
    "lecturer"
  );

  const handleDeleteLearned = () => {
    mutateLearned({
      onSuccess: () => {},
      onError: () => {},
    });
    successDeleteKWL.open();
  };

  const { mutate, isSuccess } = usePatchAuth(
    `/api/course/topic/${id}`,
    "lecturer"
  );

  const onSubmitHidden = async () => {
    const postData = { is_hidden: !isHidden };
    mutate(
      { body: postData },
      {
        onSuccess: () => {
          successHideTopic.open(!isHidden);
          hideTopicConfirmation.close();
        },
      }
    );
  };

  const onSubmitArchived = async () => {
    const postData = { is_archived: !isArchived };
    mutate(
      { body: postData },
      {
        onSuccess: () => {
          SuccessArchiveTopic.open(!isArchived);
          archiveTopicConfirmation.close();
        },
      }
    );
  };

  const userMenuItems: DropdownItem[] = [
    {
      nama: "Edit",
      buttonIcon: <HiPencil />,
      warna: "default",
      onClick: () => {
        const data = {
          name: topic,
          description,
          learning_objective,
          enable_open_time,
          enable_close_time,
          open_time,
          close_time,
          id,
        };
        createTopicForms.open(false, data);
      },
    },
    {
      nama: isHidden ? "Show" : "Hide",
      buttonIcon: isHidden ? <HiEye /> : <HiEyeOff />,
      warna: "default" as const,
      onClick: () => hideTopicConfirmation.open(id, isHidden, () => onSubmitHidden()),
    },
    {
      nama: isArchived ? "Unarchive" : "Archive",
      buttonIcon: <HiArchive />,
      warna: "default" as const,
      onClick: () => archiveTopicConfirmation.open(id, isArchived, () => onSubmitArchived()),
    },
    {
      nama: "Delete",
      buttonIcon: <HiTrash />,
      warna: "danger" as const,
      onClick: () =>
        deleteTopicConfirmation.open(id, () => handleDeleteTopic()),
    },
  ];

  return (
    <>
      <div className="pb-2 flex items-center justify-center">
        <div
          className={`h-auto w-96 w-[400px] md:w-[400px] lg:w-[500px] relative rounded-lg shadow ${
            isHidden ? "bg-gray-300" : "bg-white"
          }`}
        >
          <div className="flex justify-between">
            <div className="pl-5">
              <div className="flex item-center">
                {/* right */}
                {!show && (
                  <svg
                    onClick={() => setShow(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 cursor-pointer pr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                      clipRule={"evenodd"}
                    />
                  </svg>
                )}

                {/* down */}
                {show && (
                  <svg
                    onClick={() => setShow(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 cursor-pointer pr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule={"evenodd"}
                    />
                  </svg>
                )}
                <div className="flex justify-between"></div>
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${params.id_course}/analisis/${id}`}>
                  <span className="text-black text-base font-bold hover:underline">
                    {topic}
                    <br />
                  </span>
                </Link>
              </div>
              <span className="text-black text-xs font-normal pl-7">
                {description}
              </span>
            </div>
            {/* menu */}
            <div className="mt-1 me-4">
              <DropdownMenuButton items={userMenuItems} />
            </div>
          </div>

          {show ? (
            <div className="pl-12 flex flex-col">
              {knowId > 0 && (
                <TopicKWLCard
                  label="Know"
                  imageFile="know"
                  id={knowId}
                  topicId={id}
                  knowId={knowId}
                  kwlType={knowType}
                  handleEdit={handleKnow}
                  handleNext={() => {
                    handleDeleteKnow();
                  }}
                />
              )}
              {wtkId > 0 && (
                <TopicKWLCard
                  label="Want to Know"
                  imageFile="wtk"
                  id={wtkId}
                  topicId={id}
                  wtkId={wtkId}
                  kwlType={wtkType}
                  handleEdit={handleWTK}
                  handleNext={() => {
                    handleDeleteWTK();
                  }}
                />
              )}
              {learnedId > 0 && (
                <TopicKWLCard
                  label="Learned"
                  imageFile="learned"
                  id={learnedId}
                  topicId={id}
                  learnedId={learnedId}
                  kwlType={learnedType}
                  handleEdit={handleLearned}
                  handleNext={() => {
                    handleDeleteLearned();
                  }}
                />
              )}
            </div>
          ) : null}

          <div className="flex justify-between items-center py-1 px-3">
            <span className="text-black text-xs font-light pl-9">
              updated at: {updated}
            </span>

            <button
              onClick={() => {
                createQuizModal.open(knowId, wtkId, learnedId, id);
              }}
              className="flex items-center gap-1 border border-dark-accent text-dark-accent text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-dark-accent hover:text-white transition mb-2"
            >
              <span className="text-base leading-none">+</span> Pertanyaan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicCard;
