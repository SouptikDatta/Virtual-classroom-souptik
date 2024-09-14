import React from 'react';
import { Link } from 'react-router-dom';

const ClassCard = ({ classData }) => {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <h3 className="text-lg font-bold">{classData.name}</h3>
      <p>{classData.description}</p>
      <Link to={`/instructor/classes/${classData._id}`} className="text-blue-500 mt-2 inline-block">
        Manage Class
      </Link>
    </div>
  );
};

export default ClassCard;
