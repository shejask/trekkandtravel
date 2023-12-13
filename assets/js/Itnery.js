  
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref as databaseRef, push, set, get, query, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { ref } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

 


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
const storage = getStorage();


const tourHighlightsRef = databaseRef(getDatabase(), `tourHighlights`);

document.getElementById('submitBtn').addEventListener('click', function () {
    submitForm();
});



async function submitForm() {
    const travelDate = document.getElementById('travelDate').value;
    
    const night = document.getElementById('night').value;
   


    const tourHighlightsInputs = document.querySelectorAll('.tour-highlights-input');

    tourHighlightsInputs.forEach(async function (input, index) {
        const tourHighlightsValue = input.value.trim();

        if (tourHighlightsValue.length > 0) {
            // Update the tour highlights data for each input field
            const tourHighlightsDataRef = push(tourHighlightsRef);
            set(tourHighlightsDataRef, {
                highlights: tourHighlightsValue,
            });
        }
    });






    let selectedPackageKey;

    // Generate a new Tour ID with increment
    const tourId = await generateAndIncrementTourId();

    // Set the Tour ID in the input field
    document.getElementById('tourId').value = tourId;



    const tourHighlights = document.getElementById('tour-highlights').value;

    // Update the tour highlights data
    const tourHighlightsDataRef = push(tourHighlightsRef);
    set(tourHighlightsDataRef, {
        highlights: tourHighlights,
    });

     
   
 
    // Update day details to the "days" node
   

    alert('Form submitted successfully!');
}


// ... (your existing code)

// Function to fetch and display the latest Tour ID
async function fetchAndDisplayTourId() {
    // Fetch the current Tour ID count from the database
    const tourIdCountRef = databaseRef(getDatabase(), 'tourIdCount');
    const tourIdCountSnapshot = await get(tourIdCountRef);
    let tourIdCount = 1;

    if (tourIdCountSnapshot.exists()) {
        tourIdCount = tourIdCountSnapshot.val() + 1;
    }

    // Format the Tour ID without brackets: TRKKTRVL 004
    const formattedTourId = `TRKKTRVL ${tourIdCount.toString().padStart(3, '0')}`;

    // Display the Tour ID in the input field
    document.getElementById('tourId').value = formattedTourId;
}

// Call the function to fetch and display Tour ID when the page is loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayTourId);

// ... (your existing code)

// Function to generate and increment Tour ID
async function generateAndIncrementTourId() {
    // Fetch the current Tour ID count from the database
    const tourIdCountRef = databaseRef(getDatabase(), 'tourIdCount');
    const tourIdCountSnapshot = await get(tourIdCountRef);
    let tourIdCount = 1;

    if (tourIdCountSnapshot.exists()) {
        tourIdCount = tourIdCountSnapshot.val() + 1;
    }

    // Format the Tour ID without brackets: TRKKTRVL 004
    const formattedTourId = `TRKKTRVL ${tourIdCount.toString().padStart(3, '0')}`;

    // Increment and update the Tour ID count in the database
    set(tourIdCountRef, tourIdCount);

    // Display the Tour ID in the input field
    document.getElementById('tourId').value = formattedTourId;

    return formattedTourId;
}

