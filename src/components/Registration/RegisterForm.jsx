import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { validateName, validateEmail } from '../../utils/validation';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterForm() {
    const { offerings, registrations, setRegistrations } = useContext(AppContext);
    const [offeringId, setOfferingId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [email, setEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (!validateName(studentName) || !validateEmail(email) || !offeringId) {
            return alert('Fill all fields correctly');
        }

        setRegistrations([
            ...registrations,
            { id: Date.now(), courseOfferingId: offeringId, studentName, email }
        ]);

        setStudentName('');
        setEmail('');
        setOfferingId('');

        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    return (
        <div className="relative ">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-4 p-4 bg-white rounded shadow-xl mx-auto"
            >
                {/* Animate each field with slight delay */}
                <motion.input
                    className="w-full border p-2 rounded"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    placeholder="Student Name"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                />
                <motion.input
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email Address"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                />
                <motion.select
                    className="w-full border p-2 rounded"
                    value={offeringId}
                    onChange={e => setOfferingId(parseInt(e.target.value))}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <option value="">Select Offering</option>
                    {offerings.map(o => (
                        <option key={o.id} value={o.id}>
                            {`${o.courseTypeId} - ${o.courseId}`}
                        </option>
                    ))}
                </motion.select>
                <motion.button
                    type="submit"
                    className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                ><span class="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    Register
                </motion.button>
            </motion.form>

            {/* Success popup animation */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        key="popup"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-4 rounded-xl shadow-xl z-50 w-fit max-w-md"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🎉</span>
                            <div>
                                <p className="text-lg font-semibold">Registration Successful</p>
                                <p className="text-sm text-white/90">
                                    Congratulations! Your registration was completed successfully.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
