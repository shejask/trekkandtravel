  
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref as databaseRef, push, set, get, query, onValue,update, } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { ref } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

 

const firebaseConfig = {
  apiKey: "AIzaSyD4LcJYB55sh3dGiCBVEkkZlKV5B4GWPVU",
  authDomain: "trekkandtravel-7daeb.firebaseapp.com",
  databaseURL: "https://trekkandtravel-7daeb-default-rtdb.firebaseio.com",
  projectId: "trekkandtravel-7daeb",
  storageBucket: "trekkandtravel-7daeb.appspot.com",
  messagingSenderId: "313424140423",
  appId: "1:313424140423:web:43dfbbe67b8dfafc564022"
};


// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();
const storage = getStorage();
const guestsRef = ref(database, 'guests');

let selectedDuration = [];
let printDuration = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////TOUR ID///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const tourHighlightsRef = databaseRef(getDatabase(), `tourHighlights`);

document.getElementById('savedata').addEventListener('click', function () {
    submitForm();
});



async function submitForm() {

    let selectedPackageKey;
    // Generate a new Tour ID with increment
    const tourId = await generateAndIncrementTourId();
    // Set the Tour ID in the input field
    document.getElementById('tourId').value = tourId;
       
}



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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////TOUR HIGHLIGHTS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// Function to fetch existing data from the database
async function getExistingData() {
  try {
      const existingDataRef = ref(database, 'tourHighlights');
      const existingDataSnapshot = await get(existingDataRef);
      return existingDataSnapshot || [];
  } catch (error) {
      console.error('Error fetching existing data:', error);
      return [];
  }
}

// Function to render tour highlights in the dropdown
function renderTourHighlights(highlights, dropdownId, inputFieldId) {
  // Clear previous content
  const tourHighlightsDropdown = document.getElementById(dropdownId);
  tourHighlightsDropdown.innerHTML = '';

  // Render each highlight in the dropdown
  highlights.forEach((highlight) => {
      const highlightItem = document.createElement('div');

      // Check if the necessary properties are defined before accessing them
      if (highlight && highlight.tourHighlight) {
          highlightItem.textContent = highlight.tourHighlight;
          highlightItem.classList.add('cursor-pointer', 'hover:bg-gray-200', 'p-2');
          highlightItem.addEventListener('click', () => {
              // Set the selected highlight in the input field
              const inputField = document.getElementById(inputFieldId);
              if (inputField) {
                  inputField.value = highlight.tourHighlight;
                  // Clear the dropdown after selecting
                  tourHighlightsDropdown.innerHTML = '';
              }
          });

          tourHighlightsDropdown.appendChild(highlightItem);
      }
  });
}

// Function to add a new tour highlight field
function addNewTourHighlightField() {
  const newTourHighlightField = document.createElement('div');
  const timestamp = Date.now();
  newTourHighlightField.classList.add('w-full', 'p-2', 'border', 'border-black', 'rounded', 'mb-4', 'tour-highlights-input');

  const newTourHighlightInput = document.createElement('input');
  newTourHighlightInput.id = `input_${timestamp}`;
  newTourHighlightInput.type = 'text'; // Set the input type to text
  newTourHighlightInput.classList.add('form-input', 'w-full', 'sm:text-sm', 'sm:leading-5', 'focus:outline-none', 'focus:border-indigo-300', 'focus:shadow-outline-indigo', 'transition', 'duration-150', 'ease-in-out');
  newTourHighlightInput.placeholder = 'New Tour Highlight';

  const newTourHighlightDropdown = document.createElement('div');
  const newDropdownId = `newTourHighlightsDropdown_${timestamp}`;
  newTourHighlightDropdown.classList.add('mt-2');
  newTourHighlightDropdown.id = newDropdownId;

  newTourHighlightField.appendChild(newTourHighlightInput);
  newTourHighlightField.appendChild(newTourHighlightDropdown);
  tourHighlightsContainer.appendChild(newTourHighlightField);

  // Add event listener for input changes to update the dropdown
  newTourHighlightInput.addEventListener('input', async () => {
      const searchTerm = newTourHighlightInput.value.trim().toLowerCase();

      // Fetch existing data
      const existingDataSnapshot = await getExistingData();

      // Filter the highlights based on the search term
      const filteredHighlights = [];
      existingDataSnapshot.forEach(childSnapshot => {
          const highlight = childSnapshot.val();
          if (highlight && highlight.tourHighlight && highlight.tourHighlight.toLowerCase().includes(searchTerm)) {
              filteredHighlights.push(highlight);
          }
      });

      // Render the filtered highlights in the dropdown
      renderTourHighlights(filteredHighlights, newDropdownId, `input_${timestamp}`);
  });
}

// Your Firebase configuration and initialization code here

// Get references to the HTML elements
const savedataButton = document.getElementById('savedata');
const tourHighlightInput = document.getElementById('tourHighlight');
const tourHighlightsContainer = document.getElementById('tourHighlightsContainer');
const addTourHighlightButton = document.getElementById('addTourHighlight');

