import { Draggable } from "@hello-pangea/dnd";
import { Stage } from "../types";
import JobCard from "./JobCard";

const StageColumn = ({
  stage,
  provided,
  snapshot,
}: {
  stage: Stage;
  provided: any;
  snapshot: any;
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className={`min-w-80 max-h-[70vh] h-fit px-4 bg-[#f3f7f7] flex flex-col ${
        snapshot.isDraggingOver
          ? "scale-50 transform transition-all duration-300"
          : ""
      }`}
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
        {stage.jobCards.map((card, ind) => (
          <Draggable key={card.id} draggableId={ind + ""} index={ind}>
            {(provided, snapshot) => (
              <JobCard data={card} provided={provided} snapshot={snapshot} />
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default StageColumn;
