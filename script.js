// API info
const apiUrl = 'https://bible-api.com'; // bible-api for verse by reference
const searchApiUrl = 'https://api.scripture.api.bible'; // Bible Search API for search
const searchApiKey = "5cfb367b2e99f0a9621b9bfc1e6b6cbe"; 

// Get reference to elements
const verseNum = document.querySelector('.subtitle');  
const verseText = document.querySelector('.text span');
// Get search box element
const searchBox = document.querySelector('#s_query');
const noteContainer = document.querySelector('.note__content')
// Add event listener for keypress
searchBox.addEventListener('keypress', (event) => {

  // Check for enter key
  if (event.key === 'Enter') {

    // Get search query
    const query = searchBox.value;
    // Call search function
    getVerse(query);

  }

});


// Get verse by reference
async function getVerse(reference) {
  noteContainer.textContent = ''
  try {
    const response = await fetch(`${apiUrl}/${reference}?translation=bbe`);
    const data = await response.json();

    // Update elements
    verseNum.textContent = data.reference;
    let verses = ""
    let structured_chapter = "";
    data.verses.forEach((verse, index) => {
      verses += verse.text.replace('\n',' ')
      structured_chapter += "<sup>" + (parseInt(index, 10) + 1) + "</sup>" + " " + verse.text + "<br/><br/>";
    });
    verseText.innerHTML = structured_chapter;
    
    const bibleText = verses;
    summarize(bibleText)
      .then(summary => {
        noteContainer.innerHTML = summary.replace('-', '<br>').replace('"',' ').replace('"',' ');
      })
      .catch(error => {
        console.log(error); 
      });
    
  } catch (error) {
    verseNum.textContent = "Error fetching verse";
    verseText.innerHTML = `<p>An error occurred while fetching the verse: Check for typos then try again</p>`;
  }

}


// Search verses by keyword
async function searchVerses(query) {

  const params = `{
    "query": "${query}",
    "version": "bbe"
  }`;

  const response = await fetch(`${searchApiUrl}/verses`, {
    method: 'POST',
    headers: {
      'api-key': searchApiKey,
      'Content-Type': 'application/json'
    },
    body: params
  });
  console.log(response)

}

// Summarize text function
async function summarize(text) {

  // Encode text for URL
  const encodedText = encodeURIComponent(text);

  // API endpoint
  const apiUrl = 'https://bible-app.icey-python.repl.co/summarize?text=';

  // Build request URL
  const url = apiUrl + encodedText;

  // Make GET request
  const response = await fetch(url);
  const summary = await response.text();

  return summary;

}

// Usage
getVerse('john 11:35');
searchVerses('parable of the sower');