"use client";
import React, {useState} from "react";
import NumberCard from "./NumberCard";

interface NumberContainerProps{
    numbers: number[];
    currentNum: number;
    urls: string[];
}

// TODO: Make the page remember which number is selected, collaborate with BE, maybe use context

const NumberContainer: React.FC<NumberContainerProps> = ({
    numbers,
    currentNum, //probably get from current link
    urls,
}) => {

    return(
        <div id= "numbers-container" className="m-1 inline-flex text-center">
            {numbers.map((num,index) => (
                <NumberCard
                    number={num}
                    isActive={num === currentNum}

                />
            ))}
        </div>
    );
};

export default NumberContainer;