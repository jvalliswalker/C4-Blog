// Start by querying local storage for already existing blog entries
const existingPostsString = localStorage.getItem("existing-posts");

// Set existingPosts to queried local storage data if that data
// can be converted to an array, otherwise set as empty array
const existingPosts = existingPostsString.startsWith("[")
  ? JSON.parse(existingPostsString)
  : [];
console.log(existingPosts);

populateExistingPostsDisplay();

function populateExistingPostsDisplay() {

  const mainPanel = document.getElementById('main-panel');

  for(const blogPostObject of existingPosts){
    const displayCard = document.createElement('div');
    displayCard.classList.add('blog-card');
    
    const userName = createBlogPostElement(blogPostObject, 'userName');
    const blogTitle = createBlogPostElement(blogPostObject, 'blogTitle');
    const blogContent = createBlogPostElement(blogPostObject, 'blogContent');

    displayCard.appendChild(blogTitle);
    displayCard.appendChild(userName);
    displayCard.appendChild(blogContent);

    mainPanel.appendChild(displayCard);
  }
}


function createBlogPostElement(blogPostObject, blogPostProperty){
  const blogPostElementToClassMap = {
    blogTitle: 'blog-card-title',
    userName: 'blog-card-username'
  };

  const element = document.createElement('div');
  element.classList.add(blogPostElementToClassMap[blogPostProperty]);

  element.innerHTML = blogPostProperty == 'userName' ? `Written by ${blogPostObject[blogPostProperty]}` : blogPostObject[blogPostProperty];

  return element;
}


// Create button listener
document.addEventListener("click", storeBlogEntry);

function storeBlogEntry(event) {
  // Check if clicked button is submit button
  if (
    event.target.tagName == "BUTTON" &&
    event.target.id == "submit-blog-post"
  ) {
    event.preventDefault();

    // Construct blog post object from form fields
    const blogPost = {
      userName: document.getElementById("input-username").value,
      blogTitle: document.getElementById("input-blog-title").value,
      blogContent: document.getElementById("input-blog-content").value,
      createdDate: new Date(),
    };

    // Add new post to existing posts array
    existingPosts.push(blogPost);

    // Stringify existing posts and set to local storage
    localStorage.setItem("existing-posts", JSON.stringify(existingPosts));
  }
}
