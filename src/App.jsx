import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import CourseTypeList from './components/CourseType/CourseTypeList';
import CourseList from './components/Course/CourseList';
import OfferingList from './components/Offering/OfferingList';
import RegisterForm from './components/Registration/RegisterForm';
import RegistrationList from './components/Registration/RegistrationList';

const tabs = [
  { key: 'types', label: 'Course Types', path: '/types' },
  { key: 'courses', label: 'Courses', path: '/courses' },
  { key: 'offerings', label: 'Offerings', path: '/offerings' },
  { key: 'register', label: 'Register Student', path: '/register' },
  { key: 'list', label: 'View Registrations', path: '/list' }
];

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent tabs={tabs} />
      </Router>
    </AppProvider>
  );
}

function AppContent({ tabs }) {
  const location = useLocation(); 
  const [activeTab, setActiveTab] = useState('types'); 

  useEffect(() => {
    const path = location.pathname;
    const tab = tabs.find(tab => tab.path === path);
    if (tab) {
      setActiveTab(tab.key);
    }
  }, [location, tabs]);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Student Registration
      </h1>

      <Routes>
        <Route path="/" element={<Navigate to="/types" replace />} />
        <Route path="/types" element={<CourseTypeList />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/offerings" element={<OfferingList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/list" element={<RegistrationList />} />
      </Routes>
    </Layout>
  );
}
