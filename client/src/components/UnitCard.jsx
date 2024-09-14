import React from 'react';
import { Link } from 'react-router-dom';

const UnitCard = ({ unitData }) => {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <h3 className="text-lg font-bold">{unitData.title}</h3>
      <Link to={`/instructor/units/${unitData._id}`} className="text-blue-500 mt-2 inline-block">
        Manage Sessions
      </Link>
    </div>
  );
};

export default UnitCard;
