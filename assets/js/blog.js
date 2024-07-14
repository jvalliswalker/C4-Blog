
// Start by querying local storage for already existing blog entries
const existingPostsString = localStorage.getItem("existing-posts");

// Set existingPosts to queried local storage data if that data
// can be converted to an array, otherwise set as empty array
const existingPosts = existingPostsString.startsWith("[")
  ? JSON.parse(existingPostsString).sort(function (a, b){a.createdDate - b.createdDate})
  : [];

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
    userName: 'blog-card-username',
    blogContent: 'blog-card-content'
  };

  const element = document.createElement('div');
  element.classList.add(blogPostElementToClassMap[blogPostProperty]);

  element.innerHTML = blogPostProperty == 'userName' ? `Written by ${blogPostObject[blogPostProperty]}` : blogPostObject[blogPostProperty];

  return element;
}