function Activity() {
 
  const logs = JSON.parse(localStorage.getItem("activityLogs")) || [];
 
  return (
 
    <div>
 
      <h2>Activity Logs</h2>
 
        {logs.map((log, index) => (
 
        <p key={index}>
          {log}
        </p>
 
      ))}
 
    </div>
 
  );
 
}
 
export default Activity;