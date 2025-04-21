import React, { useEffect, useState } from 'react';
import { Sun, Moon, BookOpen, List, Layers, UserPlus, Users } from 'lucide-react';

export default function Layout({ children, activeTab, setActiveTab }) {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dark]);

    const navItems = [
        { key: 'types', label: 'Course Types', path: '/types', icon: Layers },
        { key: 'courses', label: 'Courses', path: '/courses', icon: BookOpen },
        { key: 'offerings', label: 'Offerings', path: '/offerings', icon: List },
        { key: 'register', label: 'Register Student', path: '/register', icon: UserPlus },
        { key: 'list', label: 'View Registrations', path: '/list', icon: Users }
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">Menu</h2>

                <nav className="flex flex-col gap-3 flex-1">
                    {navItems.map(({ key, label, path, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => {
                                setActiveTab(key); // Set the active tab when clicked
                                window.location.pathname = path; 
                            }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${activeTab === key
                                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>

                <button
                    onClick={() => setDark(!dark)}
                    className="mt-6 p-2 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center"
                >
                    {dark ? <Sun /> : <Moon />}
                </button>
            </aside>

            <main className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
