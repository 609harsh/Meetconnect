import { useEffect, useState } from "react";
import { usePatchAddressProfileMutation } from "../../redux/ApiSlice/meetApi";
import { Address } from "../../types";
import { useFetchAddressProfileMutation } from "../../redux/ApiSlice/publicApi";
import SaveIcon from "../../icons/SaveIcon";
import CancelIcon from "../../icons/CancelIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const navigation = useNavigate();
  useEffect(() => {
    const getDetails = async () => {
      const { data } = await fetchAddressDetails({ username });
      if (data?.success) {
        setAddress({ ...add, ...data.data });
      }
    };
    getDetails();
  }, []);
  const saveAddressChanges = async () => {
    //make api call
    add[activeAddress as keyof Address] = activeAddressData;
    try {
      await updateAddressDetails({
        body: { ...add },
      }).unwrap();

      setActiveAddress("");
    } catch (err: any) {
      if (err.status === 401) {
        navigation("/login");
        return;
      }
      toast.error(err.error);
    }
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
          {labels.map((field, idx) => (
            <ul
              className="flex justify-between items-center"
              role="list"
              key={idx}
            >
              <li className="w-full mr-2">
                <p className="font-semibold text-sm">
                  {field[0].toUpperCase() + field.substring(1)}
                </p>
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
                  <span
                    onClick={() => saveAddressChanges()}
                    className="text-green-700 font-bold hover:bg-green-100 rounded-full"
                  >
                    <SaveIcon />
                  </span>
                  <span
                    onClick={() => cancelAddressChanges()}
                    className="text-gray-700 hover:bg-gray-100 rounded-full"
                  >
                    <CancelIcon />
                  </span>
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
