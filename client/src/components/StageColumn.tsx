import { HTML5Backend } from "react-dnd-html5-backend";
import { Stage } from "../types";
import JobCard from "./JobCard";
import { DndProvider } from "react-dnd";

const jobCards = [
  {
    id: 1,
    jobTitle: "Backend DEveloper",
    company: "Forescribe",
    date: "1yr",
  },
  {
    id: 2,
    jobTitle: "Backend DEveloper",
    company: "Forescribe",
    date: "1yr",
  },
  {
    id: 3,
    jobTitle: "Backend DEveloper",
    company: "Forescribe",
    date: "1yr",
  },
  {
    id: 4,
    jobTitle: "Backend DEveloper",
    company: "Forescribe",
    date: "1yr",
  },
  {
    id: 5,
    jobTitle: "Backend DEveloper",
    company: "Forescribe",
    date: "1yr",
  },
  {
    id: 5,
    jobTitle: "Backend DEveloper",
    company: "Forescribe",
    date: "1yr",
  },
];

const StageColumn = ({ stage }: { stage: Stage }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="min-w-80 max-h-[70vh] h-fit px-4 bg-[#f3f7f7] flex flex-col"
        key={stage.id}
      >
        <header className="flex flex-row justify-between items-center my-4 font-semibold ">
          <h3>
            {stage.label}
            <data className="text-sm border-2 rounded-full p-1 ml-2">
              {" "}
              3 jobs
            </data>
          </h3>

          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </figure>
        </header>
        <div
          className="overflow-scroll bg-[#f3f7f7] max-h-[90vh]"
          style={{ scrollbarWidth: "none" }}
        >
          {jobCards.map((card) => (
            <JobCard data={card} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default StageColumn;