// Add event listener to the "Save" button
savedataButton.addEventListener('click', async () => {
  try {
      // Save data to Firebase Realtime Database
      const tourHighlightValue = tourHighlightInput.value.trim();

      if (tourHighlightValue !== '') {
          // Check if the tourHighlight already exists
          const existingDataSnapshot = await getExistingData();

          let isTourHighlightExists = false;
          existingDataSnapshot.forEach(childSnapshot => {
              const existingHighlight = childSnapshot.val();

              if (existingHighlight && existingHighlight.tourHighlight) {
                  const existingHighlightLowerCase = existingHighlight.tourHighlight.toLowerCase();
                  if (existingHighlightLowerCase === tourHighlightValue.toLowerCase()) {
                      isTourHighlightExists = true;
                  }
              }
          });

          if (!isTourHighlightExists) {
              // If the tourHighlight doesn't exist, save it
              const databaseRef = push(ref(database, 'tourHighlights'));
              set(databaseRef, { tourHighlight: tourHighlightValue });
              tourHighlightInput.value = ''; // Clear the input field after saving

              // Focus on the input field to maintain cursor position
              tourHighlightInput.focus();
          } else {
           }
      } else {
          // alert('Please enter a tour highlight before saving.');
      }

      // Check for new tour highlights in dynamically added fields
      const newTourHighlightInputs = document.querySelectorAll('.tour-highlights-input input');
      newTourHighlightInputs.forEach(async (input) => {
          const newTourHighlightValue = input.value.trim();

          if (newTourHighlightValue !== '') {
              // Check if the new tour highlight already exists
              const existingDataSnapshot = await getExistingData();

              let isNewTourHighlightExists = false;
              existingDataSnapshot.forEach(childSnapshot => {
                  const existingHighlight = childSnapshot.val();

                  if (existingHighlight && existingHighlight.tourHighlight) {
                      const existingHighlightLowerCase = existingHighlight.tourHighlight.toLowerCase();
                      if (existingHighlightLowerCase === newTourHighlightValue.toLowerCase()) {
                          isNewTourHighlightExists = true;
                      }
                  }
              });

              if (!isNewTourHighlightExists) {
                  // If the new tour highlight doesn't exist, save it
                  const databaseRef = push(ref(database, 'tourHighlights'));
                  set(databaseRef, { tourHighlight: newTourHighlightValue });
                  
              }
          }
      });
  } catch (error) {
      console.error('Error saving data:', error);
  }
});

// Add event listener for input changes to update the dropdown
tourHighlightInput.addEventListener('input', async () => {
  try {
      const searchTerm = tourHighlightInput.value.trim().toLowerCase();

      // Fetch existing data
      const existingDataSnapshot = await getExistingData();

      // Filter the highlights based on the search term
      const filteredHighlights = [];
      existingDataSnapshot.forEach(childSnapshot => {
          const highlight = childSnapshot.val();
          if (highlight && highlight.tourHighlight && highlight.tourHighlight.toLowerCase().includes(searchTerm)) {
              filteredHighlights.push(highlight);
          }
      });

      // Render the filtered highlights in the dropdown
      renderTourHighlights(filteredHighlights, 'tourhighlightsdropdown', 'tourHighlight');
  } catch (error) {
      console.error('Error updating dropdown:', error);
  }
});

// Add event listener for the "plus" button to add a new tour highlight field
addTourHighlightButton.addEventListener('click', () => {
  addNewTourHighlightField();
});


  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////TOUR INCLUSIONS ADD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
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




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////TOUR EXCLUSIONS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
 


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




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////NOTES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
 

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////CANCELLATION POLICY///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////SHORTCUTS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'd') {
      window.open('index.html');
  } else if (event.ctrlKey  && event.key === 'h') {
      window.open('Hotel_voucher.html');
  } else if (event.ctrlKey   && event.key === 'm') {
      window.open('transport_voucher.html');
  } else if (event.ctrlKey && event.key === 'i') {
      window.open('Itnery.html');
  } else if (event.ctrlKey && event.key === 'r') {
      window.open('add_resort.html');
  } else if (event.ctrlKey && event.key === 'o') {
      window.open('Contacts.html');
  } else if (event.ctrlKey && event.key === 's') {
      window.open('settings.html');
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////NAVIGATION///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  


// add hovered class to selected list item
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
//////////////////////////////////////
//////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////GUEST FEATURES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

document.addEventListener("DOMContentLoaded", function () {
    // ... (your existing code) ...

    function populateGuestNumber(inputId, dropdownId, numberInputId) {
        // Get the value from the input field
        const guestNameInput = document.getElementById(inputId).value.toLowerCase();

        // Get the dropdown container
        const dropdownContainer = document.getElementById(dropdownId);

        // Clear the previous dropdown content
        dropdownContainer.innerHTML = "";

        // Query the database for all guest names and numbers
        onValue(guestsRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const guestDetails = Object.values(data);

                guestDetails.forEach((guest) => {
                    // Check if the guest name includes the input
                    if (guest.guestName.toLowerCase().includes(guestNameInput)) {
                        // Create a new option element
                        const option = document.createElement("div");
                        option.textContent = guest.guestName;
                        option.className = "dropdown-item";

                        // Add click event to select the guest name and fill guest number
                        option.addEventListener("click", function () {
                            document.getElementById(inputId).value = guest.guestName;
                            document.getElementById(numberInputId).value = guest.contactNumber;
                            dropdownContainer.innerHTML = ""; // Clear dropdown after selection
                        });

                        // Append the option to the dropdown
                        dropdownContainer.appendChild(option);
                    }
                });

                // Display the dropdown container
                dropdownContainer.classList.remove("hidden");
            }
        });
    }

    document.getElementById("guestName").addEventListener("input", function () {
        populateGuestNumber("guestName", "guest-name-dropdown", "guestNumber");
    });

    // ... (your existing code) ...
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////PAACKAGE & DESCRIPTION///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
 
const packagesRef = ref(database, 'packages'); // Change the reference to 'packages'

const form = document.getElementById('myForm');
const saveButton = document.getElementById('savedata'); // Update the ID to match the new button ID
const packageNameInput = document.getElementById('packageName');
const descriptionInput = document.getElementById('description');
const allPackageNamesContainer = document.getElementById('allpackage-name');

let packageNames = []; // Array to store all package names
let isAutoFilled = false; // Flag to track autofill status

// Hide the package names container initially
document.addEventListener("DOMContentLoaded", () => {
    hidePackageNamesContainer();
});

saveButton.addEventListener('click', async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    const packageName = packageNameInput.value;
    const description = descriptionInput.value;

    // Check if the package name already exists
    const isPackageExists = await checkPackageExists(packageName);

    // Check if autofill has occurred
    if (isAutoFilled) {
        // Reset the autofill flag and return without saving to the database
        isAutoFilled = false;
        return;
    }

    if (isPackageExists) {
        console.error('Package with the same name already exists. Please choose a different name.');
        return;
    }

    const newPackagesRef = push(packagesRef); // Change the reference to 'packages'

    set(newPackagesRef, {
        packageName: packageName,
        description: description,
    }).then(() => {
        console.log('Package data added successfully');
    }).catch((error) => {
        console.error('Error adding package data:', error);
    });
});

