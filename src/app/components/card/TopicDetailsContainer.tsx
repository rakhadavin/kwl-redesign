"use client";

import React from 'react';
import { Archive, Pencil, Trash2 } from "lucide-react";
import { usePathname } from 'next/navigation';
import { useGetAuth, useDeleteAuth, usePatchAuth } from '@/app/lib/api/useAuth';
import TopicKWLCard from './TopicKWLCard';
import useEditPGKnowForms from "@/app/hooks/useEditPGknowForms";
import useEditEssayKnowForms from "@/app/hooks/useEditEssayKnowForms";
import useEditCheckboxWTKForms from "@/app/hooks/useEditCheckboxWTKForms";
import useEditEssayWTKForms from "@/app/hooks/useEditEssayWTKForms";
import useEditPGLearnedForms from "@/app/hooks/useEditPGLearnedForms";
import useEditEssayLearnedForms from "@/app/hooks/useEditEssayLearned";
import useSuccessDeleteKWL from "@/app/hooks/useSuccessDeleteKWL";
import useChooseKnowType from "@/app/hooks/useChooseKnowType";
import useChooseWTKType from "@/app/hooks/useChooseWTKType";
import useChooseLearnedType from "@/app/hooks/useChooseLearnedType";
import useDeleteTopicConfirmation from "@/app/hooks/useDeleteTopicConfirmation";
import useSuccessDeleteTopic from "@/app/hooks/useSuccessDeleteTopic";
import useArchiveTopicConfirmation from "@/app/hooks/useArchiveTopicConfirmation";
import useSuccessArchiveTopic from "@/app/hooks/useSuccessArchiveTopic";
import useCreateTopicForms from "@/app/hooks/useCreateTopicForms";

interface TopicDetailsContainerProps {
  topicId?: number;
}

