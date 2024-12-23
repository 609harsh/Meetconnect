import { useState } from "react";
import CloseIcon from "../../icons/CloseIcon";
import { Job } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { deleteJob } from "../../redux/jobsSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDeleteJobMutation } from "../../redux/ApiSlice/trackerApi";
import LinkIcon from "../../icons/LinkIcon";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TrackerCard = ({ data }: { data: Job }) => {
  const [mouseIsOver, setIsMouseOver] = useState(false);
  const dispatch = useAppDispatch();
  const [deleteJobCard] = useDeleteJobMutation();
  const navigation = useNavigate();
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      type: "job",
      job: data,
    },
    // disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-lg p-3 bg-white min-h-28 h-28 opacity-40 border-2 border-red-200 cursor-grab"
      ></div>
    );
  }

  const removejob = async (
    id: string | undefined,
    colId: string | undefined
  ) => {
    dispatch(deleteJob(id as string));
    try {
      await deleteJobCard({
        columnId: colId as string,
        jobId: id as string,
      }).unwrap();
    } catch (err: any) {
      if (err.status === 401) {
        navigation("/login");
        return;
      }
      toast.error(err.error);
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-lg p-3 bg-white min-h-28 h-28 cursor-grab flex flex-row items-center gap-4"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {/* <figure>
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg"
          }
          width={"60px"}
        />
      </figure> */}
      <div className="flex-grow">
        <h2 className="text-lg font-bold mb-2">{data.company}</h2>
        <h3 className="text-base font-light">{data.jobtitle}</h3>
        <p className="text-sm flex flex-row items-center gap-2">
          {data.note && data.note.length > 0 ? "Applied On: " : ""}
          {data.note}
          {data.link && data.link.length > 0 ? (
            <Link
              to={data.link}
              target="_blank"
              className="text-blue-600 hover:cursor-pointer"
            >
              <LinkIcon />{" "}
            </Link>
          ) : (
            ""
          )}
        </p>
      </div>
      {mouseIsOver && (
        <div
          className="self-start cursor-pointer"
          onClick={() => removejob(data.id, data.columnId)}
        >
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

export default TrackerCard;
