import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

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
  { key: 'list', label: 'View Registrations', path: '/list' },
];

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('types');

  useEffect(() => {
    const tab = tabs.find(tab => tab.path === location.pathname);
    if (tab) {
      setActiveTab(tab.key);
    }
  }, [location]);

  const handleTabChange = key => {
    const tab = tabs.find(t => t.key === key);
    if (tab) {
      setActiveTab(key);
      navigate(tab.path);
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange}>
      <h1 className="text-4xl text-center md:text-5xl font-extrabold tracking-tight uppercase mb-6 text-indigo-700 dark:text-indigo-300">
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
