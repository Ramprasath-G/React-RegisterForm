import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import hashPassword from "../utils/Hash";
import { useUser } from "../context/useUser";
 
function Login() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpass,setShowpass] = useState(false);
  const{login}=useUser();
  const navigate = useNavigate();
  let logs=JSON.parse(localStorage.getItem("activityLogs"));

  const handleLogin = async(e) => {
 
    e.preventDefault();
 
    const Users = JSON.parse(localStorage.getItem("users"))||[];
    const hashedInput = await hashPassword(password);
    
    const validuser = Users.find(
    (u) => u.email === email && u.password === hashedInput);
    if(validuser){
      login(validuser)
      navigate("/dashboard")
      logs.push("user Logged in")
    }
    else{
      alert("Invalid Credentials")
    }
   
  };
 
  return (
 
    <div className="auth-container">
 
      <h2>Login</h2>
 
      <form onSubmit={handleLogin}>
 
        <input
          type="email"
          placeholder="Email"
onChange={(e) => setEmail(e.target.value)}
        />
 
        <div style={{ position: "relative", marginTop: "10px" }}>
 <div className="password-box">
  <input
    type={showpass ? "text" : "password"}
    placeholder="Password"
    value={password}
onChange={(e) => setPassword(e.target.value)}
  />
  <span className="eye" onClick={()=>setShowpass(!showpass)}> {showpass ? "🔒" : "👁"}</span>
</div>
 
</div>
 
        <button type="submit">Sign In</button>
 
      </form>
 
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
 
    </div>
  );
}
 
export default Login;
