// const quotes = [
//   { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
//   { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
//   { text: "Life is what happens when you're busy making other plans.", category: "Life" }
// ];

// function showRandomQuote() {
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const quote = quotes[randomIndex];
//   const quoteDisplay = document.getElementById("quoteDisplay");
//   quoteDisplay.innerHTML = `<p>"${quote.text}" — ${quote.category}</p>`;
// }

// function addQuote() {
//   const quoteText = document.getElementById("newQuoteText").value.trim();
//   const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

//   if (quoteText && quoteCategory) {
//     quotes.push({ text: quoteText, category: quoteCategory });
//     document.getElementById("newQuoteText").value = "";
//     document.getElementById("newQuoteCategory").value = "";
//   }
// }

// function createAddQuoteForm() {
//   const formContainer = document.getElementById("quoteFormContainer");

//   const inputQuote = document.createElement("input");
//   inputQuote.id = "newQuoteText";
//   inputQuote.type = "text";
//   inputQuote.placeholder = "Enter a new quote";

//   const inputCategory = document.createElement("input");
//   inputCategory.id = "newQuoteCategory";
//   inputCategory.type = "text";
//   inputCategory.placeholder = "Enter quote category";

//   const addButton = document.createElement("button");
//   addButton.id = "addQuoteBtn";
//   addButton.textContent = "Add Quote";
//   addButton.addEventListener("click", addQuote);

//   formContainer.appendChild(inputQuote);
//   formContainer.appendChild(inputCategory);
//   formContainer.appendChild(addButton);
// }

// document.getElementById("newQuote").addEventListener("click", showRandomQuote);
// createAddQuoteForm();



// let quotes = [];

// Load quotes from local storage or default
// function loadQuotes() {
//   const storedQuotes = localStorage.getItem("quotes");
//   if (storedQuotes) {
//     quotes = JSON.parse(storedQuotes);
//   } else {
//     quotes = [
//       { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
//       { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
//       { text: "Life is what happens when you're busy making other plans.", category: "Life" }
//     ];
//     saveQuotes();
//   }
// }

// Save quotes to local storage
// function saveQuotes() {
//   localStorage.setItem("quotes", JSON.stringify(quotes));
// }

// function showRandomQuote() {
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const quote = quotes[randomIndex];
//   const quoteDisplay = document.getElementById("quoteDisplay");
//   quoteDisplay.innerHTML = `<p>"${quote.text}" — ${quote.category}</p>`;

  // Store last viewed quote using session storage (optional)
//   sessionStorage.setItem("lastQuote", JSON.stringify(quote));
// }

// function addQuote() {
//   const quoteText = document.getElementById("newQuoteText").value.trim();
//   const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

//   if (quoteText && quoteCategory) {
//     quotes.push({ text: quoteText, category: quoteCategory });
//     saveQuotes();
//     document.getElementById("newQuoteText").value = "";
//     document.getElementById("newQuoteCategory").value = "";
//   }
// }

// function createAddQuoteForm() {
//   const formContainer = document.getElementById("quoteFormContainer");

//   const inputQuote = document.createElement("input");
//   inputQuote.id = "newQuoteText";
//   inputQuote.type = "text";
//   inputQuote.placeholder = "Enter a new quote";

//   const inputCategory = document.createElement("input");
//   inputCategory.id = "newQuoteCategory";
//   inputCategory.type = "text";
//   inputCategory.placeholder = "Enter quote category";

//   const addButton = document.createElement("button");
//   addButton.id = "addQuoteBtn";
//   addButton.textContent = "Add Quote";
//   addButton.addEventListener("click", addQuote);

//   formContainer.appendChild(inputQuote);
//   formContainer.appendChild(inputCategory);
//   formContainer.appendChild(addButton);
// }

// Export quotes to JSON file
// function exportToJsonFile() {
//   const dataStr = JSON.stringify(quotes, null, 2);
//   const blob = new Blob([dataStr], { type: "application/json" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "quotes.json";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }

// Import quotes from uploaded JSON file
// function importFromJsonFile(event) {
//   const fileReader = new FileReader();
//   fileReader.onload = function(event) {
//     const importedQuotes = JSON.parse(event.target.result);
//     quotes.push(...importedQuotes);
//     saveQuotes();
//     alert("Quotes imported successfully!");
//   };
//   fileReader.readAsText(event.target.files[0]);
// }

// Init
// document.getElementById("newQuote").addEventListener("click", showRandomQuote);
// document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);

// loadQuotes();
// createAddQuoteForm();


let quotes = [];

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" }
    ];
    saveQuotes();
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes found for this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<p>"${quote.text}" — ${quote.category}</p>`;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
    populateCategories(); // Update dropdown with new category
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
}

function createAddQuoteForm() {
  const formContainer = document.getElementById("quoteFormContainer");

  const inputQuote = document.createElement("input");
  inputQuote.id = "newQuoteText";
  inputQuote.type = "text";
  inputQuote.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.id = "newQuoteCategory";
  inputCategory.type = "text";
  inputCategory.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.id = "addQuoteBtn";
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(inputQuote);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);
}

// Step 2: Populate unique categories
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selected = localStorage.getItem("selectedCategory") || "all";

  const categories = Array.from(new Set(quotes.map(q => q.category)));
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    if (category === selected) {
      option.selected = true;
    }
    categoryFilter.appendChild(option);
  });

  localStorage.setItem("selectedCategory", selected);
}

// Step 2: Filtering logic
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);

  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  if (filtered.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes found for this category.</p>";
    return;
  }

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";
  filtered.forEach(q => {
    const p = document.createElement("p");
    p.textContent = `"${q.text}" — ${q.category}`;
    quoteDisplay.appendChild(p);
  });
}

// Export quotes to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories(); // update dropdown
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}


// Simulate fetching quotes from "server"
async function fetchQuotesFromServer() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
  const data = await response.json();
  return data.map(post => ({
    text: post.title,
    category: "Server"
  }));
}



async function syncWithServer() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    const existingTexts = quotes.map(q => q.text);

    let newQuotesAdded = false;

    serverQuotes.forEach(serverQuote => {
      if (!existingTexts.includes(serverQuote.text)) {
        quotes.push(serverQuote);
        newQuotesAdded = true;
      }
    });

    if (newQuotesAdded) {
      saveQuotes();
      populateCategories();
      notifyUser("Quotes updated from server (server data prioritized).");
    }
  } catch (error) {
    notifyUser("Failed to sync with server.");
  }
}



function notifyUser(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 4000);
}





// Init
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);

loadQuotes();
createAddQuoteForm();
populateCategories();
filterQuotes(); // Load quotes on page load
// Initial sync on load
syncWithServer();

// Sync every 20 seconds
setInterval(syncWithServer, 20000);

