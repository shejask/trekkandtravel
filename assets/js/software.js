// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to your formData in the database
const formDataRef = ref(database, 'formData');

// Get the formData entries and update the HTML
onValue(formDataRef, (snapshot) => {
    const formData = snapshot.val();
    const formDataListElement = document.getElementById('formDataList');

    if (formDataListElement) {
        formDataListElement.innerHTML = '';

        for (const key in formData) {
            const listItem = document.createElement('li');
            const entry = formData[key];
            const confirmationNumber = entry ? entry.confirmationnumber : undefined;

            if (confirmationNumber !== undefined) {
                listItem.textContent = confirmationNumber;
                formDataListElement.appendChild(listItem);
            } else {
                console.log(`Confirmation number is undefined for entry with key: ${key}`);
                console.log(`Entry for key ${key}:`, entry);
            }
        }
    }

    const formDataTotal = formData ? Object.keys(formData).length : 0;
    document.getElementById('formdataTotal').textContent = formDataTotal;
});



// Reference to your TransportVoucher data in the database
 
// Reference to your TransportVoucher data in the database
const transportVoucherRef = ref(database, 'TransportVoucher');

// Get the TransportVoucher entries and update the HTML
onValue(transportVoucherRef, (snapshot) => {
    const transportVoucherData = snapshot.val();
    const transportVoucherListElement = document.getElementById('transportVoucherList'); // Adjust the ID as needed

    if (transportVoucherListElement) {
        transportVoucherListElement.innerHTML = '';

        for (const key in transportVoucherData) {
            const listItem = document.createElement('li');
            const entry = transportVoucherData[key];
            const confirmationNumber = entry ? entry.confirmationnumber : undefined;

            if (confirmationNumber !== undefined) {
                listItem.textContent = confirmationNumber;
                transportVoucherListElement.appendChild(listItem);
            } else {
                console.log(`Confirmation number is undefined for entry with key: ${key}`);
                console.log(`Entry for key ${key}:`, entry);
            }
        }
    }

    const transportVoucherTotal = transportVoucherData ? Object.keys(transportVoucherData).length : 0;
    document.getElementById('TransportVoucherTotal').textContent = transportVoucherTotal;
});

//////////////////////////////////////
//////////////////////////////////////
// Replace 'TransportVoucher' with 'itnery' in the database reference
const itneryRef = ref(database, 'itinerary');

