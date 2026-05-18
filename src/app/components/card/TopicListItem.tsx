"use client";

import React from "react";
import { useDeleteAuth, usePatchAuth } from "@/app/lib/api/useAuth";
import DropdownMenuButton, { DropdownItem } from "../button/DropdownMenuButton";
import { HiEye, HiEyeOff, HiPencil, HiTrash, HiArchive } from "react-icons/hi";
import useDeleteTopicConfirmation from "@/app/hooks/useDeleteTopicConfirmation";
import useSuccessDeleteTopic from "@/app/hooks/useSuccessDeleteTopic";
import useHideTopicConfirmation from "@/app/hooks/useHideTopicConfirmation";
import useSuccessHideTopic from "@/app/hooks/useSuccessHideTopic";
import useArchiveTopicConfirmation from "@/app/hooks/useArchiveTopicConfirmation";
import useSuccessArchiveTopic from "@/app/hooks/useSuccessArchiveTopic";
import useCreateTopicForms from "@/app/hooks/useCreateTopicForms";

interface TopicListItemProps {
  id: number;
  name: string;
  description: string;
  learning_objective: string;
  enable_open_time: boolean;
  enable_close_time: boolean;
  open_time: string;
  close_time: string;
  is_hidden: boolean;
  is_archived: boolean;
  know: Array<{ id: number; type: string }>;
  wtk: Array<{ id: number; type: string }>;
  learned: Array<{ id: number; type: string }>;
  isSelected: boolean;
  onSelect: () => void;
}

const TopicListItem: React.FC<TopicListItemProps> = ({
  id, name, description, learning_objective,
  enable_open_time, enable_close_time, open_time, close_time,
  is_hidden, is_archived, know, wtk, learned,
  isSelected, onSelect,
}) => {
  const deleteTopicConfirmation = useDeleteTopicConfirmation();
  const successDeleteTopic      = useSuccessDeleteTopic();
  const hideTopicConfirmation   = useHideTopicConfirmation();
  const successHideTopic        = useSuccessHideTopic();
  const archiveTopicConfirmation = useArchiveTopicConfirmation();
  const SuccessArchiveTopic     = useSuccessArchiveTopic();
  const createTopicForms        = useCreateTopicForms();

  const { mutate: mutateTopic } = useDeleteAuth(`/api/course/topic/${id}`, "lecturer");
  const { mutate }              = usePatchAuth(`/api/course/topic/${id}`, "lecturer");

  const handleDeleteTopic = () => {
    mutateTopic({ onSuccess: () => {}, onError: () => {} });
    successDeleteTopic.open();
  };

  const onSubmitHidden = () => {
    mutate(
      { body: { is_hidden: !is_hidden } },
      { onSuccess: () => { successHideTopic.open(!is_hidden); hideTopicConfirmation.close(); } },
    );
  };

  const onSubmitArchived = () => {
    mutate(
      { body: { is_archived: !is_archived } },
      { onSuccess: () => { SuccessArchiveTopic.open(!is_archived); archiveTopicConfirmation.close(); } },
    );
  };

  const questionCount =
    (know.length > 0 ? 1 : 0) +
    (wtk.length > 0 ? 1 : 0) +
    (learned.length > 0 ? 1 : 0);

  const menuItems: DropdownItem[] = [
    {
      nama: "Edit",
      buttonIcon: <HiPencil />,
      warna: "default",
      onClick: () => createTopicForms.open(false, {
        name, description, learning_objective,
        enable_open_time, enable_close_time, open_time, close_time, id,
      }),
    },
    {
      nama: is_hidden ? "Show" : "Hide",
      buttonIcon: is_hidden ? <HiEye /> : <HiEyeOff />,
      warna: "default" as const,
      onClick: () => hideTopicConfirmation.open(id, is_hidden, () => onSubmitHidden()),
    },
    {
      nama: is_archived ? "Unarchive" : "Archive",
      buttonIcon: <HiArchive />,
      warna: "default" as const,
      onClick: () => archiveTopicConfirmation.open(id, is_archived, () => onSubmitArchived()),
    },
    {
      nama: "Delete",
      buttonIcon: <HiTrash />,
      warna: "danger" as const,
      onClick: () => deleteTopicConfirmation.open(id, () => handleDeleteTopic()),
    },
  ];

  return (
    <div
      onClick={onSelect}
      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition-colors ${
        isSelected
          ? "bg-blue-50 border-blue-900"
          : "bg-white border-gray-200 hover:bg-gray-50"
      } ${is_hidden ? "opacity-60" : ""}`}
    >
      <span className={`font-bold text-sm ${isSelected ? "text-blue-900" : "text-black"}`}>
        {name}
      </span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
          </svg>
          {questionCount > 0 ? `${questionCount} Pertanyaan` : "Belum ada pertanyaan"}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenuButton items={menuItems} />
        </div>
      </div>
    </div>
  );
};

export default TopicListItem;
