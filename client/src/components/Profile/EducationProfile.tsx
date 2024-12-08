import { useState } from "react";
import AddEducation from "./AddEducation";

const education = [
  [
    {
      key: "school",
      value: "",
      placeholder: "Indian Institute of Information Technology, Kottayam",
    },
    {
      key: "degree",
      value: "",
      placeholder: "B.Tech",
    },
    {
      key: "fieldOfStudy",
      value: "",
      placeholder: "CSE",
    },
    {
      key: "duration",
      value: "",
      placeholder: "2019-2024",
    },
    {
      key: "grade",
      value: "",
      placeholder: "8.72",
    },
  ],
];

const EducationProfile = () => {
  const [openEducation, setOpenEducation] = useState<boolean>(false);
  const [activeEducation, setActiveEducation] = useState<string>("");
  const [activeEducationData, setActiveEducationData] = useState<string>("");
  const formEducationAction = () => {
    setOpenEducation(!openEducation);
  };
  const saveEducationChanges = () => {
    setActiveEducation("");
  };
  const cancelEducationChanges = () => {
    setActiveEducation("");
    setActiveEducationData("");
  };
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {"Education"}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {education.map((field: any) =>
          field.map((info: any) =>
            activeEducation === info.key ? (
              <ul className="flex justify-between items-center" role="list">
                <li className="w-full mr-2">
                  <input
                    key={info.key}
                    className="w-full p-1 mr-2 pl-2 border-2 border-solid border-slate-200 rounded-md outline-none"
                    value={activeEducationData}
                    placeholder={info.placeholder}
                    onChange={(e) => {
                      setActiveEducationData(e.target.value);
                      info.value = e.target.value;
                    }}
                  />
                </li>
                <li className="font-medium rounded-md hover:cursor-pointer flex flex-row self-end mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-green-700 font-bold hover:bg-green-100 rounded-full"
                    onClick={() => saveEducationChanges()}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-gray-700 hover:bg-gray-100 rounded-full"
                    onClick={() => cancelEducationChanges()}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </li>
              </ul>
            ) : (
              <ul className="flex justify-between items-center" role="list">
                <li className="w-full mr-2">
                  <p>{info.value === "" ? info.key : info.value}</p>
                </li>
                <li
                  onClick={() => {
                    setActiveEducation(info.key);
                    setActiveEducationData(info.value);
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500 pr-5 hover:cursor-pointer"
                >
                  Update
                </li>
              </ul>
            )
          )
        )}
        {!openEducation && (
          <p
            className="text-blue-500 font-medium hover:cursor-pointer mt-4"
            onClick={() => setOpenEducation(true)}
          >
            +Add Education
          </p>
        )}
        {openEducation && (
          <AddEducation formEducationAction={formEducationAction} />
        )}
      </dd>
    </div>
  );
};

export default EducationProfile;
