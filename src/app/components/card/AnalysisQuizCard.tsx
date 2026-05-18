type QuizProps = {
    accuracy: string;
    question: string;
    index: number;
};

type QuizParentProps = {
    accuracy_data: string;
};

const QuizParent: React.FC<QuizParentProps> = ({ accuracy_data }: any) => {
    return (
        <div className="flex flex-col gap-3 mt-12 w-[70%]">
            {
                accuracy_data?.map((data: any, index: number) => (
                    <Quiz key={index} accuracy={data.accuracy} question={data.question} index={index+1} />
                ))
            }
        </div>
    );
};

const Quiz: React.FC<QuizProps> = ({ accuracy, question, index }: any) => {
    const accuracy_color = accuracy >= 70 ? "text-green-400" : "text-red-400";
    return (
        <div className="bg-white rounded shadow-md">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-9 py-7 w-full justify-center bg-blue-950 max-md:px-5 max-md:mt-7">
              <div className={`text-4xl font-black text-center ${accuracy_color}`}>
                {accuracy}%
              </div>
              <div className="mt-2.5 text-sm font-medium text-white text-center">
                Keakuratan
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[24%] max-md:ml-0 max-md:w-full text-center">
            <div className="self-stretch my-auto text-2xl font-black text-slate-900 max-md:mt-10">
              Pertanyaan {index}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full text-center">
            <div className="self-stretch my-auto text-xs text-black max-md:mt-10 max-md:mb-5">
             {question}
            </div>
          </div>
        </div>
      </div>
    );
}


export default QuizParent;