// Get the itnery entries and update the HTML
onValue(itneryRef, (snapshot) => {
    const itneryData = snapshot.val();
    const itneryListElement = document.getElementById('itneryList'); // Adjust the ID as needed

    if (itneryListElement) {
        itneryListElement.innerHTML = '';

        for (const key in itneryData) {
            const listItem = document.createElement('li');
            const entry = itneryData[key];
            const confirmationNumber = entry ? entry.confirmationnumber : undefined;

            if (confirmationNumber !== undefined) {
                listItem.textContent = confirmationNumber;
                itneryListElement.appendChild(listItem);
            } else {
                console.log(`Confirmation number is undefined for entry with key: ${key}`);
                console.log(`Entry for key ${key}:`, entry);
            }
        }
    }

    const itneryTotal = itneryData ? Object.keys(itneryData).length : 0;
    document.getElementById('ItneryTotal').textContent = itneryTotal;
});

 
  // Get the current date
  var currentDate = new Date();

  // Define the month names
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Define the day names
  var dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  // Format the date as "Month DD Day"
  var formattedDate = monthNames[currentDate.getMonth()] + ' ' + currentDate.getDate() + ' ' + dayNames[currentDate.getDay()];

  // Set the formatted date as the content of the button
  document.getElementById('dateButton').innerText = formattedDate;









  //////////////////////////////////////////////////////////
  document.addEventListener("DOMContentLoaded", function () {
    // Array of image URLs
    const imageUrls = [
        '/assets/imgs/Wallpaperswebp/21.webp',
        '/assets/imgs/Wallpaperswebp/1.webp',
        '/assets/imgs/Wallpaperswebp/2.webp',
        '/assets/imgs/Wallpaperswebp/3.webp',
        '/assets/imgs/Wallpaperswebp/4.webp',
        '/assets/imgs/Wallpaperswebp/5.webp',
        '/assets/imgs/Wallpaperswebp/6.webp',
        '/assets/imgs/Wallpaperswebp/7.webp',
        '/assets/imgs/Wallpaperswebp/8.webp',
        '/assets/imgs/Wallpaperswebp/9.webp',
        '/assets/imgs/Wallpaperswebp/10.webp',
        '/assets/imgs/Wallpaperswebp/11.webp',
        '/assets/imgs/Wallpaperswebp/12.webp',
        '/assets/imgs/Wallpaperswebp/13.webp',
        '/assets/imgs/Wallpaperswebp/14.webp',
        '/assets/imgs/Wallpaperswebp/15.webp',
        '/assets/imgs/Wallpaperswebp/16.webp',
        '/assets/imgs/Wallpaperswebp/17.webp',
        '/assets/imgs/Wallpaperswebp/18.webp',
        '/assets/imgs/Wallpaperswebp/19.webp',
        '/assets/imgs/Wallpaperswebp/20.webp',
        
        '/assets/imgs/Wallpaperswebp/22.webp',
        '/assets/imgs/Wallpaperswebp/23.webp',
        '/assets/imgs/Wallpaperswebp/24.webp',
        '/assets/imgs/Wallpaperswebp/25.webp',
        '/assets/imgs/Wallpaperswebp/26.webp',
        '/assets/imgs/Wallpaperswebp/27.webp',
        '/assets/imgs/Wallpaperswebp/28.webp',
        '/assets/imgs/Wallpaperswebp/29.webp',
        '/assets/imgs/Wallpaperswebp/30.webp',
         
        
     
        // Add more image URLs as needed
    ];

    // Function to change the background image
    function changeBackground() {
        const wallpaperContainer = document.getElementById("wallpaperContainer");
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        wallpaperContainer.style.backgroundImage = `url('${imageUrls[randomIndex]}')`;
    }

    // Initial background change
    changeBackground();

    // Change background every 5 minutes (300,000 milliseconds)
    setInterval(changeBackground, 3600000);
});