// Display all package names dynamically
onValue(packagesRef, (snapshot) => { // Change the reference to 'packages'
    const data = snapshot.val();

    packageNames = [];

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const packageName = data[key].packageName;
            packageNames.push(packageName);
        }
    }

    // Display all package names
    displayPackageNames(packageNames);
});

// Add input event listener to dynamically show/hide related package names
packageNameInput.addEventListener('input', () => {
    const inputText = packageNameInput.value.toLowerCase();

    // Hide the container if there's no input
    if (!inputText) {
        hidePackageNamesContainer();
        return;
    }

    // Filter package names based on input text
    const filteredPackageNames = packageNames.filter(name => name.toLowerCase().includes(inputText));

    // Display the filtered package names
    displayPackageNames(filteredPackageNames);
});

// Function to display package names in the container
function displayPackageNames(packageNames) {
    allPackageNamesContainer.innerHTML = ''; // Clear previous details

    for (const packageName of packageNames) {
        const packageNameDiv = document.createElement('div');
        packageNameDiv.textContent = packageName;

        // Add an event listener to each package name for autofilling, hiding the container, and fetching description
        packageNameDiv.addEventListener('click', async () => {
            packageNameInput.value = packageName;
            hidePackageNamesContainer();

            // Fetch description based on the selected package name
            const description = await getDescriptionForPackage(packageName);

            // Auto-fill the description into the textarea
            descriptionInput.value = description;

            // Set the autofill flag to true
            isAutoFilled = true;
        });

        allPackageNamesContainer.appendChild(packageNameDiv);
    }

    // Show the container
    showPackageNamesContainer();
}

// Function to fetch description based on the selected package name
async function getDescriptionForPackage(packageName) {
    return new Promise((resolve, reject) => {
        // Query the database to get the description for the selected package name
        onValue(packagesRef, (snapshot) => { // Change the reference to 'packages'
            const data = snapshot.val();

            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const currentPackageName = data[key].packageName;
                    const currentDescription = data[key].description;

                    if (currentPackageName === packageName) {
                        resolve(currentDescription);
                        return;
                    }
                }
            }

            // Reject if the description is not found
            reject('Description not found for the selected package');
        });
    });
}

// Function to check if the package name already exists
async function checkPackageExists(packageName) {
    return new Promise((resolve) => {
        // Query the database to check if the package name already exists
        onValue(packagesRef, (snapshot) => { // Change the reference to 'packages'
            const data = snapshot.val();

            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const currentPackageName = data[key].packageName;

                    if (currentPackageName === packageName) {
                        resolve(true); // Package name already exists
                        return;
                    }
                }
            }

            resolve(false); // Package name does not exist
        });
    });
}

// Function to hide the package names container
function hidePackageNamesContainer() {
    allPackageNamesContainer.style.display = 'none';
}

