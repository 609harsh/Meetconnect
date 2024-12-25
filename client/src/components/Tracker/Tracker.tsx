import { useEffect, useMemo, useState } from "react";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import PlusIcon from "../../icons/PlusIcon";
import KanbanColumn from "./TrackerColumn";
import KanbanTask from "./TrackerCard";
import Navbar from "../Navbar";
import {
  useCreateTrackerColumnMutation,
  useDeleteJobMutation,
  useDeleteTrackerColumnMutation,
  useGetTrackerDetailsQuery,
  usePatchTrackerColumnMutation,
  useSwapColumnMutation,
  useSwapDifferentColumnMutation,
  useSwapSameColumnMutation,
} from "../../redux/ApiSlice/trackerApi";
import { Column, Job } from "../../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Tracker = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const columnsIds = useMemo(() => columns.map((col) => col.idx), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [newColumn] = useCreateTrackerColumnMutation();
  const [renameCol] = usePatchTrackerColumnMutation();
  const [removeCol] = useDeleteTrackerColumnMutation();
  const [deleteJob] = useDeleteJobMutation();
  const [swapColumn] = useSwapColumnMutation();
  const [swapJobs] = useSwapSameColumnMutation();
  const [moveJob] = useSwapDifferentColumnMutation();
  const { data: fetchColumn, error } = useGetTrackerDetailsQuery();
  const navigation = useNavigate();

  useEffect(() => {
    if (fetchColumn && fetchColumn.success) {
      const cols = fetchColumn.data.map((col) => {
        return {
          idx: col.idx as UniqueIdentifier,
          columnTitle: col.columnTitle,
          id: col.id as UniqueIdentifier,
        };
      });
      cols.sort((a, b) => Number(a.idx) - Number(b.idx));

      const jobsData = fetchColumn.data.map((col) => {
        return col.jobs;
      });
      const jobs: Job[] = jobsData.flat() as Job[];

      jobs.sort((a, b) => Number(b.idx) - Number(a.idx));

      setColumns(cols);
      setJobs(jobs);
      return;
    }
    if (error && "status" in error && error.status === 401) {
      toast.error("Uauthorized");
      navigation("/login");
      return;
    }
    if (
      error &&
      "data" in error &&
      !(error?.data as { success: boolean; error: string }).success
    ) {
      toast.error((error.data as { success: boolean; error: string }).error);
    }
  }, [fetchColumn]);
  const createNewColumn = async () => {
    const response = await newColumn({
      columnTitle: `Column ${columns.length + 1}`,
    }).unwrap();
    if (response.success) {
      setColumns((prevColumns) => [response.data, ...prevColumns]);
    }
  };

  async function renameColumn(id: UniqueIdentifier, value: string) {
    setColumns(
      columns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, columnTitle: value };
      })
    );
    renameCol({ columnId: id as string, title: value }).unwrap();
  }

  async function deleteColumn(id: UniqueIdentifier) {
    setColumns(columns.filter((col) => col.id !== id));
    removeCol({ columnId: id as string }).unwrap();
  }
  const newJob = async (data: Job) => {
    setJobs([...jobs, data]);
  };
  function removejob(id: UniqueIdentifier) {
    setJobs(jobs.filter((job) => job.id !== id));
    deleteJob({ jobId: id as string }).unwrap();
  }
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
    const activeColumnIdx = columns.findIndex(
      (col) => col.id === activeColumnId
    );
    const overColumnIdx = columns.findIndex((col) => col.id === overColumnId);
    let temp1 = columns[activeColumnIdx].idx;
    let temp2 = columns[overColumnIdx].idx;
    const updatedColumns = columns.map((col, index) => {
      if (index === activeColumnIdx) {
        return { ...col, idx: temp2 }; // Update the columnId for the active job
      }
      if (index === overColumnIdx) {
        return { ...col, idx: temp1 };
      }
      return col; // Return other cols unchanged
    });
    setColumns(arrayMove(updatedColumns, activeColumnIdx, overColumnIdx));
    swapColumn({
      columnId1: activeColumnId as string,
      columnId2: overColumnId as string,
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
      const activeIdx = jobs.findIndex((job) => job.id === activeId);
      const overIdx = jobs.findIndex((job) => job.id === overId);

      // jobs[activeIdx].columnId = jobs[overIdx].columnId;

      let temp1 = jobs[activeIdx].idx;
      let temp2 = jobs[overIdx].idx;

      const updatedJobs = jobs.map((job, index) => {
        if (index === activeIdx) {
          return { ...job, idx: temp2 }; // Update the columnId for the active job
        }
        if (index === overIdx) {
          return { ...job, idx: temp1 };
        }
        return job; // Return other jobs unchanged
      });
      setJobs(arrayMove(updatedJobs, activeIdx, overIdx));
      swapJobs({
        jobId1: activeId as string,
        jobId2: overId as string,
      }).unwrap();
    }
    // Dropping over different column
    const isOverAColumn = over.data.current?.type === "column";
    if (isActiveJob && isOverAColumn) {
      const activeIdx = jobs.findIndex((job) => job.id === activeId);
      const updatedJobs = jobs.map((job, index) => {
        if (index === activeIdx) {
          return { ...job, columnId: overId }; // Update the columnId for the active job
        }
        return job; // Return other jobs unchanged
      });
      setJobs(arrayMove(updatedJobs, activeIdx, activeIdx));
      moveJob({
        columnId: over.data.current?.column.id,
        jobId: activeId as string,
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
    <>
      <Navbar />
      <div
        style={{ backgroundImage: "url(kanban4.jpg)" }}
        className="bg-cover min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-row justify-between items-center border-b-2 py-5 font-bold ">
            <h1 className="text-xl md:text-4xl ">Job Board</h1>
          </div>
          {
            <div className="m-auto flex h-screen w-full overflow-x-auto items-center overflow-y-hidden px-10 py-2">
              <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
              >
                <div className="m-auto flex gap-4">
                  <div className="flex gap-4">
                    <SortableContext items={columnsIds}>
                      {columns.map((column) => (
                        <KanbanColumn
                          key={column.id}
                          column={column}
                          jobsData={jobs.filter(
                            (job) => job.columnId === column.id
                          )}
                          renameColumn={renameColumn}
                          deleteColumn={deleteColumn}
                          removeJob={removejob}
                          newJob={newJob}
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
                      <KanbanColumn
                        key={activeColumn.id}
                        column={activeColumn}
                        jobsData={jobs.filter(
                          (job) => job.columnId === activeColumn.id
                        )}
                        renameColumn={renameColumn}
                        deleteColumn={deleteColumn}
                        removeJob={removejob}
                        newJob={newJob}
                      />
                    )}
                    {activeJob && (
                      <KanbanTask data={activeJob} removeJob={removejob} />
                    )}
                  </DragOverlay>,
                  document.body
                )}
              </DndContext>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Tracker;
