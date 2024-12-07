import { JobCardData } from "../types";

const JobCard = ({
  data,
  provided,
  snapshot,
}: {
  data: JobCardData;
  provided: any;
  snapshot: any;
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`rounded-lg p-3 bg-white min-h-28 my-4  ${
        snapshot.isDragging
          ? "scale-110 transform transition-all duration-300"
          : ""
      }`}
    >
      <div className="flex flex-row items-center gap-4 mb-6">
        <figure>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg"
            }
            width={"60px"}
          />
        </figure>
        <div>
          <h2 className="text-lg font-bold mb-4">{data.company}</h2>
          <h3 className="text-base font-light">{data.jobTitle}</h3>
        </div>
      </div>
      <p className="text-right">{data.date}</p>
    </div>
  );
};

export default JobCard;
