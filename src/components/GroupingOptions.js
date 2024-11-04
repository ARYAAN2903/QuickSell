// src/components/GroupingOptions.js
import React from 'react';

function GroupingOptions({ setGrouping }) {
  return (
    <div>
      {/* Button to group tickets by status */}
      <button onClick={() => setGrouping('status')}>Group by Status</button>
      
      {/* Button to group tickets by user */}
      <button onClick={() => setGrouping('user')}>Group by User</button>
      
      {/* Button to group tickets by priority */}
      <button onClick={() => setGrouping('priority')}>Group by Priority</button>
    </div>
  );
}

export default GroupingOptions; // Export the GroupingOptions component
