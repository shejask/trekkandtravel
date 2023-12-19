// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, query, get, onValue, orderByKey } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

 

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
 
 

const tourIdInput = document.getElementById('tourId');
const allTourIdDiv = document.getElementById('alltourid');
const traveldateInput = document.getElementById('traveldate'); // Define traveldateInput

tourIdInput.addEventListener('input', async function () {
    const searchText = tourIdInput.value.trim();

    // Clear previous results
    allTourIdDiv.innerHTML = '';

    if (searchText !== '') {
        // Query the database for matching tour IDs
        const tourIdsQuery = query(ref(database, 'itinerary'), orderByKey());

        // Get the data from the query
        const snapshot = await get(tourIdsQuery);

        // Iterate over the results and display them
        if (snapshot.exists()) {
            snapshot.forEach((uniqueIdSnapshot) => {
                const tourIdValue = uniqueIdSnapshot.child('tourId').val();

                // Check if the tour ID matches the search text
                if (tourIdValue && tourIdValue.includes(searchText)) {
                    const tourIdElement = document.createElement('div');
                    tourIdElement.textContent = tourIdValue;
                    allTourIdDiv.appendChild(tourIdElement);
                }
            });
        } else {
            allTourIdDiv.textContent = 'No matching tour IDs found.';
        }
    }
});

 





allTourIdDiv.addEventListener('click', async function (event) {
  const selectedTourId = event.target.textContent;
  tourIdInput.value = selectedTourId;

  const queryRef = query(ref(database, 'itinerary'), orderByKey());
  const snapshot = await get(queryRef);

  if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
          const { tourId, travelDate, guestName, guestNumber, arrivalDetails, departureDetails, numberOfPax, packagename,amountdetails,anytextdescription,applicabletaxes,customersupport,
            driverallowances,duration,fieldfive,fieldfour,fieldone,fieldthree,fieldtwo,govttaxes, night,notesinput,personalnature,tourcontact,tourexecutive,tourmail,
            transferssightseeing,heading,description,cancellationNotes,notes,tourexclusions
          } = childSnapshot.val();

          if (tourId === selectedTourId) {
              traveldateInput.value = travelDate || '';
              document.getElementById('guestName').value = guestName || '';
              document.getElementById('guestNumber').value = guestNumber || '';
              document.getElementById('arrival-details').value = arrivalDetails || '';
              document.getElementById('departure-details').value = departureDetails || '';
              document.getElementById('number-of-pax').value = numberOfPax || '';
              document.getElementById('packageNamee').value = packagename || '';
              document.getElementById('anytext-description').value = anytextdescription || '';
              document.getElementById('headingg').value = heading || '';            
              document.getElementById('descriptionn').value = description || '';
              document.getElementById('duration').value = duration  || '';
              document.getElementById('night').value = night  || '';
              document.getElementById('amount-details').value = amountdetails  || '';
              document.getElementById('personal-nature').value = personalnature  || '';
              document.getElementById('applicable-taxes').value = applicabletaxes  || '';
              document.getElementById('transfers-sightseeing').value = transferssightseeing  || '';
              document.getElementById('driver-allowances').value =  driverallowances  || '';
              document.getElementById('govt-taxes').value = govttaxes  || '';
              document.getElementById('customer-support').value = customersupport  || '';
              document.getElementById('field-one').value =  fieldone  || '';
              document.getElementById('field-two').value = fieldtwo  || '';
              document.getElementById('field-three').value = fieldthree  || '';
              document.getElementById('field-four').value = fieldfour  || '';
              document.getElementById('field-five').value = fieldfive  || '';
              document.getElementById('notes').value = notesinput  || '';
              document.getElementById('tour-executive').value = tourexecutive  || '';
              document.getElementById('tour-contact').value = tourcontact  || '';
              document.getElementById('tour-mail').value = tourmail  || '';






     // Display cancellationNotes in a text field
    const cancellationNotesText = cancellationNotes ? cancellationNotes.join('\n') : '';
    document.getElementById('cancellation-notes').value = cancellationNotesText;

    // Display cancellationNotes in a div
    const cancellationNotesInput = document.getElementById('cancellation-notes-input');
    cancellationNotesInput.value = cancellationNotesText;

    // Create a div for each cancellation note in the container
    const cancellationNotesContainer = document.getElementById('cancellation-notes-container');
    cancellationNotesContainer.innerHTML = '';

    

 

  







              allTourIdDiv.style.display = 'none';
          }
      });
  } else {
      console.warn('Selected tour ID not found in the database.');
  }
});





 