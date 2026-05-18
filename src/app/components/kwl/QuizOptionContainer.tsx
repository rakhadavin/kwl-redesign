"use client";
import React, { useState } from "react";
import QuizOption from "./QuizOption";

interface QuizOptionContainerProps{
    contents: any[];
    onSelect?: (id:number,options: any[]) => void;
}

const QuizOptionContainer: React.FC<QuizOptionContainerProps> = ({
    contents,   
    onSelect,
}) => {

    const [selectedOption, setSelectedOption] = useState("placeholder");

    
    // TODO: Sesuaikan data type dengan handlingnya di BE

    const handleSelectOption = (option: any) => {
        setSelectedOption(option.option_answer); 
        if (onSelect) {
            onSelect(option.id, contents);
        }
    };

    return(
        <div>
        {contents.map((content, index:number) => (
            <div key={index}>
                <QuizOption
                    content={content}
                    isSelected={selectedOption === content.option_answer}
                    onSelect={handleSelectOption}
                />
            </div>
        ))}  
        </div>
 
    );
};

export default QuizOptionContainer;