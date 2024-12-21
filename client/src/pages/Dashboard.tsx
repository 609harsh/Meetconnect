import Interview from "../components/Interview";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div
      className="w-full bg-no-repeat bg-cover bg-center h-full min-h-screen"
      style={{ backgroundImage: "url(/background2.jpeg)" }}
    >
      <Navbar />
      <div className="">
        <Interview />
      </div>
    </div>
  );
}

export default Dashboard;
