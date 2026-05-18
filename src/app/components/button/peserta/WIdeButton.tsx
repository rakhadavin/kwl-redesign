import React from "react";

interface WideButtonProps {
    name: string;
    icon: string;
    accessory: string;
    url: string;
}

const WideButton: React.FC<WideButtonProps> = ({
    name,
    icon,
    accessory,
    url,
}) => {
    return(
        <div className="overflow-hidden m-2 shadow inline-flex bg-indigo-900 rounded-lg">
            <a href={url} className="flex">
                <img src={accessory} width="50"/>
                <button className="sm:w-[100%] md:w-[240px] lg:w-[240px] text-white font-bold px-12 sm:text">
                    {name}
                </button>
                <img  src={icon} width="50"/>
            </a>
        </div>
    );
};

export default WideButton;