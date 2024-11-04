// src/api/fetchData.js

// Function to fetch tickets from the API
export async function fetchTickets() {
    // Make a GET request to the specified API endpoint
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    
    // Parse the JSON response
    const data = await response.json();
    
    // Return the tickets data from the response
    return data.tickets; // Ensure the API response includes a 'tickets' field
}

// Function to fetch users from the API
export async function fetchUsers() {
    // Make a GET request to the same API endpoint (consider updating if there’s a separate endpoint for users)
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    
    // Parse the JSON response
    const data = await response.json();
    
    // Return the users data from the response
    return data.users; // Ensure the API response includes a 'users' field
}
