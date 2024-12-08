import { useState } from "react";
import SkillsProfile from "../components/Profile/SkillsProfile";
import AttachmentsProfile from "../components/Profile/AttachmentsProfile";
import WorkExperienceProfile from "../components/Profile/WorkExperienceProfile";
import EducationProfile from "../components/Profile/EducationProfile";
import AddressProfile from "../components/Profile/AddressProfile";

const profile = [
  {
    key: "name",
    label: "Full Name",
    data: "Harsh Gupta",
    edit: true,
  },
  {
    key: "email",
    label: "Email",
    data: "harshgupta609@gmail.com",
    edit: false,
  },
  {
    key: "phone",
    label: "Phone",
    data: "9305054757",
    edit: true,
  },
  {
    key: "about",
    label: "About",
    data: "Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
    edit: true,
  },
  // {
  //   key: "education",
  //   label: "Highest Education",
  //   data: "IIIT Kottayam, 2018-2023",
  //   edit: true,
  //   plcaeholder: "RV College, 2019-2024, B.Tech, CSE",
  // },
];

export default function Profile() {
  const [activeField, setActiveField] = useState<string>("");
  const [activeFieldData, setActiveFieldData] = useState<string>("");
  const [preview, setPreview] = useState("/profile.jpg");

  const setImage = () => {
    const val = document.getElementById("fileInput")?.click();
    console.log(val);
  };

  const getFile = (e: any) => {
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    console.log(objectUrl);

    setPreview(objectUrl.slice(5));
    console.log(preview);
    URL.revokeObjectURL(objectUrl);
    // console.log(file);
    // if (file) {
    //   // Create FormData and append the file
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   console.log(formData);
    //   for (let pair of formData.entries()) {
    //     console.log(pair[0], pair[1]); // Should log 'file' and the file object
    //   }
    // }
  };

  const saveChanges = () => {
    //make api call
    setActiveField("");
  };

  const cancelChanges = () => {
    setActiveField("");
    setActiveFieldData("");
  };

  return (
    <div className="mx-auto border-b shadow-md rounded-md max-w-4xl p-4 my-6">
      <div className="px-4 sm:px-0 flex justify-between items-center">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900 ">
          Your Profile
        </h3>
        <div className="relative border-2 border-solid border-black w-fit mr-4">
          <input
            type="file"
            className="hidden"
            id="fileInput"
            accept="image/png, image/jpeg"
            onChange={(e) => getFile(e)}
          />
          <div
            style={{
              backgroundImage: ``,
            }}
            className="z-10 h-28 w-28 bg-cover  border-2 border-solid border-gray-200 "
            onClick={() => setImage()}
          ></div>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {profile.map((field) => (
            <div
              key={field.key}
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {field.label}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <ul className="flex justify-between" role="list">
                  {field.key === activeField ? (
                    <input
                      className="w-full p-1 mr-2 pl-2 border-2 border-solid border-slate-200 rounded-md outline-none"
                      value={activeFieldData}
                      onChange={(e) => {
                        setActiveFieldData(e.target.value);
                        field.data = e.target.value;
                      }}
                      // placeholder={field?.plcaeholder}
                    />
                  ) : (
                    <li>{field.data}</li>
                  )}
                  {field.key === activeField ? (
                    <li className="font-medium rounded-md hover:cursor-pointer flex flex-row justify-around items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-green-700 font-bold hover:bg-green-100 rounded-full"
                        onClick={() => saveChanges()}
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
                        onClick={() => cancelChanges()}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </li>
                  ) : (
                    field.edit && (
                      <li
                        onClick={() => {
                          setActiveField(field.key);
                          setActiveFieldData(field.data);
                        }}
                        className="font-medium text-indigo-600 hover:text-indigo-500 pr-5 hover:cursor-pointer"
                      >
                        Update
                      </li>
                    )
                  )}
                </ul>
              </dd>
            </div>
          ))}
          <AddressProfile />
          <EducationProfile />
          <SkillsProfile />
          <WorkExperienceProfile />
          <AttachmentsProfile />
        </dl>
      </div>
    </div>
  );
}
