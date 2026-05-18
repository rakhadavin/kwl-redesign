import exp from "constants";

type LadderCardProps = {
    fullname: string;
    score: number;
};
const LadderCard: React.FC<LadderCardProps> = ({ fullname, score }) => {
    return (
        <div className="w-full self-stretch grow shrink basis-0 p-2.5 bg-white rounded-lg border border-neutral-400 justify-center items-center gap-2.5 inline-flex">
            <div>
                <span className="text-black text-sm font-normal">
                    {fullname} (
                </span>
                <span className="text-black text-sm font-bold">{score}</span>
                <span className="text-black text-sm font-normal"> Poin)</span>
            </div>
        </div>
    );
}

export default LadderCard;