const TopicDetailsContainer = ({ topicId }: TopicDetailsContainerProps) => {
  const pathname = usePathname();
  const courseId = pathname.split("/")[2];

  const editPGKnowForms = useEditPGKnowForms();
  const editEssayKnowForms = useEditEssayKnowForms();
  const editCheckboxWTKForms = useEditCheckboxWTKForms();
  const editEssayWTKForms = useEditEssayWTKForms();
  const editPGLearnedForms = useEditPGLearnedForms();
  const editEssayLearnedForms = useEditEssayLearnedForms();
  const successDeleteKWL = useSuccessDeleteKWL();
  const chooseKnowType = useChooseKnowType();
  const chooseWTKType = useChooseWTKType();
  const chooseLearnedType = useChooseLearnedType();
  const deleteTopicConfirmation = useDeleteTopicConfirmation();
  const successDeleteTopic = useSuccessDeleteTopic();
  const archiveTopicConfirmation = useArchiveTopicConfirmation();
  const successArchiveTopic = useSuccessArchiveTopic();
  const createTopicForms = useCreateTopicForms();

  const { data } = useGetAuth(
    `/api/course/topic/${courseId}/all`,
    "list topic",
  );

  const topic = topicId
    ? data?.topics?.find((t: any) => t.id === topicId)
    : undefined;

  const id = topic?.id ?? 0;
  const knowId = topic?.know?.[0]?.id ?? 0;
  const wtkId = topic?.wtk?.[0]?.id ?? 0;
  const learnedId = topic?.learned?.[0]?.id ?? 0;
  const knowType = topic?.know?.[0]?.type === "reflection" ? "essay" : "quiz";
  const wtkType = topic?.wtk?.[0]?.type === "reflection" ? "essay" : "checkbox";
  const learnedType = topic?.learned?.[0]?.type === "reflection" ? "essay" : "quiz";

  const { mutate: mutateKnow } = useDeleteAuth(`/api/know/${knowType}/${id}`, "lecturer");
  const { mutate: mutateWTK } = useDeleteAuth(`/api/wtk/${wtkType === "checkbox" ? "poll" : "essay"}/${id}`, "lecturer");
  const { mutate: mutateLearned } = useDeleteAuth(`/api/learned/${learnedType}/${id}`, "lecturer");

  const handleDeleteKnow = () => {
    mutateKnow({ onSuccess: () => { }, onError: () => { } });
    successDeleteKWL.open();
  };
  const handleDeleteWTK = () => {
    mutateWTK({ onSuccess: () => { }, onError: () => { } });
    successDeleteKWL.open();
  };
  const handleDeleteLearned = () => {
    mutateLearned({ onSuccess: () => { }, onError: () => { } });
    successDeleteKWL.open();
  };

  const handleKnow = () => {
    if (topic?.know?.[0]?.type === "reflection") editEssayKnowForms.open(id, knowId);
    else editPGKnowForms.open(id, knowId);
  };
  const handleWTK = () => {
    if (topic?.wtk?.[0]?.type === "reflection") editEssayWTKForms.open(id, wtkId);
    else editCheckboxWTKForms.open(id, wtkId);
  };
  const handleLearned = () => {
    if (topic?.learned?.[0]?.type === "reflection") editEssayLearnedForms.open(id, learnedId);
    else editPGLearnedForms.open(id, learnedId);
  };

  const { mutate: mutateTopic } = useDeleteAuth(`/api/course/topic/${id}`, "lecturer");
  const { mutate: mutatePatch } = usePatchAuth(`/api/course/topic/${id}`, "lecturer");

  const handleDeleteTopic = () => {
    mutateTopic({ onSuccess: () => { }, onError: () => { } });
    successDeleteTopic.open();
  };

  const onSubmitArchived = () => {
    mutatePatch(
      { body: { is_archived: !topic?.is_archived } },
      { onSuccess: () => { successArchiveTopic.open(!topic?.is_archived); archiveTopicConfirmation.close(); } },
    );
  };

  const handleEditTopic = () => {
    createTopicForms.open(false, {
      id,
      name: topic.name,
      description: topic.description,
      learning_objective: topic.learning_objective,
      enable_open_time: topic.enable_open_time,
      enable_close_time: topic.enable_close_time,
      open_time: topic.open_time,
      close_time: topic.close_time,
    });
  };

  if (!topic) {
    return (
      <section className="px-4 py-4 rounded-md bg-[#D1D2D7]/20 flex flex-col w-full items-center justify-center h-full  min-h-[300px]" style={{ maxWidth: "var(--search-lg-width, 800px)" }}>
        <p className="text-gray-400 text-sm">Select a topic to view details</p>
      </section>
    );
  }

  return (
    <section className=' px-4 py-4 rounded-md bg-[#D1D2D7]/20 flex flex-col gap-8 w-full items-center justify-center h-full ' style={{ maxWidth: "var(--search-lg-width, 800px)" }}>

      {/* header */}
      <div className='flex flex-col  w-full '>
        {/* Topic Details Header */}
        <div className='flex flex-row w-full justify-evenly gap-24 items-center mb-2'>
          <div className='flex flex-col w-full  items-start justify-start  '>
            <h2 className="text-blue-900 font-bold text-xl text-start uppercase tracking-wide">Topic Details</h2>
            <p className='text-gray-400 text-sm'>{topic?.name ?? 'Topic Name'}</p>
          </div>
          <p className='text-sm text-gray-400 w-max whitespace-nowrap '>updated at : {topic?.updated ?? '-'}</p>
        </div>

        {/* button */}
        <div className='flex md:flex-row  w-full gap-2  items-center justify-center  '>
          <button
            onClick={() => archiveTopicConfirmation.open(id, topic.is_archived, onSubmitArchived)}
            className=' flex-row md:w-full w-max bg-[#F4F4F4] hover:bg-[#17A200]/20 text-gray-700 font-bold py-2 px-4 rounded-md flex items-center gap-2 border border-[#17A200] text-[#17A200] md:text-sm text-xs md:whitespace-nowrap justify-center '>
            <Archive className='text-[#17A200] text-sm h-5 w-5' /> <p className='md:flex  text-[#17A200] '>{topic.is_archived ? "Unarchive Topic" : "Archive Topic"}</p>
          </button>

          <button
            onClick={handleEditTopic}
            className=' flex-row md:w-full w-max bg-[#F4F4F4] hover:bg-[#000C62]/20 text-gray-700 font-bold py-2 px-4 rounded-md flex items-center gap-2 border border-[#000C62] text-[#000C62] md:text-sm text-xs md:whitespace-nowrap justify-center  '>
            <Pencil className='text-[#000C62] text-sm h-5 w-5' /> <p className='lg:flex text-[#000C62]  '>Edit Topic</p>
          </button>

          <button
            onClick={() => deleteTopicConfirmation.open(id, handleDeleteTopic)}
            className=' flex-row md:w-full w-max bg-[#F4F4F4] hover:bg-[#C62828]/20 text-gray-700 font-bold py-2 px-4 rounded-md flex items-center gap-2 border border-[#C62828] text-[#C62828] md:text-sm text-xs md:whitespace-nowrap justify-center '>
            <Trash2 className='text-[#C62828] text-sm h-5 w-5' /> <p className='md:flex text-[#C62828]  '>Delete Topic</p>
          </button>
        </div>
      </div>

      {/* content */}
      <div className=' w-full'>
        {/* information section */}
        <div className='flex flex-row gap-2'>
          <div className='px-4 py-2 border border-gray-200 rounded-md shadow-sm bg-[#D1D2D7]/10 w-full gap-4 flex flex-col'>
            <p className='text-black '>Topic Description</p>
            <p className='text-gray-400 text-justify text-sm'>{topic?.description ?? '-'}</p>
          </div>

          <div className='px-4 py-2 border border-gray-200 rounded-md shadow-sm bg-[#D1D2D7]/10 w-full gap-4 flex flex-col'>
            <p className='text-black '>Topic Objectives</p>
            <p className='text-gray-400 text-justify text-sm'>{topic?.learning_objective ?? '-'}</p>
          </div>
        </div>
      </div>

      {/* KWL Questions */}

      <div className='mt-4 w-full flex flex-col gap-4'>
        <h3 className='text-blue-900 font-bold text-xl text-start uppercase tracking-wide'>KWL QUESTIONS</h3>
        <div className="flex flex-col mb-8 border border-gray-200 shadow-md w-full rounded-md p-4 gap-2 items-center justify-center min-h-[200px]">
          {knowId === 0 && wtkId === 0 && learnedId === 0 && (
            <p className="text-gray-400 text-sm mb-2">Belum ada pertanyaan KWL untuk topik ini.</p>
          )}
          <div className='w-[60%] flex flex-col gap-2'>
            {knowId > 0 ? (
              <TopicKWLCard
                label="Know"
                imageFile="know"
                id={knowId}
                topicId={id}
                knowId={knowId}
                kwlType={knowType}
                handleEdit={handleKnow}
                handleNext={handleDeleteKnow}
              />
            ) : (
              <button
                onClick={() => chooseKnowType.open(id)}
                className="my-1 px-4 py-2 rounded border border-dashed border-orange-300 bg-orange-50 text-orange-400 text-xs font-semibold hover:bg-orange-100 transition-colors w-full text-left"
              >
                + Tambah Pertanyaan Know
              </button>
            )}
            {wtkId > 0 ? (
              <TopicKWLCard
                label="Want to Know"
                imageFile="wtk"
                id={wtkId}
                topicId={id}
                wtkId={wtkId}
                kwlType={wtkType}
                handleEdit={handleWTK}
                handleNext={handleDeleteWTK}
              />
            ) : (
              <button
                onClick={() => chooseWTKType.open(id)}
                className="my-1 px-4 py-2 rounded border border-dashed border-indigo-300 bg-indigo-50 text-indigo-400 text-xs font-semibold hover:bg-indigo-100 transition-colors w-full text-left"
              >
                + Tambah Pertanyaan Want to Know
              </button>
            )}
            {learnedId > 0 ? (
              <TopicKWLCard
                label="Learned"
                imageFile="learned"
                id={learnedId}
                topicId={id}
                learnedId={learnedId}
                kwlType={learnedType}
                handleEdit={handleLearned}
                handleNext={handleDeleteLearned}
              />
            ) : (
              <button
                onClick={() => chooseLearnedType.open(id)}
                className="my-1 px-4 py-2 rounded border border-dashed border-pink-300 bg-pink-50 text-pink-400 text-xs font-semibold hover:bg-pink-100 transition-colors w-full text-left"
              >
                + Tambah Pertanyaan Learned
              </button>
            )}
          </div>
        </div>
      </div>

    </section>
  );
};

export default TopicDetailsContainer;
