import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";

import { UniqueIdentifier } from "@dnd-kit/core";

import TrashIcon from "../../icons/TrashIcon";
import PlusIcon from "../../icons/PlusIcon";
import AddJob from "./AddJob";
import KanbanTask from "./TrackerCard";
import { Column, Job } from "../../types";

const KanbanColumn = ({
  column,
  jobsData,
  renameColumn,
  deleteColumn,
  removeJob,
  newJob,
}: {
  column: Column;
  jobsData: Job[];
  renameColumn: (id: UniqueIdentifier, value: string) => void;
  deleteColumn: (id: UniqueIdentifier) => void;
  removeJob: (id: UniqueIdentifier) => void;
  newJob: (data: Job) => void;
}) => {
  const [editMode, setEditmode] = useState<boolean>(false);
  const [addJob, setAddJob] = useState<boolean>(false);
  const jobsId = useMemo(() => jobsData.map((job) => job.id), [jobsData]);
  const [title, setTitle] = useState<string>("");
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
  const renameColumnTitle = async (id: UniqueIdentifier) => {
    renameColumn(id, title);
    setEditmode(false);
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-80 min-w-80 h-fit px-4 bg-[#f3f7f7] flex flex-col rounded-md ring-red-500 border-2 ring-2 opacity-40"
      ></div>
    );
  }
  const closeJob = () => {
    setAddJob(false);
  };
  return (
    <>
      {addJob && <AddJob closeJob={closeJob} newJob={newJob} column={column} />}
      {
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="w-80 min-w-80 h-fit px-4 bg-[#f3f7f7] flex flex-col rounded-md"
        >
          <div
            onClick={() => setEditmode(true)}
            className="h-16 cursor-grab rounded-md rounded-b-none text-lg p-3 font-bold  flex items-center justify-between"
          >
            <div className="flex gap-2 items-start">
              {!editMode && column.columnTitle}
              {editMode && (
                <input
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-inherit px-2 py-1 outline-none focus:ring-2 focus:ring-gray-400 rounded-md text-sm"
                  onBlur={() => renameColumnTitle(column.id)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    renameColumnTitle(column.id);
                  }}
                />
              )}
            </div>
            <button
              className=" text-red-500 hover:bg-gray-400 rounded px-1 py-2 cursor-pointer"
              onClick={() => deleteColumn(column.id)}
            >
              <TrashIcon />
            </button>
          </div>

          <div
            className="flex flex-grow flex-col overflow-x-hidden overflow-y-auto gap-3 mb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {jobsData.map((job: Job) => {
              return (
                <SortableContext key={job.id} items={jobsId}>
                  <KanbanTask data={job} removeJob={removeJob} />
                </SortableContext>
              );
            })}
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

export default KanbanColumn;
