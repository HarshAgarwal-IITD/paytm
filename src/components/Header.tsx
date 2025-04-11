
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { useLogin } from './LoginProvider';
import DarkIcon from './icons/Dark';
import SunIcon from './icons/Sun';
import UseFetchDetails from '../hooks/useFetch';
import Sidebar from './SIdebar';

export function Header() {
  const { isLoggedIn, logout, username } = useLogin();
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const fetchDetail = UseFetchDetails();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, []);

  return (
    <header className="bg-gray-200 shadow-lg  transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Paytm Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-600 " />
              <span className="ml-2 text-2xl font-bold text-blue-600">Paytm</span>
            </Link>
          </div>

          {/* Center: Username if logged in */}
          <div className="flex-grow flex justify-center">
            {isLoggedIn && (
              <div className="text-gray-700  font-bold text-xl">
                Hello, {username}
              </div>
            )}
          </div>

          {/* Right: Sign In/Out and Dark Mode toggle */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button 
                onClick={logout} 
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/signin" 
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
            
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-lg text-gray-700  hover:bg-gray-100  transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <SunIcon /> : <DarkIcon />}
            </button>
            <Sidebar></Sidebar>
          </div>
        </div>
      </div>
    </header>
  );
}