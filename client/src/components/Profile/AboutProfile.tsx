import { useState } from "react";

const AboutProfile = ({
  data,
  updateProfile,
}: {
  data: string | undefined;
  updateProfile: Function;
}) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const saveChanges = () => {
    updateProfile({ about: value });
    setUpdate(!update);
  };
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ul className="flex justify-between" role="list">
          {update ? (
            <input
              className="w-full p-1 mr-2 pl-2 border-2 border-solid border-slate-200 rounded-md outline-none"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          ) : (
            <li>{value === "" ? data : value}</li>
          )}
          {update ? (
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
                onClick={() => {
                  setUpdate(!update);
                  setValue("");
                }}
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
                setUpdate(!update);
              }}
              className="font-medium text-indigo-600 hover:text-indigo-500 pr-5 hover:cursor-pointer"
            >
              Update
            </li>
          )}
        </ul>
      </dd>
    </div>
  );
};

export default AboutProfile;
