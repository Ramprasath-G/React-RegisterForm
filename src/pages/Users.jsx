import { NavLink } from "react-router-dom";
import { useUser } from "../context/useUser";
function Users() {
 
    const {users} = useUser();

 
  return (
 
    <div>
 
      <h2>Users</h2>
 <div className="users-list">
        {users.map((user) => (
            <div key={user.email} className="user-row">
 
          <span>{user.Name}</span>
            <NavLink to ={`/dashboard/users/${user.email}`}>
            View
          </NavLink>

        </div>
        
      ))}
  </div>
    </div>
 
  );
 
}
 
export default Users;