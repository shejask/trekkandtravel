  
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref as databaseRef, push, set, get, query, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { ref } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
 

 
// Initialize Firebase
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
const guestsRef = ref(database, 'guests');



const tourHighlightsRef = databaseRef(getDatabase(), `tourHighlights`);

document.getElementById('savedata').addEventListener('click', function () {
    submitForm();
});



async function submitForm() {
    
 
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
    // Get the table body
    const tableBody = document.getElementById("originalTable").getElementsByTagName("tbody")[0];

    // Create a new row
    const newRow = tableBody.insertRow(-1);

    // Define the number of columns
    const numCols = 7;

    // Add cells to the new row
    for (let i = 0; i < numCols; i++) {
        const cell = newRow.insertCell(i);

        // For the first two cells, use input type date
        if (i < 2) {
            cell.innerHTML = `<input type="date" class="w-full p-2 border rounded-md">`;
        } else {
            cell.innerHTML = `<input type="text" class="w-full p-2 border rounded-md">`;
        }
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
////////
/////////////////
////////////////
/////////////////
////////////////


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
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const packagesRef = ref(database, 'itnery');

// Access the form element
const packageForm = document.getElementById("package-form");
const packageNameInput = document.getElementById("package-name");
const packageDescriptionInput = document.getElementById("package-description");
const chooseDaysInput = document.getElementById("choose-days");
const packageListDiv = document.getElementById("packagelist");


const travelDateInput = document.getElementById("travelDate");
const arrivaldetails = document.getElementById("arrival-details");
const departuredetails = document.getElementById("departure-details");
const numberofpax = document.getElementById("number-of-pax");
const durationInput = document.getElementById("duration");

// night

 
// Function to get the value of an HTML element by its ID
const getElementValue = (elementId) => {
    const element = document.getElementById(elementId);
    return element ? element.value : "";
};

// ... (Other parts of your code)

// Add an event listener for the form submission
packageForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const packageName = packageNameInput.value.trim();
    const packageDescription = packageDescriptionInput.value.trim();
    const chooseDays = chooseDaysInput.value;

    const travelDateInputval = travelDateInput.value;  
    const arrivaldetailsval    = arrivaldetails.value;  
    const  departuredetailsval   = departuredetails.value;   
    const numberofpaxval    = numberofpax.value;    
    const  durationInputval   = durationInput.value;  
    
     
 
    const packageData = {
        packageName: packageName,
        packageDescription: packageDescription,
        chooseDays: chooseDays,

        travelDateInputval: travelDateInputval,
        arrivaldetailsval: arrivaldetailsval,
        departuredetailsval: departuredetailsval,
        numberofpaxval: numberofpaxval,
        durationInputval:durationInputval,
        

         
        packageDetails: [] // Array to store details for each day
    };
 

    // Loop through each day and collect details
    for (let i = 1; i <= parseInt(chooseDays); i++) {
        const dayDetails = {
            dayNumber: getElementValue(`day-number${i}`),
            date: getElementValue(`date${i}`),
            heading: getElementValue(`heading${i}`),
            paragraph: getElementValue(`paragraph${i}`),
            inclusions: getElementValue(`inclusions${i}`),
            file: await uploadFile(`file${i}`, `files/${packageName}/day${i}`) // Upload file and get download URL
        };

        packageData.packageDetails.push(dayDetails);
    }

    // Get a reference to the 'itnery' node in the database
    const itneryRef = ref(database, 'itnery');

    // Push the packageData object to the 'itnery' node
    push(itneryRef, packageData)
        .then(() => {
            console.log("Package Data saved successfully");
            alert("Itinerary saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving packageData:", error);
            alert("Error saving Package Data. Please try again.");
        });
});

// Function to upload file to Firebase Storage and get download URL
async function uploadFile(fileInputId, storagePath) {
    const fileInput = document.getElementById(fileInputId);
    const file = fileInput.files[0];

    if (file) {
        const storageRefPath = storageRef(storage, storagePath);
        await uploadBytes(storageRefPath, file);
        const downloadURL = await getDownloadURL(storageRefPath);

        return downloadURL;
    }

    return null;
}

