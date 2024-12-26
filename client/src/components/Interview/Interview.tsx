import { useEffect, useState } from "react";
import InterviewList from "./InterviewList";
import { Interview, Tabs } from "../../types";
import { useGetInterviewsQuery } from "../../redux/ApiSlice/meetApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addAllInterviews } from "../../redux/interviewsSlice";
import Schedule from "../Schedule";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const tabs: Tabs[] = [
  {
    id: 1,
    name: "Live",
  },
  {
    id: 2,
    name: "Upcoming",
  },
  {
    id: 3,
    name: "Past",
  },
  {
    id: 4,
    name: "All",
  },
];

const InterviewSection = () => {
  const [currId, setCurrId] = useState(1);
  const [interviewsData, setInterviewData] = useState<Interview[]>([]);
  const {
    data: interviews = [],
    isFetching,
    isError,
    error,
  } = useGetInterviewsQuery();
  const allInterviews = useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();
  const scheduleModal = useAppSelector((state) => state.menu.value);
  const navigation = useNavigate();

  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      toast.error("Unauthorized");
      navigation("/login");
    } else if (interviews) {
      dispatch(addAllInterviews(interviews));
    }
  }, [interviews, dispatch, isError]);

  useEffect(() => {
    const classifyInterviews = async (currId: number) => {
      const dateNow = new Date()
        .toLocaleDateString("en-GB", { timeZone: "IST" })
        .split("/");
      const liveDate = dateNow[2] + "-" + dateNow[1] + "-" + dateNow[0];

      if (currId === 1) {
        const live = allInterviews.filter((interview: Interview) => {
          return interview.date.split(" ")[0] === liveDate;
        });
        setInterviewData(live);
      } else if (currId === 2) {
        const upcoming = allInterviews.filter((interview: Interview) => {
          return interview.date.split(" ")[0] > liveDate;
        });
        setInterviewData(upcoming);
      } else if (currId === 3) {
        const past = allInterviews.filter((interview: Interview) => {
          return interview.date.split(" ")[0] < liveDate;
        });
        setInterviewData(past);
      } else {
        setInterviewData(allInterviews);
      }
    };

    classifyInterviews(currId);
  }, [currId, allInterviews]);
  return (
    <>
      {scheduleModal && <Schedule />}
      {
        <div className="relative">
          <div className="text-lg font-medium text-center text-gray-80000 border-b-2 border-gray-200  mx-auto max-w-5xl my-5 md:mt-10">
            <ul className="flex flex-wrap justify-center md:justify-start -mb-px">
              {tabs?.map((tab) => {
                return (
                  <li className="me-2" key={tab.id}>
                    {tab.id === currId ? (
                      <p
                        className="inline-block p-2 md:p-4 text-blue-700/90 border-b-2 border-blue-700/90 rounded-t-lg active"
                        aria-current="page"
                      >
                        {tab.name}
                      </p>
                    ) : (
                      <p
                        onClick={() => setCurrId(tab.id)}
                        className="inline-block p-2 md:p-4 border-b-2 border-transparent rounded-t-lg hover:text-black hover:border-blue-300/90 hover:bg-blue-300/90 hover:cursor-pointer"
                      >
                        {tab.name}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          {isFetching ? (
            <div className="absolute top-64 left-1/2">
              <Loader />
            </div>
          ) : (
            <InterviewList data={interviewsData} />
          )}
        </div>
      }
    </>
  );
};

export default InterviewSection;