document.addEventListener("DOMContentLoaded", function () {
    // Array of quotes
    const quotes = [
        "The journey not only teaches us to explore the world but also discover ourselves.",
        "Adventure awaits where the path ends and the unknown begins.",
        "Travel far enough, you meet yourself.",
        "Wander often, wonder always.",
        "Travel is the only thing you can buy that makes you richer.",
        "Explore the world with an open heart and open mind.",
        "The world is a book, and those who do not travel read only one page.",
        "Adventure is worthwhile in itself.",
        "Travel far, collect moments, not things.",
        "To travel is to live.",
        "The best stories are found between the pages of a passport.",
        "Traveling – it leaves you speechless, then turns you into a storyteller.",
        "Life is short, and the world is wide.",
        "To awaken alone in a strange town is one of the pleasantest sensations in the world.",
        "Travel is the antidote to ignorance.",
        "Adventure is calling, and I must go.",
        "Fill your life with adventures, not things. Have stories to tell, not stuff to show.",
        "Wherever you go, go with all your heart.",
        "To travel is to take a journey into yourself.",
        "Adventure awaits those with the courage to explore.",
        "Travel makes one modest. You see what a tiny place you occupy in the world.",
        "Live your life by a compass, not a clock.",
        "The biggest adventure you can take is to live the life of your dreams.",
        "Let's find some beautiful place to get lost.",
        "Traveling – it leaves you speechless, then turns you into a storyteller.",
        "Life is short, and the world is wide.",
        "To awaken alone in a strange town is one of the pleasantest sensations in the world.",
        "Travel far and wide, but always return to the place where your heart belongs.",
        "Travel is never a matter of money but of courage.",
        "The journey itself is my home.",
        "Every exit is an entry somewhere else.",
        "Adventure is not outside; it is within.",
        "Don't listen to what they say. Go see.",
        "Travel far enough to meet yourself.",
        "Travel is my therapy.",
        "Travel is more than the seeing of sights; it is a change that goes on, deep and permanent, in the ideas of living.",
        "Travel opens your heart, broadens your mind, and fills your life with stories to tell.",
        "Adventure is a state of mind and spirit.",
        "Travel far, travel often, and travel without regrets.",
        "Travel is an investment in yourself.",
        "A journey is best measured in friends, rather than miles.",
        "To travel is to discover that everyone is wrong about other countries.",
        "Travel far, travel wide, travel boldly.",
        "Let's find some beautiful place to get lost together.",
        "Travel is the only thing you can buy that makes you richer.",
        "Travel far and travel often.",
        "Jobs fill your pocket, but adventures fill your soul.",
        "Travel is my love language.",
        "I don't know where I'm going, but I'm on my way.",
        "Let's find some beautiful place to get lost together.",
        "Travel is the only thing you can spend money on that makes you richer.",
        "Travel makes one modest, you see what a tiny place you occupy in the world.",
        "Travel far, travel wide, and travel boldly.",
        "Travel far enough to meet yourself.",
        "Adventure awaits.",
        "Traveling – it leaves you speechless, then turns you into a storyteller.",
        "Wherever you go, go with all your heart.",
        "Wander often, wonder always.",
        "To travel is to live.",
        "Life is short, and the world is wide.",
        "Let's find some beautiful place to get lost together.",
        "Travel is the only thing you can buy that makes you richer.",
        "Adventure awaits where the path ends and the unknown begins.",
        "Fill your life with adventures, not things. Have stories to tell, not stuff to show.",
        "The journey not only teaches us to explore the world but also discover ourselves.",
        "Adventure is worthwhile in itself.",
        "To travel is to take a journey into yourself.",
        "Travel far enough, you meet yourself.",
        "The world is a book, and those who do not travel read only one page.",
        "Travel far, collect moments, not things.",
        "To awaken alone in a strange town is one of the pleasantest sensations in the world.",
        "Travel is the antidote to ignorance.",
        "Adventure is calling, and I must go.",
        "Every exit is an entry somewhere else.",
        "Travel is an investment in yourself.",
        "A journey is best measured in friends, rather than miles.",
        "Life is short, and the world is wide.",
        "Adventure is not outside; it is within.",
        "Don't listen to what they say. Go see.",
        "Travel far enough to meet yourself.",
        "Travel is my therapy.",
        "Travel is more than the seeing of sights; it is a change that goes on, deep and permanent, in the ideas of living.",
        "Travel opens your heart, broadens your mind, and fills your life with stories to tell.",
        "Adventure is a state of mind and spirit.",
        "Travel far, travel often, and travel without regrets.",
        "Travel is an investment in yourself.",
        "A journey is best measured in friends, rather than miles.",
        "To travel is to discover that everyone is wrong about other countries.",
        "Travel far, travel wide, travel boldly.",
        "Let's find some beautiful place to get lost together.",
        "Travel is the only thing you can buy that makes you richer.",
        "Travel far and travel often.",
        "Jobs fill your pocket, but adventures fill your soul.",
        "Travel is my love language.",
        "I don't know where I'm going, but I'm on my way.",
        "Let's find some beautiful place to get lost together.",
        "Travel is the only thing you can spend money on that makes you richer.",
        "Travel makes one modest, you see what a tiny place you occupy in the world.",
        "Travel far, travel wide, and travel boldly.",
        "Travel far enough to meet yourself.",
        "Adventure awaits."
    ];

    // Function to change the quote
    function changeQuote() {
        const quoteElement = document.getElementById("quoteElement");
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.innerHTML = quotes[randomIndex];
    }

    // Initial quote change
    changeQuote();

    // Change background every one hour (3,600,000 milliseconds)
    setInterval(changeQuote, 3600000 );
});
