import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import hashPassword from "../utils/Hash";
import { useUser } from "../context/useUser";

 
function UserDetails(){
 
const { email } = useParams()
const navigate = useNavigate()

const {users,currentEmail,role}=useUser();
const [newPassword,setNewPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")
const foundUser = users.find((u)=>u.email === email)
const [showpass,setShowpass]=useState("")
const [user,setUser] = useState(foundUser)
const [error,setError] = useState("")
 
if(!user){
return <p>User not found</p>
}
 
const addLog = (message) => {
 
const logs = JSON.parse(localStorage.getItem("activityLogs")) || []
 
logs.push(message)
 
localStorage.setItem("activityLogs", JSON.stringify(logs))
 
}
 
const makeAdmin = () => {
 
const updatedUsers = users.map((u)=>{
 
if(u.email === email){
return {...u, role:"admin"}
}
 
return u
 
})
 
localStorage.setItem("users", JSON.stringify(updatedUsers))
 
setUser({...user, role:"admin"})
 
addLog(`User ${email} promoted to admin`)
 
}

const adminCount = users.filter((u)=>u.role==="admin").length;

const removeUser = () => {
 if(email===currentEmail){
    alert("you cannot remove your own account")
    return
 }

 if(user.role==="admin" && adminCount ===1){
    alert("Cannot delete the last admin")
    return
 }

 if(user.email==="admin@gmail.com"){
    alert("Cannot remove the administrator account")
    return
 }
const updatedUsers = users.filter((u)=>u.email !== email)
 
localStorage.setItem("users", JSON.stringify(updatedUsers))
 
addLog(`User ${email} removed`)
 
navigate("/dashboard/users")
 
}
const resetPassword = async () => {
 
const hashedPassword = await hashPassword(newPassword)
 if(newPassword!==confirmPassword){
    setError("Password do not match")
    return;
 }
const updatedUsers = users.map((u)=>{
 
if(u.email === email){
return {...u,password:hashedPassword}
}
 
return u
 
})
 
localStorage.setItem("users",JSON.stringify(updatedUsers))
 
addLog(`Admin reset password for ${email}`)
 
alert("Password updated")
 
}
 
return(
 
    <div>
 
    <h2>User Details</h2>
 
    <p><strong>Name:</strong> {user.Name}</p>
    <p>Email: {user.email}</p>
    <p><strong>Role:</strong> {user.role}</p>
    {role === "admin" && (
 
<div style={{marginTop:"20px"}}>
 
<h3>Reset Password</h3>
<div className="password-box">
  <input
type={showpass ? "text" : "password"}
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>
  <span className="eye" onClick={()=>setShowpass(!showpass)}> {showpass ? "🔒" : "👁"}</span>
</div>
 <br />  

<div className="password-box">
  <input
type={showpass ? "text" : "password"}
placeholder="Confirm new Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>
  <span className="eye" onClick={()=>setShowpass(!showpass)}> {showpass ? "🔒" : "👁"}</span>
</div>
<button onClick={resetPassword}>
Update Password
</button>
 {error && <p style={{ color: "red" }}>{error}</p>}
  <br /> <br />
</div>
 
)}
 
{role === "admin" && user.role !== "admin" && (
 
<button onClick={makeAdmin} className="admin-btn"> 
 
Make Admin
 
</button>
 
)}
 
{role === "admin" && (
 
<button onClick={removeUser} className="delete-btn">
 
Remove User
 
</button>
)}
 
</div>
 
)
 
}
 
export default UserDetails