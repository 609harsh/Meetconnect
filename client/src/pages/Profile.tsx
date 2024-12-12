import { useEffect, useState } from "react";
import SkillsProfile from "../components/Profile/SkillsProfile";
import AttachmentsProfile from "../components/Profile/AttachmentsProfile";
import WorkExperienceProfile from "../components/Profile/WorkExperienceProfile";
import EducationProfile from "../components/Profile/EducationProfile";
import AddressProfile from "../components/Profile/AddressProfile";
import { useUploadProfileMutation } from "../redux/cloudinaryApi";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Payload } from "../types";

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
  const [uploadProfile] = useUploadProfileMutation();
  const [preview, setPreview] = useState("/profile.jpg");
  const [disable, setDisable] = useState<boolean>(true);
  const { username } = useParams<{ username: string }>();
  const checkUpdateFeature = () => {
    const token = localStorage.getItem("token") as string;
    if (!token || token.trim() === "") {
      return;
    }
    const payload = jwtDecode(token) as Payload;
    if (username === payload.email.split("@")[0]) {
      setDisable(false);
      return;
    }
  };
  useEffect(() => {
    checkUpdateFeature();
  }, []);

  const setImage = () => {
    const val = document.getElementById("fileInput")?.click();
    console.log(val);
  };

  const getFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formdata.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    const response = await uploadProfile({ formData: formdata }).unwrap();
    if (response.success) setPreview(response.data as string);
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
            accept="image/png, image/jpeg, image/jpg"
            onChange={getFile}
          />
          <img
            src={`${preview}`}
            className="z-10 h-28 w-28 bg-cover"
            onClick={() => setImage()}
          ></img>
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
                    field.edit &&
                    !disable && (
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
          <AddressProfile disable={disable} username={username + ""} />
          <EducationProfile disable={disable} username={username + ""} />
          <SkillsProfile disable={disable} username={username + ""} />
          <WorkExperienceProfile disable={disable} username={username + ""} />
          {/* <AttachmentsProfile disable={disable} /> */}
        </dl>
      </div>
    </div>
  );
}
