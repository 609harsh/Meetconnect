import { useState } from "react";

const tabs = [
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
const Interview = () => {
  const [currId, setCurrId] = useState(0);
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mx-auto max-w-5xl my-5 md:mt-10">
      <ul className="flex flex-wrap -mb-px">
        {tabs.map((tab) => {
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
  );
};

export default Interview;
