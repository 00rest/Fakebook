const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Sending a POST request to the login API for verification and session
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      })    
  
      if (response.ok) {
        const data = await response.json();
        document.location.replace(`/profile/${data.userData.user_id}`);
      } else {
        alert(response.statusText);
      }
    }
  };
  

  const randomName = async () => { const response = await fetch('/api/users/generate-name', { method: 'GET' });  
  if (response.ok) {
        const data = await response.json();
         document.getElementById('name-signup').setAttribute('value', data);
      } else {
        alert(response.statusText);
      }
  };

const numItemsToGenerate = 1; 

function randomPic(){

  fetch(`https://source.unsplash.com/600x400/?headshot`)
  .then((response)=> {   
    document.getElementById('profile-picture-signup').setAttribute('value', response.url);
    document.getElementById('profile-picture-preview').setAttribute('src', response.url);
  })
 
};

  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const hometown = document.querySelector('#hometown-signup').value.trim();
    const birthday = document.querySelector('#birthday-signup').value.trim();
    const bio = document.querySelector('#bio-signup').value.trim();
    const picture = document.querySelector('#profile-picture-signup').value.trim();

    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ user_name: name, email, password, hometown, birthday, bio, profile_picture: picture }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/`);
      } else {
        alert(response.statusText);
      }
    }
  };
  
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  