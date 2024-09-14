// src/services/authService.js
export const signupUser = async (userData) => {
  const response = await fetch('http://localhost:5000/api/auth/signup', { // Adjust base URL
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Signup failed');
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch('http://localhost:5000/api/auth/login', { // Adjust base URL
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};
