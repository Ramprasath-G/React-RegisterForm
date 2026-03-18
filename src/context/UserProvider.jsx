/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import UserContext from "./UserContext";
 
export function UserProvider({ children }) {
 
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loginTime, setLoginTime] = useState(null);
 
  useEffect(() => {
    
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const email = localStorage.getItem("currentUser");
 
const user = storedUsers.find(u => u.email === email);
 
    setUsers(storedUsers);
    setCurrentUser(user);
    setRole(localStorage.getItem("currentUserRole"));
    setLoginTime(localStorage.getItem("loginTime"));
 
  }, []);
 
  const login = (user) => {
 
localStorage.setItem("currentUser", user.email);
    localStorage.setItem("currentUserRole", user.role);
    localStorage.setItem("loginTime", new Date().toLocaleString());
     localStorage.setItem("isLoggedIn", "true");
    setCurrentUser(user);
    setRole(user.role);
    setLoginTime(new Date().toLocaleString());
 
  };
 
  const logout = () => {
 
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserRole");
    localStorage.removeItem("isLoggedIn");
    setCurrentUser(null);
    setRole(null);
 
  };
 
  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        role,
        loginTime,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}