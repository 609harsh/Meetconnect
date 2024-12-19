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
import TrashIcon from "../../icons/TrashIcon";

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
      {addJob && <AddJob closeJob={closeJob} />}
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
              <TrashIcon />
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
