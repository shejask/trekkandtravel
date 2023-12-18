// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4LcJYB55sh3dGiCBVEkkZlKV5B4GWPVU",
  authDomain: "trekkandtravel-7daeb.firebaseapp.com",
  projectId: "trekkandtravel-7daeb",
  storageBucket: "trekkandtravel-7daeb.appspot.com",
  messagingSenderId: "313424140423",
  appId: "1:313424140423:web:43dfbbe67b8dfafc564022"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

// Reference to the TransportVoucher node in your database
const transportVoucherRef = ref(database, 'itnery');

// Reference to the HTML inputs and divs
const voucherInput = document.getElementById('VoucherNo');
const travelDateInput = document.getElementById('travelDate');
const voucherIdListDiv = document.getElementById('VoucherIdlist');
const databaseNodeId = document.getElementById('databaseNodeId');
const confirmationNoInput = document.getElementById('confirmationNoInput');

// Listen for input changes on the voucher input
voucherInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value.trim().toLowerCase();

  // Listen for changes in the TransportVoucher node
  onValue(transportVoucherRef, (snapshot) => {
    const transportVoucherData = snapshot.val();

    // Check if the data exists
    if (transportVoucherData) {
      // Filter tourIds based on the search term
      const filteredTourIds = Object.values(transportVoucherData)
        .filter(parent => parent && parent.tourId && parent.tourId.toLowerCase().includes(searchTerm))
        .map(parent => parent.tourId);

      // Display filtered tourIds in the HTML div
      voucherIdListDiv.innerHTML = `${filteredTourIds.map(tourId => `<h6 class="cursor-pointer">${tourId}</h6>`).join('')}`;

      // Add click event listener to each list item
      const listItems = voucherIdListDiv.querySelectorAll('h6');
      listItems.forEach(item => {
        item.addEventListener('click', () => {
          // Set the selected tourId to the input field
          voucherInput.value = item.textContent;

          // Fetch the corresponding unique key from the database
          const uniqueKey = Object.keys(transportVoucherData).find(key => transportVoucherData[key].tourId === item.textContent);

          // Display the unique key in the HTML h1
          databaseNodeId.textContent = uniqueKey ? `Unique Key: ${uniqueKey}` : 'Unique Key not available';

          // Auto-fill ConfirmationNo and Travel Date from the database
          if (uniqueKey) {
            const confirmationNo = transportVoucherData[uniqueKey].confirmationNo;
            const travelDate = transportVoucherData[uniqueKey].travelDate;

            // Auto-fill confirmationNo wherever you need it
            if (confirmationNoInput) {
              confirmationNoInput.value = confirmationNo;
            } else {
              console.error('Element with id "confirmationNoInput" not found.');
            }

            // Auto-fill travelDate in the date input
            if (travelDateInput) {
              travelDateInput.value = travelDate;
            } else {
              console.error('Element with id "travelDateInput" not found.');
            }
          }

          // Hide the VoucherIdlist div
          voucherIdListDiv.style.display = 'none';
        });
      });

      // Show the VoucherIdlist div if there are matching tourIds
      voucherIdListDiv.style.display = filteredTourIds.length > 0 ? 'block' : 'none';
    } else {
      // Handle the case when there is no data
      voucherIdListDiv.innerHTML = 'No tourIds available.';
    }
  }, (error) => {
    // Handle errors
    console.error('Error fetching data:', error);
  });
});
