import { useEffect, useState } from "react";
import AddExperience from "./AddExperience";
import { useUpdateWorkExperienceMutation } from "../../redux/meetApi";
import { Experience } from "../../types";
import { useFetchWorkExperienceMutation } from "../../redux/publicApi";

const WorkExperienceProfile = ({
  disable,
  username,
}: {
  disable: boolean;
  username: string;
}) => {
  const [openExperience, setOpenExperience] = useState<boolean>(false);
  const [getDetails] = useFetchWorkExperienceMutation();
  const [addExperience] = useUpdateWorkExperienceMutation();
  const [experience, setExperience] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await getDetails({ username }).unwrap();
      setExperience((prev) => [...res.data]);
    };
    fetchDetails();
  }, []);
  const formExperienceAction = async (formData?: Experience) => {
    console.log("formData", formData);
    if (!formData) return;
    const res = await addExperience({
      newExperience: formData,
    }).unwrap();
    setExperience((prev) => [...prev, { ...res.data }]);
    setOpenExperience(!openExperience);
  };

  const removeWorkExp = (id: string | undefined) => {
    const newEducations = experience.filter((exp) => exp.id !== id);
    setExperience(newEducations);
  };
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {"Work Experience"}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {experience.map((exp, idx) => (
          <div
            key={exp.id}
            className="flex justify-between w-full border-2 border-solid border-gray-300 px-5 py-2 border-b-4 rounded-md bg-gray-50 mb-2"
          >
            <ul key={idx}>
              <li className="font-bold text-lg">{exp.title}</li>
              <li className="font-normal text-base text-blue-600">
                {exp.company}
              </li>
              <li className="font-semibold text-gray-400">{exp.duration}</li>
              <li className="mt-2 font-normal text-base text-black">
                {exp.about}
              </li>
            </ul>
            {!disable && (
              <p className="font-medium hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-red-600"
                  onClick={() => removeWorkExp(exp.id)}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
            )}
          </div>
        ))}
        {!openExperience && !disable && (
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
