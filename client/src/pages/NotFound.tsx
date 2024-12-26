import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-full min-h-screen flex flex-col items-center justify-center">
      <img src="/NotFound.webp" className="w-5/6 md:w-1/2 md:h-1/2" />
      <div className="text-center">
        <h3 className="font-semibold text-xl md:text-3xl text-sky-600">
          404 Not Found
        </h3>
        <h1 className="font-bold text-3xl md:text-6xl">
          Whoops! Page does not Exist
        </h1>
        <p className="mt-5 underline hover:cursor-pointer">
          <Link to={"/"}>Home</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
