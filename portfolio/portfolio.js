function loadProjects() {
    fetch('projects.json') // Fetch JSON file
      .then(response => response.json())
      .then(data => {
        const contentDiv = document.getElementById('content');
        
        data.forEach(project => {
          const projectDiv = document.createElement('div');
          projectDiv.classList.add('project');
          
          const title = document.createElement('h2');
          title.textContent = project.title;
          projectDiv.appendChild(title);
          
          const description = document.createElement('p');
          description.textContent = project.description;
          projectDiv.appendChild(description);
          
          const imageGallery = document.createElement('div');
          imageGallery.classList.add('image-gallery');
          
          project.images.forEach(image => {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image');
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.addEventListener('click', () => openFullScreen(image.src));
            
            imageDiv.appendChild(img);
            imageGallery.appendChild(imageDiv);
          });
          
          projectDiv.appendChild(imageGallery);
          
          const additionalDetails = document.createElement('p');
          additionalDetails.textContent = project.additionalDetails;
          projectDiv.appendChild(additionalDetails);
          
          contentDiv.appendChild(projectDiv);
        });
      })
      .catch(error => console.error('Error fetching or parsing data:', error));
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
  
  // Call loadProjects function to generate HTML from JSON data
  loadProjects();
  