// Add an event listener for the input event on the package-name input field
packageNameInput.addEventListener("input", function () {
    const searchTerm = packageNameInput.value.trim().toLowerCase();

    // Fetch and display relevant package names from the Firebase Realtime Database
    onValue(packagesRef, (snapshot) => {
        const packageNames = [];

        snapshot.forEach((childSnapshot) => {
            const packageName = childSnapshot.val()?.packageName;

            if (packageName && packageName.toLowerCase().includes(searchTerm)) {
                packageNames.push(packageName);
            }
        });

        packageListDiv.innerHTML = packageNames.map(name => `<div>${name}</div>`).join('');
        packageListDiv.style.display = packageNames.length > 0 ? "block" : "none";
    });
});

document.addEventListener("click", function (event) {
    const isClickInside = packageListDiv.contains(event.target) || packageNameInput.contains(event.target);

    if (!isClickInside) {
        packageListDiv.style.display = "none";
    }
});

document.addEventListener("click", function (event) {
    const isClickInsideList = packageListDiv.contains(event.target);

    if (isClickInsideList) {
        const clickedDiv = event.target.closest('div');

        if (clickedDiv) {
            packageNameInput.value = clickedDiv.textContent.trim();
            // fetchPackageDescription(clickedDiv.textContent.trim());
        }
    } else {
        packageListDiv.style.display = "none";
    }
});

document.getElementById("choose-days").addEventListener("change", showPackageDetails);

function showPackageDetails() {
    var selectedValue = document.getElementById("choose-days").value;
    var packageDetailsContainer = document.getElementById("package-details-container");
    console.log('showPackageDetails called');
    packageDetailsContainer.innerHTML = '';

    if (selectedValue !== "0") {
        for (var i = 1; i <= parseInt(selectedValue); i++) {
            var packageDetailsDiv = document.createElement("div");
            packageDetailsDiv.id = "package-details";

            const getElementValue = (elementId) => {
                const element = document.getElementById(elementId);
                return element ? element.value : "";
            };

            packageDetailsDiv.innerHTML = `
                <label for="day-number${i}" class="block text-sm font-medium text-gray-600">Day Number</label>
                <input type="text" id="day-number${i}" name="day-number${i}"
                    value="Day ${i}" 
                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 mb-2">

                <label for="date${i}" class="block text-sm font-medium text-gray-600">Date</label>
                <input type="text" id="date${i}" name="date${i}"
                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 mb-2"
                    value="${getElementValue(`date${i}`)}">

                <label for="heading${i}" class="block text-sm font-medium text-gray-600">Heading</label>
                <input type="text" id="heading${i}" name="heading${i}"
                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 mb-2"
                    value="${getElementValue(`heading${i}`)}">

                <label for="paragraph${i}" class="block text-sm font-medium text-gray-600">Paragraph</label>
                <textarea id="paragraph${i}" name="paragraph${i}"
                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 mb-2">${getElementValue(`paragraph${i}`)}</textarea>

                <label for="inclusions${i}" class="block text-sm font-medium text-gray-600">Inclusions</label>
                <textarea id="inclusions${i}" name="inclusions${i}"
                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 mb-2">${getElementValue(`inclusions${i}`)}</textarea>

                <label for="file${i}" class="block text-sm font-medium text-gray-600">Choose File</label>
                <input type="file" id="file${i}" name="file${i}"
                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 mb-4">
            `;

            packageDetailsContainer.appendChild(packageDetailsDiv);
        }

        packageDetailsContainer.style.display = "block";
    } else {
        packageDetailsContainer.style.display = "none";
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 


// Replace this function name with the correct one used in your code
document.addEventListener("click", function (event) {
    const isClickInsideList = packageListDiv.contains(event.target);

    if (isClickInsideList) {
        const clickedDiv = event.target.closest('div');

        if (clickedDiv) {
            // Update the input field with the selected package name
            packageNameInput.value = clickedDiv.textContent.trim();

            // Fetch the package description from the database based on the selected package name
            fetchAndDisplayPackageDetails(clickedDiv.textContent.trim());  // Adjust the function name here
        }
    } else {
        // Clicked outside the packagelist div, hide it
        packageListDiv.style.display = "none";
    }
});

 

// Declare packagesRef outside of the function to avoid redeclaration
 

// Add an event listener to the existing print button
 
// Function to fetch and display package details
function fetchAndDisplayPackageDetails(packageName) {
    const packageDetailsContainer = document.getElementById("package-details-container");

    // Clear existing content
    packageDetailsContainer.innerHTML = '';

    // Fetch the data from the 'itnery' node
    onValue(packagesRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const packageData = childSnapshot.val();

            // Check if the packageName matches the selected package name
            if (packageData.packageName === packageName) {
                // Generate and append packageDetailsDiv based on the packageData
                if (packageData.packageDetails) {
                    for (let i = 0; i < packageData.packageDetails.length; i++) {
                        const packageDetailsDiv = document.createElement("div");
                        packageDetailsDiv.id = "package-details";

                        // Customize the content based on your packageData properties
                        const dayNumber = packageData.packageDetails[i].dayNumber || `Day ${i + 1}`;
                        const date = packageData.packageDetails[i].date || '';
                        const heading = packageData.packageDetails[i].heading || '';
                        const paragraph = packageData.packageDetails[i].paragraph || '';
                        const inclusions = packageData.packageDetails[i].inclusions || '';
                        const file = packageData.packageDetails[i].file || '';

                        // Append the packageDetailsDiv to the container
                        packageDetailsDiv.innerHTML = `
                            <label class="mt-5" for="day-number-input-${i}">Day Number:</label>
                            <input class="mt-1 mt-5 p-2   w-full border  border-black rounded-md focus:outline-none focus:border-blue-500 mb-2" type="text" id="day-number-input-${i}" value="${dayNumber}" readonly>

                            <label for="date-input-${i}">Date:</label>
                            <input class="w-full p-2 border rounded border border-black" type="text" id="date-input-${i}" value="${date}"  >

                            <label for="heading-input-${i}">Heading:</label>
                            <input class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 border-black  mb-2" type="text" id="heading-input-${i}" value="${heading}"  >

                            <label for="paragraph-input-${i}">Paragraph:</label>
                            <textarea class="mt-1 p-2 w-full border rounded-md border-black  focus:outline-none focus:border-blue-500 mb-2" id="paragraph-input-${i}"  >${paragraph}</textarea>

                            <label for="inclusions-input-${i}">Inclusions:</label>
                            <textarea class="mt-1 p-2 w-full border rounded-md border-black  focus:outline-none focus:border-blue-500 mb-2" id="inclusions-input-${i}"  >${inclusions}</textarea>

                            <label for="file-input-${i}">Image:</label>
                            <p id="file-input-${i}"><img src="${file}" class="w-96 h-96 border-black" alt="Image" style="max-width: 100%;"></p>
                            <!-- You can add more fields here -->
                            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

                        `;

                        packageDetailsContainer.appendChild(packageDetailsDiv);
                    }
                }
            }
        });
    });
}