// Function to show the package names container
function showPackageNamesContainer() {
    allPackageNamesContainer.style.display = 'block';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////PACKAGE & DESCRIPTION///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
 
// Add an event listener for the duration select element
document.getElementById("duration").addEventListener("change", function () {
  // Check if the travel date is filled
  const travelDate = document.getElementById("traveldate").value;
  if (!travelDate) {
    alert("Please fill in the travel date before choosing the duration.");
    // Reset the duration select element to the default option
    this.value = "0";
    return;
  }

  selectedDuration.push(parseInt(this.value, 10));

  // Clear existing containers
  document.getElementById("formContainer").innerHTML = "";

  // Get the initial date value from the "traveldate" input
  const initialDate = document.getElementById("traveldate").valueAsDate;

  // Create containers based on the selected duration
  for (let i = 0; i < selectedDuration; i++) {
    // For the first loop, use the initial date value; for subsequent loops, increment the date by one day
    const currentDate = new Date(initialDate);
    currentDate.setDate(initialDate.getDate() + i);

    createFormContainer(i, currentDate);
    fetchAndDisplayHeadings(i);
  }

  // Add event listener for the Save button
  document.getElementById("savedata").addEventListener("click", function () {
    // Ensure selectedDuration is defined
    if (selectedDuration === undefined) {
      console.error("Selected duration is not defined");
      return;
    }

    // Iterate over the created containers and save data to the database
    for (let i = 0; i < selectedDuration; i++) {
      saveFormData(i);
    }
  });

  document.getElementById("newSaveBtn").addEventListener("click", function () {
    alert("Wait for the image to load, then Save All");

    if (selectedDuration === undefined) {
      console.error("Selected duration is not defined");
      return;
    }

    // Iterate over the created containers and save data to the database
    for (let i = 0; i < selectedDuration; i++) {
      newBtn(i);
    }
  });
});

let obj;

// Modify the createFormContainer function to accept a date parameter
// Modify the createFormContainer function to accept a date parameter
function createFormContainer(index, currentDate) {
  const container = document.createElement("div");
  container.className = "w-full max-w-lg bg-white p-8 rounded shadow-lg mb-4";

  container.innerHTML = `
    
      
        <h1 class="text-xl id="dayNumber${index}" name="dayNumber${index}"  font-semibold">Day number: </h1>
        <input type="text" id="dayNumber${index}" name="dayNumber${index}" class="w-full p-2 border border-gray-300 rounded" value="${
    index + 1
  }">

        <label for="date${index}" class="block text-gray-600 text-sm font-semibold mb-2">Date:</label>
        <input type="date" id="date${index}" name="date${index}" class="w-full p-2 border border-gray-300 rounded" value="${
    currentDate.toISOString().split("T")[0]
  }">

        <div class="relative">
            <label for="heading${index}" class="block text-gray-600 text-sm font-semibold mb-2">Heading:</label>
            <input type="text" id="heading${index}" name="heading${index}" class="w-full p-2 border border-gray-300 rounded" placeholder="Search for a heading">
            <div id="all-headings${index}" class="mt-2 absolute z-10 left-0 right-0 bg-white border border-gray-300 rounded" style="display: none;"></div>
        </div>

        <label for="descriptionDetails${index}" class="block text-gray-600 text-sm font-semibold mb-2">Description:</label>
        <textarea id="descriptionDetails${index}" name="descriptionDetails${index}" rows="4" class="w-full p-2 border border-gray-300 rounded"></textarea>

        <label for="inclusions${index}" class="block text-gray-600 text-sm font-semibold mb-2">Inclusions:</label>
        <textarea id="inclusions${index}" name="inclusions${index}" rows="4" class="w-full p-2 border border-gray-300 rounded"></textarea>

        <label for="file${index}" class="block text-gray-600 text-sm font-semibold mb-2">Choose File:</label>
        <input type="file" id="file${index}" name="file${index}" class="w-full p-2 border border-gray-300 rounded">
        <div id="image-container${index}" class="mt-2"></div>
    `;

  document.getElementById("formContainer").appendChild(container);

  // Add event listener for the heading input with search functionality
  const headingInput = document.getElementById(`heading${index}`);

  const allHeadingsContainer = document.getElementById(`all-headings${index}`);

  headingInput.addEventListener("input", function () {
    const searchTerm = this.value.trim().toLowerCase();

    // Hide or show the all-headings container based on user input
    if (searchTerm.length > 0) {
      allHeadingsContainer.style.display = "block";
    } else {
      allHeadingsContainer.style.display = "none";
    }

    // Clear the existing headings
    allHeadingsContainer.innerHTML = "";

    // Fetch and display related headings from the database
    const headingsRef = ref(database, "yourHeadingCollection"); // Change 'yourHeadingCollection' to your actual collection name
    onValue(headingsRef, (snapshot) => {
      const headingsData = snapshot.val();
      if (headingsData) {
        Object.keys(headingsData).forEach((key) => {
          const heading = headingsData[key];
          if (heading.toLowerCase().includes(searchTerm)) {
            const headingElement = document.createElement("div");
            headingElement.textContent = heading;
            headingElement.addEventListener("click", function () {
              // Autofill the selected heading in the input
              headingInput.value = heading;

              // You can add additional logic here, like autofilling other fields based on the selected heading
              const selectedData = Object.values(headingsData).find(
                (entry) => entry.heading === heading
              );
              if (selectedData) {
                // Autofill the file input if there's a file URL
                if (selectedData.fileUrl) {
                  const fileInput = document.getElementById(`file${index}`);
                  fileInput.value = selectedData.fileUrl;
                  // You may want to display the file or its details here
                }

                // Autofill the description textarea
                const descriptionTextarea = document.getElementById(
                  `descriptionDetails${index}`
                );
                descriptionTextarea.value = selectedData.description;

                // Add more fields to autofill if needed
              }
            });
            allHeadingsContainer.appendChild(headingElement);
          }
        });
      }
    });
  });

  // ... (existing code)
}

let headingElement;
let descriptionTextarea;

let headArray = [];
let descArray = [];

// let incArray;
// incArray = document.getElementById(`inclusions${index}`).value;
// Function to fetch and display headings
function fetchAndDisplayHeadings(index) {
  const allHeadingsContainer = document.getElementById(`all-headings${index}`);
  const headingInput = document.getElementById(`heading${index}`);

  // Fetch headings from the database
  const dataRef = ref(database, "yourDataCollection");
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const headings = Object.values(data).map((entry) => entry.heading);

      // Clear the existing content in the headings container
      allHeadingsContainer.innerHTML = "";

      // Event listener for input changes (search)
      headingInput.addEventListener("input", function () {
        const searchQuery = headingInput.value.toLowerCase();
        const filteredHeadings = headings.filter((heading) =>
          heading.toLowerCase().includes(searchQuery)
        );

        // Display filtered headings
        filteredHeadings.forEach((heading) => {
          headingElement = document.createElement("div");
          headingElement.textContent = heading;
          headingElement.addEventListener("click", function () {
            // Autofill the selected heading in the input
            headingInput.value = heading;
            // headArray.push(headingInput.value);

            // You can add additional logic here, like autofilling other fields based on the selected heading
            const selectedData = Object.values(data).find(
              (entry) => entry.heading === heading
            );
            if (selectedData) {
              // Fetch and display the image based on the selected heading
              fetchImage(selectedData.imageUrl, `image-container${index}`);

              // Autofill the description textarea
              descriptionTextarea = document.getElementById(
                `descriptionDetails${index}`
              );
              descriptionTextarea.value = selectedData.description;
              // descArray.push(descriptionTextarea.value);

              // printDuration.push(index + 1);

              // Add more fields to autofill if neededs
            }

            // Hide the headings container when a selection is made
            allHeadingsContainer.style.display = "none";
          });
          allHeadingsContainer.appendChild(headingElement);
        });

        // Make the headings container visible
        allHeadingsContainer.style.display = "block";
      });
    }
  });
}
let imageElement = [];
let imgArray = [];
// Function to fetch and display the image
function fetchImage(imageUrl, containerId) {
  // Fetch the image and display it in the specified container
  const imageContainer = document.getElementById(containerId);
  imageContainer.innerHTML = ""; // Clear existing content

  if (imageUrl) {
    imageElement = document.createElement("img");
    imageElement.className = "w-96";
    imageElement.src = imageUrl;
    imgArray.push(imageElement.src);
    imageElement.alt = "Image";
    imageContainer.appendChild(imageElement);
    
  }
}

