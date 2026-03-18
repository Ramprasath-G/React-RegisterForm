import { useState } from "react";
import { useNavigate, Link,} from "react-router-dom";
import hashPassword from "../utils/Hash";

function Register() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Name,setName] =useState("");
  const [confirmpass, setConfirmpass]= useState("");
  const [showpass, setShowpass]= useState(false);
  const [error, setError]=useState("");
  const [strength, setStrength] = useState("");
  const [showpass1,setShowPass1]=useState(false)

  let logs=JSON.parse(localStorage.getItem("activityLogs"))||[]
  const navigate = useNavigate();
  const emailPattern= /^[^\s@]+@[^\s@]+\.[^\s@].+$/;
  
  
  const checkPasswordStrength = (value) => {
 
  let score = 0;
 
  if (value.length >= 8) score++;
  if (/[a-z]/.test(value)) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[@$!%*?&]/.test(value)) score++;
 
  if (score <= 2) setStrength("Weak");
  else if (score === 3 || score === 4) setStrength("Medium");
  else setStrength("Strong");
 
};


  const handleRegister = async(e) => {
 
    e.preventDefault();
    setError("");
    if(!emailPattern.test(email.trim())){setError("Enter valid email address")
    return;}

    if(password.length < 6){
  setError("Password must be at least 6 characters")
  return
}
 
if(!/[A-Z]/.test(password)){
  setError("Password must contain at least one uppercase letter")
  return
}
 
if(!/[a-z]/.test(password)){
  setError("Password must contain at least one lowercase letter")
  return
}
 
if(!/[0-9]/.test(password)){
  setError("Password must contain at least one number")
  return
}
 
if(!/[!@#$%^&*]/.test(password)){
  setError("Password must contain at least one special character")
  return
}

    if(password !==confirmpass){
      setError("password do not match");
      return;}      
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if(existingUsers.length===0){
      const adminUser={
        Name:"Admin",
        email:"admin@gmail.com",
        password: await hashPassword("Admin@123"),
        role:"admin"
      }
        existingUsers.push(adminUser)
    }
    
    const userExists = existingUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
    );
 
  if (userExists) {
    setError("User with this email already exists");
    return;
  }
 const hashedPassword = await hashPassword(password);
 
  const newuser = {
    Name,
    email,
    password: hashedPassword,
    role:"user"
  };
    
    existingUsers.push(newuser);
    
    localStorage.setItem("users", JSON.stringify(existingUsers));
        alert("Registration Successfull")
    
    navigate("/");
    logs.push(`New User ${email} registered`)
    localStorage.setItem("activityLogs",JSON.stringify(logs));
  };
    

  return (
 
    <div className="auth-container">
 
      <h2>Register</h2>
 
      <form onSubmit={handleRegister}>
 
        <input
          type="text"
          placeholder="Name"
onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {setEmail(e.target.value);
          if(error)setError("");}}
        />
 
        <div style={{ position: "relative", marginTop: "10px" }}>
  
  <div className="password-box">
  <input
    type={showpass ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => {
    setPassword(e.target.value);
    checkPasswordStrength(e.target.value);
    }}
    />
  
  <span className="eye" onClick={()=>setShowpass(!showpass)}> {showpass ? "🔒" : "👁"}</span>
</div>
 
</div>
      {password && (
  <p
    style={{
      color:
        strength === "Weak"
          ? "red"
          : strength === "Medium"
          ? "orange"
          : "green",
      fontSize: "12px",
      marginTop: "5px"
    }}
  >
    Password strength: {strength}
  </p>
)}


         
  <div className="password-box">
  <input
    type={showpass1? "text": "password"}
          placeholder="Confirm password"
onChange={(e) => setConfirmpass(e.target.value)
    }
    />
  
  <span className="eye" onClick={()=>setShowPass1(!showpass1)}> {showpass1 ? "🔒" : "👁"}</span>
</div>
 

        <button type="submit">Sign Up</button>
 
      </form>
      {error && <p style ={{color:"red"}}>{error}</p>}
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
 
    </div>
  );
}
 
export default Register;