'use client';
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";

type buttonProps = {
  disabled?: boolean;
  stage: string;
  onClick: () => void;
  image?: string;
}



const Button = ({ disabled, stage, onClick, image }: buttonProps) => (
  <div className="my-2 px-5 py-2 h-auto w-96 w-[220px] relative bg-white rounded-lg shadow shadow-xl">
    <div className="my-1 pr-2 rounded justify-start items-center">
      <div className="w-56 h-12 relative">
        <button onClick={onClick} disabled={disabled} className="left-[75px] top-[15px] absolute text-black text-xs font-bold hover:underline disabled:hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed">
          {stage}
        </button>
        <div className="w-12 h-12 left-0 top-0 absolute bg-blue-900" />
        <div className="absolute inline-flex left-0 top-0">
          {image ? <img className={`w-12 h-12 ${disabled ? "opacity-50" : "hover:opacity-80"} `} src={image} /> : null}
        </div>
      </div>
    </div>
  </div>
);

const ClassPerformace = () => {
  const params = useParams();

  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetAuth(
    `/api/analysis/student-kwl-recap/${params.id_topic}/${params.id_peserta}`,
    "analisis kwl"
  );


  const handleClicked = (stage:string, type:string) => {
    const lowerCaseStage = stage.toLowerCase();
    router.push(`${pathname}/${lowerCaseStage}/${type}`);
  
    
  };

  const handleFeedback = () => {
    router.push(`${pathname}/feedback`);
  }

  return (
    <>
      <div>
        <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: data?.course ?? "...", href: `/courses/${params.id_course}` }, { label: "Analisis", href: `/courses/${params.id_course}/analisis` }, { label: data?.topic ?? "...", href: `/courses/${params.id_course}/analisis/${params.id_topic}` }, { label: "Performa Individu" }]} variant="light" />
        <div className="bg-solid bg-darker-accent">
          <h1 className="pt-8 text-main font-bold text-xl text-center text-white">
            Analisis Performa Peserta
          </h1>
          <div className="flex justify-center">
            <h2 className="pb-8 text-main font-bold text-lg text-center text-white">
              {data?.course}:
            </h2>
            <span className="ml-2 text-white text-lg">{data?.topic}</span>
          </div>
        </div>
        <h1 className="pt-8 text-dark-accent font-bold text-2xl text-center">
          {data?.student}
        </h1>

        <div className="px-14 pt-14 w-[650px] flex justify-between mx-auto">
          <Partisipasi data={data} handleFeedback={handleFeedback} />
          <AnalisisSubmission data={data} onClick={handleClicked} />
        </div>
        <div className="flex justify-center">
          <button onClick={ () => {
            router.back()
          }
          } className="my-10 w-72 bg-transparent border-2 border-dark-accent hover:bg-dark-accent hover:text-white text-dark-accent font-bold text-xs py-2 px-2 rounded-xl">
            Simpan
          </button>
        </div>
      </div>
    </>
  );
};

const Partisipasi = ({ data, handleFeedback }: { handleFeedback: () => void, data:any }) => {

  var total_completed = data?.wtk?.answered  === true ? 1 : 0;
  var total_completed = data?.know?.answered === true ? 2 : total_completed;
  var total_completed = data?.learned?.answered  === true ? 3 : total_completed;
  
  return (
    <div className="justify center text-center">
      <p className="font-bold text-md">Partisipasi</p>
      <p className="text-sm">Partisipasi peserta dalam KWL</p>
      <p className="pt-12 text-5xl font-bold">{data?.participation_percentage}</p>
      <p className="pb-12 text-darker-accent">{total_completed}/3</p>
      <button onClick={handleFeedback} className="w-44 h-10 bg-main text-white rounded rounded-lg">
        Berikan Feedback
      </button>
    </div>
    
  );
};

const AnalisisSubmission = ({ onClick, data }: { onClick: (stage: string, type:string) => void, data:any }) => {
  const isKnowDisabled = data?.know?.answered === false;
  const isWtkDisabled = data?.wtk?.answered === false;
  const isLearnedDisabled = data?.learned?.answered === false;

  const knowType = data?.know?.type;
  const wtkType = data?.wtk?.type;
  const learnedType = data?.learned?.type;

  return (
    <div className="text-center">
      <p className="font-bold text-md">Analisis Submission</p>
      <p className="text-sm">Pilih tipe Submisi</p>
      <Button stage="Know" onClick={() => onClick("Know",knowType)} image="/know.png" disabled={isKnowDisabled} />
      <Button stage="Want to Know" onClick={() => onClick("Wtk",wtkType)} image="/wtk.png" disabled={isWtkDisabled} />
      <Button stage="Learned" onClick={() => onClick("Learned",learnedType)} image="/learned.png" disabled={isLearnedDisabled} />
      
    </div>
  );
};


export default ClassPerformace;
