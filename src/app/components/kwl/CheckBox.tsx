import React from "react";

interface CheckBoxProps {
    content: string;
    checked: boolean;
    onChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
    content,
    checked,
    onChange,
}) => {
    return(
        <div id= "answer" className="mb-4 h-auto w-96 w-[90%] md:w-[80%] lg:w-[700px] relative bg-white rounded-lg shadow p-3 pl-6 text-left">
            <input type="checkbox" onChange={onChange} checked={checked} className="rounded mr-2"></input>
            <span className="text-sm"> {content} </span>
        </div>
    );
};

export default CheckBox;