// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

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
// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

// Reference to the TransportVoucher node in your database
const transportVoucherRef = ref(database, 'itnery');

// Reference to the HTML input and div
const voucherInput = document.getElementById('VoucherNo');
const voucherIdListDiv = document.getElementById('VoucherIdlist');
 

 

 

// Listen for input changes on the voucher input
voucherInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value.trim().toLowerCase();

  // Listen for changes in the TransportVoucher node
  onValue(transportVoucherRef, (snapshot) => {
    const transportVoucherData = snapshot.val();

    // Check if the data exists
    if (transportVoucherData) {
      // Filter voucher numbers based on the search term
      const filteredVoucherNumbers = Object.values(transportVoucherData)
        .filter(parent => parent.voucherNo.toLowerCase().includes(searchTerm))
        .map(parent => parent.voucherNo);

      // Display filtered voucher numbers in the HTML div
      voucherIdListDiv.innerHTML = `${filteredVoucherNumbers.map(voucherNo => `<h6 class="cursor-pointer">${voucherNo}</h6>`).join('')}`;

      // Add click event listener to each list item
      const listItems = voucherIdListDiv.querySelectorAll('h6');
      listItems.forEach(item => {
        item.addEventListener('click', () => {
          // Set the selected voucher number to the input field
          voucherInput.value = item.textContent;

          // Fetch the corresponding unique key from the database
          const uniqueKey = Object.keys(transportVoucherData).find(key => transportVoucherData[key].voucherNo === item.textContent);

         


          // Display the unique key in the HTML h1
          databaseNodeId.textContent = uniqueKey ? `Unique Key: ${uniqueKey}` : 'Unique Key not available';

          // Auto-fill ConfirmationNo from the database
          if (uniqueKey) {
             
            
 



          }

          // Hide the VoucherIdlist div
          voucherIdListDiv.style.display = 'none';
        });
      });

      // Show the VoucherIdlist div if there are matching voucher numbers
      voucherIdListDiv.style.display = filteredVoucherNumbers.length > 0 ? 'block' : 'none';
    } else {
      // Handle the case when there is no data
      voucherIdListDiv.innerHTML = 'No voucher numbers available.';
    }
  }, (error) => {
    // Handle errors
    console.error('Error fetching data:', error);
  });
});









let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
 