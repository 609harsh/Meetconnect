import { useDeleteInterviewsMutation } from "../redux/meetApi";
import { Interview } from "../types";

const InterviewCard = ({ data }: { data: Interview }) => {
  const [deleteInterview, { isLoading }] = useDeleteInterviewsMutation();
  const handleDelete = async (id: string) => {
    const response = await deleteInterview(id).unwrap();
    console.log(response);
  };
  return (
    <div
      key={data.id}
      className="relative flex flex-col my-6 bg-white shadow-md border border-slate-200 rounded-lg w-96 hover:scale-110 transform transition-all duration-300 "
    >
      <div className=" flex justify-between mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
        <p className="text-sm font-medium text-slate-600">{data.type}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 text-red-600 hover:cursor-pointer"
          onClick={() => handleDelete(data.id)}
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="p-4">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">
          {data.title}
        </h5>
        <p>{data.company}</p>
        <p>
          {data.date} | {data.duration}
        </p>
        <p className="text-slate-600 leading-normal font-light">{data.guest}</p>
      </div>
      <div className=" h-full text-sm font-medium mx-3 border-t border-slate-200 pb-3 pt-2 px-1 flex justify-center items-center gap-1 text-slate-600 hover:text-blue-500 hover:cursor-pointer">
        <span>Meet Link</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default InterviewCard;
