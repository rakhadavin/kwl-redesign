import CourseCard from "./CourseCard";
import QuizCard from "./QuizCard";

const AllQuizContainer = ({ data }:any) => {
  return (
    <div>
      {
        data?.data?.map((quiz: any, index: number) => (
          <QuizCard
            key={index}
            id={quiz["id"]}
            title={quiz["title"]}
            description={quiz["description"]}
          />
        ))
      }
    </div>
  );
};

export default AllQuizContainer;
