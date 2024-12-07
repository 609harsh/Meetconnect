import { useState } from "react";
import { NavbarMenu, Stage } from "../types";
import StageColumn from "./StageColumn";
import AddJob from "./AddJob";
import { useAppSelector } from "../redux/hooks";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const jobDatas: Stage[] = [
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
    jobCards: [
      {
        id: "1",
        jobTitle: "Backend DEveloper",
        company: "Forescribe",
        date: "1yr",
      },
      {
        id: "2",
        jobTitle: "Backend DEveloper",
        company: "Forescribe",
        date: "1yr",
      },
    ],
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
    jobCards: [
      {
        id: "1",
        jobTitle: "Backend DEveloper",
        company: "Forescribe",
        date: "1yr",
      },
      {
        id: "2",
        jobTitle: "Backend DEveloper",
        company: "Forescribe",
        date: "1yr",
      },
    ],
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
    jobCards: [],
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
    jobCards: [],
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
    jobCards: [
      {
        id: "1",
        jobTitle: "Backend DEveloper",
        company: "Forescribe",
        date: "1yr",
      },
      {
        id: "2",
        jobTitle: "Backend DEveloper",
        company: "Forescribe",
        date: "1yr",
      },
    ],
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
    jobCards: [],
  },
];

const Tracker = () => {
  const [addJob, setAddJob] = useState<boolean>(false);
  const [stages, setStages] = useState(jobDatas);
  const menuOption: NavbarMenu = useAppSelector(
    (state) => state.menu.value
  ).value;

  const reorder = (list: Stage, startIdx: number, endIdx: number) => {
    const result = Array.from(list.jobCards);
    const [removed] = result.splice(startIdx, 1);
    result.splice(endIdx, 0, removed);
    return { ...list, jobCards: [...result] };
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source.jobCards);
    const destClone = Array.from(destination.jobCards);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(stages[sInd], source.index, destination.index);
      const newState = [...stages];
      newState[sInd] = items;
      setStages(newState);
    } else {
      const result = move(stages[sInd], stages[dInd], source, destination);
      const newState = [...stages];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setStages(newState.filter((group) => group.jobCards.length));
    }
  }

  return (
    <>
      {NavbarMenu.ADDJOB === menuOption && <AddJob />}
      {
        <div className="max-w-7xl mx-auto px-5">
          <div className="my-5 md:my-10 flex flex-row justify-between items-center border-b-2 py-5 ">
            <h1 className="text-xl md:text-4xl ">Job Board</h1>
            <button
              className="px-4 py-1 font-semibold text-base md:text-lg text-center border-2 border-[#355F2E] text-[#F1F0E8] outline-none rounded-md bg-[#355F2E]"
              onClick={() => setAddJob(true)}
            >
              + Add
            </button>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              className="overflow-x-scroll flex flex-row gap-4 rounded-md drop-shadow-md min-h-[70vh]"
              style={{
                scrollBehavior: "smooth",
                scrollbarGutter: "stable",
                scrollbarWidth: "thin",
              }}
            >
              {stages.map((stage, idx) => (
                <Droppable key={idx} droppableId={`${idx}`}>
                  {(provided, snapshot) => (
                    <StageColumn
                      stage={stage}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      }
    </>
  );
};

export default Tracker;
