import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
 
function Dashboard() {
 
  return (
 
    <div className="dashboard-layout">
 

 
      <Sidebar />
 

 
      <div className="dashboard-content">
 
        <Outlet />
 
      </div>
 
    </div>
 
  );
 
}
 
export default Dashboard;