// ... (your existing code)

// Function to fetch and display the image
function fetchImageAndUpdateInput(imageUrl, index) {
  const imageContainer = document.getElementById(`image-container${index}`);

  // Clear existing content in the image container
  imageContainer.innerHTML = "";

  // Create a new image element
  imageElement = document.createElement("img");
  imageElement.className = "w-96"; // Set the desired width
  imageElement.src = imageUrl;
  imageElement.alt = "Image";

  // Append the image element to the image container
  imageContainer.appendChild(imageElement);
}

// ... (your existing code)

// Modify the saveFormData function to use fetchImageAndUpdateInput
let dayNumber;
let heading;
let description;
let fileInput;
let dataRef;
let incl;
let Dates;

let inclutions = [];
let date = [];

const newBtn = (index) => {
  try {
    dayNumber = document.getElementById(`dayNumber${index}`).value;
    heading = document.getElementById(`heading${index}`).value;
    description = document.getElementById(`descriptionDetails${index}`).value;
    fileInput = document.getElementById(`file${index}`);
    dataRef = ref(database, "yourDataCollection");
    incl = document.getElementById(`inclusions${index}`).value;
    Dates = document.getElementById(`date${index}`).value;

    // printDuration.push(index + 1);
    // headArray.push(heading);
    // descArray.push(description);
    // inclutions.push(incl);
    // date.push(Dates);

    // obj = [
    //   {
    //     duration: printDuration,
    //     head: headArray,
    //     desc: descArray,
    //     img: imgArray,
    //     inclutions: inclutions,
    //     date: date,
    //   },
    // ];

    // console.log(obj);
    // Check if the heading already exists
    const headingExists = checkHeadingExists(dataRef, heading);

    if (!headingExists) {
      const newEntryRef = push(dataRef, {
        dayNumber: dayNumber,
        heading: heading,
        description: description,
      });

      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const storagePath = `yourStoragePath/${newEntryRef.key}/${file.name}`;

        uploadBytes(storageRef(storage, storagePath), file)
          .then(() => getDownloadURL(storageRef(storage, storagePath)))
          .then((downloadURL) => {
            // Update the file input and display the image
            fetchImageAndUpdateInput(downloadURL, index);
            // Save the image URL to the database
            update(newEntryRef, { imageUrl: downloadURL });
            console.log(newEntryRef.value);
            imgArray.push(downloadURL);
            console.log(`${downloadURL}${[index]}`);
          })
          .catch((error) => console.error("Error during file upload:", error));
      }

      // Update other fields in the database (e.g., inclusions)
      update(newEntryRef, { inclusions: inclusions });
    } else {
      console.log("Heading already exists. Not saving duplicate.");

      
    }
  } catch (error) {
    console.error("Error during saveFormData:", error);
  }
};

