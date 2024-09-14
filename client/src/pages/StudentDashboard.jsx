import React, { useState, useEffect, useContext } from 'react';
import { getClasses } from '../services/apiService';
import ClassCard from '../components/ClassCard';
import AuthContext from '../context/AuthContext';

const StudentDashboard = () => {
  const { token } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const classData = await getClasses(token);
      setClasses(classData);
    }
    fetchData();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">Enrolled Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((classItem) => (
            <ClassCard key={classItem._id} classData={classItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
