import { useEffect, useState } from "react";
import InterviewList from "./InterviewList";
import { Interview } from "../types";
import { useGetInterviewsQuery } from "../redux/meetApi";

interface Tabs {
  id: number;
  name: string;
}
const tabsData: Tabs[] = [
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
  const [tabs, setTabs] = useState<Tabs[]>();
  const [interviewsData, setInterviewData] = useState<Interview[][]>([]);
  const {
    data: interviews = [],
    isSuccess,
    isFetching,
    isError,
    error,
  } = useGetInterviewsQuery();
  console.log(interviews);
  useEffect(() => {
    setTabs((prev) => [...tabsData]);
    const fetchInterviews = async () => {
      const dateNow = new Date()
        .toLocaleDateString("en-GB", { timeZone: "IST" })
        .split("/");

      const liveDate = dateNow[2] + "-" + dateNow[1] + "-" + dateNow[0];
      console.log(liveDate);
      const live = interviews?.filter((interview: Interview) => {
        return interview.date === liveDate;
      });
      const upcoming = interviews?.filter((interview: Interview) => {
        return interview.date > liveDate;
      });
      const past = interviews?.filter((interview: Interview) => {
        return interview.date < liveDate;
      });
      const allData = [live, upcoming, past, interviews];
      console.log(allData);
      if (isSuccess) setInterviewData((prev) => [...allData]);
    };
    fetchInterviews();
  }, [interviews]);
  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mx-auto max-w-5xl my-5 md:mt-10">
        <ul className="flex flex-wrap -mb-px">
          {tabs?.map((tab) => {
            return (
              <li className="me-2" key={tab.id}>
                {tab.id === currId ? (
                  <p
                    className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    aria-current="page"
                  >
                    {tab.name}
                  </p>
                ) : (
                  <p
                    onClick={() => setCurrId(tab.id)}
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 hover:cursor-pointer"
                  >
                    {tab.name}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <InterviewList data={interviewsData[currId - 1]} />
    </div>
  );
};

export default InterviewSection;
