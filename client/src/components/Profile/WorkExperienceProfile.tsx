import { useEffect, useState } from "react";
import AddExperience from "./AddExperience";
import {
  useDeleteWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
} from "../../redux/ApiSlice/meetApi";
import { Experience } from "../../types";
import { useFetchWorkExperienceMutation } from "../../redux/ApiSlice/publicApi";
import TrashIcon from "../../icons/TrashIcon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const [deleteExperience] = useDeleteWorkExperienceMutation();
  const [experience, setExperience] = useState<Experience[]>([]);
  const navigation = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await getDetails({ username }).unwrap();
      setExperience([...res.data]);
    };
    fetchDetails();
  }, []);
  const formExperienceAction = async (formData?: Experience) => {
    try {
      if (!formData) return;
      const res = await addExperience({
        newExperience: formData,
      }).unwrap();
      setExperience((prev) => [...prev, { ...res.data }]);
      setOpenExperience(!openExperience);
    } catch (err: any) {
      if (err.status === 401) {
        navigation("/login");
        return;
      }
      toast.error(err.error);
    }
  };

  const removeWorkExp = async (id: string | undefined) => {
    try {
      const newEducations = experience.filter((exp) => exp.id !== id);
      setExperience(newEducations);
      await deleteExperience({ id: id + "" }).unwrap();
    } catch (err: any) {
      if (err.status === 401) {
        navigation("/login");
      }
      toast.error(err.error);
    }
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
              <p
                className="font-medium hover:cursor-pointer text-red-600"
                onClick={() => removeWorkExp(exp.id)}
              >
                <TrashIcon />
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
