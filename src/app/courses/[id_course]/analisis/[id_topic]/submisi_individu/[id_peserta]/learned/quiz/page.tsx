'use client'
import KwlTitle from "@/app/components/kwl/KwlTitle";
import NumberCard from "@/app/components/kwl/NumberCard";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Breadcrumb from "@/app/components/navigation/Breadcrumb";


type QuestionProps = {
    question: string;
    choices: ChoiceProps[];
};

type ChoiceProps = {
    option: string;
    isSelected: boolean;
    isCorrect: boolean;
 
};

type QuestionParentProps = {
    data:any
    currentNum: number;
    topic: string;
    increment: () => void;  
    decrement: () => void;
    setBackOpen: (value: boolean) => void;
};

export default function DetailAnswerLearnedQuizPage() {

   
    const { id_topic, id_peserta, id_course } = useParams();
    const { data: answer } = useGetAuth(`/api/analysis/student-answer-detail/learned/${id_topic}/${id_peserta}`, "checkbox");

    const router = useRouter();

    const [currentNum, setCurrentNum] = useState(1);
    const maxNum = answer?.answers?.length;
    const numList = generateList(maxNum);

  
    function generateList(length: number) {
      const list = [];
      for (let i = 1; i <= length; i++) {
        list.push(i);
      }
      return list;
    }

  
    const [Backopen, setBackOpen] = useState(false);

    const increment = () => {
      if (currentNum < maxNum) {
        setCurrentNum((prevNumber) => prevNumber + 1);
      } else {
        router.back();
      }
    };
  
    const decrement = () => {
      if (currentNum > 1) {
        setCurrentNum((prevNumber) => prevNumber - 1);
      } else {
        router.back();
      }
    };
  
    return (
      <main className="py-5 text-center bg-[url('/bg1.png')] bg-cover min-h-screen">
        <Breadcrumb items={[{ label: "Beranda", href: "/courses" }, { label: answer?.course ?? "...", href: `/courses/${id_course}` }, { label: "Analisis", href: `/courses/${id_course}/analisis` }, { label: answer?.topic ?? "...", href: `/courses/${id_course}/analisis/${id_topic}` }, { label: "Learned" }, { label: "Quiz" }]} />
        <div id="numbers-container" className="m-1 inline-flex text-center">
          {numList.map((num, index) => (
            <button onClick={() => setCurrentNum(num)}>
              <NumberCard number={num} isActive={currentNum === num} />
            </button>
          ))}
        </div>

        {answer &&
          <QuestionParent
            data={answer.answers}
            currentNum={currentNum}
            topic={answer.topic}
            increment={increment}
            decrement={decrement}
            setBackOpen={setBackOpen}
          ></QuestionParent>
        
        }
  
        <br />
  
        <KwlTitle course={answer?.course} topic={answer?.topic} />
        
    

      </main>
    );
  }

const QuestionParent = ({ data, currentNum, topic, increment, decrement, setBackOpen }: QuestionParentProps) => {
    return (
      <div>
    {data?.map(
        (content: { question: string; choices: any[] }, index: number) => (
          <div key={index}>
            <div
              className={` ${
                currentNum === index + 1 ? "" : "hidden"
              } flex items-center justify-center text-center`}
            >
              <div className="h-auto w-96 w-[90%] md:w-[80%] lg:w-[800px] relative bg-white rounded-lg shadow p-8 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="black"
                  className={`w-14 h-14 hover:opacity-80 cursor-pointer ${
                    index === 0 ? "" : "hidden"
                  } absolute top-0 left-0 p-4`}
                  onClick={() => setBackOpen(true)}
                  id="back"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>

                <div className="py-4 inline-flex text-left items-center">
                  <img src={"/learned.png"} width="64" />
                  <div className="px-4">
                    <h1 className="text-xl font-extrabold">{"Learned"}</h1>
                    <h2 className="text-xs">{topic}</h2>
                  </div>
                </div>

                {/* options */}
                <QuestionOptionContainer
                    question={content?.question}
                    choices={content?.choices}
                />

                <div className="inline-flex text-left items-center">
                  <button
                    onClick={decrement}
                    className="text-xs text-white font-bold w-[120px] p-1 mt-4 ml-8 shadow text-center bg-yellow-400 rounded"
                  >
                    kembali
                  </button>

                  <button
                    onClick={increment}
                    className="text-xs text-white font-bold w-[120px] p-1 mt-4 ml-8 shadow text-center bg-green-500 rounded"
                  >
                    selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    
    </div>
    );
}

const QuestionOptionContainer = ({ question, choices }: QuestionProps) => {
    return(
        <div>
            <div id="question" className="my-2 mb-6">
            <span className="text-sm"> {question} </span>
        </div>
        {choices?.map((content:any, index:number) => (
            <div key={index}>
                <QuizOption
                    option={content.option}
                    isSelected={content.isSelected}
                    isCorrect={content.isCorrect}
                />
            </div>
        ))}  
        </div>
 
    );
}
  
const QuizOption = ({ option, isSelected, isCorrect }: ChoiceProps) => {
    return(
      <button id="answer" className={`mb-4 h-auto w-96 w-[90%] md:w-[80%] lg:w-[700px] relative rounded-lg shadow p-3 pl-6 text-left ${isCorrect? (isSelected ? 'bg-green-500' : 'border-2 border-solid border-green-300') : (isSelected ? 'bg-red-500':'bg-white') }`}>
        <span className="text-sm"> {option} </span>
      </button>
    );
  }