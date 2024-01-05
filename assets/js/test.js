


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getDatabase,
  ref as databaseRef,
  push,
  set,
  get,
  query,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { ref } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

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
initializeApp(firebaseConfig);
const database = getDatabase();



function addRowToTable(tableId) {
  var table = document.getElementById(tableId).getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);
  var cells = [];

  for (var i = 0; i < 7; i++) {
      cells.push(newRow.insertCell(i));

      if (i < 2) {
          // Set the first two cells to have input type "date"
          cells[i].innerHTML = '<input type="date" class="w-full p-2 border border-gray-300 rounded">';
      } else {
          // For other cells, use the default text input
          cells[i].innerHTML = '<input type="text" class="w-full p-2 border border-gray-300 rounded">';
      }
  }
}

// Function to create the HTML structure for an option
 // Add New Option button logic
 var optionCounter = 1;

 document.getElementById("addOptionBtn").addEventListener("click", function () {
   // Create a new <div> for each option
   var divContainer = document.createElement("div");
   divContainer.className = "mb-4 alloptions-option"; // Added alloptions-option class
   divContainer.id = 'option' + optionCounter;

   // Add the option title inside the <div>
   var optionTitle = document.createElement("h2");
   optionTitle.textContent = "Option " + optionCounter;
   divContainer.appendChild(optionTitle);

   // Add the specified HTML structure for "Amount" field
   var amountDetailsDiv = document.createElement("div");
   amountDetailsDiv.className = "mb-4";
   amountDetailsDiv.innerHTML = '<label for="amount-details" class="block">Amount:</label>' +
     '<input type="text" id="amount-details" class="w-full p-2 border rounded border border-slate-700">';
   divContainer.appendChild(amountDetailsDiv);

   // Create a new table for each option
   var newTable = document.createElement("table");
   newTable.className = "mb-4";
   newTable.id = "table" + optionCounter; // Unique ID for each table

   var tableHeader = newTable.createTHead();
   var headerRow = tableHeader.insertRow(0);

   // Customize table header as needed
   var headers = ["Check-in", "Check-out", "Destination", "Hotel", "Number of Rooms", "Matters", "Meal Plan"];
   for (var i = 0; i < headers.length; i++) {
     var headerCell = document.createElement("th");
     headerCell.textContent = headers[i];
     headerRow.appendChild(headerCell);
   }

   // Create a table body for the new table
   var newTableBody = newTable.createTBody();
   var newRow = newTableBody.insertRow(0);

   // Customize the first row of the new table as needed
   for (var i = 0; i < 7; i++) {
     var newCell = newRow.insertCell(i);

     if (i < 2) {
       // Set the first two cells to have input type "date"
       newCell.innerHTML = '<input type="date" class="w-full p-2 border border-gray-300 rounded">';
     } else {
       // For other cells, use the default text input
       newCell.innerHTML = '<input type="text" class="w-full p-2 border border-gray-300 rounded">';
     }
   }

   // Create the "Add Row" button for each table
   var addRowButton = document.createElement("button");
   addRowButton.type = "button";
   addRowButton.textContent = "Add Row";
   addRowButton.className = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4";
   addRowButton.addEventListener("click", function () {
     addRowToTable(newTable.id);
   });

   divContainer.appendChild(newTable);
   divContainer.appendChild(addRowButton);

   // Append the new <div> with table and "Add Row" button to the body
   document.querySelector(".alloptions").appendChild(divContainer);

   optionCounter++;
 });

 // Original "Add Row" button logic
 document.getElementById("addRowBtn").addEventListener("click", function () {
   var table = document.getElementById("originalTable").getElementsByTagName("tbody")[0];
   var newRow = table.insertRow(table.rows.length);
   var cells = [];

   for (var i = 0; i < 7; i++) {
     cells.push(newRow.insertCell(i));

     if (i < 2) {
       // Set the first two cells to have input type "date"
       cells[i].innerHTML = '<input type="date" class="w-full p-2 border border-gray-300 rounded">';
     } else {
       // For other cells, use the default text input
       cells[i].innerHTML = '<input type="text" class="w-full p-2 border border-gray-300 rounded">';
     }
   }
 });

 

 // Function to print the content of all options
// Function to print the content of all options
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to print the content of all options// Function to print the content of all options 

// Function to print the content of all options  


 // Function to print the values from all options
