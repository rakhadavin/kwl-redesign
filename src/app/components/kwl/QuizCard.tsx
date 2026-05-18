import React from "react";
import MiniButton from "../button/peserta/MiniButton";
import QuizOptionContainer from "./QuizOptionContainer";

// TODO: Implement image display

interface QuizCardProps {
    stage:string;
    topic: string;
    question: string;
    image: string;
    answers: string[];
    prev: () => void;
    next: () => void;
    isHidden:string;
}

const QuizCard: React.FC<QuizCardProps> = ({
    stage,
    topic,
    question,
    image,
    answers,
    prev,
    next,
    isHidden,
}) => {
    return (
        <div className={` ${isHidden} flex items-center justify-center text-center`}>

            <div className="h-auto w-96 w-[90%] md:w-[80%] lg:w-[800px] relative bg-white rounded-lg shadow p-8 justify-center">
            
                <div className="py-4 inline-flex text-left items-center">
                    <img src={image} width="64"/>
                    <div className="px-4">
                    <h1 className="text-xl font-extrabold">{stage}</h1>
                    <h2 className="text-xs">{topic}</h2>
                    </div>
                </div>

                <div id= "question" className="my-2 mb-6">
                    <span className="text-sm"> {question} </span>
                </div> 

                <QuizOptionContainer 
                    contents={answers}
                />

                <div className="inline-flex text-left items-center">

                    <button onClick={prev} className="text-xs text-white font-bold w-[120px] p-1 mt-4 ml-8 shadow text-center bg-yellow-400 rounded">
                        kembali
                    </button>

                    <button onClick={next} className="text-xs text-white font-bold w-[120px] p-1 mt-4 ml-8 shadow text-center bg-green-500 rounded">
                        selanjutnya
                    </button> 

                </div>
                
            </div>

        </div>
    );
};

export default QuizCard;