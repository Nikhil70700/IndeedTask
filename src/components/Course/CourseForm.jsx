import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function CourseForm({ editItem, onSaved }) {
    const { courses, setCourses } = useContext(AppContext);
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editItem) {
            setName(editItem.name);
            setIsEditing(true);
        } else {
            setName('');
            setIsEditing(false);
        }
    }, [editItem]);

    const handleSubmit = e => {
        e.preventDefault();
        const newCourse = { id: isEditing ? editItem.id : Date.now(), name };

        if (isEditing) {
            setCourses(courses.map(course => (course.id === newCourse.id ? newCourse : course)));
        } else {
            setCourses([...courses, newCourse]);
        }

        onSaved(); // Callback to reset editing state in the parent
        setName('');
    };

    return (
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {isEditing ? 'Edit Course' : 'Add Course'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="courseName" className="block text-gray-700 dark:text-gray-300">Course Name</label>
                    <input
                        id="courseName"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                        placeholder="Enter course name"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                    {isEditing ? 'Update Course' : 'Add Course'}
                </button>
            </form>
        </div>
    );
}
