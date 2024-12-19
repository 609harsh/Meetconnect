import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Job } from "../../types";
import TrackerCard from "./TrackerCard";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import AddJob from "./AddJob";
import { useAppDispatch } from "../../redux/hooks";
import { deleteJobColumn, renameJobColumn } from "../../redux/jobColumnSlice";
import { deleteJob } from "../../redux/jobsSlice";

interface Column {
  id: string | number;
  title: string;
}

const TrackerColumn = ({
  column,
  jobsData,
}: {
  column: Column;
  jobsData: Job[];
}) => {
  const [editMode, setEditmode] = useState<boolean>(false);
  const [addJob, setAddJob] = useState<boolean>(false);
  const jobsId = useMemo(() => jobsData.map((job) => job.id), [jobsData]);
  const dispatch = useAppDispatch();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const deleteColumn = (id: string | number) => {
    jobsData.map((job) => {
      dispatch(deleteJob(job.id));
    });
    dispatch(deleteJobColumn(id));
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-80 min-w-80 h-[500px] max-h-[500px] px-4 bg-[#f3f7f7] flex flex-col rounded-md ring-red-500 border-2 ring-2 opacity-40"
      ></div>
    );
  }
  const closeJob = () => {
    setAddJob(false);
  };
  return (
    <>
      {addJob && <AddJob closeJob={closeJob} defaultValue={column.id} />}
      {
        <div
          ref={setNodeRef}
          style={style}
          className="w-80 min-w-80 h-[500px] max-h-[500px] px-4 bg-[#f3f7f7] flex flex-col rounded-md"
        >
          <div
            {...attributes}
            {...listeners}
            onClick={() => setEditmode(true)}
            className="h-16 cursor-grab rounded-md rounded-b-none text-md p-3 font-bold  flex items-center justify-between"
          >
            <div className="flex gap-2 items-start">
              <div className="flex justify-center items-center px-2 py-1 text-sm rounded-full bg-gray-400">
                0
              </div>
              {!editMode && column.title}
              {editMode && (
                <input
                  autoFocus
                  onChange={(e) =>
                    dispatch(
                      renameJobColumn({ id: column.id, title: e.target.value })
                    )
                  }
                  className="bg-inherit px-2 py-1 outline-none focus:ring-2 focus:ring-gray-400 rounded-md text-sm"
                  onBlur={() => setEditmode(false)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    setEditmode(false);
                  }}
                />
              )}
            </div>
            <button
              className="stroke-red-500 hover:bg-gray-400 rounded px-1 py-2 cursor-pointer"
              onClick={() => deleteColumn(column.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
          <div
            className="flex flex-grow flex-col overflow-x-hidden overflow-y-auto gap-3 mb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {jobsData.map((job: Job) => (
              <SortableContext key={job.id} items={jobsId}>
                <TrackerCard data={job} />
              </SortableContext>
            ))}
          </div>
          <button
            className="flex gap-2 items-center p-4 border-t-2"
            onClick={() => setAddJob(true)}
          >
            <PlusIcon />
            Add Job
          </button>
        </div>
      }
    </>
  );
};

export default TrackerColumn;
