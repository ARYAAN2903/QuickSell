// src/components/SortingOptions.js
import React from 'react';

function SortingOptions({ setSorting }) {
  return (
    <div>
      {/* Button to sort tickets by priority */}
      <button onClick={() => setSorting('priority')}>Sort by Priority</button>
      
      {/* Button to sort tickets by title */}
      <button onClick={() => setSorting('title')}>Sort by Title</button>
    </div>
  );
}

export default SortingOptions; // Export the SortingOptions component
