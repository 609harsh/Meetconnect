const JobCard = ({ data }) => {
  return (
    <div className="rounded-lg p-3 bg-white min-h-28 my-4">
      <div className="flex flex-row items-center gap-4 mb-6">
        <figure>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg"
            }
            width={"60px"}
          />
        </figure>
        <div>
          <h2 className="text-lg font-bold mb-4">Forescribe</h2>
          <h3 className="text-base font-light">Software</h3>
        </div>
      </div>
      <p className="text-right">just now</p>
    </div>
  );
};

export default JobCard;
