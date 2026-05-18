type CheckBoxCardProps = {
    voters: number;
    choice: string;
  };
  
type CheckBoxCardParentProps = {
    question: string;
    choices: string[];
    topic: string;
    stage: string;
  };

const CheckBoxParent: React.FC<CheckBoxCardParentProps> = ({
    question,
    choices,
    topic,
    stage,
  }: any) => {
    return (
      <div className="flex items-center justify-center text-center">
        <div className="h-auto w-96 w-[90%] md:w-[80%] lg:w-[800px] relative bg-white rounded-lg shadow p-8 justify-center">
          <div className="pb-4 pt-8 inline-flex text-left items-center">
            <img src="/wtk.png" width="64" />
            <div className="px-4">
              <h1 className="text-xl font-extrabold">{stage}</h1>
              <h2 className="text-xs">{topic}</h2>
            </div>
          </div>
  
          <div id="question" className="my-2 mb-6">
            <span className="text-sm">{question}</span>
          </div>
  
          {choices?.map((choice: any) => (
            <CheckBox
              key={choice}
              voters={choice?.total_votes}
              choice={choice?.choice}
            />
          ))}
        </div>
      </div>
    );
  };
  
const CheckBox: React.FC<CheckBoxCardProps> = ({ voters, choice }) => {
    return (
      <div
        id="answer"
        className="mb-4 h-auto w-96 w-[90%] md:w-[80%] lg:w-[700px] relative bg-white rounded-lg shadow p-3 pl-6 flex justify-between"
      >
        <span className="text-sm"> {choice} </span>
        <span className="text-sm font-semibold"> {voters} </span>
      </div>
    );
  };
  

export default CheckBoxParent;