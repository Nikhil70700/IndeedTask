import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import OfferingForm from './OfferingForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfferingList() {
    const { offerings, setOfferings, courses, courseTypes, registrations } = useContext(AppContext);
    const [editing, setEditing] = useState(null);
    const [filterType, setFilterType] = useState('');

    const handleDelete = id => {
        if (registrations.some(r => r.courseOfferingId === id)) {
            return alert('Cannot delete: has registrations');
        }
        setOfferings(offerings.filter(o => o.id !== id));
    };

    const filtered = filterType
        ? offerings.filter(o => o.courseTypeId === parseInt(filterType))
        : offerings;

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80 } },
    };

    return (
        <div className="flex gap-8 flex-col lg:flex-row">
            <OfferingForm editItem={editing} onSaved={() => setEditing(null)} />
            <div className="w-full">
                <div className="mb-4">
                    <select
                        className="border p-2 rounded"
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        {courseTypes.map(ct => (
                            <option key={ct.id} value={ct.id}>{ct.name}</option>
                        ))}
                    </select>
                </div>

                <motion.ul
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <AnimatePresence>
                        {filtered.map(o => {
                            const course = courses.find(c => c.id === o.courseId);
                            const type = courseTypes.find(ct => ct.id === o.courseTypeId);
                            return (
                                <motion.li
                                    key={o.id}
                                    variants={itemVariants}
                                    className="flex justify-between p-3 bg-white rounded shadow"
                                >
                                    <span>{type.name} - {course.name}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditing(o)}
                                            className="text-white bg-green-400 border-2 px-2 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(o.id)}
                                            className="text-white bg-red-500 border-2 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </motion.ul>
            </div>
        </div>
    );
}
