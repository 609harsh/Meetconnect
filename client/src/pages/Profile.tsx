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
];

export default function Profile() {
  const [activeField, setActiveField] = useState<string>("");
  const [activeFieldData, setActiveFieldData] = useState<string>("");

  const saveChanges = () => {
    setActiveField("");
    setActiveFieldData("");
  };

  return (
    <div className="mx-auto border-b shadow-md rounded-md max-w-4xl p-4 my-6">
      <div className="px-4 sm:px-0 flex justify-between items-center">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900 ">
          Your Profile
        </h3>
        <div>
          <input type="file" />
          <div
            style={{ backgroundImage: `url(/profile.jpg)` }}
            className="h-28 w-28 mr-4 rounded-full border-2 border-solid border-gray-200"
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
                      value={field.data}
                      onChange={(e) => setActiveField(e.target.value)}
                    ></input>
                  ) : (
                    <li>{field.data}</li>
                  )}
                  {field.key === activeField ? (
                    <li
                      className="font-medium text-white bg-indigo-600  rounded-md px-4 py-2 hover:cursor-pointer"
                      onClick={() => saveChanges()}
                    >
                      Save
                    </li>
                  ) : (
                    <li
                      onClick={() => setActiveField(field.key)}
                      className="font-medium text-indigo-600 hover:text-indigo-500 pr-5 hover:cursor-pointer"
                    >
                      Update
                    </li>
                  )}
                </ul>
              </dd>
            </div>
          ))}
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
