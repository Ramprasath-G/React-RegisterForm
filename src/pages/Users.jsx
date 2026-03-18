import { NavLink } from "react-router-dom";

function Users() {
 
    const users=localStorage.getItem("Users")||[];

 
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