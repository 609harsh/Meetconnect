import Interview from "../components/Interview";
import Navbar from "../components/Navbar";
import Schedule from "../components/Schedule";
import Tracker from "../components/Tracker/Tracker";
import { useAppSelector } from "../redux/hooks";
import { NavbarMenu } from "../types";

function Dashboard() {
  const menuOption: NavbarMenu = useAppSelector(
    (state) => state.menu.value
  ).value;
  console.log(menuOption);
  return (
    <div className="w-full">
      <Navbar />
      <div>
        {menuOption === NavbarMenu.INTERVIEW && <Interview />}
        {menuOption === NavbarMenu.TRACKER && <Tracker />}
        {menuOption === NavbarMenu.SCHEDULE && <Schedule />}
      </div>
    </div>
  );
}

export default Dashboard;
