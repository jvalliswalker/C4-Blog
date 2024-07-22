// Variables
let isDarkMode = false;

// Execution
populateExistingPostsDisplay();
document.body.addEventListener("click", handleModeChange);
document
  .getElementById("navigate-back")
  .addEventListener("click", navigateToLandingPage);

// Functions
function navigateToLandingPage() {
  location.href = "index.html";
}

// Toggle light/dark mode
function handleModeChange(event) {
  if (event.target.id == "sun-icon") {
    // Toggle mode on click
    isDarkMode = !isDarkMode;
    // Query elements to modify
    const blogCards = document.querySelectorAll(".blog-card");
    const header = document.querySelector("header");
    const sunIcon = document.getElementById("sun-icon");

    if (isDarkMode == true) {
      // Apply Invert filter to each blog card
      blogCards.forEach((card) => {
        card.classList.remove("regular-filter");
        card.classList.add("inverted-filter");
      });

      // Apply "dark" css class to header and body
      header.classList.add("dark-header");
      document.body.classList.add("dark-scrollbar");

      // Change icon from sun to moon
      sunIcon.setAttribute("src", "https://openclipart.org/image/800px/170669");
    } else {
      // Remove invert filter from each blog card and restore regular filter
      blogCards.forEach((card) => {
        card.classList.remove("inverted-filter");
        card.classList.add("regular-filter");
      });

      // Remove "dark" css class from header and boyd
      header.classList.remove("dark-header");
      document.body.classList.remove("dark-scrollbar");

      // Change icon from moon to sun
      sunIcon.setAttribute("src", "https://openclipart.org/image/800px/27381");
    }
  }
}

// Sorts passed Blog post objects by created date, putting most
// recently created posts first
function sortByDate(a, b) {
  const dateA = new Date(a.createdDate);
  const dateB = new Date(b.createdDate);

  if (dateA < dateB) {
    return 1;
  } else if (dateA > dateB) {
    return -1;
  } else {
    return 0;
  }
}

// Create elements on page for blog posts stored in localStorage
function populateExistingPostsDisplay() {
  const mainPanel = document.getElementById("blog-posts");

  // Check that existingPosts contains data (var populated in logic.js)
  if (existingPosts.length > 0) {
    // Sort posts by created date (descending)
    existingPosts.sort(sortByDate);

    // Create parent and child elements for each object in existingPosts
    for (const blogPostObject of existingPosts) {
      // Create parent element and apply styling
      const displayCard = document.createElement("div");
      displayCard.classList.add("blog-card");

      // Create child element for each parameter
      const blogTitle = createBlogPostElement(blogPostObject, "blogTitle");
      const userName = createBlogPostElement(blogPostObject, "userName");
      const createdDate = createBlogPostElement(blogPostObject, "createdDate");
      const blogContent = createBlogPostElement(blogPostObject, "blogContent");

      // append child elements to parent
      displayCard.appendChild(blogTitle);
      displayCard.appendChild(userName);
      displayCard.appendChild(createdDate);
      displayCard.appendChild(blogContent);

      // Apply parent to main panel
      mainPanel.appendChild(displayCard);
    }
  }
}

// Create HTML element for parent div from passed object and property
function createBlogPostElement(blogPostObject, blogPostProperty) {
  // Use parameter-to-class-name map for css assignment
  const blogPostElementToClassMap = {
    blogTitle: "blog-card-title",
    userName: "blog-card-username",
    createdDate: "blog-created-date",
    blogContent: "blog-card-content",
  };

  // Create element and apply css
  const element = document.createElement("div");
  element.classList.add(blogPostElementToClassMap[blogPostProperty]);

  // Populate inner HTML based on passed property
  switch (blogPostProperty) {
    case "userName":
      element.innerHTML = `Written by ${blogPostObject[blogPostProperty]}`;
      break;
    case "createdDate":
      const date = new Date(blogPostObject[blogPostProperty]);
      element.innerHTML = date.toLocaleString();
      break;
    default:
      element.innerHTML = blogPostObject[blogPostProperty];
      break;
  }

  return element;
}
