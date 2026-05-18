import React from "react";

interface FAQCardProps {
  pertanyaan: string;
  jawaban: string;
}

const FAQCard: React.FC<FAQCardProps> = ({ pertanyaan, jawaban }) => {
  return (
    <div className="pt-5 flex items-center justify-center">
      <div className="overflow-hidden shadow-lg rounded-lg w-96 w-[90%] md:w-[80%] lg:w-[1000px]">
        <table className="h-auto w-full relative">
          <tbody>
            <tr className="bg-dark-accent">
              <td className="text-kiki-blue text-base font-bold pr-20 py-5 px-8">
                Pertanyaan
              </td>
              <td className="text-white font-xs py-5 px-8">{pertanyaan}</td>
            </tr>
            <tr className="bg-white">
              <td className="text-dark-accent text-base font-bold pr-4 py-5 px-8">
                Jawaban
              </td>
              <td className="text-black font-xs py-5 px-8">{jawaban}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FAQCard;
