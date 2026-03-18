import { NavLink, useNavigate } from "react-router-dom";

import { useUser } from "../context/useUser";
function Sidebar() {
 
  const navigate = useNavigate();
  const {role, logout} =useUser();

  const handleLogout = () => {
  
    logout();
    navigate("/", { replace: true });
  };
 
  return (
 
    <div className="sidebar">
      <h2 className="logo">{role==="admin"?"Admin Panel": "User Panel"}</h2>
 
      <NavLink to="/dashboard" end>Home</NavLink>
      
      <NavLink to="/dashboard/analytics">Dashboard</NavLink>
      
      {role === "admin" && (
        <NavLink to="/dashboard/users">Users</NavLink>
      )}
      
      {role === "admin" && (
        <NavLink to="/dashboard/activity">Activity</NavLink>
      )}
 
      <NavLink to="/dashboard/profile">Profile</NavLink>
 
      <NavLink to="/dashboard/settings">Settings</NavLink>
      <p onClick={handleLogout}>Logout</p>
 
    </div>
 
  );
}
 
export default Sidebar;