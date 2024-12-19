import Interview from "../components/Interview";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="w-full">
      <Navbar />
      <div>
        <Interview />
      </div>
    </div>
  );
}

export default Dashboard;
