import { useState } from "react";
import { NavbarMenu, Stage } from "../types";
import StageColumn from "./StageColumn";
import AddJob from "./AddJob";
import { useAppSelector } from "../redux/hooks";

const stages: Stage[] = [
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
  },
  {
    id: 1,
    name: "wishlist",
    label: "Wishlist",
  },
];

const Tracker = () => {
  const [addJob, setAddJob] = useState<boolean>(false);
  const menuOption: NavbarMenu = useAppSelector(
    (state) => state.menu.value
  ).value;
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

          <div
            className="overflow-x-scroll flex flex-row gap-4 rounded-md drop-shadow-md "
            style={{
              scrollBehavior: "smooth",
              scrollbarGutter: "stable",
              scrollbarWidth: "thin",
            }}
          >
            {stages.map((stage) => (
              <StageColumn stage={stage} />
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default Tracker;
