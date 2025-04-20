import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { validateName } from '../../utils/validation';

export default function CourseTypeForm({ editItem, onSaved }) {
  const { courseTypes, setCourseTypes } = useContext(AppContext);
  const [name, setName] = useState('');

  useEffect(() => {
    if (editItem) setName(editItem.name);
  }, [editItem]);

  const handleSave = () => {
    if (!validateName(name)) return alert('Please provide a valid name');
    if (editItem) {
      setCourseTypes(courseTypes.map(ct => ct.id===editItem.id ? { ...ct, name } : ct));
    } else {
      setCourseTypes([...courseTypes, { id: Date.now(), name }]);
    }
    setName('');
    onSaved();
  };

  return (
    <div className="space-y-2 p-4 bg-white rounded shadow">
      <input
        className="w-full border p-2 rounded"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Course Type Name"
      />
      <div className="flex gap-2">
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          {editItem ? 'Update' : 'Add'}
        </button>
        {editItem && (
          <button onClick={onSaved} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        )}
      </div>
    </div>
  );
}