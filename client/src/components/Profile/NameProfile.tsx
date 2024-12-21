import { useState } from "react";
import SaveIcon from "../../icons/SaveIcon";
import CancelIcon from "../../icons/CancelIcon";

const NameProfile = ({
  data,
  updateProfile,
  disable,
}: {
  data: string | undefined;
  updateProfile: Function;
  disable: boolean;
}) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>("");
  const saveChanges = () => {
    updateProfile({ name: value });
    setUpdate(!update);
  };
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
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
              <span
                onClick={() => saveChanges()}
                className="text-green-700 font-bold hover:bg-green-100 rounded-full"
              >
                <SaveIcon />
              </span>
              <span
                onClick={() => {
                  setUpdate(!update);
                  setValue("");
                }}
                className="text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <CancelIcon />
              </span>
            </li>
          ) : (
            !disable && (
              <li
                onClick={() => {
                  setUpdate(!update);
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
  );
};

export default NameProfile;
