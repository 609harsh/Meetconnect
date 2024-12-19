import { act, useMemo, useState } from "react";
import { Column, Job } from "../../types";
import TrackerColumn from "./TrackerColumn";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import PlusIcon from "../../icons/PlusIcon";
import { addJobColumn, swipeColumn } from "../../redux/jobColumnSlice";
import TrackerCard from "./TrackerCard";
import {
  swipeDifferentColumnJob,
  swipeSamecolumnJob,
} from "../../redux/jobsSlice";

const Tracker = () => {
  const columns = useAppSelector((state) => state.jobcolumn);
  const jobs = useAppSelector((state) => state.jobdata);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  console.log("Hello", jobs);
  const dispatch = useAppDispatch();

  const createNewColumn = () => {
    const newcolumn = {
      id: Math.ceil(Math.random() * 1000),
      title: `Column ${columns.length + 1}`,
    };
    dispatch(addJobColumn(newcolumn));
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "job") {
      setActiveJob(event.active.data.current.job);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveJob(null);
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    //Dropped over same column
    if (activeColumnId === overColumnId) return;
    dispatch(swipeColumn({ activeColumnId, overColumnId }));
  };
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveJob = active.data.current?.type === "job";
    const isOverJob = over.data.current?.type === "job";

    if (!isActiveJob) return;
    //Dropping over same column
    if (isActiveJob && isOverJob) {
      dispatch(swipeSamecolumnJob({ activeId, overId }));
    }
    //Dropping over different column
    const isOverAColumn = over.data.current?.type === "column";
    if (isActiveJob && isOverAColumn) {
      dispatch(swipeDifferentColumnJob({ activeId, overId }));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <>
      {
        <div className="max-w-7xl mx-auto px-5">
          <div className="my-5 md:my-10 flex flex-row justify-between items-center border-b-2 py-5 ">
            <h1 className="text-xl md:text-4xl ">Job Board</h1>
          </div>
          <div className="m-auto flex min-h-[70vh] w-full overflow-x-auto items-center overflow-y-hidden px-10">
            <DndContext
              sensors={sensors}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
            >
              <div className="m-auto flex gap-4">
                <div className="flex gap-4">
                  <SortableContext items={columnsId}>
                    {columns.map((column) => (
                      <TrackerColumn
                        key={column.id}
                        column={column}
                        jobsData={jobs.filter(
                          (job) => job.list === column.id.toString()
                        )}
                      />
                    ))}
                  </SortableContext>
                </div>
                <button
                  className="cursor-pointer rounded-lg w-80 min-w-80 h-16 border-2 p-4 ring-rose-500 hover:ring-2 bg-gray-100 flex gap-2 "
                  onClick={() => createNewColumn()}
                >
                  <PlusIcon />
                  Add New Column
                </button>
              </div>
              {createPortal(
                <DragOverlay>
                  {activeColumn && (
                    <TrackerColumn
                      column={activeColumn}
                      jobsData={jobs.filter(
                        (job) => job.list === activeColumn.id.toString()
                      )}
                    />
                  )}
                  {activeJob && <TrackerCard data={activeJob} />}
                </DragOverlay>,
                document.body
              )}
            </DndContext>
          </div>
        </div>
      }
    </>
  );
};

export default Tracker;
