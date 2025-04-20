import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseForm from './CourseForm';
import { motion } from 'framer-motion';

export default function CourseList() {
    const { courses, setCourses, offerings } = useContext(AppContext);
    const [editing, setEditing] = useState(null);

    return (
        <div className="space-y-6">
            <CourseForm editItem={editing} onSaved={() => setEditing(null)} />

            <motion.ul
                className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
                {courses.map(course => (
                    <motion.li
                        key={course.id}
                        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                        className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 flex justify-between items-center"
                    >
                        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{course.name}</span>
                        <div className="flex gap-2">
                            <button onClick={() => setEditing(course)} className="text-blue-500 dark:text-blue-400">Edit</button>
                            <button
                                onClick={() => {
                                    if (offerings.some(o => o.courseId === course.id)) return alert('In use');
                                    setCourses(courses.filter(c => c.id !== course.id));
                                }}
                                className="text-red-500 dark:text-red-400"
                            >Delete</button>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
}
