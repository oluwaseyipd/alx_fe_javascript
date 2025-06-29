// Initial quotes array
const quotes = [
  { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
  { text: "To be or not to be, that is the question.", category: "Philosophy" },
  { text: "Imagination is more important than knowledge.", category: "Inspiration" }
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Show a random quote from the array
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — <em>${quote.category}</em>`;
}

// Add new quote to the array and update DOM
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText && quoteCategory) {
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);

    // Clear inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Display the newly added quote immediately
    quoteDisplay.textContent = `"${newQuote.text}" — ${newQuote.category}`;
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Attach event listener
newQuoteBtn.addEventListener('click', showRandomQuote);
