// Variables
// let existingPosts = [];
let isDarkMode = false;

// Execution
populateExistingPostsDisplay();
document.body.addEventListener("click", handleModeChange);
document.getElementById('navigate-back').addEventListener("click", navigateToLandingPage);


// Functions
function navigateToLandingPage(){
  location.href = 'index.html';
}


// Toggle light/dark mode 
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
      document.body.classList.remove('dark-scrollbar');
      
      sunIcon.setAttribute(
        'src', 'https://openclipart.org/image/800px/27381'
      );
    }
    else { 
      blogCards.forEach((card) => {
        card.classList.remove("regular-filter");
        card.classList.add("inverted-filter")
      });
      
      header.classList.add('dark-header');
      document.body.classList.add('dark-scrollbar');
      
      sunIcon.setAttribute(
        'src', 'https://openclipart.org/image/800px/170669'
      );
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

// Create elements on page for blog posts stored in localStorage
function populateExistingPostsDisplay() {
  const mainPanel = document.getElementById("blog-posts");

  if(existingPosts.length > 0){
    existingPosts.sort(sortByDate);
  }

  for (const blogPostObject of existingPosts) {
    const displayCard = document.createElement("div");
    displayCard.classList.add("blog-card");

    const blogTitle = createBlogPostElement(blogPostObject, "blogTitle");
    const userName = createBlogPostElement(blogPostObject, "userName");
    const createdDate = createBlogPostElement(blogPostObject, "createdDate");
    const blogContent = createBlogPostElement(blogPostObject, "blogContent");

    displayCard.appendChild(blogTitle);
    displayCard.appendChild(userName);
    displayCard.appendChild(createdDate);
    displayCard.appendChild(blogContent);

    mainPanel.appendChild(displayCard);
  }
}

// Create HTML element for parent div from passed object and property
function createBlogPostElement(blogPostObject, blogPostProperty) {
  const blogPostElementToClassMap = {
    blogTitle: "blog-card-title",
    userName: "blog-card-username",
    createdDate: 'blog-created-date',
    blogContent: "blog-card-content"
  };

  const element = document.createElement("div");
  element.classList.add(blogPostElementToClassMap[blogPostProperty]);

  switch(blogPostProperty) {
    case 'userName':
      element.innerHTML = `Written by ${blogPostObject[blogPostProperty]}`;
      break;
    case 'createdDate':
      const date = new Date(blogPostObject[blogPostProperty]);
      element.innerHTML = date.toLocaleString();
      break;
    default:
      element.innerHTML = blogPostObject[blogPostProperty];
  }

  return element;
}