function saveFormData(index) {
  try {
    dayNumber = document.getElementById(`dayNumber${index}`).value;
    heading = document.getElementById(`heading${index}`).value;
    description = document.getElementById(`descriptionDetails${index}`).value;
    fileInput = document.getElementById(`file${index}`);
    dataRef = ref(database, "yourDataCollection");
    incl = document.getElementById(`inclusions${index}`).value;
    Dates = document.getElementById(`date${index}`).value;

    printDuration.push(index + 1);
    headArray.push(heading);
    descArray.push(description);
    inclutions.push(incl);
    date.push(Dates);

    obj = [
      {
        duration: printDuration,
        head: headArray,
        desc: descArray,
        img: imgArray,
        inclutions: inclutions,
        date: date,
      },
    ];

    console.log(obj);
    // Check if the heading already exists
    const headingExists = checkHeadingExists(dataRef, heading);

    if (!headingExists) {
      const newEntryRef = push(dataRef, {
        dayNumber: dayNumber,
        heading: heading,
        description: description,
      });

      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const storagePath = `yourStoragePath/${newEntryRef.key}/${file.name}`;

        uploadBytes(storageRef(storage, storagePath), file)
          .then(() => getDownloadURL(storageRef(storage, storagePath)))
          .then((downloadURL) => {
            // Update the file input and display the image
            fetchImageAndUpdateInput(downloadURL, index);
            // Save the image URL to the database
            update(newEntryRef, { imageUrl: downloadURL });
            imgArray = [downloadURL];
            console.log(`${downloadURL}${[index]}`);
          })
          .catch((error) => console.error("Error during file upload:", error));
      }

      // Update other fields in the database (e.g., inclusions)
      update(newEntryRef, { inclusions: inclusions });
    } else {
      console.log("Heading already exists. Not saving duplicate.");
    }
  } catch (error) {
    console.error("Error during saveFormData:", error);
  }
}

// Function to check if the heading already exists
function checkHeadingExists(dataRef, newHeading) {
  let headingExists = false;
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const headings = Object.values(data).map((entry) => entry.heading);
      headingExists = headings.includes(newHeading);
    }
  });
  return headingExists;
}





