import React, { useState, useEffect, useContext } from 'react';
import { getClasses, createClass } from '../services/apiService';
import ClassCard from '../components/ClassCard'; // Subcomponent for a class
import AuthContext from '../context/AuthContext';

const InstructorDashboard = () => {
  const { token } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) { // Ensure token is available before fetching
          const data = await getClasses(token);
          setClasses(data);
        } else {
          console.error('Token is missing');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handleCreateClass = async () => {
    try {
      if (newClass.title.trim() === '') {
        console.error('Class title is required');
        return;
      }
      const createdClass = await createClass(newClass, token);
      setClasses([...classes, createdClass]);
      setNewClass({ title: '', description: '' }); // Clear input fields
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl italic font-extrabold mb-6">Classify</h1>
      <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>

      <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Class</h2>
        <input
          type="text"
          placeholder="Class Title"
          value={newClass.title}
          onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
          className="border p-3 rounded-lg mb-4 w-full"
        />
        <textarea
          placeholder="Description"
          value={newClass.description}
          onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
          className="border p-3 rounded-lg mb-4 w-full"
          rows="4"
        />
        <button
          className="bg-blue-500 text-white p-3 rounded-lg"
          onClick={handleCreateClass}
        >
          Create Class
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <ClassCard key={classItem._id} classData={classItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
