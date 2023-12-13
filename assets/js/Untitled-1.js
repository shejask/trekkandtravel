// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDA1ufLnKII3J72aqdPW_5ePacTWBiEgHg",
    authDomain: "share2care-99b93.firebaseapp.com",
    databaseURL: "https://share2care-99b93-default-rtdb.firebaseio.com",
    projectId: "share2care-99b93",
    storageBucket: "share2care-99b93.appspot.com",
    messagingSenderId: "749651496086",
    appId: "1:749651496086:web:e9cb696743d37f367486b7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ... (previous code)

document.addEventListener('DOMContentLoaded', () => {
    // Reference to the 'formData' node
    const formDataRef = ref(database, 'formData');

    // Reference to the dropdown element, search input, and display div
    const voucherDropdown = document.getElementById('hotel-voucher-dropdown');
    const confirmationNumberInput = document.getElementById('confirmation-number');
    const displayFetchAll = document.getElementById('display_fetchall');

    // Listen for changes in the data
    onValue(formDataRef, (snapshot) => {
        const data = snapshot.val();

        // Check if data is not null
        if (data) {
            // Extract confirmation numbers
            const confirmationNumbers = Object.keys(data).map((key) => data[key].confirmationnumber);

            // Handle input event to filter dropdown options
            confirmationNumberInput.addEventListener('input', () => {
                const searchTerm = confirmationNumberInput.value.toLowerCase();

                // Filter confirmation numbers based on search term
                const filteredConfirmationNumbers = confirmationNumbers.filter((number) =>
                    number.toLowerCase().includes(searchTerm)
                );

                // Remove existing options
                voucherDropdown.innerHTML = '';

                // Add filtered options to the dropdown
                filteredConfirmationNumbers.forEach((confirmationNumber) => {
                    const option = document.createElement('div');
                    option.textContent = confirmationNumber;
                    option.classList.add('dropdown-item'); // You may want to add a class for styling
                    voucherDropdown.appendChild(option);
                });

                // Show the dropdown
                voucherDropdown.classList.remove('hidden');
            });

            // Add an event listener to handle item selection
           // ... (previous code)

// Add an event listener to handle item selection
// Add an event listener to handle item selection
voucherDropdown.addEventListener('click', async (event) => {
    // Check if the clicked element is a dropdown item
    if (event.target.classList.contains('dropdown-item')) {
        // Set the selected confirmation number to the input field
        confirmationNumberInput.value = event.target.textContent;

        // Fetch data based on the selected confirmation number
        const selectedConfirmationNumber = confirmationNumberInput.value;
        const selectedData = data[Object.keys(data).find(key => data[key].confirmationnumber === selectedConfirmationNumber)];
        

// Map terms and conditions and display them
displayFetchAll.innerHTML = `
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="No of Adults" value="${selectedData.NoofAdult}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Arrival" value="${selectedData.arrival}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Booked By" value="${selectedData.bookedBy}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Contact No" value="${selectedData.contactNo}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Departure" value="${selectedData.departure}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Google Map Link" value="${selectedData.googleMapLink}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Guest Citizen" value="${selectedData.guestCitizen}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Guest Name" value="${selectedData.guestName}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Guest Number" value="${selectedData.guestNumber}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Hotel Address" value="${selectedData.hotelAddress}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Hotel Name" value="${selectedData.hotelName}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Hotel Phone" value="${selectedData.hotelPhone}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Issued By" value="${selectedData.issuedBy}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Issued Date" value="${selectedData.issuedDate}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Mail ID" value="${selectedData.mailId}">
        // <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Meal Plan" value="${selectedData.mealPlan}">
        // <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="No of Extra Beds" value="${selectedData.noOfExtraBed}">
        // <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="No of Rooms" value="${selectedData.noOfRooms}">
        <!-- ... other input fields ... -->
        <textarea class="w-full p-2 border rounded border border-slate-700" placeholder="Notes">${selectedData.notes}</textarea>
        <textarea class="w-full p-2 border rounded border border-slate-700" placeholder="Special Request">${selectedData.specialRequest}</textarea>
        <textarea class="w-full p-2 border rounded border border-slate-700" placeholder="Payment Information">${selectedData.paymentInfo}</textarea>
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Check-In Date" value="${selectedData.checkInDate}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Check-In Time" value="${selectedData.checkInTime}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Check-Out Date" value="${selectedData.checkOutDate}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Check-Out Time" value="${selectedData.checkOutTime}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Ticket No (Arrival)" value="${selectedData.ticketNoArrival}">

        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Arrival" value="${selectedData.arrival}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Details (Arrival)" value="${selectedData.ticketNo   }">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Departure" value="${selectedData.departure}">
        <input type="text" class="w-full p-2 border rounded border border-slate-700" placeholder="Details (Departure)" value="${selectedData.ticketNotwo}">
     
            

        

        <div class="mb-4">
        <label for="terms-conditions" class="block">Terms & Conditions:</label>
        ${selectedData.termsConditions.map((term, index) => `
            <input type="text" class="w-full p-2 border rounded border border-slate-700 mb-2" placeholder="Term ${index + 1}" value="${term}">
        `).join('')}
    </div>

    <div class="mb-4">
        <label for="terms-conditions" class="block">Cancellation Policy:</label>
        ${selectedData.cancellationPolicy.map((term, index) => `
            <input type="text" class="w-full p-2 border rounded border border-slate-700 mb-2" placeholder="Policy ${index + 1}" value="${term}">
        `).join('')}
    </div>

    <div class="mb-4">
        <label for="room-details" class="block">Room Details:</label>
        ${selectedData.roomDetails.map((room, roomIndex) => `
            <li>
                <ul>
                    ${Object.entries(room).map(([key, value]) => `
                        <input type="text" class="w-full p-2 border rounded border border-slate-700 mb-2" placeholder="${key}" value="${value}">
                    `).join('')}
                </ul>
            </li>
        `).join('')}
    </div>










 
            <!-- Add other data fields as needed -->
        `;
        
        // Hide the dropdown
        voucherDropdown.classList.add('hidden');
        
    }
    
});
 


// Function to map termsConditions
 

// ... (remaining code)

        }
    });
});





  