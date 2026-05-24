import React from "react";

interface MainButtonProps {
    source: string;
    link: string;
    name: string;
    description?: string;
}

const MainButton: React.FC<MainButtonProps> = ({
    source,
    link,
    name,
    description,
}) => {
    return(
            <div className="relative group w-[30%] m-3">
                <button id="main-button" className="w-full text-sm bg-white rounded-lg shadow overflow-hidden">
                    <a href={link}>
                        <div className="bg-indigo-900 h-[80px] flex items-center justify-center">
                            <img src={source}/>
                        </div>
                        <div className="p-4 text-center h-[60px] font-bold text-indigo-800">
                            {name}
                        </div>
                    </a>
                </button>
                {description && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 px-3 py-2 bg-gray-800 text-white text-xs text-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        {description}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                    </div>
                )}
            </div>
    );
};

export default MainButton;