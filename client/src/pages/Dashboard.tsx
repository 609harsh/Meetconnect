import Interview from "../components/Interview";
import Navbar from "../components/Navbar";
import Schedule from "../components/Schedule";
import Tracker from "../components/Tracker";

function Dashboard() {
  return (
    <div className="w-full">
      <Navbar />
      <div>
        {/* <Interview /> */}
        <Tracker />
        {/* <Schedule /> */}
      </div>
    </div>
  );
}

export default Dashboard;
