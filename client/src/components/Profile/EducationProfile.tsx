import { useEffect, useState } from "react";
import AddEducation from "./AddEducation";
import { Education } from "../../types";
import { usePatchEducationProfileMutation } from "../../redux/ApiSlice/meetApi";
import { useFetchEducationMutation } from "../../redux/ApiSlice/publicApi";
import TrashIcon from "../../icons/TrashIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EducationProfile = ({
  disable,
  username,
}: {
  disable: boolean;
  username: string;
}) => {
  const [openEducation, setOpenEducation] = useState<boolean>(false);
  const [educations, setEducations] = useState<Education[]>([]);
  const [getEducation] = useFetchEducationMutation();
  const [updateEducation] = usePatchEducationProfileMutation();
  const navigation = useNavigate();
  const addEducation = async (education: Education, add: boolean) => {
    if (!add) {
      setOpenEducation(!openEducation);
      return;
    }
    try {
      const save = await updateEducation({
        body: education,
      }).unwrap();
      if (save.success) setOpenEducation(!openEducation);
      setEducations([...educations, education]);
    } catch (err: any) {
      if (err.status === 401) {
        navigation("/login");
        return;
      }
      toast.error(err.error);
    }
  };
  useEffect(() => {
    const getEducationDetails = async () => {
      console.log("username", username);
      const res = await getEducation({ username }).unwrap();
      console.log(res);
      setEducations([...res.data]);
    };
    getEducationDetails();
  }, []);
  const removeEducation = (id: string | undefined) => {
    const newEducations = educations.filter((education) => education.id !== id);
    setEducations(newEducations);
  };

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {"Education"}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {educations.map((education: Education) => (
          <div
            key={education.id}
            className="flex justify-between w-full border-2 border-solid border-gray-300 px-5 py-2 border-b-4 rounded-md bg-gray-50 mb-2"
          >
            <ul>
              <li className="font-bold text-lg">School: {education.school}</li>
              <li className="font-normal text-base text-blue-600">
                Degree: {education.degree}
              </li>
              <li className="font-semibold text-gray-400">
                Field of Study: {education.fieldOfStudy}
              </li>
              <li className="mt-2 font-normal text-base text-black">
                Duration: {education.duration}
              </li>
              <li className="mt-2 font-normal text-base text-black">
                Grade: {education.grade}
              </li>
            </ul>
            {!disable && (
              <p
                className="font-medium hover:cursor-pointer text-red-600"
                onClick={() => removeEducation(education.id)}
              >
                <TrashIcon />
              </p>
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
        {openEducation && <AddEducation addEducation={addEducation} />}
      </dd>
    </div>
  );
};

export default EducationProfile;
