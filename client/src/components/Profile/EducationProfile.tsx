import { useEffect, useState } from "react";
import AddEducation from "./AddEducation";
import { Education } from "../../types";
import {
  useFetchEducationMutation,
  usePatchEducationProfileMutation,
} from "../../redux/meetApi";

const fieldEducaionList = [
  "school",
  "degree",
  "fieldOfStudy",
  "duration",
  "grade",
];
// const educations: Education[] = [
//   {
//     id: "1",
//     school: "Indian Institute of Information Technology, Kottayam",
//     degree: "B.Tech",
//     fieldOfStudy: "CSE",
//     duration: "2019-2020",
//     grade: "8.72",
//   },
// ];

interface ActiveEducation {
  field: string;
  id: string;
}
const EducationProfile = ({
  disable,
  username,
}: {
  disable: boolean;
  username: string;
}) => {
  const [openEducation, setOpenEducation] = useState<boolean>(false);
  const [activeEducation, setActiveEducation] = useState<ActiveEducation>({
    field: "",
    id: "",
  });
  const [activeEducationData, setActiveEducationData] = useState<string>("");
  const [educations, setEducations] = useState<Education[]>([]);
  const [getEducation] = useFetchEducationMutation();
  const [updateEducation] = usePatchEducationProfileMutation();

  const addEducation = (education: Education) => {
    setEducations((prev) => [...educations, education]);
  };
  useEffect(() => {
    const getEducationDetails = async () => {
      const res = await getEducation({ username }).unwrap();
      setEducations((prev) => [...res.data]);
    };
    getEducationDetails();
  }, []);

  const formEducationAction = () => {
    setOpenEducation(!openEducation);
  };

  const saveEducationChanges = async (
    field: string,
    idx: number,
    id: string
  ) => {
    const newEducations = educations.map((education) => {
      if (education.id === id) {
        const newEducation = { ...education };
        newEducation[field as keyof Education] = activeEducationData;
        return { ...newEducation };
      }
      return education;
    });

    setEducations((prev) => [...newEducations]);
    setActiveEducation({ field: "", id: "" });
    setActiveEducationData("");
    const res = await updateEducation({
      username,
      id,
      body: newEducations[idx],
    }).unwrap();
    console.log(res);
  };
  const cancelEducationChanges = () => {
    setActiveEducation({ field: "", id: "" });
    setActiveEducationData("");
  };
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {"Education"}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {educations.map((education: any, idx: number) => (
          <div className="border-b-2 rounded-b-lg py-2">
            {fieldEducaionList.map((field: any) =>
              activeEducation.field === field &&
              activeEducation.id === education.id ? (
                <ul className="flex justify-between items-center" role="list">
                  <li className="w-full mr-2">
                    <input
                      key={field}
                      className="w-full p-1 mr-2 pl-2 border-2 border-solid border-slate-200 rounded-md outline-none"
                      // value={activeEducationData}
                      placeholder={field}
                      onChange={(e) => {
                        // education[field] = e.target.value;
                        setActiveEducationData(e.target.value);
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
                      onClick={() =>
                        saveEducationChanges(field, idx, education.id)
                      }
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
                  <li className="w-full mr-2 ">
                    <p className="font-semibold">
                      {education[field] === null ? field : education[field]}
                    </p>
                  </li>
                  {!disable && (
                    <li
                      onClick={() => {
                        setActiveEducation({ field, id: education.id });
                        setActiveEducationData(field);
                      }}
                      className="font-medium text-indigo-600 hover:text-indigo-500 pr-5 hover:cursor-pointer"
                    >
                      Update
                    </li>
                  )}
                </ul>
              )
            )}
          </div>
        ))}
        {!openEducation && !disable && (
          <p
            className="text-blue-500 font-medium hover:cursor-pointer mt-4"
            onClick={() => setOpenEducation(true)}
          >
            +Add Education
          </p>
        )}
        {openEducation && (
          <AddEducation
            formEducationAction={formEducationAction}
            username={username}
            addEducation={addEducation}
          />
        )}
      </dd>
    </div>
  );
};

export default EducationProfile;
