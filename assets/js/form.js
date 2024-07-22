// Variables // 
const formElements = {
  userName: document.getElementById("input-username"),
  blogTitle: document.getElementById("input-blog-title"),
  blogContent: document.getElementById("input-blog-content")
};


// Execution //
document.addEventListener("click", handleSubmit);

// Functions //

// Submission handler
function handleSubmit(event){
  // Check if clicked button is submit button
  if (
    event.target.tagName == "BUTTON" &&
    event.target.id == "submit-button"
  ) {
    event.preventDefault();
    
    const blogPost = getBlogPostData();
    const isValid = validatePost();

    if(isValid == true){
      storeBlogEntry(blogPost);
      redirectToPostsPage();
    }
  }
}

// Construct blog post object from queried form fields
function getBlogPostData(){
  return {
    userName: formElements.userName.value,
    blogTitle: formElements.blogTitle.value,
    blogContent: formElements.blogContent.value,
    createdDate: new Date(),
  };
}

// Capture form data, format, and add to localStorage
function storeBlogEntry(blogPost) {
    // Add new post to existing posts array
    existingPosts.push(blogPost); // var existingPosts declared in logic.js

    // Stringify existing posts and set to local storage
    localStorage.setItem("existing-posts", JSON.stringify(existingPosts));
}

// Redirect to blog page
function redirectToPostsPage(){
    location.href = 'blog.html';
}

// Verifies user-submitted data is valid, alerting and applying filter if not 
function validatePost(){

    let isValid = true;

    // Check each key for validity
    Object.values(formElements).forEach( element => {
        
      // Check element value has data
      if(element.value == null || element.value.length < 1){
        // Apply "invalid" styling if invalid
        element.classList.add('invalid');
        element.placeholder = 'This field is required';
        isValid = false;
      }
      else {
        // Remove "invalid" styling if valid
        element.classList.remove('invalid');
      }
    });

    // Alert user if any invalid entries found
    if(isValid == false){
      alert('Please make sure that all fields are populated');
    }

    return isValid;
}
