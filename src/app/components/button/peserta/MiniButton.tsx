import React from "react";

interface MiniButtonProps {
    description: string;
    color: string;
    url: string;
}

const MiniButton: React.FC<MiniButtonProps> = ({
    description,
    color,
    url,
}) => {
    return(
        <button className={`text-xs text-white font-bold w-[120px] p-1 mt-4 ml-8 shadow text-center ${color} rounded`}>
            <a href={url} className="text-xs text-white font-bold">{description}</a>
        </button> 
    );
};

export default MiniButton;