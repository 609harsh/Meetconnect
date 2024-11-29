import Interview from "../components/Interview";
import InterviewList from "../components/InterviewList";
import Navbar from "../components/Navbar";
import Schedule from "../components/Schedule";

function Dashboard() {
  return (
    <div className="w-full">
      <Navbar />
      <div>
        <Interview />
        <InterviewList />
        {/* <Schedule /> */}
      </div>
    </div>
  );
}

export default Dashboard;
