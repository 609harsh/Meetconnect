// import { useState } from "react";
import Select from "react-select";
// import AsyncSelect from "react-select/async";
import CloseIcon from "../../icons/CloseIcon";
import { JobRoles } from "../../data";
import { useCreateNewJobMutation } from "../../redux/ApiSlice/trackerApi";
import { Column, Job } from "../../types";
import { toast } from "react-toastify";
import { useState } from "react";

// const filterColors = (inputValue: string) => {
//   return jobOptions.filter((i) =>
//     i.label.toLowerCase().includes(inputValue.toLowerCase())
//   );
// };

// const promiseOptions = (inputValue: string) =>
//   new Promise<JobOption[]>((resolve) => {
//     setTimeout(() => {
//       resolve(filterColors(inputValue));
//     }, 1000);
//   });

const AddJob = ({
  closeJob,
  newJob,
  column,
}: {
  closeJob: () => void;
  newJob: (data: Job) => void;
  column: Column;
}) => {
  const [addJob] = useCreateNewJobMutation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const addNewJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: Partial<Job> = {};
    const form = e.target as HTMLFormElement;

    for (let element of form.elements) {
      const input = element as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;
      if (input.name) formData[input.name as keyof Job] = input.value;
    }

    if (!formData.company) {
      toast.error("Company is required");
      return;
    }
    if (!formData.jobtitle) {
      toast.error("Job Title is required");
      return;
    }
    if (!formData.columnId) {
      toast.error("Select List");
      return;
    }
    setIsButtonDisabled(true); // Disable the button after clicking the save button
    const response = await addJob({ body: formData }).unwrap();
    if (response.success) {
      newJob(response.data as Job);
      setIsButtonDisabled(false); // Enable the button after the job is added
    } 
    closeJob();
    // newJob(formData as Job);

    return;
  };
  return (
    <div className="flex justify-center items-center z-10 fixed bg-black bg-opacity-5 backdrop-blur-sm inset-0">
      <div className="bg-white relative rounded-lg w-[800px] p-10 overflow-auto max-h-screen">
        <header className="flex flex-row justify-between">
          <p className="font-bold text-3xl">Add Job</p>
          <span onClick={() => closeJob()} className="hover:cursor-pointer">
            <CloseIcon />
          </span>
        </header>
        <section className="new-job-form">
          <form onSubmit={(e) => addNewJob(e)}>
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
                      <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                        <input
                          name="company"
                          type="text"
                          placeholder="Amazon"
                          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        />
                      </div>
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
                        isClearable={true}
                        // isRtl={isRtl}
                        isSearchable={true}
                        name="jobtitle"
                        options={JobRoles}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="link"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Job Link
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                        <input
                          name="link"
                          type="text"
                          placeholder=""
                          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="list"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      List
                    </label>
                    <div className="mt-2">
                      <Select
                        className="basic-single"
                        // classNamePrefix="select"
                        // defaultValue={columns?.find(
                        //   (col) => col.id === defaultValue
                        // )}
                        // isDisabled={isDisabled}
                        // isLoading={isLoading}
                        isClearable={true}
                        // isRtl={isRtl}
                        isSearchable={true}
                        // value={columns.find((col) => col.id === defaultValue)}

                        name="columnId"
                        options={[
                          {
                            value: column.id,
                            label: column.columnTitle,
                            color: "#00B8D9",
                            isFixed: true,
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="note"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Applied On:
                    </label>
                    <div className="mt-2">
                      <textarea
                        name="note"
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
                onClick={() => closeJob()}
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
