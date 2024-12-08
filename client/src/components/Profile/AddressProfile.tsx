import { useState } from "react";

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

const AddressProfile = () => {
  const [activeAddress, setActiveAddress] = useState<string>("");
  const [activeAddressData, setActiveAddressData] = useState<string>("");
  const saveAddressChanges = () => {
    //make api call
    setActiveAddress("");
  };

  const cancelAddressChanges = () => {
    setActiveAddress("");
    setActiveAddressData("");
  };
  return (
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
  );
};

export default AddressProfile;
