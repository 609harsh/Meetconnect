import LinkIcon from "../icons/LinkIcon";
import TrashIcon from "../icons/TrashIcon";
import { useAppDispatch } from "../redux/hooks";
import { deleteInterview } from "../redux/interviewsSlice";
import { useDeleteInterviewsMutation } from "../redux/ApiSlice/meetApi";
import { Interview } from "../types";

const InterviewCard = ({ data }: { data: Interview }) => {
  const [removeInterview] = useDeleteInterviewsMutation();
  const dispatch = useAppDispatch();
  const handleDelete = async (id: string) => {
    await removeInterview(id).unwrap();
    dispatch(deleteInterview(id));
  };
  return (
    <div
      key={data.id}
      className="relative flex flex-col my-6 bg-white shadow-md border border-slate-200 rounded-lg w-96 hover:scale-110 transform transition-all duration-300 hover:ring-2 hover:ring-blue-700/90"
    >
      <div className=" flex justify-between mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
        <p className="text-sm font-medium text-slate-600">{data.type}</p>
        <span
          onClick={() => handleDelete(data.id)}
          className="text-red-600 hover:cursor-pointer"
        >
          <TrashIcon />
        </span>
      </div>

      <div className="p-4">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">
          {data.title}
        </h5>
        <p>{data.company}</p>
        <p>
          {data.date} {data.date === "" || data.duration === "" ? "" : "|"}{" "}
          {data.duration}
        </p>
        <p className="text-slate-600 leading-normal font-light">{data.guest}</p>
      </div>
      <div className=" h-full text-sm font-medium mx-3 border-t border-slate-200 pb-3 pt-2 px-1 flex justify-center items-center gap-1 text-slate-600 hover:text-blue-700/90 hover:cursor-pointer">
        <span>Meet Link</span>
        <span>
          <LinkIcon />
        </span>
      </div>
    </div>
  );
};

export default InterviewCard;
