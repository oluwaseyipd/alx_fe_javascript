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



let quotes = [];

// Load quotes from local storage or default
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

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<p>"${quote.text}" — ${quote.category}</p>`;

  // Store last viewed quote using session storage (optional)
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
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

// Export quotes to JSON file
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

// Import quotes from uploaded JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Init
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);

loadQuotes();
createAddQuoteForm();
