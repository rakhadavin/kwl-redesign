import React from "react";

interface KwlTitleProps {
  course: string;
  topic: string;
}

const KwlTitle: React.FC<KwlTitleProps> = ({ course, topic }) => {
  return (
    <div className="m-8 mb-8 inline-flex text-left text-white">
      <h1 className="text-xl font-extrabold">{course} &nbsp;:&nbsp;</h1>
      <h2 className="text-xl">{topic}</h2>
    </div>
  );
};

export default KwlTitle;
