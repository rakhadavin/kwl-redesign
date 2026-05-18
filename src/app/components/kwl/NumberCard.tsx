import React from "react";

interface NumberCardProps {
    number: number;
    isActive: boolean;
}

const NumberCard: React.FC<NumberCardProps> = ({
    number,
    isActive,
}) => {
    return(
        <div id= "number-box" className="m-1 overflow-hidden flex flex-col h-auto w-96 w-[90%] md:w-[80%] lg:w-[50px] bg-white rounded-lg shadow">

            <a>
                <div id="number" className="flex-1 font-bold">
                    {number}
                </div>

                <div id="num-color" className="flex-1">
                    <div className={isActive? "bg-green-400" : "bg-zinc-200"}>
                        &nbsp;
                    </div>
                </div>
            </a> 

        </div>
    );
};

export default NumberCard;