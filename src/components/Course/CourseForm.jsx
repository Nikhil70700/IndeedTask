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

                <button type="submit" className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                    <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    {isEditing ? 'Update Course' : 'Add Course'}
                </button>
            </form>
        </div>
    );
}
