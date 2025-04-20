import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

export default function RegistrationList() {
    const { registrations, offerings, courses, courseTypes } = useContext(AppContext);

    return (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {registrations.map((r, index) => {
                const off = offerings.find(o => o.id === r.courseOfferingId);
                const course = courses.find(c => c.id === off.courseId);
                const type = courseTypes.find(ct => ct.id === off.courseTypeId);

                return (
                    <motion.div
                        key={r.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="p-5 bg-gray-50 border border-gray-200 rounded-2xl shadow hover:shadow-lg transition duration-300 ease-in-out"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{r.studentName}</h3>
                        <p className="text-sm text-gray-500 mb-2">{r.email}</p>
                        <p className="text-sm text-gray-700">
                            Registered for <span className="font-medium italic">{type.name} - {course.name}</span>
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}
