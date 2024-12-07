import { useAppDispatch } from "../redux/hooks";
import { changeMenuTo } from "../redux/menuSlice";
import { NavbarMenu } from "../types";

const Schedule = () => {
  const dispatch = useAppDispatch();

  const changes = (e) => {
    e.preventDefault();
    console.log(e.target[0]);
  };

  return (
    <div className="flex justify-center z-10 fixed h-full w-full bg-black bg-opacity-5 backdrop-blur-sm left-0 top-0">
      <div className="rounded-lg bg-white shadow-xl my-10 max-h-fit w-full max-w-sm p-4 overflow-scroll">
        <p className="flex flex-row justify-between border-b border-gray-900/10 pb-4">
          <h2 className="text-lg font-semibold ">Schedule Interview</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
            onClick={() =>
              dispatch(changeMenuTo({ value: NavbarMenu.INTERVIEW }))
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </p>
        <form onSubmit={(e) => changes(e)}>
          <div className="space-y-6">
            <div className="border-b border-gray-900/10 pb-6">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="janesmith"
                        autoComplete="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="interview-type"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Type
                  </label>
                  <div className="mt-2">
                    <select
                      id="interview-type"
                      name="interview-type"
                      autoComplete="interview-type"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                    >
                      <option>Technical Round</option>
                      <option>Managerial Round</option>
                      <option>HR Round</option>
                      <option>Coding Round</option>
                      <option>CEO/CTO Round</option>
                    </select>
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
                        autoComplete="company"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="date"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Date
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="date"
                        name="date"
                        type="date"
                        autoComplete="date"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="duration"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Duration
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="duration"
                        name="duration"
                        type="number"
                        placeholder="1"
                        autoComplete="duration"
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
                    Participants/Guest details
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={2}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-6">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Notifications
              </h2>
              <div className="space-y-5">
                <fieldset>
                  <legend className="text-sm/6 font-semibold text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        15 min before
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Morning
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        No notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
              onClick={() =>
                dispatch(changeMenuTo({ value: NavbarMenu.INTERVIEW }))
              }
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
      </div>
    </div>
  );
};

export default Schedule;
