import React, { useEffect, useState } from 'react';
import TicketCard from './TicketCard'; // Import the TicketCard component
import { fetchTickets, fetchUsers } from '../api/fetchData'; // Import functions to fetch ticket and user data
import displayIcon from '../assets/images/filter.png'; // Import icon for display options

function KanbanBoard() {
  // State variables for managing tickets, grouping, sorting, users, and modal visibility
  const [tickets, setTickets] = useState([]); // Store tickets data
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status'); // Grouping option
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority'); // Sorting option
  const [users, setUsers] = useState([]); // Store users data
  const [showModal, setShowModal] = useState(false); // State to toggle display options modal

  // Mapping of priority numbers to human-readable names
  const priorityNames = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No Priority',
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const ticketsData = await fetchTickets(); // Fetch tickets data
      const usersData = await fetchUsers(); // Fetch users data
      setTickets(ticketsData); // Update tickets state
      setUsers(usersData); // Update users state
    };

    fetchData(); // Call fetchData function
  }, []); // Empty dependency array means this runs once when the component mounts

  // useEffect to store grouping and sorting preferences in localStorage
  useEffect(() => {
    localStorage.setItem('grouping', grouping); // Save grouping preference
    localStorage.setItem('sorting', sorting); // Save sorting preference
  }, [grouping, sorting]); // Run effect when grouping or sorting changes

  // Group tickets based on the selected grouping criteria
  const groupedTickets = tickets.reduce((acc, ticket) => {
    const groupKey = grouping === 'user' ? ticket.userId : ticket[grouping]; // Determine group key
    if (!acc[groupKey]) acc[groupKey] = []; // Initialize group if it doesn't exist
    acc[groupKey].push(ticket); // Add ticket to the group
    return acc; // Return accumulator
  }, {});

  // Sort tickets within each group based on the selected sorting criteria
  Object.keys(groupedTickets).forEach(group => {
    groupedTickets[group].sort((a, b) => {
      if (sorting === 'priority') return b.priority - a.priority; // Sort by priority
      if (sorting === 'title') return a.title.localeCompare(b.title); // Sort by title
      return 0; // Default case
    });
  });

  // Helper function to get the user's name by userId
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId); // Find user in users array
    return user ? user.name : 'Unknown User'; // Return user's name or a fallback
  };

  // Helper function to get the initials of a user's name
  const getUserInitials = (name) => {
    if (!name) return 'U'; // Default initials if no name is provided
    const nameParts = name.split(' '); // Split name into parts
    const initials = nameParts.map(part => part[0]).join(''); // Extract initials
    return initials.toUpperCase(); // Return initials in uppercase
  };

  return (
    <div>
      {/* Button to toggle display options modal */}
      <button onClick={() => setShowModal(!showModal)} className="display-button">
        <img src={displayIcon} alt="Display Options" className="display-icon" /> {/* Add image here */}
        Display Options
      </button>

      {/* Modal for display options */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Display Options</h3>
            <div className="grouping-options">
              <label htmlFor="grouping">Group by:</label>
              <select
                id="grouping"
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)} // Update grouping state on change
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="sorting-options">
              <label htmlFor="sorting">Sort by:</label>
              <select
                id="sorting"
                value={sorting}
                onChange={(e) => setSorting(e.target.value)} // Update sorting state on change
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
            <button onClick={() => setShowModal(false)} className="close-button">Close</button>
          </div>
        </div>
      )}

      {/* Kanban board displaying grouped tickets */}
      <div className="kanban-board">
        {Object.keys(groupedTickets).map(group => (
          <div key={group} className="kanban-column">
            <h2>
              {grouping === 'user'
                ? getUserName(group) // Display user name if grouping by user
                : grouping === 'priority'
                ? priorityNames[group] || 'Unknown Priority' // Display priority name
                : group} ({groupedTickets[group].length}) {/* Count of tickets in group */}
            </h2>
            {groupedTickets[group].map(ticket => (
              <TicketCard
                key={ticket.id} // Unique key for each ticket card
                ticket={ticket} // Pass ticket data to TicketCard
                userName={getUserName(ticket.userId)} // Get and pass user's name
                userInitials={getUserInitials(getUserName(ticket.userId))} // Get and pass user's initials
                tags={ticket.tag} // Pass tags to TicketCard
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard; // Export KanbanBoard component
