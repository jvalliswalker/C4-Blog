// Variables //
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const profileHyperlink = 'https://jvalliswalker.github.io/C2-Profile/';
let existingPosts = [];


// Script //
extractLocalStorageData();
populateHeader();
populateFooter();


// Functions //

// Gets existing-posts local storage 
function extractLocalStorageData() {
  const existingPostsString = localStorage.getItem("existing-posts");

  if (existingPostsString != null && existingPostsString.startsWith("[")) {
    existingPosts = JSON.parse(existingPostsString);
  }
}

// Create standard headers across pages
function populateHeader() {
  const headerDiv = document.createElement('div');
  
  headerDiv.innerText = 'My Fancy Blog';

  header.appendChild(headerDiv);
}

// Create standard footers across pages
function populateFooter() {
  const footerDiv = document.createElement('div');
  const profileAnchor = document.createElement('a');

  profileAnchor.setAttribute('href', profileHyperlink);
  profileAnchor.setAttribute('target', '_blank');
  profileAnchor.innerText = 'Jamil Vallis-Walker';


  footerDiv.innerText = 'Site by ';
  footerDiv.appendChild(profileAnchor);

  footer.appendChild(footerDiv);
}
