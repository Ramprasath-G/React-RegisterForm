import { useUser } from "../context/useUser"

function DashboardHome(){
 
const {currentUser , users, loginTime}=useUser();
const logs = JSON.parse(localStorage.getItem("activityLogs")) || []

 


 
return(
 
<div>
 
<h2>Welcome {currentUser?.Name} </h2>
<p>Last Login: {loginTime}</p>
 
<div className="cards">
 
<div className="card">
<h3>Total Users</h3>
<p>{users.length}</p>
</div>
 
<div className="card">
<h3>Activities</h3>
<p>{logs.length}</p>
</div>
 
<div className="card">
<h3>Status</h3>
<p>Active</p>
</div>
 
</div>
 

</div>
 
)
 
}
 
export default DashboardHome