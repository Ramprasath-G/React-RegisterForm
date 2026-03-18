import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import Login from "./pages/Login";
import Register from "./pages/Register";
 
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDeatils";
import Profile from "./pages/Profile";
import Settings from "./components/settings";
import Activity from "./pages/Activity";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { useEffect } from "react";
 
function App() {
    useEffect(()=>{
 
  const savedTheme = localStorage.getItem("theme")
 
    if(savedTheme === "dark"){
    document.body.classList.add("dark")
    }   },[])
  return (
 
    <BrowserRouter>
 
      <Routes>
 
        {/* Public Routes */}
 
        <Route path="/" element={<Login />} />
 
        <Route path="/register" element={<Register />} />
 
 
         
 
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
 
          {/* Dashboard Home */}
 
          <Route index element={<DashboardHome />} />
 
          <Route path="analytics" element={<Analytics />} />
 
          {/* Admin Only Routes */}
 
          <Route
            path="users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
 
          <Route
            path="users/:email"
            element={
              <AdminRoute>
                <UserDetails />
              </AdminRoute>
            }
          />
 
          <Route
            path="activity"
            element={
              <AdminRoute>
                <Activity />
              </AdminRoute>
            }
          />
 
 
 
          {/* Normal User Routes */}
 
          <Route path="profile" element={<Profile />} />
 
          <Route path="settings" element={<Settings />} />
 
        </Route>
 
 
 
      </Routes>
 
    </BrowserRouter>
 
  );
 
}
 
export default App;