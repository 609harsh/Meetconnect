import { useEffect, useState } from "react";
import AddEducation from "./AddEducation";
import { Education } from "../../types";
import { usePatchEducationProfileMutation } from "../../redux/meetApi";
import { useFetchEducationMutation } from "../../redux/publicApi";

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

  const addEducation = async (education: Education, add: boolean) => {
    if (!add) {
      setOpenEducation(!openEducation);
      return;
    }
    const save = await updateEducation({
      body: education,
    }).unwrap();
    if (save.success) setOpenEducation(!openEducation);
    setEducations((prev) => [...educations, education]);
  };
  useEffect(() => {
    const getEducationDetails = async () => {
      const res = await getEducation({ username }).unwrap();
      setEducations((prev) => [...res.data]);
    };
    getEducationDetails();
  }, []);

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {"Education"}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {educations.map((education: Education) => (
          <div className="border-b-2 rounded-b-lg py-2" key={education.id}>
            <ul className="flex justify-between items-center" role="list">
              <li className="w-full mr-2 ">
                <p className="font-semibold">School:{education.school}</p>
              </li>
              <li className="w-full mr-2 ">
                <p className="font-semibold">Degree:{education.degree}</p>
              </li>
              <li className="w-full mr-2 ">
                <p className="font-semibold">
                  Field of Study:{education.fieldOfStudy}
                </p>
              </li>
              <li className="w-full mr-2 ">
                <p className="font-semibold">duration:{education.duration}</p>
              </li>
              <li className="w-full mr-2 ">
                <p className="font-semibold">Grade:{education.grade}</p>
              </li>
            </ul>
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
