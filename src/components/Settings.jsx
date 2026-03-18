
import { useState } from "react";
import Sidebar from "./sidebar";
import hashPassword from "../utils/Hash";


function Settings() {
const [oldPassword, setOldPassword] = useState("");   
const [newPassword, setNewPassword] = useState("");  
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState(""); 
const [showpass,setShowpass]=useState(false)
const [showpass1,setShowpass1]=useState(false)
const [showpass2,setShowpass2]=useState(false)
const [theme,setTheme] = useState(localStorage.getItem("theme") || "light")

const toggleTheme = () => {

const newTheme = theme === "light" ? "dark" : "light"
 
setTheme(newTheme)
 
localStorage.setItem("theme", newTheme)
 
document.body.className = newTheme
 
}
 

const passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
let logs=JSON.parse(localStorage.getItem("activityLogs"));


  const handleChangePassword = async(e) => {
 
  e.preventDefault();
 
  setError("");
 
  const users = JSON.parse(localStorage.getItem("users")) || [];
 
  const currentUserEmail = localStorage.getItem("currentUser");
 
  const currentUser = users.find(
    (u) => u.email === currentUserEmail
  );
 
  if (!currentUser) {
    setError("User not found");
    return;
  }
 
    const hashedOldpass= await hashPassword(oldPassword)
  if (currentUser.password !== hashedOldpass) {
    setError("Old password is incorrect");
    return;
  }
 
 
  if (!passwordPattern.test(newPassword)) {
    setError(
      "Password must contain uppercase, lowercase, number and special character"
    );
    return;
  }
 
    const hashedNewpass= await hashPassword(newPassword);
  if (newPassword !== confirmPassword) {
    setError("New passwords do not match");
    return;
  }
 

const updatedUsers = users.map((user) => {
 
if (user.email === currentUserEmail) {
      return { ...user, password: hashedNewpass };
    }
 
    return user;
  });
 
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  logs.push("password updated")
  alert("Password updated successfully");
 
};
 
  return (
 
    
 
      <div className="main">
 
        <h2>Settings</h2>
 
        <div className="card">
 
          <h3>Change Password</h3>
 
  <form onSubmit={handleChangePassword}>
 

  <div className="password-box">
  <input
    type={showpass ? "text" : "password"}
    placeholder="Old Password"
    value={oldPassword}
    onChange={(e) => {
    setOldPassword(e.target.value);
    }}
  />
  <span className="eye" onClick={()=>setShowpass(!showpass)}> {showpass ? "🔒" : "👁"}</span>
</div>

  
   <div className="password-box">
  <input
    type={showpass1 ? "text" : "password"}
    placeholder="New Password"
    value={newPassword}
onChange={(e) => setNewPassword(e.target.value)}
  />

  <span className="eye" onClick={()=>setShowpass1(!showpass1)}> {showpass1 ? "🔒" : "👁"}</span>
</div>

   <div className="password-box">
  <input
    type={showpass2 ? "text" : "password"}
    placeholder="Confirm New Password"
    value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
  />

  <span className="eye" onClick={()=>setShowpass2(!showpass2)}> {showpass2 ? "🔒" : "👁"}</span>
</div>
 
  <button type="submit">
    Update Password
  </button>
    {error && <p style={{ color: "red" }}>{error}</p>}
</form>
 
        </div>
    <div>
 
<h3>Theme</h3>
 
<button onClick={toggleTheme}>
 
Switch to {theme === "light" ? "Dark" : "Light"} Mode
 
</button>
 
</div>
      </div>
 
    
  );
}
 
export default Settings;