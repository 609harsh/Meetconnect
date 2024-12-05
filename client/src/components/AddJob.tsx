import { useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

export interface JobOption {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

const filterColors = (inputValue: string) => {
  return jobOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string) =>
  new Promise<JobOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

const jobOptions: JobOption[] = [
  {
    value: "ocean",
    label: "Software Developer",
    color: "#00B8D9",
    isFixed: true,
  },
  {
    value: "ocean",
    label: "Full Developer",
    color: "#00B8D9",
    isFixed: true,
  },
  {
    value: "ocean",
    label: "Software Developer",
    color: "#00B8D9",
    isFixed: true,
  },
  {
    value: "ocean",
    label: "Software Developer",
    color: "#00B8D9",
    isFixed: true,
  },
  {
    value: "ocean",
    label: "Software Developer",
    color: "#00B8D9",
    isFixed: true,
  },
];

const AddJob = () => {
  const [isSearchable, setIsSearchable] = useState(true);
  const [isClearable, setIsClearable] = useState(true);
  return (
    <div className="flex justify-center items-center z-10 fixed bg-black bg-opacity-5 backdrop-blur-sm inset-0">
      <div className="bg-white relative rounded-lg w-[800px] p-10 overflow-auto max-h-screen">
        <header className="flex flex-row justify-between">
          <p className="font-bold text-3xl">Add Job</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </header>
        <section className="new-job-form">
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="company"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Company
                    </label>
                    <div className="mt-2">
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={promiseOptions}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="jobtitle"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Job Title
                    </label>
                    <div className="mt-2">
                      <Select
                        className="basic-single"
                        // classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        // isDisabled={isDisabled}
                        // isLoading={isLoading}
                        isClearable={isClearable}
                        // isRtl={isRtl}
                        isSearchable={isSearchable}
                        name="jobtitle"
                        options={jobOptions}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="company"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Job Link
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          placeholder=""
                          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="company"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      List
                    </label>
                    <div className="mt-2">
                      <Select
                        className="basic-single"
                        // classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        // isDisabled={isDisabled}
                        // isLoading={isLoading}
                        isClearable={isClearable}
                        // isRtl={isRtl}
                        isSearchable={isSearchable}
                        name="jobtitle"
                        options={jobOptions}
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Note
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddJob;