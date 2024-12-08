import { useState } from "react";
import AddExperience from "./AddExperience";

const experience = [
  {
    company: "Forescribe",
    jobTitle: "Backend Developer Intern",
    duration: "2019-2023",
    description:
      " created amazing website created amazing website created amazing website created amazing website created amazing website",
  },
  {
    company: "Forescribe",
    jobTitle: "Backend Developer Intern",
    duration: "2019-2023",
  },
  {
    company: "Forescribe",
    jobTitle: "Backend Developer Intern",
    duration: "2019-2023",
  },
];

const WorkExperienceProfile = () => {
  const [openExperience, setOpenExperience] = useState<boolean>(false);
  const formExperienceAction = () => {
    setOpenExperience(!openExperience);
  };
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {"Work Experience"}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {experience.map((exp, idx) => (
          <div className="flex justify-between w-full border-2 border-solid border-gray-300 px-5 py-2 border-b-4 rounded-md bg-gray-50 mb-2">
            <ul key={idx}>
              <li className="font-bold text-lg">{exp.jobTitle}</li>
              <li className="font-normal text-base text-blue-600">
                {exp.company}
              </li>
              <li className="font-semibold text-gray-400">{exp.duration}</li>
              <li className="mt-2 font-normal text-base text-black">
                {exp.description}
              </li>
            </ul>
            <p className="font-medium text-indigo-600 hover:text-indigo-500  hover:cursor-pointer">
              Update
            </p>
          </div>
        ))}
        {!openExperience && (
          <p
            className="text-blue-500 font-medium hover:cursor-pointer mt-4"
            onClick={() => setOpenExperience(true)}
          >
            +Add Experience
          </p>
        )}
        {openExperience && (
          <AddExperience formExperienceAction={formExperienceAction} />
        )}
      </dd>
    </div>
  );
};

export default WorkExperienceProfile;
