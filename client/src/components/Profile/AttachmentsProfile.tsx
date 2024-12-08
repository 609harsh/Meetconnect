const AttachmentsProfile = () => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        Attachments
      </dt>
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200"
        >
          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              {/* <PaperClipIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                    /> */}
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="truncate font-medium">
                  resume_back_end_developer.pdf
                </span>
                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Download
              </a>
            </div>
          </li>
          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              {/* <PaperClipIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                    /> */}
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="truncate font-medium">
                  coverletter_back_end_developer.pdf
                </span>
                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Download
              </a>
            </div>
          </li>
        </ul>
      </dd>
    </div>
  );
};

export default AttachmentsProfile;