// ... (your existing code)
document.addEventListener('DOMContentLoaded', function () {
    // ... (your existing code)

    // Add an event listener to the "tour-highlights" input field
    document.getElementById('tour-highlights').addEventListener('input', async function (event) {
        const tourHighlightsInput = event.target.value.trim();

        // Your existing code for fetching tour highlights
        const tourHighlightsSnapshot = await get(tourHighlightsRef);

        // Clear the existing dropdown content
        const tourHighlightsDropdown = document.getElementById('tour-highlights-dropdown');
        tourHighlightsDropdown.innerHTML = '';

        if (tourHighlightsSnapshot.exists()) {
            let showDropdown = false;

            tourHighlightsSnapshot.forEach((childSnapshot) => {
                const tourHighlight = childSnapshot.val().highlights.toLowerCase();

                if (tourHighlight.includes(tourHighlightsInput.toLowerCase())) {
                    showDropdown = true;

                    const tourHighlightItem = document.createElement('div');
                    tourHighlightItem.textContent = tourHighlight;
                    tourHighlightItem.classList.add('cursor-pointer', 'hover:bg-gray-200', 'p-1');

                    tourHighlightItem.addEventListener('click', async function () {
                        // Fill the input field with the selected tour highlight
                        document.getElementById('tour-highlights').value = childSnapshot.val().highlights;

                        // Hide the dropdown after selection
                        hideTourHighlightsDropdown();
                    });

                    tourHighlightsDropdown.appendChild(tourHighlightItem);
                }
            });

            // Show or hide the dropdown based on matching items
            if (showDropdown) {
                tourHighlightsDropdown.classList.remove('hidden');
            } else {
                hideTourHighlightsDropdown();
            }
        } else {
            hideTourHighlightsDropdown();
        }
    });
});


 
function hideTourHighlightsDropdown() {
    document.getElementById('tour-highlights-dropdown').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    // ... (your existing code)

    // Add an event listener to the "tour-highlights" input field
    document.getElementById('tour-highlights').addEventListener('input', async function (event) {
        // ... (your existing code)
    });
});

 
 
document.getElementById("addRowBtn").addEventListener("click", function () {
  var table = document.getElementById("originalTable").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.rows.length);
  var cells = [];

  for (var i = 0; i < 7; i++) {
      cells.push(newRow.insertCell(i));
      cells[i].innerHTML = '<input type="text" class="w-full p-2 border border-gray-300 rounded">';
  }
});

 
// Assuming this code is in your itnery.js file

document.getElementById('addMoree').addEventListener('click', function () {
    addNewInputBox();
});

function addNewInputBox() {
    const tourInclusionsContainer = document.getElementById('tour-inclusions-container');

    // Create a new input element
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'w-full p-2 border border-black rounded mb-4';

    // Append the new input element to the container
    tourInclusionsContainer.appendChild(newInput);
}




 


// Get the container where the new textarea will be added
const tourExclusionsContainer = document.getElementById('tour-exclusions-container');

// Get the "Add More" button
const addMoreExclusionsButton = document.getElementById('addMoreexclusions');

// Counter to keep track of added textareas
let exclusionCounter = 1;

// Function to add a new textarea
function addNewExclusionTextarea() {
    // Create a new textarea element
    const newTextarea = document.createElement('textarea');
    newTextarea.className = 'w-full p-2 border border-black rounded mb-4';
    newTextarea.rows = 4;
    newTextarea.placeholder = 'Enter exclusion details';

    // Append the new textarea to the container
    tourExclusionsContainer.appendChild(newTextarea);

    // Increment the counter for the next textarea
    exclusionCounter++;
}

// Add an event listener to the "Add More" button
addMoreExclusionsButton.addEventListener('click', addNewExclusionTextarea);













 

