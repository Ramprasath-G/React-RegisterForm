import { useUser } from "../context/useUser";
function Profile() {
 
  const {currentUser, role , loginTime} = useUser();
 
  if (!currentUser) {
    return <p>User not found</p>;
  }
 
  return (
    <div>
      <h2>Profile</h2>
 
      <p>Name: {currentUser.Name}</p>
        <p>Email: {currentUser.email}</p>
      <p>Role: {role}</p>
      <p>Last Login : {loginTime}</p>
    </div>
  );
}
 
export default Profile;