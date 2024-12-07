import { Interview } from "../types";

const InterviewCard = ({ data }: { data: Interview }) => {
  return (
    <div
      key={data.id}
      className="relative flex flex-col my-6 bg-white shadow-md border border-slate-200 rounded-lg w-96 hover:scale-110 transform transition-all duration-300 "
    >
      <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
        <span className="text-sm font-medium text-slate-600">{data.type}</span>
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