document.getElementById('addhighlights').addEventListener('click', function () {
    duplicateTourHighlights();
});

 
function duplicateTourHighlights() {
    const tourHighlightsContainer = document.getElementById('tour-highlights-container');
    const originalTourHighlightsInput = document.getElementById('tour-highlights');
    const originalTourHighlightsDropdown = document.getElementById('tour-highlights-dropdown');

    // Create a new tour highlights input field
    const newTourHighlightsInput = document.createElement('input');
    newTourHighlightsInput.type = 'text';
    newTourHighlightsInput.classList.add('w-full', 'p-2', 'border', 'border-black', 'rounded', 'mb-4', 'tour-highlights-input');
    newTourHighlightsInput.placeholder = 'Enter tour highlights';

    // Append the new input field to the container
    tourHighlightsContainer.appendChild(newTourHighlightsInput);

    // Clone the original dropdown and show it for the new input field
    const newTourHighlightsDropdown = originalTourHighlightsDropdown.cloneNode(true);
    newTourHighlightsDropdown.classList.remove('hidden');
    tourHighlightsContainer.appendChild(newTourHighlightsDropdown);

    // Clear the value of the new input field
    newTourHighlightsInput.value = '';

    // Add an event listener to the new input field for dynamic dropdown functionality
    newTourHighlightsInput.addEventListener('input', async function (event) {
        const tourHighlightsInput = event.target;
        const tourHighlightsInputValue = tourHighlightsInput.value.trim();

        // Your existing code for fetching tour highlights
        const tourHighlightsSnapshot = await get(tourHighlightsRef);

        // Clear the existing dropdown content
        const tourHighlightsDropdown = tourHighlightsInput.nextElementSibling;
        tourHighlightsDropdown.innerHTML = '';

        if (tourHighlightsSnapshot.exists()) {
            let showDropdown = false;

            tourHighlightsSnapshot.forEach((childSnapshot) => {
                const tourHighlight = childSnapshot.val().highlights.toLowerCase();

                if (tourHighlight.includes(tourHighlightsInputValue.toLowerCase())) {
                    showDropdown = true;

                    const tourHighlightItem = document.createElement('div');
                    tourHighlightItem.textContent = tourHighlight;
                    tourHighlightItem.classList.add('cursor-pointer', 'hover:bg-gray-200', 'p-1');

                    tourHighlightItem.addEventListener('click', async function () {
                        // Fill the input field with the selected tour highlight
                        tourHighlightsInput.value = childSnapshot.val().highlights;

                        // Hide the dropdown after selection
                        hideTourHighlightsDropdown();
                    });

                    tourHighlightsDropdown.appendChild(tourHighlightItem);
                }
            });

            // Show or hide the dropdown based on matching items
            if (showDropdown) {
                tourHighlightsDropdown.classList.remove('hidden');
            } else {
                hideTourHighlightsDropdown();
            }
        } else {
            hideTourHighlightsDropdown();
        }
    });
}
 
 

// Assuming this code is in your existing JavaScript file

document.getElementById('add-notes').addEventListener('click', function () {
    addNewNotesInputBox();
});

function addNewNotesInputBox() {
    const notesContainer = document.getElementById('notes-container');

    // Create a new input element
    const newNotesInput = document.createElement('input');
    newNotesInput.type = 'text';
    newNotesInput.className = 'w-full p-2 border border-black rounded mb-4 focus:outline-none focus:border-blue-500';
    newNotesInput.placeholder = 'Enter additional notes';

    // Append the new input element to the container
    notesContainer.appendChild(newNotesInput);
}








// Add an event listener to the "addCancellationNote" button
document.getElementById('addCancellationNote').addEventListener('click', function () {
    addNewCancellationNote();
});

// Function to add a new cancellation note input field
function addNewCancellationNote() {
    const cancellationNotesContainer = document.getElementById('cancellation-notes-container');

    // Create a new input element for notes
    const newNoteInput = document.createElement('input');
    newNoteInput.type = 'text';
    newNoteInput.className = 'w-full p-2 border border-black rounded mb-4';
    newNoteInput.placeholder = 'Enter cancellation notes';

    // Append the new input element to the container
    cancellationNotesContainer.appendChild(newNoteInput);
}















/////////////////
////////////////
/////////////////
////////////////


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'd') {
        window.open('index.html');
    } else if (event.ctrlKey  && event.key === 'v') {
        window.open('Hotel_voucher.html');
    } else if (event.ctrlKey   && event.key === 'm') {
        window.open('transport_voucher.html');
    } else if (event.ctrlKey && event.key === 'i') {
        window.open('Itnery.html');
    } else if (event.ctrlKey && event.key === 'r') {
        window.open('add_resort.html');
    } else if (event.ctrlKey && event.key === 'c') {
        window.open('Contacts.html');
    } else if (event.ctrlKey && event.key === 's') {
        window.open('settings.html');
    }
});
/////////////////
////////////////
/////////////////
////////////////