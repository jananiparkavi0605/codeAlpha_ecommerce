const backendUrl = 'http://localhost:5000';

// Login Form
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error(error);
    }
  });
}

// Register Form
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert('Registration successful!');
        window.location.href = 'login.html';
      } else {
        alert('Registration failed!');
      }
    } catch (error) {
      console.error(error);
    }
  });
}

// Post Form
const postForm = document.getElementById('post-form');
if (postForm) {
  postForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const content = document.getElementById('post-content').value;

    try {
      const response = await fetch(`${backendUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        alert('Post created!');
        document.getElementById('post-content').value = '';
      } else {
        alert('Failed to create post!');
      }
    } catch (error) {
      console.error(error);
    }
  });
}
