// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ManageClass from './components/ManageClass';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['admin']} />} />
          <Route path="/instructor" element={<PrivateRoute element={<InstructorDashboard />} allowedRoles={['instructor']} />} />
          <Route path="/student" element={<PrivateRoute element={<StudentDashboard />} allowedRoles={['student']} />} />
          <Route path="/instructor/classes/:classId" element={<PrivateRoute element={<ManageClass />} allowedRoles={['instructor']} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