////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
function fetchPackageDescriptionAndChooseDays(packageName) {
    const packagesRef = ref(database, 'itnery');

    // Fetch the data from the 'itnery' node
    onValue(packagesRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const packageData = childSnapshot.val();

            // Check if the packageName matches the selected package name
            if (packageData.packageName === packageName) {
                // Fetch and set the description
                const packageDescription = packageData.packageDescription || '';
                document.getElementById('package-description').value = packageDescription;

                // Fetch and set the chooseDays
                const chooseDays = packageData.chooseDays || '0'; // Default to '0' if not present
                document.getElementById('choose-days').value = chooseDays;
            }
        });
    });
}// Update your existing code that handles package name selection
document.addEventListener("click", function (event) {
    const isClickInsideList = packageListDiv.contains(event.target);

    if (isClickInsideList) {
        const clickedDiv = event.target.closest('div');

        if (clickedDiv) {
            // Update the input field with the selected package name
            packageNameInput.value = clickedDiv.textContent.trim();

            // Fetch the package description and chooseDays from the database based on the selected package name
            fetchPackageDescriptionAndChooseDays(clickedDiv.textContent.trim());
            
            // Fetch and display the package details based on the selected package name
            // fetchAndDisplayPackageDetails(clickedDiv.textContent.trim());
        }
    } else {
        // Clicked outside the packagelist div, hide it
        packageListDiv.style.display = "none";
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generatePrintContent(packageData) {
    let printContent = '';

    if (packageData.packageDetails) {
        for (let i = 0; i < packageData.packageDetails.length; i++) {
            // Customize the content based on your packageData properties
            const dayNumber = packageData.packageDetails[i].dayNumber || `Day ${i + 1}`;
            const date = packageData.packageDetails[i].date || '';
            const heading = packageData.packageDetails[i].heading || '';
            const paragraph = packageData.packageDetails[i].paragraph || '';
            const inclusions = packageData.packageDetails[i].inclusions || '';
            const file = packageData.packageDetails[i].file || '';

            // Append the simplified HTML to the printContent
            printContent += `
              
                <div id="dayContainer" >
           <div class="flex flex-col gap-3">
               <div class="flex flex-col gap-2">
                   <div class="w-full py-2 bg-orange-400 text-black px-2 flex items-center rounded-lg">
                       <h1 class="text-xl font-semibold">  ${dayNumber}</h1>
                       <h1 class="text-xl pl-1/2 font-semibold">${date}</h1>
                   </div>
                   <div class="flex items-center gap-10">
                     
                       <img src="${file}" class="w-2/3 h-60 rounded-2xl" alt="Image" style="max-width: 100%;">
                        
                       <div class="flex flex-col gap-3 w-2/3 justify-center">
                           <h1>${heading}</h1>
                           <h1>${paragraph}</h1>
                       </div>
                   </div>
                   <div class="flex flex-col gap-1">
                       <h1 class="text-xl font-semibold">Inclusions</h1>
                       <h1>${inclusions}</h1>
                   </div>
               </div>
           </div>
       </div> 
            `;
        }
    }

    return printContent;
}
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////PRINT FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add an event listener to the "print" button
document.getElementById('printButton').addEventListener('click', function () {
    printForm();
});

// Function to print the form
function printForm() {
  

    

  
    // Get values from form elements
    const tourId = document.getElementById('tourId').value;
    const travelDate = document.getElementById('travelDate').value;
    
    const arrivalDetails = document.getElementById('arrival-details').value;
    const departureDetails = document.getElementById('departure-details').value;
    const numberOfPax = document.getElementById('number-of-pax').value;


    const guestname = document.getElementById('guestName').value;
    const guestnumber = document.getElementById('guestNumber').value;

    const packagename = document.getElementById('package-name').value;
    const packagedescription = document.getElementById('package-description').value;
  
  
    const amount = document.getElementById('amount-details').value;
    const amountExecutive = document.getElementById('amount-executive').value;
    const tourcontact = document.getElementById('tour-contact').value;
    const tourmail = document.getElementById('tour-mail').value;
    const duration = document.getElementById('duration').value;
 
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
 
// Get the value from the tour highlights input field
const tourHighlightsInput = document.getElementById('tour-highlights').value.trim();

// Split the input into an array of highlights
const tourHighlightsArray = tourHighlightsInput.split('\n').map(item => item.trim());

// Map the tour highlights into a list on the print page
const tourHighlightsList = tourHighlightsArray.map(highlight => `<li>${highlight}</li>`).join('');
 
const tourHighlightsContainer = document.getElementById('tour-highlights-container');
const tourHighlightsContainerValues = Array.from(tourHighlightsContainer.getElementsByTagName('input'))
  .map(input => input.value.trim())
  .filter(value => value !== '');

// Map the tour highlights container values into a list on the print page
const tourHighlightsContainerList = tourHighlightsContainerValues.map(highlight => `<li>${highlight}</li>`).join('');
 
    // Create a new window for printing
    const printWindow = window.open('', '_blank');


    ///////////////////////////////////////////////
    /////////////////////////////////////////////
    /////////////////////////////////////////////// 
    const selectedPackageName = document.getElementById("package-name").value;
     
    onValue(packagesRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const packageData = childSnapshot.val();
    
            // Check if the packageName matches the selected package name
            if (packageData.packageName === selectedPackageName) {
                // Generate simplified HTML content for printing
                const printContent = generatePrintContent(packageData);
    
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
            <h1>${duration}</h1>
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
            ${tourHighlightsList}
            ${tourHighlightsContainerList}
            </ul>
          </div>
        </div>
        <div>
          <div class="flex flex-col gap-5">

 
${printContent}      
 
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
              <h1>yourname @gmail.com,www.yourwebsite.com</h1>
            </div>
            <div class="flex gap-1 items-center">
              <img src="" alt="" />
              <h1>Street address here, city name zipcode</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

           
   
    `); 

 
            }
        });
    });

// Close the document stream
printWindow.document.close();
 
// Print the page
setTimeout(() => {
    printWindow.print();
}, 500);
}
   

 


 