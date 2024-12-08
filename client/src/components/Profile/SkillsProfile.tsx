import { useEffect, useState } from "react";

let skillsData: Skill[] = [
  {
    key: "react",
    value: "React",
  },
  {
    key: "mongodb",
    value: "MongoDB",
  },
  {
    key: "express",
    value: "Express",
  },
  {
    key: "prisma",
    value: "Prisma",
  },
];
let list: Skill[] = [
  {
    key: "react",
    value: "React",
  },
  {
    key: "mongodb",
    value: "MongoDB",
  },
  {
    key: "express",
    value: "Express",
  },
  {
    key: "prisma",
    value: "Prisma",
  },
];
interface Skill {
  key: string;
  value: string;
}
const SkillsProfile = () => {
  const [skills, setSkills] = useState(skillsData);
  const [skillList, setSkillsList] = useState<Skill[]>([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);

  const searchSkill = (val: string) => {
    if (val === "") {
      setSkillsList([]);
      return;
    }
    const data = list.filter((skill) =>
      skill.value.toLowerCase().includes(val.toLowerCase())
    );
    setSkillsList((prev) => [...data]);
  };
  const addSkill = (key: string, value: string) => {
    skills.push({ key, value });
    setSkills((prev) => [...prev]);
    setSkillsList([]);
  };
  const removeKey = (key: string) => {
    setSkills(skills.filter((skill) => skill.key !== key));
  };

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">Skills</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <div className="flex flex-row flex-wrap">
          {skills.map((skill) => (
            <span
              key={skill.key}
              className="inline-flex items-center rounded-sm bg-gray-50 px-2 py-1 mr-2 mb-3 text-sm font-normal text-black ring-1 ring-inset ring-gray-500/10"
            >
              {skill.value}
              <span className="ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 hover:cursor-pointer text-gray-600 "
                  onClick={() => removeKey(skill.key)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </span>
          ))}
        </div>
        <form className="relative">
          <div className="flex flex-col border-2 border-gray-200 border-solid rounded-md focus-within:border-indigo-800 focus-within:ring-4 focus-within:ring-indigo-300 focus-within:ring-offset-3">
            <div className="w-full flex flex-row gap-2 p-2  ">
              <span className="bg-blue-100 p-2 rounded-full h-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
              <input
                className="text-md w-full placeholder-dark-a border rounded bg-transparent shadow-none outline-none border-transparent "
                type="text"
                placeholder="eg. Python, React"
                onChange={(e) => searchSkill(e.target.value)}
              />
            </div>
            {skillList.length > 0 && (
              <div className="max-h-40 overflow-auto">
                <ul>
                  {skillList.map((skill) => (
                    <li
                      key={skill.key}
                      className="border-solid border-t-2 border-gray-200 p-2 hover:bg-indigo-200"
                      onClick={() => addSkill(skill.key, skill.value)}
                    >
                      {skill.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </dd>
    </div>
  );
};

export default SkillsProfile;