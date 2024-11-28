import { useState } from "react";

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

const address = [
  {
    key: "line1",
    label: "Line1",
    value: "Add",
    placeholder: "D-2/609",
  },
  {
    key: "line2",
    label: "Line2",
    value: "",
    placeholder: "Sector-F Jankipuram",
  },
  {
    key: "state",
    label: "State",
    value: "",
    placeholder: "Uttar Pradesh",
  },
  {
    key: "country",
    label: "Country",
    value: "",
    placeholder: "India",
  },
  {
    key: "city",
    label: "City",
    value: "",
    placeholder: "Lucknow",
  },
  {
    key: "pincode",
    label: "Pincode",
    value: "",
    placeholder: "226021",
  },
];

const education = [
  [
    {
      key: "school",
      value: "",
      placeholder: "Indian Institute of Information Technology, Kottayam",
    },
    {
      key: "degree",
      value: "",
      placeholder: "B.Tech",
    },
    {
      key: "fieldOfStudy",
      value: "",
      placeholder: "CSE",
    },
    {
      key: "duration",
      value: "",
      placeholder: "2019-2024",
    },
    {
      key: "grade",
      value: "",
      placeholder: "8.72",
    },
  ],
];

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
interface Skill {
  key: string;
  value: string;
}
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
export default function Profile() {
  const [activeField, setActiveField] = useState<string>("");
  const [activeFieldData, setActiveFieldData] = useState<string>("");
  const [preview, setPreview] = useState("/profile.jpg");
  const [activeAddress, setActiveAddress] = useState<string>("");
  const [activeAddressData, setActiveAddressData] = useState<string>("");
  const [activeEducation, setActiveEducation] = useState<string>("");
  const [activeEducationData, setActiveEducationData] = useState<string>("");
  const [skills, setSkills] = useState(skillsData);
  const [skillList, setSkillsList] = useState<Skill[]>([]);

  const setImage = () => {
    const val = document.getElementById("fileInput")?.click();
    console.log(val);
  };

  const getFile = (e) => {
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

  const saveAddressChanges = () => {
    //make api call
    setActiveAddress("");
  };

  const cancelAddressChanges = () => {
    setActiveAddress("");
    setActiveAddressData("");
  };

  const saveEducationChanges = () => {
    setActiveEducation("");
  };
  const cancelEducationChanges = () => {
    setActiveEducation("");
    setActiveEducationData("");
  };

  const removeKey = (key: string) => {
    setSkills(skills.filter((skill) => skill.key !== key));
  };
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
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {"Address"}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.map((field) => (
                <ul className="flex justify-between items-center" role="list">
                  <li className="w-full mr-2">
                    <p className="font-semibold text-sm">{field.label}</p>
                    {activeAddress === field.key ? (
                      <input
                        key={field.key}
                        className="w-full p-1 mr-2 pl-2 border-2 border-solid border-slate-200 rounded-md outline-none"
                        value={activeAddressData}
                        onChange={(e) => {
                          setActiveAddressData(e.target.value);
                          field.value = e.target.value;
                        }}
                      />
                    ) : (
                      <p>{field.value}</p>
                    )}
                  </li>
                  {activeAddress === field.key ? (
                    <li className="font-medium rounded-md hover:cursor-pointer flex flex-row self-end mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-green-700 font-bold hover:bg-green-100 rounded-full"
                        onClick={() => saveAddressChanges()}
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
                        onClick={() => cancelAddressChanges()}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </li>
                  ) : (
                    <li
                      onClick={() => {
                        setActiveAddress(field.key);
                        setActiveAddressData(field.value);
                      }}
                      className="font-medium text-indigo-600 hover:text-indigo-500 pr-5 hover:cursor-pointer"
                    >
                      Update
                    </li>
                  )}
                </ul>
              ))}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {"Education"}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {education.map((field: any) =>
                field.map((info: any) =>
                  activeEducation === info.key ? (
                    <ul
                      className="flex justify-between items-center"
                      role="list"
                    >
                      <li className="w-full mr-2">
                        <input
                          key={info.key}
                          className="w-full p-1 mr-2 pl-2 border-2 border-solid border-slate-200 rounded-md outline-none"
                          value={activeEducationData}
                          placeholder={info.placeholder}
                          onChange={(e) => {
                            setActiveEducationData(e.target.value);
                            info.value = e.target.value;
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
                          onClick={() => saveEducationChanges()}
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
                    <ul
                      className="flex justify-between items-center"
                      role="list"
                    >
                      <li className="w-full mr-2">
                        <p>{info.value === "" ? info.key : info.value}</p>
                      </li>
                      <li
                        onClick={() => {
                          setActiveEducation(info.key);
                          setActiveEducationData(info.value);
                        }}
                        className="font-medium text-indigo-600 hover:text-indigo-500 pr-5 hover:cursor-pointer"
                      >
                        Update
                      </li>
                    </ul>
                  )
                )
              )}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Skills
            </dt>
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
                    <li className="font-semibold text-gray-400">
                      {exp.duration}
                    </li>
                    <li className="mt-2 font-normal text-base text-black">
                      {exp.description}
                    </li>
                  </ul>
                  <p className="font-medium text-indigo-600 hover:text-indigo-500  hover:cursor-pointer">
                    Update
                  </p>
                </div>
              ))}
              <p
                className="text-blue-500 font-medium hover:cursor-pointer"
                onClick={addExperience}
              >
                +Add Experience
              </p>
              <form></form>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                    /> */}
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        resume_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                    /> */}
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        coverletter_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
