import { useEffect, useMemo, useState } from "react";
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
import {
  addJobColumn,
  addPreJobCoLumn,
  swipeColumn,
} from "../../redux/jobColumnSlice";
import TrackerCard from "./TrackerCard";
import {
  addPreJob,
  swipeDifferentColumnJob,
  swipeSamecolumnJob,
} from "../../redux/jobsSlice";
import {
  useCreateTrackerColumnMutation,
  useGetTrackerDetailsQuery,
  useSwapColumnMutation,
  useSwapDifferentColumnMutation,
  useSwapSameColumnMutation,
} from "../../redux/ApiSlice/trackerApi";
import { toast } from "react-toastify";
import Loader from "../Loader";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const Tracker = () => {
  const {
    data: trackerDetails,
    isFetching,
    error,
  } = useGetTrackerDetailsQuery();
  const [newColumn] = useCreateTrackerColumnMutation();
  const [exchangeColumn] = useSwapColumnMutation();
  const [swapSameJobColumn] = useSwapSameColumnMutation();
  const [swapDifferentJobColumn] = useSwapDifferentColumnMutation();
  const columns = useAppSelector((state) => state.jobcolumn);
  const jobs = useAppSelector((state) => state.jobdata);
  const columnsIdx = useMemo(() => columns.map((col) => col.idx), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      navigation("/login");
      return;
    }
    if (trackerDetails) {
      let jobColumn = trackerDetails.data
        .map((column) => {
          return {
            id: column.id,
            idx: Number(column.idx),
            columnTitle: column.columnTitle,
            jobIdx: column.jobIdx,
          };
        })
        .sort((a, b) => a.idx - b.idx);
      let jobs = trackerDetails.data.map((column) => {
        return column.jobs?.flat();
      });

      if (jobColumn && jobColumn.length > 0) {
        dispatch(addPreJobCoLumn(jobColumn));
      }
      const fetchedJobs = jobs.flat();
      if (fetchedJobs && fetchedJobs.length > 0)
        dispatch(addPreJob(fetchedJobs as Job[]));
    }
  }, [dispatch, trackerDetails, error]);

  const createNewColumn = async () => {
    const body = {
      // id: Math.ceil(Math.random() * 1000) + "",
      idx: new Date().getTime(),
      columnTitle: `Column ${columns.length + 1}`,
    };
    try {
      const response = await newColumn({
        idx: body.idx,
        columnTitle: body.columnTitle,
      }).unwrap();
      const data = response.data;
      dispatch(addJobColumn(data));
    } catch (err: any) {
      if (err.status === 401) {
        navigation("/login");
        return;
      }
      toast.error(err.error);
    }
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
  const onDragEnd = async (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveJob(null);
    const { active, over } = event;

    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    //Dropped over same column
    if (activeColumnId === overColumnId) return;

    dispatch(
      swipeColumn({
        activeColumnId: activeColumnId as number,
        overColumnId: overColumnId as number,
      })
    );
    await exchangeColumn({
      columnId1: active.data.current?.column.id as string,
      columnId2: over.data.current?.column.id as string,
      newIdx1: Number(over.id),
      newIdx2: Number(active.id),
    }).unwrap();
  };
  const onDragOver = async (event: DragOverEvent) => {
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
      dispatch(
        swipeSamecolumnJob({
          activeId: activeId as string,
          overId: overId as string,
        })
      );
      if (
        active.data.current?.job.columnId === over.data.current?.job.columnId
      ) {
        await swapSameJobColumn({
          columnId: active.data.current?.job.columnId as string,
          jobId1: activeId as string,
          jobId2: overId as string,
        }).unwrap();
      }
    }
    // Dropping over different column
    const isOverAColumn = over.data.current?.type === "column";
    if (isActiveJob && isOverAColumn) {
      dispatch(swipeDifferentColumnJob({ activeId, overId }));
      await swapDifferentJobColumn({
        jobId: activeId as string,
        columnId1: active.data.current?.job.columnId,
        columnId2: overId as string,
      }).unwrap();
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
    <div
      style={{ backgroundImage: "url(kanban4.jpg)" }}
      className="bg-cover bg-center md:bg-contain md:bg-repeat-round min-h-screen"
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-5">
        <div className="my-5 md:my-10 flex flex-row justify-between items-center border-b-2 py-5 font-bold ">
          <h1 className="text-xl md:text-4xl ">Job Board</h1>
        </div>
        {isFetching ? (
          <Loader />
        ) : (
          <div className="m-auto flex min-h-[70vh] w-full overflow-x-auto items-center overflow-y-hidden px-10">
            <DndContext
              sensors={sensors}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
            >
              <div className="m-auto flex gap-4">
                <div className="flex gap-4">
                  <SortableContext items={columnsIdx as number[]}>
                    {columns.map((column) => (
                      <TrackerColumn
                        key={column.id}
                        column={column}
                        jobsData={jobs.filter(
                          (job) => job.columnId === column.id
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
                      key={activeColumn.id}
                      column={activeColumn}
                      jobsData={jobs.filter(
                        (job) => job.columnId === activeColumn.id
                      )}
                    />
                  )}
                  {activeJob && <TrackerCard data={activeJob} />}
                </DragOverlay>,
                document.body
              )}
            </DndContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;
