import React from "react";

interface MediumCardProps {
  link: string;
  title: string;
  subtitle: string;
}

const MediumCard: React.FC<MediumCardProps> = ({ link, title, subtitle }) => {
  return (
    <div className="mb-4h-auto w-[100%] relative bg-white rounded-lg shadow pb-4 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      <a href={link}>
        <div className="pt-5 mt-4 pl-5">
          <span className=" text-black text-base font-bold">
            {title}
            <br />
          </span>

          <span className="text-black text-xs font-normal"> {subtitle} </span>
        </div>
      </a>
    </div>
  );
};

export default MediumCard;
