import { useEffect, useState } from "react";
import { useUpdateSkillsMutation } from "../../redux/ApiSlice/meetApi";
import { Skill } from "../../types";
import { useFetchSkillsProfileMutation } from "../../redux/ApiSlice/publicApi";
import CloseIcon from "../../icons/CloseIcon";
import SearchIcon from "../../icons/SearchIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let list: Skill[] = [
  {
    label: "react",
    value: "React",
  },
  {
    label: "mongodb",
    value: "MongoDB",
  },
  {
    label: "express",
    value: "Express",
  },
  {
    label: "prisma",
    value: "Prisma",
  },
];

const SkillsProfile = ({
  disable,
  username,
}: {
  disable: boolean;
  username: string;
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillList, setSkillsList] = useState<Skill[]>([]);
  const [fetchSkills] = useFetchSkillsProfileMutation();
  const [patchSkills] = useUpdateSkillsMutation();
  const navigation = useNavigate();
  useEffect(() => {
    const getSkills = async () => {
      const response = await fetchSkills({
        username,
      }).unwrap();
      if (response.data) {
        if (response.data?.skills) setSkills(() => [...response.data.skills]);
      }
    };
    getSkills();
  }, []);

  const searchSkill = (val: string) => {
    if (val === "") {
      setSkillsList([]);
      return;
    }
    const data = list.filter((skill) =>
      skill.value.toLowerCase().includes(val.toLowerCase())
    );
    setSkillsList(data);
  };
  const addSkill = async (label: string, value: string) => {
    try {
      const newSkills = [...skills, { label, value }];
      await patchSkills({ body: newSkills }).unwrap();
      setSkills(newSkills);
      setSkillsList([]);
    } catch (err: any) {
      if (err.status === 401) {
        navigation("/login");
        return;
      }
      toast.error(err.error);
    }
  };
  const removeKey = async (label: string) => {
    try {
      const newSkills = skills.filter((skill) => skill.label !== label);
      await patchSkills({ body: newSkills }).unwrap();
      setSkills(newSkills);
    } catch (err: any) {
      if (err.status === 401) {
        navigation("/login");
        return;
      }
      toast.error(err.error);
    }
  };

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">Skills</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <div className="flex flex-row flex-wrap">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-sm bg-gray-50 px-2 py-1 mr-2 mb-3 text-sm font-normal text-black ring-1 ring-inset ring-gray-500/10"
            >
              {skill.value}
              <span
                className="ml-1 hover:cursor-pointer text-gray-600"
                onClick={() => removeKey(skill.label)}
              >
                <CloseIcon />
              </span>
            </span>
          ))}
        </div>
        {!disable && (
          <form className="relative">
            <div className="flex flex-col border-2 border-gray-200 border-solid rounded-md focus-within:border-indigo-800 focus-within:ring-4 focus-within:ring-indigo-300 focus-within:ring-offset-3">
              <div className="w-full flex flex-row gap-2 p-2  ">
                <span className="bg-blue-100 p-2 rounded-full h-8">
                  <SearchIcon />
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
                    {skillList.map((skill, idx) => (
                      <li
                        key={skill.label + "$" + idx}
                        className="border-solid border-t-2 border-gray-200 p-2 hover:bg-indigo-200"
                        onClick={() => addSkill(skill.label, skill.value)}
                      >
                        {skill.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        )}
      </dd>
    </div>
  );
};

export default SkillsProfile;
