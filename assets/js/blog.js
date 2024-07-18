// Variables
let existingPosts = [];
let isDarkMode = false;

// Script
extractLocalStorageData();
populateExistingPostsDisplay();
document.body.addEventListener("click", handleModeChange);


// Functions

// Gets existing-posts local storage 
function extractLocalStorageData() {
  const existingPostsString = localStorage.getItem("existing-posts");

  if (existingPostsString != null && existingPostsString.startsWith("[")) {
    existingPosts = JSON.parse(existingPostsString);
  }
}

function handleModeChange(event) {
  if (event.target.id == "sun-icon") {
    const blogCards = document.querySelectorAll(".blog-card");
    const header = document.querySelector('header');
    const sunIcon = document.getElementById('sun-icon');

    if(isDarkMode){
      blogCards.forEach((card) => {
        card.classList.remove("inverted-filter");
        card.classList.add("regular-filter");
      });
      
      header.classList.remove('dark-header');
      header.classList.add('restored-header');
      
      sunIcon.setAttribute(
        'src', 'https://openclipart.org/image/800px/27381'
      );
    }
    else { 
      blogCards.forEach((card) => {
        card.classList.remove("regular-filter");
        card.classList.add("inverted-filter")
      });
      
      header.classList.remove('restored-header');
      header.classList.add('dark-header');
      
      sunIcon.setAttribute(
        'src', 'https://openclipart.org/image/800px/170669'
      );
;
    }

    isDarkMode = !isDarkMode;
  }
}

// Sorts passed Blog post objects by created date, putting most
// recently created posts first
function sortByDate(a, b){
  const dateA = new Date(a.createdDate);
  const dateB = new Date(b.createdDate);

  if (dateA < dateB){
    return 1;
  }
  else if (dateA > dateB){
    return -1
  }
  else {
    return 0;
  }
}

function populateExistingPostsDisplay() {
  const mainPanel = document.getElementById("most-recent-post");
  const sidePanel = document.getElementById("older-posts");
  let first = true;

  if(existingPosts.length > 0){
    existingPosts.sort(sortByDate);
  }

  for (const blogPostObject of existingPosts) {
    console.log(Date(blogPostObject.createdDate));
    let panelToPopulate;
    const displayCard = document.createElement("div");
    displayCard.classList.add("blog-card");
    if (first) {
      panelToPopulate = mainPanel;
      displayCard.classList.add("primary-blog-card");
      first = false;
    } else {
      panelToPopulate = sidePanel;
      displayCard.classList.add("secondary-blog-card");
    }

    const userName = createBlogPostElement(blogPostObject, "userName");
    const blogTitle = createBlogPostElement(blogPostObject, "blogTitle");
    const blogContent = createBlogPostElement(blogPostObject, "blogContent");

    displayCard.appendChild(blogTitle);
    displayCard.appendChild(userName);
    displayCard.appendChild(blogContent);

    panelToPopulate.appendChild(displayCard);
  }
}

function createBlogPostElement(blogPostObject, blogPostProperty) {
  const blogPostElementToClassMap = {
    blogTitle: "blog-card-title",
    userName: "blog-card-username",
    blogContent: "blog-card-content",
  };

  const element = document.createElement("div");
  element.classList.add(blogPostElementToClassMap[blogPostProperty]);

  element.innerHTML =
    blogPostProperty == "userName"
      ? `Written by ${blogPostObject[blogPostProperty]}`
      : blogPostObject[blogPostProperty];

  return element;
}
