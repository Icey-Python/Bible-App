// API info
const apiUrl = 'https://bible-api.com'; // bible-api for verse by reference
const searchApiUrl = 'https://api.scripture.api.bible'; // Bible Search API for search
const searchApiKey = "5cfb367b2e99f0a9621b9bfc1e6b6cbe"; 

// Get reference to elements
const verseNum = document.querySelector('.subtitle');  
const verseText = document.querySelector('.text span');
// Get search box element
const searchBox = document.querySelector('#s_query');

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

  const response = await fetch(`${apiUrl}/${reference}?translation=bbe`);
  const data = await response.json();  

  // Update elements
  verseNum.textContent = data.reference;
  let structured_chapter = ""
  data.verses.forEach((verse,index)=>{
    structured_chapter += "<sup>"+(parseInt(index,10)+1)+"</sup>"+" "+verse.text + "<br/><br/>"
  })
  verseText.innerHTML =structured_chapter ;

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

}

// Usage
getVerse('john 11:35');
searchVerses('parable of the sower');