const AddExperience = ({
  formExperienceAction,
}: {
  formExperienceAction: Function;
}) => {
  const saveChanges = (e: any) => {
    e.preventDefault();
    let formData: any = {};
    for (let elements of e.target) {
      if (elements.name) {
        formData[elements.name] = elements.value;
      }
    }
    // console.log(formData);
    formExperienceAction();
  };
  return (
    <form
      onSubmit={(e) => saveChanges(e)}
      className="p-6 rounded-2xl mt-8"
      style={{
        boxShadow:
          "0 10px 32px rgb(34 42 53 / 0.12), 0 1px 1px rgb(0 0 0 / 0.05), 0 0 0 1px rgb(34 42 53 / 0.05), 0 4px 6px rgb(34 42 53 / 0.08), 0 24px 108px rgb(47 48 55 / 0.10)",
      }}
    >
      <div className="space-y-6">
        <div className="border-b border-gray-900/10 pb-6">
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="jobTitle"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Job Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    placeholder="Backend"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="company"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Company
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Microsoft"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="startYear"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Start Year
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="start-year"
                    name="startYear"
                    type="number"
                    placeholder="2019"
                    min={2000}
                    max={new Date().getFullYear()}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="endYear"
                className="block text-sm/6 font-medium text-gray-900"
              >
                End Year
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="end-year"
                    name="endYear"
                    type="number"
                    min={2000}
                    max={new Date().getFullYear()}
                    placeholder="2024"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                About this
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={2}
                  className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => formExperienceAction()}
          type="button"
          className="text-sm/6 font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          // onSubmit={(e) => changes(e)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddExperience;
