import React, { createContext, useState } from 'react';
export const AppContext = createContext();

export function AppProvider({ children }) {
    const [courseTypes, setCourseTypes] = useState([
        { id: 1, name: 'Individual' },
        { id: 2, name: 'Group' },
        { id: 3, name: 'Special' }
    ]);

    const [courses, setCourses] = useState([
        { id: 1, name: 'Hindi' },
        { id: 2, name: 'English' },
        { id: 3, name: 'Urdu' },
        { id: 4, name: 'Computer Science' },
        { id: 5, name: 'Electrical' },
        { id: 6, name: 'Agriculture' }

    ]);

    const [offerings, setOfferings] = useState([
        { id: 1, courseId: 1, courseTypeId: 1 },
        { id: 2, courseId: 2, courseTypeId: 1 },
        { id: 3, courseId: 4, courseTypeId: 3 },
        { id: 4, courseId: 6, courseTypeId: 1 },
        { id: 5, courseId: 5, courseTypeId: 3 },
        { id: 6, courseId: 2, courseTypeId: 2 }
    ]);

    const [registrations, setRegistrations] = useState([
        { id: 1, courseOfferingId: 1, studentName: 'Nikhil Pandey', email: 'nikhilpandya829@gmail.com' },
        { id: 2, courseOfferingId: 2, studentName: 'Mayank Deep', email: 'mayankdeep123@gmail.com' },
        { id: 3, courseOfferingId: 3, studentName: 'Deepak Kumar', email: 'dkkumar4433@gmail.com' },
        { id: 4, courseOfferingId: 4, studentName: 'Anurag Jha', email: 'anuragjha556@gmail.com' },
        { id: 5, courseOfferingId: 5, studentName: 'Avinash Jha', email: 'avinashjh@gmail.com' },
        { id: 6, courseOfferingId: 6, studentName: 'Shubham Sourav', email: 'shubhamsaurav112@gmail.com' }
    ]);

    return (
        <AppContext.Provider value={{
            courseTypes, setCourseTypes,
            courses, setCourses,
            offerings, setOfferings,
            registrations, setRegistrations
        }}>
            {children}
        </AppContext.Provider>
    );
}