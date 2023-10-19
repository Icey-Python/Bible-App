// API info
const apiUrl = 'https://bible-api.com'; // bible-api for verse by reference
const searchApiUrl = 'https://api.scripture.api.bible'; // Bible Search API for search
const searchApiKey = "5cfb367b2e99f0a9621b9bfc1e6b6cbe"; 

// Get reference to elements
const verseNum = document.querySelector('.verse-number');  
const verseText = document.querySelector('.verse-text');
const version = document.querySelector('.version');
// Get search box element
const searchBox = document.querySelector('#s_query');

// Add event listener for keypress
searchBox.addEventListener('keypress', (event) => {

  // Check for enter key
  if (event.key === 'Enter') {

    // Get search query
    const query = searchBox.value;
    console.log(query)
    // Call search function
    getVerse(query);

  }

});


// Get verse by reference
async function getVerse(reference) {

  const response = await fetch(`${apiUrl}/${reference}?translation=bbe`);
  const data = await response.json();  

  // Update elements
  verseNum.textContent = data.reference;
  verseText.textContent = data.text;
  version.textContent = `~${data.translation_id}~`;

}

// Search verses by keyword
async function searchVerses(query) {

  const params = `{
    "query": "${query}",
    "version": "kjv"
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
  
  // const data = await response.json();

  // // Get first result
  // const verse = data.data[0]; 

  // // Update elements
  // verseNum.textContent = verse.reference;
  // verseText.textContent = verse.text;
  // version.textContent = verse.version;

}

// Usage
getVerse('john 11:35');
searchVerses('parable of the sower');