// Function to print the values from all options
// Function to print the values from all options
function printValues() {
  var printWindow = window.open('', '_blank');

  const amount = document.getElementById("amount-details").value;


  if (!printWindow) {
      console.error("Could not open the print window.");
      return;
  }
  // Get the values from the dynamically added rows
  const tableRows = Array.from(
    document.querySelectorAll("#originalTable tbody tr")
  )
    .map((row) => {
      const cells = Array.from(row.cells);
      return `<tr class="border border-1 border-black">${cells
        .map(
          (cell) =>
            `<td class="border border-1 border-black text-center">${
              cell.querySelector("input").value
            }</td>`
        )
        .join("")}</tr>`;
    })
    .join("");


  var alloptionsHTML = '';
  
  document.querySelectorAll(".alloptions .alloptions-option").forEach(function (option) {
      var title = option.querySelector("h2").textContent;
      var amount = option.querySelector('#amount-details').value;

      alloptionsHTML += `
          <div class="flex flex-col gap-2">
              <div class="w-full py-2 flex items-center justify-center text-black bg-orange-400 mt-2 rounded-lg">
                  <h1 class="uppercase font-semibold">${title}</h1>
              </div>
              
           <div class="w-full px-5 mt-3 py-2 border border-1 border-black rounded-lg" >
              <div class="flex items-center">
                <div class="flex item-center gap-2">
                  <h1>Rate:</h1>
                  <h1>${amount}</h1>
                  
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div
                class="w-full py-2 flex items-center justify-center text-black bg-orange-400 mt-2 rounded-lg"
              >
                <h1 class="uppercase font-semibold">accomodation details</h1>
              </div>
              <div class="flex w-full justify-center">

                  <table class="text-xs">
                      <tr class="border border-1 border-black">
                          <th class="uppercase border border-1 border-black px-5">check in</th>
                          <th class="uppercase border border-1 border-black px-5">check out</th>
                          <th class="uppercase border border-1 border-black px-5">destination</th>
                          <th class="uppercase border border-1 border-black px-5">hotel</th>
                          <th class="uppercase border border-1 border-black px-5">no of rooms</th>
                          <th class="uppercase border border-1 border-black px-5">no of ex bed /matters</th>
                          <th class="uppercase border border-1 border-black px-5">meal plan</th>
                      </tr>
      `;

      option.querySelector("table tbody").querySelectorAll("tr").forEach(function (row) {
          alloptionsHTML += '<tr class="border border-1 border-black">' +
              Array.from(row.querySelectorAll("td")).map(cell => `<td class="border border-1 border-black text-center">${cell.querySelector("input").value}</td>`).join('') +
              '</tr>';
      });

      alloptionsHTML += '</table></div></div>';
  });

  printWindow.document.write(`
      <html>
          <head>
              <title>Print Page</title>
              <link rel="stylesheet" href="https://cdn.tailwindcss.com">
          </head>
          <body>


          <h1>Rate:</h1>
          <h1>${amount}</h1>

        
          <div class="flex flex-col gap-2">
            <div
              class="w-full py-2 flex items-center justify-center text-black bg-orange-400 mt-2 rounded-lg"
            >
              <h1 class="uppercase font-semibold">accomodation details</h1>
            </div>
            <div class="flex w-full justify-center">
              <table class="text-xs">
                <tr class="border border-1 border-black">
                  <th class="uppercase border    border-1 border-black px-5">
                    check in
                  </th>
                  <th class="uppercase border border-1 border-black px-5">
                    check out
                  </th>
                  <th class="uppercase border border-1 border-black px-5">
                    destination
                  </th>
                  <th class="uppercase border border-1 border-black px-5">
                    hotel
                  </th>
                  <th class="uppercase border border-1 border-black px-5">
                    no of rooms
                  </th>
                  <th class="uppercase border border-1 border-black px-5">
                    no of ex bed /matters
                  </th>
                  <th class="uppercase border border-1 border-black px-5">
                    meal plan
                  </th>
                </tr>
                ${tableRows}
                
          
              
              </table>
            </div>
          </div>





              ${alloptionsHTML}
          </body>
      </html>
  `);

  printWindow.document.close();
  printWindow.print();
}

 
// Attach the printValues function to the printBtn button
document.getElementById("printBtn").addEventListener("click", printValues);
 



 // ... (your existing code)

// Initialize Firebase
initializeApp(firebaseConfig);
 
// Function to save form data to the database
// ... (your existing code)

// Function to save form data to the database
 // ... (your existing code)

// Function to save form data to the database
function saveFormDataToDatabase() {
  const formData = {
    options: {},
  };

  // Iterate over each option to collect data
  document.querySelectorAll(".alloptions .alloptions-option").forEach(function (option, index) {
    const optionData = {
      title: option.querySelector("h2").textContent,
      amount: option.querySelector('#amount-details').value,
      accommodationDetails: [],
    };

    // Iterate over rows in the table to collect accommodation details
    option.querySelector("table tbody").querySelectorAll("tr").forEach(function (row) {
      const rowData = Array.from(row.querySelectorAll("td")).map(cell => cell.querySelector("input").value);
      optionData.accommodationDetails.push(rowData);
    });

    // Add option data to formData
    formData.options[`option${index + 1}`] = optionData;
  });

  // Push the formData to the database
  const formDataRef = push(ref(database, 'formData'));
  set(formDataRef, formData);

  console.log("Form data saved to the database:", formData);
}

// ... (your existing code)

// ... (your existing code)


// Attach the saveFormDataToDatabase function to the "Save to Database" button
document.getElementById("savedata").addEventListener("click", saveFormDataToDatabase);

// ... (your existing code)
