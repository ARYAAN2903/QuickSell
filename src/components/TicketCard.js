import React from 'react';

function TicketCard({ ticket, userName, userInitials }) {
  // Generate a random background color for the icon
  const generateRandomColor = () => {
    // Array of predefined colors to choose from
    const colors = ['#f28b82', '#fbbc04', '#34a853', '#4285f4', '#a142f4'];
    // Return a random color from the array
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="ticket-card"> {/* Container for the ticket card */}
      <div className="icon" style={{ backgroundColor: generateRandomColor() }}> {/* Icon with random background color */}
        {userInitials} {/* Display user's initials */}
      </div>
      <div className="ticket-details"> {/* Container for ticket details */}
        <h4>{ticket.title}</h4> {/* Ticket title */}
        <p>{ticket.id}</p> {/* Ticket ID */}
        <p>{ticket.tag}</p> {/* Ticket tags */}
      </div>
    </div>
  );
}

export default TicketCard; // Export the TicketCard component
