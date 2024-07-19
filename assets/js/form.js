// Create button listener
document.addEventListener("click", storeBlogEntry);

function getFormElements(){


  return blogPostObject;
}

function validatePost(){

    let isValid = true;

    // Construct blog post object from form fields
    const blogPost = {
      userName: document.getElementById("input-username"),
      blogTitle: document.getElementById("input-blog-title"),
      blogContent: document.getElementById("input-blog-content"),
      createdDate: new Date(),
    };

    Object.keys(blogPost).forEach( key => {

      if(key != 'createdDate'){
        const element = blogPost[key];
        
        if(element.value == null || element.value.length < 3){
          element.classList.add('invalid');
          element.placeholder = 'This field is required';
          isValid = false;
        }
        else {
          element.classList.remove('invalid');
          blogPost[key] = element.value;
        }
      }
    });

    if(isValid){
      return blogPost;
    }
    else {
      return null;
    }
}


function storeBlogEntry(event) {
  // Check if clicked button is submit button
  if (
    event.target.tagName == "BUTTON" &&
    event.target.id == "submit-button"
  ) {
    event.preventDefault();
    
    const blogPost = validatePost();

    if(blogPost != null) {
      // Add new post to existing posts array
      existingPosts.push(blogPost);
  
      // Stringify existing posts and set to local storage
      localStorage.setItem("existing-posts", JSON.stringify(existingPosts));
  
      // Redirect to blog page
      location.href = 'blog.html';
    }
  }
}
