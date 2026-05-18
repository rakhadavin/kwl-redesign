
"use client";

import React, { useState } from "react";


// TODO: handle logic retrieving answer and turn off selected when other option is selected
// TODO: For dosen, add border

interface QuizOptionProps {
    content: any;
    isSelected: boolean;
    onSelect: (option: any) => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({
    content,
    isSelected,
    onSelect,
}) => {

    const handleClick = () => {
        onSelect(content);
    };

    return(
        <button id= "answer" onClick={handleClick} value={content} className={`mb-4 h-auto w-96 w-[90%] md:w-[80%] lg:w-[700px] relative bg-${isSelected? "green-500" : "white"  } rounded-lg shadow p-3 pl-6 text-left`}>
            <span className="text-sm"> {content.option_answer} </span>
        </button>
    );
};

export default QuizOption;