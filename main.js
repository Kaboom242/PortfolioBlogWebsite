
function returnXHRURL()
{
    let hostURL = "";
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    {
        hostURL = "./";
    }
    else {
        hostURL = "./";
    }
    return hostURL;
}
function returnHostURL()
{
    let hostURL = "";
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    {
        hostURL = window.location.protocol + "//" + window.location.host + "/PortfolioBlogWebsite";
    }
    else {
        hostURL = "./PortfolioBlogWebsite";
    }
    return hostURL;
}

function loadHeader(pathOffset) {
  const headerContainer = document.getElementById('header');
  const xhr = new XMLHttpRequest();
;
  xhr.open('GET',   pathOffset +'header.html', true); //returnXHRURL() +
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          headerContainer.innerHTML = xhr.responseText;
          document.getElementById("navbarBlog").href = returnHostURL() + "/index.html"; //http://localhost:1180/
      }
  };
  xhr.send();
}

function loadFooter(pathOffset) {
  const headerContainer = document.getElementById('footer');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', returnXHRURL() + pathOffset + '/footer.html', true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          headerContainer.innerHTML = xhr.responseText;
      }
  };
  xhr.send();
}

function GetBlogPosts() {
  fetch('./blogPosts.json')
  .then(response => response.json())
  .then(data => {
      // Sort the blog posts by date (assuming "date" is a valid property)
      data.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Create HTML elements for each blog post
      const blogListContainer = document.getElementById('content');

      data.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('blog-post');
          
          const titleElement = document.createElement('h2');
          titleElement.innerHTML = `${post.title} <span>${post.date}</span>`;

          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = post.description;

          const tagsElement = document.createElement('div');
          tagsElement.classList.add('tags-container');

          post.tags.forEach(tag => {
              const tagButton = document.createElement('div');
              tagButton.classList.add('tag-button');
              tagButton.textContent = tag;
              tagButton.addEventListener('click', () => handleTagClick(tag));
              tagsElement.appendChild(tagButton);
          });

          const pathElement = document.createElement('p');
          pathElement.textContent = `Path: ${post.path}`;

          postElement.appendChild(titleElement);
          postElement.appendChild(tagsElement);
          postElement.appendChild(descriptionElement);
          //postElement.appendChild(pathElement);

          // Add a click event listener to redirect to the individual blog post page
          postElement.addEventListener('click', () => redirectToBlogPostPage(post.path));

          // Append the post element to the container
          blogListContainer.appendChild(postElement);
      });

      function redirectToBlogPostPage(filePath) {
          // Redirect to the individual blog post page with the filepath as a query parameter
          window.location.href = `blogPost.html?filePath=${filePath}`;
      }

      function handleTagClick(tag) {
          // Add logic for handling tag clicks, for example, filtering posts by tag
          console.log(`Clicked tag: ${tag}`);
      }
  })
  .catch(error => console.error('Error fetching blog posts:', error));
}

function openFullScreen(imageUrl) {
    const fullScreen = document.createElement('div');
    fullScreen.classList.add('full-screen');
    
    const image = new Image();
    image.src = imageUrl;
    fullScreen.appendChild(image);
    
    fullScreen.addEventListener('click', () => {
        fullScreen.remove();
    });
    
    document.body.appendChild(fullScreen);
}