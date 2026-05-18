import React from "react";

interface MicroButtonProps {
    name: string;
    colour: string;
    detail: string;
    onClick: (option: string) => void;
}

const MicroButton: React.FC<MicroButtonProps> = ({
    name,
    colour,
    detail,
    onClick,
}) => {

    const handleClick = () => {
        onClick(detail);
    };

    return(
        <button onClick={handleClick} className={`text-xs text-white rounded-lg ${colour} p-2`}>
            {name}
        </button>
    );
};

export default MicroButton;