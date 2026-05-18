import React from "react";

interface MainButtonProps {
    source: string;
    link: string;
    name: string;
}

const MainButton: React.FC<MainButtonProps> = ({
    source,
    link,
    name,
}) => {
    return(
            <button id="main-button" className="w-[30%] text-sm bg-white rounded-lg shadow overflow-hidden m-3">
                <a href={link}>
                    <div className="bg-indigo-900 h-[80px] flex items-center justify-center">
                        <img src={source}/>
                    </div>
                    <div className="p-4 text-center h-[60px] font-bold text-indigo-800">
                        {name}
                    </div>
                </a>
            </button>
    );
};

export default MainButton;