///////////// //////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////TOUR HIGHLIGHTS TO PRINT ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
function getPrintableContent() {
  // Get the value of the main input field
  const tourHighlightInput = document.getElementById('tourHighlight');
  const mainHighlightText = tourHighlightInput.value.trim();

  // Get the values of dynamically added input fields
  const tourHighlights = document.querySelectorAll('.tour-highlights-input input');
  let printableContent = '';

  // Include the main input value in the printable content
  if (mainHighlightText !== '') {
      printableContent += `<li class="tour-highlight-item">${mainHighlightText}</li>`;
  }

  // Include the values of dynamically added input fields in the printable content
  tourHighlights.forEach((highlight) => {
      const highlightText = highlight.value.trim();
      if (highlightText !== '') {
          printableContent += `<li class="tour-highlight-item">${highlightText}</li>`;
      }
  });

  return printableContent;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
 
 
 
 //////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// /PRINT FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add an event listener to the "print" button
document.getElementById('printButton').addEventListener('click', function () {
    printForm();
});

// Function to print the form
function printForm() {
  

    

  
    // Get values from form elements
    const tourId = document.getElementById('tourId').value;
    const travelDate = document.getElementById('traveldate').value;
    
    const arrivalDetails = document.getElementById('arrival-details').value;
    const departureDetails = document.getElementById('departure-details').value;
    const numberOfPax = document.getElementById('number-of-pax').value;


    const guestname = document.getElementById('guestName').value;
    const guestnumber = document.getElementById('guestNumber').value;

    const packagename = document.getElementById('packageName').value;
    const packagedescription = document.getElementById('description').value;
  
  
    const amount = document.getElementById('amount-details').value;
    const amountExecutive = document.getElementById('amount-executive').value;
    const tourcontact = document.getElementById('tour-contact').value;
    const tourmail = document.getElementById('tour-mail').value;
 
    const numofdays = document.getElementById('duration').value;
    const numofnights = document.getElementById('night').value;

 
    const fieldone = document.getElementById('field-one').value;
    const fieldtwo = document.getElementById('field-two').value;
    const fieldthree = document.getElementById('field-three').value;
    const fieldfour = document.getElementById('field-four').value;
    const fieldfive = document.getElementById('field-five').value;
 
    const notess = document.getElementById('notes').value;
 
    // Get values from Tour Inclusions
    const personalNature = document.getElementById('personal-nature').value;
    const applicableTaxes = document.getElementById('applicable-taxes').value;
    const transfersSightseeing = document.getElementById('transfers-sightseeing').value;
    const driverAllowances = document.getElementById('driver-allowances').value;
    const govtTaxes = document.getElementById('govt-taxes').value;


    const headingInput = document.getElementById('heading').value;
    const anytextdescription = document.getElementById('anytext-description').value;



 
  // Get the values of the dynamically added input boxes
  const tourInclusionsValues = Array.from(document.querySelectorAll('#tour-inclusions-container input'))
  .map(input => input.value)
  .filter(value => value.trim() !== '');
 
    // Get the values of the dynamically added textareas for exclusions
    const tourExclusionsValues = Array.from(document.querySelectorAll('#tour-exclusions-container textarea'))
        .map(textarea => textarea.value.trim())
        .filter(value => value !== '');

       //Notes
        const notesValues = Array.from(document.querySelectorAll('#notes-container input'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
 
        //CAancellation Policy
        const cancellationNotesValues = Array.from(document.querySelectorAll('#cancellation-notes-container input'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
 
      // Get the values from the dynamically added rows
    const tableRows = Array.from(document.querySelectorAll('#originalTable tbody tr')).map(row => {
      const cells = Array.from(row.cells);
      return `<tr class="border border-1 border-black">${cells.map(cell => `<td class="border border-1 border-black text-center">${cell.querySelector('input').value}</td>`).join('')}</tr>`;
  }).join('');
 
 
    // Create a new window for printing
    const printWindow = window.open('', '_blank');


    ///////////////////////////////////////////////
    /////////////////////////////////////////////
    /////////////////////////////////////////////// 
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    
     ///////////////////////////////////////////
    /////////////////////////////////////////////
    ///////////////////////////////////////////////////
     
    // Write the content to be printed
    printWindow.document.write(`
       
  
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
    .font-manrope {
        font-family: 'Manrope', sans-serif;
    }

    </style>
  </head>
  <body>

 

    <div class="w-full h-auto pb-5">
      <div
        class="w-full bg-blue-500 h-24 flex items-center justify-between pl-5 bg-cover"
        style="background-image: url(/assets/imgs/Rectangle1.png)">
        <div class="flex flex-col text-white">
          <h1 class="font-bold hidden text-xl">Hotel Voucher</h1>
            <h1 hidden class="text-sm font-light">
              confirmation No: <span>value</span>
            </h1>
        </div>
        <div
          class="w-auto bg-white h-12 px-2 py-3 rounded-l-full flex items-center justify-center gap-2"
        >
          <div class="flex flex-col items-end">
          <img src="/assets/imgs/TREKK & TRAVEL LOGO.png" alt="" width="200" />
          </div>
        </div>
      </div>
      <div class="mt-5 flex justify-between px-5">
        <div class="flex flex-col justify-center text-sm">
          <div class="flex gap-2 items-center">
            <h1>Guest:</h1>
            <h1>${guestname}</h1>
          </div>
          <div class="flex gap-2 items-center">
            <h1>Contact no:</h1>
            <h1>${guestnumber}</h1>
          </div>
          <div class="flex gap-2 items-center">
            <h1>Arrival Details:</h1>
            <h1>${arrivalDetails}</h1>
          </div>
          <div class="flex gap-2 items-center">
            <h1>Departure Details:</h1>
            <h1>${departureDetails}</h1>
          </div>
        </div>
        <div class="flex flex-col justify-center text-sm">
          <div class="flex gap-2 items-center">
            <h1>Tour id:</h1>
            <h1>${tourId}</h1>
          </div>
          <div class="flex gap-2 items-center">
            <h1>Travel Date:</h1>
            <h1>${travelDate}</h1>
          </div>
          <div class="flex gap-2 items-center">
            <h1>Duration:</h1> 
            <h1>${numofdays}Days /${numofnights} Nights</h1>
          </div>
          <div class="flex gap-2 items-center">
            <h1>No of Pax:</h1>
            <h1> ${numberOfPax}</h1>
          </div>
        </div>
      </div>
      <hr class="w-full mt-5 border border-1" />
      <div class="mt-3 w-full px-5 flex flex-col gap-3">
        <div class="flex flex-col gap-3">
          <h1 class="text-3xl font-semibold"> ${packagename}</h1>
          <h1 class="text-sm">
          ${packagedescription}
          </h1>
        </div>
        <div class="flex flex-col gap-3">
          <h1 class="text-2xl">Tour Highlights</h1>
          <div class="">
            <ul class="list-disc px-4">
            ${getPrintableContent()}
            </ul>
          </div>
        </div>

        <div class="flex flex-col gap-3">
        <h1 class="text-2xl ">${headingInput}</h1>
        <h1 class="text-sm">
          ${anytextdescription}
        </h1>
      </div>


        <div>
        <div class="flex flex-col gap-5">
           

           <div>
           ${
             obj &&
             obj
               .map((items, index) => {
                 return `
                   <div  key=${index}>
                   ${items.duration
                     .map((data, index) => {
                       return `
                       <div>
                       <div class="flex flex-col gap-10">
                         <div class="flex flex-col gap-2">
                           <div
                             class="w-full py-2 bg-orange-400 text-black px-2 flex items-center justify-between rounded-lg" >
                             <h1 class="text-xl font-semibold">Day${items.duration[index]}</h1>
                             <h1 class="text-lg"> ${formatDate(items.date[index])}</h1>
                           </div>
                         </div>
                         <div class="flex flex-col items-start gap-3">
                           <div class="w-2/3 h-60 bg-black rounded-2xl">
                             <img
                               class="w-full h-full object-cover rounded-2xl"
                               src="${items.img[index]}"
                               alt=""
                             />
                           </div>
                           <div class="flex flex-col gap-3 w-full justify-center">
                             <h1 class="font-semibold">
                               ${items.head[index]}
                             </h1>
                             <h1>
                               ${items.desc[index]}
                             </h1>
                           </div>
                         </div>
                         <div class="flex flex-col gap-1">
                           <h1 class="text-xl font-semibold">Inclutions</h1>
                           <h1>
                             ${items.inclutions[index]}
                           </h1>
                         </div>
                       </div>
                     </div>
           
                       `;
                     })
                     .join("")}
                   </div>
                 `;
               })
               .join("")
           }
           </div>






            
 
 
          </div>
          <div
            class="w-full px-5 mt-3 py-2 border border-1 border-black rounded-lg"
          >
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
              <table class=" ">
                <tr class="border border-1 border-black">
                  <th class="uppercase border border-1 border-black px-5">
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
                    no of rooms
                  </th>
                  <th class="uppercase border border-1 border-black px-5">
                    meal plan
                  </th>
                </tr>
                ${tableRows}
                
          
              
              </table>
            </div>
          </div>
          <div class="mt-5 px-5 flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <h1 class="text-xl font-semibold">Tour Inclusions</h1>
              <h1  ${personalNature}</h1>
                <h1> ${applicableTaxes}</h1>
                <h1>  ${transfersSightseeing}</h1>
                <h1>  ${driverAllowances}</h1>
                <h1> ${govtTaxes} </h1>
              ${tourInclusionsValues.map(value => `<h1>${value}</h1>`).join('')}
            </div>

            <div class="flex flex-col gap-1">
              <h1 class="text-xl font-semibold">Tour Exclusions</h1>
              <h1>Number of Pax: ${fieldone}</h1>
              <h1>Tour Highlights: ${fieldtwo}</h1>
              <h1p>Selected Day: ${fieldthree}</h1p>
              <h1p>Selected Night: ${fieldfour}</h1p>
              <h1>Package Name: ${fieldfive}</h1>
              ${tourExclusionsValues.map(value => `<h1>${value}</h1>`).join('')}
            </div>

            <div class="flex flex-col gap-1">
              <h1 class="text-xl font-semibold">Notes</h1>
              <h1> ${notess}</h1>
              ${notesValues.map(value => `<p>${value}</p>`).join('')}
            </div>
            <div class="flex flex-col gap-1">
              <h1 class="text-xl font-semibold">Cancellation policy</h1>
              ${cancellationNotesValues.map(value => `<h1>${value}</h1>`).join('')}
            </div> 
            <div class="flex flex-col">
            <h1>Tour Executive: ${amountExecutive}</h1>
            <h1>Contact No: ${tourcontact}</h1>
            <h1>Mail Id: ${tourmail}</h1>
          </div>
          <div
            class="w-full px-5 py-2 border border-1 border-black flex items-center rounded-lg"
          >
            <h1 class="text-sm">
              if you have any clarification or any extra requirements, please
              let us know we will update it
            </h1>
          </div>
        </div>
        <div class="mt-3 w-full h-12 bg-blue-500 px-5 flex items-center">
          <div class="flex flex-col text-white text-xs">
            <div class="flex gap-1 items-center">
              <img src="" alt="" />
              <h1>Info@trekkandtravel.com</h1>
            </div>
            <div class="flex gap-1 items-center">
              <img src="" alt="" />
              <h1>Address: Kattuppara, Bridge Junction, Chelakkad Po, Malappuram, Kerala , India- 679323</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

           
   
    `); 

    printWindow.document.close();
 
    // Print the page
    setTimeout(() => {
        printWindow.print();
    }, 500);
     
    
            }
    
 
 


 
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// function getPrintableContent(container) {
//   // Create a clone of the container to avoid modifying the original
//   const printableContainer = container.cloneNode(true);

//   // Replace input fields with their values and apply Tailwind CSS classes
//   const inputElements = printableContainer.querySelectorAll("input, textarea");
//   inputElements.forEach((input) => {
//     const value = input.value;
//     const textNode = document.createTextNode(value);
//     input.parentNode.replaceChild(textNode, input);
//     input.classList.add(
//       "w-full",
//       "p-2",
//       "border",
//       "border-gray-300",
//       "rounded"
//     );

//     // Add classes specifically for the Daynumber input field
//     if (input.id.startsWith("dayNumber")) {
//       input.classList.add("font-semibold", "text-lg", "bg-gray-100");
//     }
//   });

//   // Remove labels and unnecessary elements
//   const labelsToRemove = ["Description:", "Inclusions:", "Choose File:"];
//   labelsToRemove.forEach((label) => {
//     const labelElements = printableContainer.querySelectorAll("*");
//     labelElements.forEach((labelElement) => {
//       if (labelElement.textContent.trim() === label) {
//         labelElement.parentNode.removeChild(labelElement);
//       }
//     });
//   });

//   // Style images with Tailwind CSS classes
//   const imageElements = printableContainer.querySelectorAll("img");
//   imageElements.forEach((image) => {
//     image.classList.add("w-full", "h-full", "object-cover", "rounded-2xl");
//   });

//   return printableContainer.innerHTML;
// }





document.getElementById("addRowBtn").addEventListener("click", function () {
  var table = document.getElementById("originalTable").getElementsByTagName('tbody')[0];
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
 











 
