import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

export default function OfferingForm({ editItem, onSaved }) {
    const { courses, courseTypes, offerings, setOfferings } = useContext(AppContext);
    const [courseId, setCourseId] = useState('');
    const [courseTypeId, setCourseTypeId] = useState('');

    useEffect(() => {
        if (editItem) {
            setCourseId(editItem.courseId);
            setCourseTypeId(editItem.courseTypeId);
        }
    }, [editItem]);

    const handleSave = () => {
        if (!courseId || !courseTypeId) return alert('Select both fields');
        if (editItem) {
            setOfferings(
                offerings.map(o =>
                    o.id === editItem.id
                        ? { ...o, courseId, courseTypeId }
                        : o
                )
            );
        } else {
            setOfferings([
                ...offerings,
                { id: Date.now(), courseId, courseTypeId }
            ]);
        }
        setCourseId('');
        setCourseTypeId('');
        onSaved();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md w-full max-w-sm"
        >
            <h2 className="text-lg font-semibold text-gray-800">
                {editItem ? 'Edit Offering' : 'Add New Offering'}
            </h2>

            <select
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={courseId}
                onChange={e => setCourseId(parseInt(e.target.value))}
            >
                <option value="">Select Course</option>
                {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>

            <select
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={courseTypeId}
                onChange={e => setCourseTypeId(parseInt(e.target.value))}
            >
                <option value="">Select Type</option>
                {courseTypes.map(ct => (
                    <option key={ct.id} value={ct.id}>{ct.name}</option>
                ))}
            </select>

            <div className="flex gap-3">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    {editItem ? 'Update' : 'Add'}
                </button>
                {editItem && (
                    <button
                        onClick={onSaved}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </motion.div>
    );
}
