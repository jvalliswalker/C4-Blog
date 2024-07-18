// Create button listener
document.addEventListener("click", storeBlogEntry);

function storeBlogEntry(event) {
  // Check if clicked button is submit button
  if (
    event.target.tagName == "BUTTON" &&
    event.target.id == "submit-button"
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

    // Redirect to blog page
    location.href = 'blog.html';
  }
}
