import Link from "next/link";

type FeedbackCardProps = {
    topic: string;
    sender: string;
    message: string;
    feedback_id: Number;
    course_id: string;

  };
  
  const FeedbackCard: React.FC<FeedbackCardProps> = ({ topic, sender, message, feedback_id, course_id }) => {
    return (
      <Link href={`/peserta/courses/${course_id}/feedback/${feedback_id}`}>
      <div id="feedback-box" className="mb-8 flex flex-col text-center overflow-hidden h-auto w-96 w-[90%] md:w-[70%] lg:w-[800px] relative bg-white rounded-lg shadow">
        <div id="topic" className="bg-dark-accent text-white p-2">
          <span className="font-bold">Topik :&nbsp;</span>
          <span id="topic-name">{topic}</span>
        </div>
  
        <div id="contents">
          <table className="text-left">
            <tbody>
              <tr>
                <td className="font-bold pt-4 px-8">Pengirim:</td>
                <td className="pt-4">{sender}</td>
              </tr>
              <tr>
                <td className="font-bold pb-4 px-8">Pesan:</td>
                <td className="pb-4">
                {message.length > 50 ? `${message.substring(0, Math.floor(message.length / 2))}...` : message}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </Link>
    );
  };
  
  export default FeedbackCard;