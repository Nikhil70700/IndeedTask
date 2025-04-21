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
                        className="relative drop-shadow-xl w-64 h-40 overflow-hidden rounded-xl bg-[#3d3c3d]"
                    >
                        <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
                        <div className="absolute inset-0.5 bg-[#323132] opacity-90 rounded-xl flex flex-col justify-center p-5 text-white transition-opacity duration-300 ease-in-out hover:opacity-100 z-10">
                            <h3 className="text-lg font-semibold">{r.studentName}</h3>
                            <p className="text-sm text-gray-300 mb-2">{r.email}</p>
                            <p className="text-sm">
                                Registered for{' '}
                                <span className="font-medium italic text-indigo-200">
                                    {type.name} – {course.name}
                                </span>
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
