import { useEffect, useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import { UniqueIdentifier } from "@dnd-kit/core";
import LinkIcon from "../../icons/LinkIcon";
import CloseIcon from "../../icons/CloseIcon";
import { Job } from "../../types";

const KanbanTask = ({
  data,
  removeJob,
}: {
  data: Job;
  removeJob: (id: UniqueIdentifier) => void;
}) => {
  const [mouseIsOver, setIsMouseOver] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getLogoURL = async () => {
      const res = await fetch(`https://api.logo.dev/search?q=${data.company}`, {
        headers: {
          Authorization: `Bearer: ${import.meta.env.VITE_LOGO}`,
        },
      });
      const result = await res.json();
      setUrl(result[0].logo_url);
      setName(result[0].name);
    };
    getLogoURL();
  }, []);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      type: "job",
      job: data,
    },
    // disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-lg p-3 bg-white min-h-28 h-28 opacity-40 border-2 border-red-200 cursor-grab"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-lg p-3 bg-white min-h-28 h-28 cursor-grab flex flex-row items-center gap-4"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <figure>
        <img src={url} width={"60px"} />
      </figure>
      <div className="flex-grow">
        <h2 className="text-lg font-bold mb-2">{name}</h2>
        <h3 className="text-base font-light">{data.jobtitle}</h3>
        <p className="text-sm flex flex-row items-center gap-2">
          {data.note && data.note.length > 0 ? "Applied On: " : ""}
          {data.note}
          {data.link && data.link.length > 0 ? (
            <Link
              to={
                data.link.startsWith("https")
                  ? data.link
                  : "https://" + data.link
              }
              target="_blank"
              className="text-blue-600 hover:cursor-pointer"
            >
              <LinkIcon />{" "}
            </Link>
          ) : (
            ""
          )}
        </p>
      </div>
      {mouseIsOver && (
        <div
          className="self-start cursor-pointer"
          onClick={() => removeJob(data.id)}
        >
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

export default KanbanTask;
