import { useEffect, useState } from "react";
import {
  useFetchAddressProfileMutation,
  usePatchAddressProfileMutation,
} from "../../redux/meetApi";
import { Address } from "../../types";

const labels = ["line1", "line2", "city", "state", "country", "pincode"];
const add: Address = {
  line1: undefined,
  line2: undefined,
  city: undefined,
  state: undefined,
  country: undefined,
  pincode: undefined,
};

const AddressProfile = ({
  disable,
  username,
}: {
  disable: boolean;
  username: string;
}) => {
  const [activeAddress, setActiveAddress] = useState<string>("");
  const [activeAddressData, setActiveAddressData] = useState<
    string | undefined
  >("");
  const [fetchAddressDetails, { isLoading }] = useFetchAddressProfileMutation();
  const [updateAddressDetails] = usePatchAddressProfileMutation();
  const [address, setAddress] = useState<Address>(add);
  useEffect(() => {
    const getDetails = async () => {
      const { error, data } = await fetchAddressDetails({ username });
      if (data?.success) {
        setAddress({ ...add, ...data.data });
      }
    };
    getDetails();
  }, []);
  const saveAddressChanges = async () => {
    //make api call
    add[activeAddress as keyof Address] = activeAddressData;
    const response = await updateAddressDetails({
      username,
      body: { ...add },
    }).unwrap();

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
      {isLoading ? (
        "Loading"
      ) : (
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {labels.map((field) => (
            <ul className="flex justify-between items-center" role="list">
              <li className="w-full mr-2">
                <p className="font-semibold text-sm">{field}</p>
                {activeAddress === field ? (
                  <input
                    key={field}
                    className="w-full p-1 mr-2 pl-2 border-2 border-solid border-slate-200 rounded-md outline-none"
                    value={activeAddressData}
                    onChange={(e) => {
                      setActiveAddressData(e.target.value);
                      address[field as keyof Address] = e.target.value;
                    }}
                  />
                ) : (
                  <p>{address[field as keyof Address]}</p>
                )}
              </li>
              {activeAddress === field ? (
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
                !disable && (
                  <li
                    onClick={() => {
                      setActiveAddress(field);
                      setActiveAddressData(address[field as keyof Address]);
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-500 pr-5 hover:cursor-pointer"
                  >
                    Update
                  </li>
                )
              )}
            </ul>
          ))}
        </dd>
      )}
    </div>
  );
};

export default AddressProfile;
