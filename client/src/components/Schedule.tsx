import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import { useCreateInterviewsMutation } from "../redux/ApiSlice/meetApi";
import { changeMenuTo } from "../redux/menuSlice";
import { addInterview } from "../redux/interviewsSlice";
import CloseIcon from "../icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import React, { useState } from 'react';

const Schedule = () => {
  const dispatch = useAppDispatch();
  const [saveInterview] = useCreateInterviewsMutation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigation = useNavigate();
  const changes = async (e: any) => {
    e.preventDefault();
    setIsButtonDisabled(true); // Disable the button after clicking
    const formData: any = {};
    for (let element of e?.target.elements) {
      if (element.name) formData[element.name] = element.value;
    }

    if (formData.title.length < 2) {
      toast.error("Enter Valid Job Title");
      setIsButtonDisabled(false); // Enable the button if Error Occured
      return;
    }
    if (formData.company.length <= 2) {
      toast.error("Enter Valid Company Title");
      setIsButtonDisabled(false); // Enable the button if Error Occured
      return;
    }
    if (formData.date <= 2) {
      toast.error("Enter Date");
      setIsButtonDisabled(false); // Enable the button if Error Occured
      return;
    }
    formData.date = formData.date.replace("T", " ");
    try {
      const interview = await toast.promise(saveInterview(formData).unwrap(), {
        pending: "Creating Interview",
        success: "Interview Created",
      });
      if (interview.success) {
        dispatch(addInterview(interview.data));
        dispatch(changeMenuTo(false));
      }
    } catch (err: FetchBaseQueryError | SerializedError | any) {
      if (err.status === 401) {
        navigation("/login");
        return;
      }
      toast.error(err.error);
    }
  };

  return (
    <div className="flex justify-center z-10 fixed h-full w-full bg-black bg-opacity-5 backdrop-blur-sm left-0 top-0">
      <div
        className="rounded-lg bg-white shadow-xl my-10 max-h-fit w-full max-w-md p-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-violet-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-violet-700"
        style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "auto" }}
      >
        <header className="flex flex-row justify-between items-center border-b border-gray-900/10 pb-4">
          <h2 className="text-lg font-semibold ">Schedule Interview</h2>
          <span
            onClick={() => dispatch(changeMenuTo(false))}
            className="cursor-pointer hover:bg-gray-200 rounded-full p-1 "
          >
            <CloseIcon />
          </span>
        </header>
        <form onSubmit={(e) => changes(e)}>
          <div className="space-y-6">
            <div className="border-b border-gray-900/10 pb-6">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Job Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Full Stack Developer"
                        autoComplete="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="type"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Type
                  </label>
                  <div className="mt-2">
                    <select
                      id="type"
                      name="type"
                      autoComplete="interview-type"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                    >
                      <option value={"Technical Round"}>Technical Round</option>
                      <option value={"Managerial Round"}>
                        Managerial Round
                      </option>
                      <option value={"HR Round"}>HR Round</option>
                      <option value={"Coding Round"}>Coding Round</option>
                      <option value={"CEO/CTO Round"}>CEO/CTO Round</option>
                      <option value={"Other"}>Other</option>
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
                        type="datetime-local"
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
                        type="text"
                        placeholder="1hr"
                        autoComplete="duration"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="guest"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Participants/Guest details
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="guest"
                      name="guest"
                      rows={2}
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="link"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Meet Link
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="link"
                        name="link"
                        type="text"
                        placeholder="meet.google.com"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
              onClick={() => dispatch(changeMenuTo(false))}
            >
              Cancel
            </button>
            <button
              type="submit"
              // onSubmit={(e) => changes(e)}
              disabled={isButtonDisabled}
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
