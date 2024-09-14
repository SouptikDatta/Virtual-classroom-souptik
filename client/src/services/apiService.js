const API_URL = 'http://localhost:5000/api';

// Helper function for fetching data with token
const fetchWithAuth = async (url, method = 'GET', data = null, token) => {

  if (!token) {
    throw new Error('No token provided');
  }

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  if (data) config.body = JSON.stringify(data);

  const response = await fetch(url, config);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }
  return await response.json();
};



// Get all classes (for both instructors and students)
export const getClasses = async (token) => {
  return await fetchWithAuth(`${API_URL}/classes`, 'GET', null, token);
};

// Create new class (Instructor)
export const createClass = async (classData, token) => {
  console.log('Creating class with data:', classData);
  return await fetchWithAuth(`${API_URL}/classes`, 'POST', classData, token);
};

// Get class by ID (Instructor and Student)
export const getClassById = async (classId, token) => {
  return await fetchWithAuth(`${API_URL}/classes/${classId}`, 'GET', null, token);
};

// Enroll a student in a class
export const enrollInClass = async (classId, token) => {
  return await fetchWithAuth(`${API_URL}/classes/${classId}/enroll`, 'POST', null, token);
};

// Add a comment to a lecture
export const addComment = async (lectureId, commentData, token) => {
  return await fetchWithAuth(`${API_URL}/comments/${lectureId}`, 'POST', commentData, token);
};

// Get comments for a lecture
export const getComments = async (lectureId, token) => {
  return await fetchWithAuth(`${API_URL}/comments/${lectureId}`, 'GET', null, token);
};

// Add a unit to a class
export const addUnit = async (classId, unitTitle, token) => {
  return await fetchWithAuth(`${API_URL}/classes/${classId}/units`, 'POST', commentData, token);
}

// Add a session to a unit
export const addSession = async (classId, unitId, sessionTitle, token) => {
  return await fetchWithAuth(`${API_URL}/classes/${classId}/units/${unitId}/sessions`, 'POST', { title: sessionTitle }, token);
};

// Add a lecture to a session
export const addLecture = async (classId, sessionId, lectureTitle, token) => {
  return await fetchWithAuth(`${API_URL}/classes/${classId}/sessions/${sessionId}/lectures`, 'POST', { title: lectureTitle }, token);
};
