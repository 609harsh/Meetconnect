import { useAppDispatch } from "../../redux/hooks";
import { changeMenuTo } from "../../redux/menuSlice";
import { Interview } from "../../types";
import InterviewCard from "./InterviewCard";

const InterviewList = ({ data }: { data: Interview[] }) => {
  const dispatch = useAppDispatch();
  const openInterview = () => {
    dispatch(changeMenuTo(true));
  };
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-around">
      {data === undefined || data?.length === 0 ? (
        <button
          className="outline-none p-3 bg-white rounded-md text-xl flex items-center gap-2 hover:ring-2 hover:ring-blue-700/90 mt-20"
          onClick={() => openInterview()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          Create Interview
        </button>
      ) : (
        data.map((interview) => {
          return <InterviewCard key={interview.id} data={interview} />;
        })
      )}
    </div>
  );
};

export default InterviewList;
