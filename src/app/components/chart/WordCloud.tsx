import React from "react";
import Image from "next/image";

type WordCloudProps = {
  image_url: string;

};

const WordCloud: React.FC<WordCloudProps> = ({ image_url }) => {
  return (
    <div className="flex justify-center">
      <img
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + image_url}
        alt="Wordcloud"
        className=""
        width={1000}
        height={1000}
      />
    </div>
  );
}

export default WordCloud;
