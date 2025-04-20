import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Tabs({ tabs }) {
  const location = useLocation();

  return (
    <div className="flex space-x-2 mb-4">
      {tabs.map(tab => (
        <Link
          key={tab.key}
          to={tab.path}
          className={`px-4 py-2 rounded ${
            location.pathname === tab.path
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
